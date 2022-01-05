const socket = io();

const $myFace = document.getElementById("myFace");
const $muteBtn = document.getElementById("mute");
const $cameraBtn = document.getElementById("camera");
const $camerasSelect = document.getElementById("cameras");

const $call = document.getElementById("call");
$call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];

    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.textContent = camera.label;
      if (camera.label === currentCamera.label) {
        option.selected = true;
      }
      $camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  const initialConstrains = { audio: true, video: true };
  const cameraConstrains = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    // 카메라 전환되는지 테스트 용
    if (deviceId === "default") {
      myStream.getVideoTracks().forEach((track) => (track.enabled = false));
      cameraOff = true;
      $cameraBtn.textContent = "Turn on Camera";
    }
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstrains : initialConstrains
    );
    $myFace.srcObject = myStream;
    if (!deviceId) {
      getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}
async function handleMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muted = true;
    $muteBtn.textContent = "Unmute";
  } else {
    muted = false;
    $muteBtn.textContent = "Mute";
  }
}
function handleCameraClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraOff = false;
    $cameraBtn.textContent = "Turn off Camera";
  } else {
    cameraOff = true;
    $cameraBtn.textContent = "Turn on Camera";
  }
}
async function handleCameraChange() {
  await getMedia($camerasSelect.value);
}
$muteBtn.addEventListener("click", handleMuteClick);
$cameraBtn.addEventListener("click", handleCameraClick);
$camerasSelect.addEventListener("input", handleCameraChange);

//* Welcome 로직
const $welcome = document.getElementById("welcome");
const $welcomeForm = $welcome.querySelector("form");

async function startMedia() {
  $welcome.hidden = true;
  $call.hidden = false;
  await getMedia();

  makeConnection();
}

function handleWelcomeSubmit(e) {
  e.preventDefault();
  const $input = $welcomeForm.querySelector("input");

  socket.emit("join_room", $input.value, startMedia);
  roomName = $input.value;

  $input.value = "";
}
$welcomeForm.addEventListener("submit", handleWelcomeSubmit);

//* Socket Event

socket.on("welcome", async () => {
  // 상대연결 확인되면 offer 만들어 전송
  const offer = await myPeerConnection.createOffer();
  // RTC연결에 offer를 등록
  myPeerConnection.setLocalDescription(offer);
  console.log("send the offer");
  socket.emit("offer", offer, roomName);
});
//PeerB는 전송한 'offer'를 받아 확인한다.
socket.on("offer", (offer) => {
  console.log(offer);
});

//* RTC 연결하기

function makeConnection() {
  myPeerConnection = new RTCPeerConnection();
  myStream.getTracks().forEach((track) => {
    myPeerConnection.addTrack(track, myStream);
  });
}
// A: 방입장 > A:서버에서 startMedia 호출 > A:getMedia > A:RTC 연결진행 > A: mediaTrack,Stream을 RTC통신에 등록
// B: A있는 방 입장 > 위 과정 동일하게 진행 > 같은 방에 있는 A에게 'welcome'이벤트 전송
// A: 'welcome'리스너 > offer생성 후 RTC통신 등록 > 'offer'이벤트로 offer,roomName 전송
// Server: 'offer'리스너 > 해당 방의 다른 유저(B)에게 offer 전송
// B: 'offer'리스너 > A로 부터 생성된 offer를 받아 확인.
