# 7장 가위바위보 게임 만들기

### 이미지 스프라이트 기법

- 이미지 스프라이트란
  - 서버에 이미지 요청하는 횟수를 줄이기 위한 기법으로, 여러장의 이미지를 합쳐서 하나의 이미지로 표현하는 방식
  - 가위바위보 3장이 연달아 있는 1장의 사진을 받아, CSS의 속성을 조절하여 필요한 부분을 잘라서 사용한다.
  - CSS의 background 속성 `url(이미지주소) x좌표 y좌표`
  - `url(--) -220px 0` 일 경우 해당 이미지를 x좌표로 -220px 이동시킨다고 생각하면 된다. (220px 부분부터 출력됨)
  - 항상 backgroundSize 속성과 함께 사용해야지 이미지가 출력될 수 있다.
    - backgroundSize = "auto 200px"
    - 가로는 자동이므로 세로가 200px될 때까지 가로세로 비율을 유지하면서 이미지를 줄여나간다

### 가위바위보 그림 빠르게 바꾸기

- setInterval 함수를 통해서, 특정 동작을 계속해서 반복할 수 있다.
  - setInterval(changeRSP,50)
  - 50밀리초 마다 changeRSP 함수를 계속 실행하도록 한다.

### 그림 잠시 멈추고 실행하기

- clearInterval을 하더라도, setTiomeout은 버튼을 클릭할 때 마다 동작하기 때문에, 버튼을 누른 횟수만큼 setInterval이 실행되어 매우빠른속도로 그림이 바꾸는 버그가 발생하게 된다.

- 해결방법

  - clearInterval이 진행되어, 다음 interval이 실행되기 전까지 함수의 실행을 막는다.
  - 1. removeEventListener로 잠시 제거 후 다시 등록하기
  - 2. clickable 변수를 통해, false일 때, 해당 함수 그냥 return 하기

- Tip
  - if(diff === 1 || diff === 2 ...) 처럼 '||' 으로 연결된 식이 많다면 includes를 활용하여 깔끔하게 사용할 수 있다.
  - [1,2].includes(diff)
