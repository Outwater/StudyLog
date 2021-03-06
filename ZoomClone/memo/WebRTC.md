# WebRTC

### ToDo

- [x] 기본 UI 만들기
- [x] media요소 받아와서 해당 Stream을 UI에 출력
  ```js
  let Stream = await navigator.mediaDevices.getUserMedia(constraint);
  $div.srcObject = Stream;
  ```
- [x] 연결된 devices 중 cameras를 불러와 연결된 cameraList UI 출력<br>

  ```js
  await navigator.mediaDevices.enumerateDevices();
  ```

- [x] 카메라, 오디오 on/off 기능

  - Stream.getAudioTracks()로 받아와 track의 enabled 속성 T/F 관리

- [x] 카메라 변경 기능
  - 카메라 변경 시 연결된, 선택된 label의 id값을 getMedia()의 인자로 넘겨준다.
  - 최초실행 혹은 카메라변경인 경우를 구별하여 각각의 Constrain과 getCamera() 호출 여부를 결정한다.
  - 최초 실행 (deviceId 없을 때) initialConstrain + getCameras()호출하여 UI에 출력 <br>
    카메라 변경 시, constrain을 deviceId인 video만 가져오도록 한다.

## 사용자의 Media 접근 (audio & video)

### UI 설정 (by PUG)

- 구조 <br>
  video > button & button & select

- video 옵션
  - autoplay: 자동재성
  - playsinline: 비디오가 전첼화면에서 재생되는 것을 막음
  - width, height: 크기 지정

### MediaDevices 접근

[MDN링크](https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia)

- MediaDevices는 사용자의 미디어 자이의 권한을 요청하고, 연결된 카메라,비디오,녹화 등을 관리할 수 있는 Stream을 제공받는다.

- navigator.mediaDevices.getUserMedia(constraints)

  - constraints는 가져올 디바이스의 옵션들 설정 가능 ex) {autio:true, video:true}
  - (**중요**) 해당 메서드는 Promise를 반환하고, fullfill시 MediaStream 객체를 반환한다.
  - enumerateDevices()는 audio와 video 뿐만 아니라 모든 연결장치를 가져온다.

- Promise가 fullfill되어 반환된 MediaStream 객체는 연결된 audioTrack, videoTrack을 메소드로 가져올 수 있다.
  - MediaStream.getAudioTracks(), MediaStream.getVideoTracks(), audio id, media의 종류(kind), audio장치이름(label), 음소거여부 (muted), 작동여부(enabled)... 주어진다.

### 카메라 변경

- handleCameraChange()

  - navigator.mediaDevices.getUserMedia의 인자인 constraint를 조절하여 원하는 vidio를 선택하여 가져올 수 있다.
    전면카메라 : {video: {facingMode: "user"}} <br>
    후면카메라 : {video: {facingMode: "enviroment"}} <br>
    특정id의 카메라 : {video: {devicedId: "abc123"}}

- $cameraSelect.value인 cameraId값을 인자로 넘겨, 해당 id의 카메라만 가져오도록 한다.

**이때 발생하는 2가지 문제점**

- problem1.

  - 문제. 카메라 변경 시 마다 camers가 UI 추가 되는 것 (getCameras())
    - getCameras()가 실행되며, append함수가 계속 실행됨
  - sol1. 최초 실행 시에만 getCameras() 실행하도록 수정
    - getMedia에서 deviceId 인자의 유무로 최초 실행 구분

- problem2.
  - 문제. 최초 실행 시 UI에서 선택된 카메라와, 현재 보여주고 있는 카메라가 일치하지 않는다.
    - UI는 default, 실제 카메라는 faceTime
  - sol2. Stream.getVideoTracks();
    - 최초실행 시 호출되는 getCameras()함수 내에서, 모든 cameras를 순회하며 option들을 만들어 줄 때, 현재 Camera와 일치할 경우 `option.selected = true`로 변경
    - 현재 연결된 카메라 정보는 `myStream.getVideoTracks()`로 받아올 수 있다.

# WebRTC

## INTRO

- peer-to-peer 실시간 커뮤니케이션 서비스
  - <-> webSocket & Socket.IO은 peer간의 통신을 서버가 중개하는 서비스(not peer-to-peer)
  - 사용자간 연결되어, 영상과 오디오를 직접 주고받는 통신
  - 서버를 거칠 필요가 없기 때문에, 서버부하가 적다
- signaling 과정이 끝나면 peer-to-peer연결이된다. (브라우저-브라우저 연결)
  - 상대방의 주소를 알고 연결하기 위해서 서버를 사용 (Signaling단계)
  - ![alt Signaling](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d34ea727-3a06-45ba-9c49-a58b592aebdb/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220105T010404Z&X-Amz-Expires=86400&X-Amz-Signature=1a70f1c464c48354e7f8b434c68170c18293d04582cee70cda794c706a2c707c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

## Rooms

- videocall 처리를 위해서는 rooms이 필요
- UI 수정
  - room 입장하는 섹션과, videocall을 받는 부분
- 로직 수정

  - call화면과 getMedia()로 바로 불러오지 않고, room에 참가할 경우 call화면 보여주기

- 방 입장 로직 작성

  - socket연결을 통해 room 입장
  - 방 입장 시, call화면 보여주고, getMedia()실행

- 로직 모듈화
- Media를 다루는 부분과 Form을 다루는 부분으로 분리

- 다른 사용자가 입장했을 때 처리

## **Offers**

- ![alt Signalling with Server](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/52f05b41-1bb2-4a60-9a58-740831a764d4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220105T021942Z&X-Amz-Expires=86400&X-Amz-Signature=55dcc0dc6d569dd86f905d3bad90404dd2e3ae7cc791a72ac6d654f9910b360d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

### RTC Connection 단계

- Step 1

  - PeerA send offer
    - getUserMedia() : 영상과 카메라를 받아옴
    - addStream()
    - createOffer()
    - setLocalDescription()
  - Signalling Server
    - send Offer to PeerB

- Step 2
  - PeerB send answer
    - setRemoteDescription()
    - getUserMedia()
    - addStream()
    - createAnswer()
    - setLocalDescription
  - Signalling Server
    - send Answer to PeerA
  - Peer A
    - setRemoteDescription()
- Step 3
  - Peer A send candidate
    - "icecandidate" event fired
  - Signalling Server
    - send candidate to PeerB
  - PeerB send candidate
    - addICECandidate()
    - "icecandidate" event fired
  - PeerA - addICECcandidate()

### 코드 작성(TODO)

- addStream 받기 전 RTC 연결하기

  - 브라우저간의 RTC 연결 하기
    - 각각의 세팅이 이뤄지고, socket 서버로 연결한다.
  - startMedia 수정
    - 방에 입장시 startMedia 호출
    - getMedia 이후 makeConnection() 실행하도록 수정
  - makeConnection()
    - new RTCPeerConnection(); 으로 연결통로 만들고, 변수에 저장하여 사용

- addStream();
  - 카메라에서 오는 stream을 가져와 peer-to-peer 연결에 넣는 작업
  - stream : `myStream.getTracks();`
    - stream을 가져와 RTC연결에 추가해주도록 한다.
      - myPeerConnection.addTrack(track, myStream)
- createOffer()

  - 상대방이 연결되었음을 알리는 이벤트 행위(offer)
  - `const offer = await myPeerConnection.createOffer();`
  - RTCConnection 내장함수를 통해 sdp속성에 문자열로된 초대장을 만듦

- setLocalDescription

  - 생성된 offer를 인자로 LocalDescription을 만들어 RTC연결에 등록해준다.
  - myPeerConnection.setLocalDescription(offer)

- sendOffer

  - socket.emit("offer",offer, roomName);
  - 소켓연결을 통해 상대방의 room으로 offer를 전달한다.

- (Server)

  - "offer"이벤트를 감지하여, 해당 방으로 offer를 보내준다.
  - `socket.on("offer", (offer,roomName)=> { sockect.to(roomName).emit('offer',offer)})

- (Client)
  - PeerB는 "offer" 이벤트를 리슨하여, offer를 받는다.
  - \*중요 Offer를 주고 받을 때에는 server연결이 필요하다.

### Offer까지의 과정

- A <br/>
  방입장 > 서버에서 startMedia 호출 > getMedia > RTC 연결진행 > mediaTrack,Stream을 RTC통신에 등록
- B <br/>
  A있는 방 입장 > 위 과정 동일하게 진행 > 같은 방에 있는 A에게 'welcome'이벤트 전송
- A <br/>
  'welcome'리스너 > offer생성 후 RTC통신 등록 > 'offer'이벤트로 offer,roomName 전송
- Server<br/>
  'offer'리스너 > 해당 방의 다른 유저(B)에게 offer 전송
- B <br/>
  'offer'리스너 > A로 부터 생성된 offer를 받아 확인.

## Answers

- 지금까지 구현한 것 <br>
  `getUserMedia()`로 사용자 장치를 가져와서 `addStream()`을 통해 RTC연결망에 Stream을 등록한다. 이후 `createOffer()`로 연결을 위한 초대장을 만들고 `setLocalDescription()`으로 RTC연결망에 offer정보를 등록한다.
- 해야할 것 <br>
  전달된 'offer'를 가지고 PeerB에게 offer정보를 등록하는 것<br>
  <Step 2>
  - setRemoteDescription()
  - getUserMedia()
  - addStream()
  - createAnswer()
  - setLocalDescription

### setRemoteDescription

- peerB의 description을 세팅하는 작업

//TODO

- 'offer'리스너로 server에서 새로운 사람이 들어온 이벤트를 보내주었을 때 `RTC.setRemoteDescription(offer)`

- error 발생, RTC is undefinend
