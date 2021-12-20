const socket = io();
// 브라우저에서 접근가능한 socket.io.js 파일에서 기본적으로 io함수를 제공한다.
// 알아서 열려 있는 socket 통로를 찾는 역할도 함
// sockets.push 에서 일일이 socket의 unique id를 넣어준 것에서, 연결된 socketId를 기본적으로 제공함
