const socket = io();

const $myFace = document.getElementById("myFace");
const $muteBtn = document.getElementById("mute");
const $cameraBtn = document.getElementById("camera");
const $camerasSelect = document.getElementById("cameras");

let myStream;
let muted = false;
let cameraOff = false;

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
getMedia();

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
