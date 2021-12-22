# SocketIO

### SocketIO vs WebSockets

- SocketIO란 [공식문서](https://socket.io/docs/v4/)
  - 정의
    - Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server
  - 역할
    - '실기간', '양방향통신', '이벤트 기반 연결'
  - 차이점
    framework using not only websocket(97%) but also others(firewell,proxy, HTTP long-polling)
  - 기능
    - 신뢰성 (websocket연결 잠깐 끊어졌을 때, HTTP long-polling으로 연결을 이어나간다)
    - automatic reconnection
    - Room
      - 모든 client 혹은 일부 만을 Room에 넣어 중개할 수 있다
    - Multiplexing(Namespaces) [링크](https://socket.io/docs/v4/namespaces/)
      - A Namespace is a communication channel that allows you to split the logic of your application over a single shared connection
      - route에 따른 독립적인 socket을 각각 생성하여, 다른 nameSpace를 가지도록 할 수 있다. (but 통신시 여러개가 아닌 하나의 파이프 사용)
    - packet buffering[링크](https://socket.io/docs/v4/client-offline-behavior/#buffered-events)
      - 연결이 끊길 때 모든 이벤트들이 버퍼되다가, 재연결 시 한 번에 실행되어 과부하를 일으킬 수 있는 부분을 해결할 수 있다.
      - By socket의 conneted 속성에 따른 분기처리
      - By using volatile events
    - acknowledgements
      - socket.emit()의 마지막 인자로 callback함수를 받아 사용할 수 있다.(!아직 어떨 떄 쓰이는지는 모르곘다.)
  - 요약,핵심
    - SocketIO 는 Front-Back의 실시간 연동을 위해 websocket을 주로 사용하는 하나의 프레임워크(라이브러리)라고 할 수 있다.
    - SocketIO 실시간기능에 대한 **신뢰성**을 보장한다. (대부분 카지노 사이트,도박사이트 이용)
    - SocketIO 는 webSoket과 거의 유사한 명령어들을 사용하고 있고, 신뢰성과 확장성을 보장한다.

## SocketIO 설치, 세팅

**Sever**

- SocketIO import 후 http서버에 socketIO 올리기
  - import SocketIO from 'socket.io'
  - const io = SocketIO(server);
- socketIO 서버 실행하면 (http://localhost:3000/socket.io/socket.io.js)의 내장된 기능을 활용하기 위한 js파일 접근가능
- 소켓 통로 확보
  - io.on("connection", (socket) => { console.log(socket) });

**Client**

- home.pug & app.js 초기화 후, home.pug에서 script(src="/socket.io/socket.io.js")로 socket.io.js 세팅
  - script(src="/socket.io/socket.io.js")
- 브라우저에서 접근가능한 socket.io.js 파일에서 기본적으로 제공하는 io함수로 socket 통로 확보
  - websocket과 다른 점
    - 알아서 열려 있는 socket 통로를 찾는 역할도 함
    - sockets.push 에서 일일이 socket의 unique id를 넣어준 것에서, 연결된 socketId를 기본적으로 제공함

## SocketIO 사용

room 기능 구현

- socket.emit을 통한 msg 전송

  - 첫번째 인자로 **Custom Event**의 이름 지정
  - 두번째 인자로 **객체**를 포함 모든 타입의 정보를 전달 가능
  - 세번째 인자로 **Callback함수**를 넘겨주어, server에서 해당 Callback함수를 실행하게 할 수 있음

- webSocket과 다른 점
  - 정해진 event(message)만 사용하는 것이 아니라 customEvent 생성하여 사용 가능한 점
  - socket으로 전달하는 정보의 type의 제한이 없다는 점 (기존 string만 가능하여 JSON.stringify & parse 작업거쳐야했음)
  - callback함수 전달 등으로 다양한 상황에서 사용 가능
    - server에서 호출한 함수가 client에서 실행된 다는 점이 매우 특이한 점
    - Fn정의(client) -> emit의 3번째 인자로 전달(c->s) -> Fn 호출(server) -> Fn 실행 (client)
    - client에서 정의한 함수를 server에서 제어 및 호출 가능

## Socket IO Room & Room Msg구현

socket 관련 API는 공식문서 참고
공식문서 [링크](https://socket.io/docs/v4/server-api/#socketrooms)

### 기본 메서드

- socket.id
  - 고유한 socket의 id 저장
- socket.join("room_name")
  - 특정 이름의 room으로 접속하기
- socket.rooms
  - 현재 연결된 socket의 room의 집합(Set)을 출력

### 메세지 notification & 보내기

**Sever**

- socket.to("others").emit(-)
  - 연결된 다른 모두에게 전송
- socket.to(["room1","room2"]).emit(-)
  - 지정된 room들에게만 전송 (ex. 채팅방 접속 알림)
- socket.to( ${socket.id}).emit(-)
  - 특정 개인에게만 메세지 보내기 가능
- socket.on("disconnecting", ()=>{}) // disconnecting 이벤트 사용
  - disconnect(완전히 끊어진 연결)
  - disconnecting(잠시 연결이 끊어졌을 때 - 접속은 끊어졌지만 방을 나가지는 않았을 때)

**Client**

- socket.on("event",(msg) => {})
  - 특정 이벤트를 받아, 화면상에 출력하도록 할 수 있음

### 닉네임 추가하기

- socket["nickname"] = 'payload.nickname'
  - client에서 보낸 nickname으로 지정할 수 있다.
  - socket.nickname으로 필요한 곳에서 사용
- (기타) 정말 많은 기능을 가지고 있기 때문에 document확인 할 것
  - io.socketsJoin("room1");
  - 접속 시 모든 소켓에 특정 room을 입장시킬 수 있다.(ex공지방)
