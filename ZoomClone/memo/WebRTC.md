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
