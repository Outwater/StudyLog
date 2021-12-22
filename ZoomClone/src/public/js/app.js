const socket = io();
// 브라우저에서 접근가능한 socket.io.js 파일에서 기본적으로 io함수를 제공한다.
// 알아서 열려 있는 socket 통로를 찾는 역할도 함
// sockets.push 에서 일일이 socket의 unique id를 넣어준 것에서, 연결된 socketId를 기본적으로 제공함

const $welcome = document.getElementById("welcome");
const $form = $welcome.querySelector("form");
const $room = document.getElementById("room");
let = roomName = "";
$room.hidden = true;
const $ul = document.querySelector("ul");

function addMessage(msg) {
  const $li = document.createElement("li");
  $li.textContent = msg;
  $ul.append($li);
}

function handleMsgSubmit(event) {
  event.preventDefault();
  const input = $room.querySelector("input");
  const msg = input.value;
  socket.emit("new_message", msg, roomName, () => {
    addMessage(`Me: ${msg}`);
  });
  input.value = "";
  input.focus();
}

function showRoom() {
  $welcome.hidden = true;
  $room.hidden = false;
  const $h3 = document.querySelector("h3");
  $h3.textContent = `Room: ${roomName}`;
  const $form = $room.querySelector("form");
  $form.addEventListener("submit", handleMsgSubmit);
}
function handleRoomSubmit(event) {
  event.preventDefault();
  const input = $form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

$form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (msg) => {
  addMessage(`${msg}방에 누군가 입장했습니다`);
});
socket.on("bye", () => {
  addMessage("누군가 퇴장하였습니다ㅠㅠ");
});
socket.on("new_message", (msg) => addMessage(msg));
