import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`); // ws://localhost:3000 도 접근가능하게 됨
// app.listen(3000, handleListen);
// -> express는 ws서버를 지원하지 않기 때문에 별도 작업을 거쳐, ws와 http를 모두 사용할 수 있는 서버를 만드는 과정

const server = http.createServer(app);

// webSokect서버 만들기
// Websocket 서버안에 http 서버를 넣어주어서 같은 서버에서 둘다 사용할 수 있도록 함(optional)
const wss = new WebSocket.Server({ server });

const sockets = [];
// 브라우저에서 socket연결되면 여기서 컨트롤 할 수 있음
// socket은 연결된 브라우저의 정보를 가지고 있음
wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anoymnous"; // socket의 기본값을 설정해줌
  console.log("Connected to Browser ✔️");
  socket.on("close", () => console.log("Disconnected from the Browser 🆇"));
  socket.on("message", (msg) => {
    const parsedMsg = JSON.parse(msg);
    switch (parsedMsg.type) {
      case "message":
        sockets.forEach((aSocket) =>
          aSocket.send(
            `${socket.nickname}: ${parsedMsg.payload.toString("utf8")}`
          )
        );
      case "nickname":
        socket["nickname"] = parsedMsg.payload;
    }
  });
});

server.listen(3000, handleListen);
