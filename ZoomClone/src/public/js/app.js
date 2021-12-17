const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};
// 서버에서 보낸 메세지 받기
socket.addEventListener("message", (msg) => {
  const li = document.createElement("li");
  li.innerText = msg.data;
  messageList.append(li);
});
//msg 객체에는 수 많은 프로퍼티 존재
// msg.data, meg.timestamp 많이 쓰임

socket.addEventListener("close", () => {
  console.log("Disconnected with Server🆇 ");
});

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("message", input.value));

  const li = document.createElement("li");
  li.innerText = `ME: ${input.value}`;
  messageList.append(li);
  input.value = "";
};
const handleNickSubmit = (event) => {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
