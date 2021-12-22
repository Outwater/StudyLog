const socket = io();
// 브라우저에서 접근가능한 socket.io.js 파일에서 기본적으로 io함수를 제공한다.
// 알아서 열려 있는 socket 통로를 찾는 역할도 함
// sockets.push 에서 일일이 socket의 unique id를 넣어준 것에서, 연결된 socketId를 기본적으로 제공함

const $nickname = document.getElementById("nickname");
const $nickForm = $nickname.querySelector("form");

const $entrance = document.getElementById("entrance");
const $roomForm = $entrance.querySelector("form");

const $chatRoom = document.getElementById("chat-room");
const $ul = document.querySelector("ul");

let nickname = "";
let = roomName = "";
$chatRoom.hidden = true;
$entrance.hidden = true;

function showEntrance() {
  $nickname.hidden = true;
  $entrance.hidden = false;
  $roomForm.addEventListener("submit", handleRoomSubmit);
}
function handleNicknameSubmit(event) {
  event.preventDefault();
  const $input = $nickForm.querySelector("input");
  nickname = $input.value;

  const $nickname = document.getElementById("nick-header");
  $nickname.textContent = `nickname: ${nickname}`;

  showEntrance();
}

function addMessage(msg) {
  const $li = document.createElement("li");
  $li.textContent = msg;
  $ul.append($li);
}

function showRoom() {
  $entrance.hidden = true;
  $chatRoom.hidden = false;
  const $h3 = document.querySelector("h3");
  $h3.textContent = `Room: ${roomName}`;
  const $msgForm = document.querySelector("#chat-room form");
  $msgForm.addEventListener("submit", handleMsgSubmit);
}
function handleRoomSubmit(event) {
  event.preventDefault();
  const input = $roomForm.querySelector("input");
  roomName = input.value;
  socket.emit("enter_room", { nickname, roomName }, showRoom);
}

function handleMsgSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#chat-room form input");
  const msg = input.value;
  socket.emit("new_message", { msg, roomName }, () => {
    addMessage(`Me: ${msg}`);
  });
  input.value = "";
  input.focus();
}
$nickForm.addEventListener("submit", handleNicknameSubmit);

socket.on("welcome", (payload) => {
  const { roomName, user } = payload;
  addMessage(`${roomName}방에 ${user}님이 입장했습니다`);
});
socket.on("bye", (payload) => {
  addMessage(`${payload.user}님이 퇴장하였습니다`);
});
socket.on("new_message", (payload) =>
  addMessage(`${payload.user}: ${payload.msg}`)
);
