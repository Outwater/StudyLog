# 반응속도 측정기

### 순서도

### 수정사항

    1. style 태그 사용하기
    2. background Color 가져오기 보다는 class에 추가하고, class포함여부로 화면 판단하기
    3. 평균속도 구하는 것 추가하기

### style 태그 사용

- 기존
  - $screen.style.background와 e.target.style.background를 통해 화면 및 guide 업그레이드
- 수정 후

  - 각 화면의 class를 지정하여, class를 기준으로 배경색과 guide 메세지를 수정한다.

- CSS > user-select: none;
  - 해당 요소와 하위 요소의 텍스트를 선택하지 못하도록 막는 속성
