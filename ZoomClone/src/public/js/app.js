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

function startMedia() {
  $welcome.hidden = true;
  $call.hidden = false;
  getMedia();
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

socket.on("welcome", () => {
  console.log("someone joined, 참가 확인 후 필요메서드 구현가능(signaling)");
});
