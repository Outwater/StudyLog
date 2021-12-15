HTTP VS WebSocket

### HTTP

**Stateless 특징**
효율적인 통신을 위해 한 번의 통신이 끝나면 연결이 종료된다.

- 1. 서버가 client가 누군지 알 수 없다.
- 2. 서버는 request를 받을 때에만 응답할 수 있다.

### WebSocket

http가 아닌 WSS 프로토콜 주소 사용
핸드쉐이크 과정을 통해 client와 server가 **연결**된다.

- 연결되므로, 서버는 client가 누군지 알 수 있고,
- 서버가 client에게 먼저 데이터를 보낼 수 있다.

**연결 중**에만 가능하며 **실시간 통신**에 장점

- 브라우저에 내장된 webSocketAPI를 이용
- 브라우저-backend 뿐 아니라 backend-backend 등 다양한 상황에서 연결 가능
- HTTP와 가장 큰 차이는 stateless 여부

### WebSocket Events

**Server**

- [x] Backend websocket server만들기

  - `ws라이브러리를 사용하여 WebSocket 서버 만들고, http서버 위에 올려서 같은 포트에서 두개의 프로토콜 사용하기`

- [x] connection event 통해서, 브라우저와의 socket연결하기

  - `wss.on("connection", (socket)=> {})`

- [x] socket의 이벤트리스너 등록하기

  - `'close' -> 브라우저가 종료되었을 때 콜백함수`
  - `'message' -> 브라우저로부터 메세지를 받았을 때 콜백함수`
  - `socket.on("close",cb) , socket.on("message",cb), sockect.send("---")`

**Browser(Client)**

- 서버 주소를 등록해주어 소켓통로 저장하기
  - new WebSocket(`ws://${window.location.host}`);
  - window.location.host를 통해 해당 브라우저의 연결 된 서버의 주소를 알 수 있다.
- addEventListener를 통해 연결 시, 종료 시, 메세지 받을 때 콜백함수
  - socket.addEventListner("open",cb), socket.addEventListner("message",cb), socket.addEventListner("close",cb)
- socket.send로 메세지 보내기
  - socket.send('메세지 here')

### WebSocket Chat 구현과정

**step1.**

- (client) 입력 받은 message를 socket으로 send하는 이벤트함수 구현
  **step2.**
- (client) socket으로 메세지 보내기
  **step3.**
- (server) server에서 받은 메세지 그대로 다시 브라우저(다른 모든 소켓)로 보내주기

- server와 client의 독립적인 연결이 아닌 client1 -> server -> client2 삼자간 연결하고 싶음
  fakeDatabase 만들기
- sockets = [];
- 연결된 소켓들 담은 후 server에서 메세지 받으면 연결된 소켓 모두에게 메세지 보내준다

**step4.**

- (client) message를 받으면, 이벤트 캐치해서 ul 아래 li 엘리먼트 만들어 넣어주어 화면 출력

**step5.**

- (client) 누가 보냈는지 알 수 있게 닉네임 등록 기능 추가
- 백엔드에서 오는 메세지들을 구분할 수 있어야 함 (닉네임등록인지, 메세지전송인지)
  - {type: '', payload: ''} 형식을 JSON stringify해서 server로 보내기

**step6.**

- (server)받은 메세지를 JSON.parse 하여 type별로 사용하기
- 각각의 sockect들을 구별할 수 있도록 socket.nickname 프로퍼티 생성 (기본값: Anomynous)
  - type이 nickname일 경우, socket.nickname을 변경해주고,
  - type이 message일 경우, socket.nickname과 함께 message의 payload값을 같이 보내준다.

**Step7.**

- 개선하기
- (client) JSON message 전송!
- (server) message parse하여, type별로 나눈 뒤 연결된 모든 소켓에 send
- (client) message 받아서 li 엘리먼트 추가

  즉 내가 보낸 메세지를 보내는 순간 화면에 그려지는 것이 아니라, 서버로 갔다가 받아온 msg를 화면에 출력하고 있다. (불필요한 과정)
  메세지를 보내는 순간에 화면에 기록하고, 서버에서는 "나를 제외한 메세지들만"을 보내주는게 타당하다.

2. client와 server 모두에서 data를 보낼 떄 JSON.stringify로 보내고, JSON.parse해서 사용하도록 하기
   Backend에서도 상황에 따른 다양한 type의 message를 보낼 수 있고, 이를 위해 front에서도 단순 string이 아닌 객체를 받을 수 있도록 JSON 데이터를 서로 교환하도록해야함
