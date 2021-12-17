import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const io = SocketIO(httpServer); //

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const sockets = [];
// 브라우저에서 socket연결되면 여기서 컨트롤 할 수 있음
// socket은 연결된 브라우저의 정보를 가지고 있음
// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anoymnous"; // socket의 기본값을 설정해줌
//   console.log("Connected to Browser ✔️");
//   socket.on("close", () => console.log("Disconnected from the Browser 🆇"));
//   socket.on("message", (msg) => {
//     const parsedMsg = JSON.parse(msg);
//     switch (parsedMsg.type) {
//       case "message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(
//             `${socket.nickname}: ${parsedMsg.payload.toString("utf8")}`
//           )
//         );
//       case "nickname":
//         socket["nickname"] = parsedMsg.payload;
//     }
//   });
// });

httpServer.listen(3000, handleListen);
