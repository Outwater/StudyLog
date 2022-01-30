# ReactPayments 스터디

- [nextlevel-2022 스터디 Git 레포 링크](https://github.com/nextlevel-2022/react-payments)

## 개요

### 하고 나서 배우게 될 것

- 제어컴포넌트와 비제어컴포넌트의 차이를 이해한다.
- 스토리북을 통해 UI 상호작용을 테스트할 수 있다.
- Webpack, Babel을 통해 프로젝트 환경세팅을 할 수 있다.
- 리액트 프로젝트의 디자인패턴을 고려하여, 구조를 작성할 수 있다.
  - 디렉터리 구조
  - 컴포넌트 패턴

### 작업순서

- [ ] eslint, prettier 적용하기
- [x] 라우터로 페이지 이동(react-router-dom)
  - [x] Add, Alias, List 간 페이지 이동
- [ ] Add 페이지
  - [ ] Card 컴포넌트
  - [ ] CadrForm 컴포넌트
  - [ ] Modal 컴포넌트
- [ ] Alias 페이지
- [ ] List 페이지

## 기능구현

### 라우터로 페이지 이동

1. 설치

```
npm install react-router-dom@6
```

2. index.js에서 `<BrowserRouter>, <Routes>, <Route>` 적용

- path와 element를 알맞게 연결

3. 페이지 이동 시 `<Link>`

```js
  <Link to='/add' style={{textDecoration:'none'}}>
```

> [이슈1](#1.Router->-path변경-시-렌더링-안되고-서버요청하는-이슈)

### CARD 컴포넌트 (in Add페이지)

> 카드컴포넌트 상태 설계

- number: Array(str) `[[1111],[2222],[3333],[4444]]`
- expires: Array(str) `[[12],[23]]`
- ownerName: String `Outwater`
- securityCVC: String `123`
- passwword : Array(str) `[[1],[2],[3],[4]]`
- cardName : String `국민은행`

> 데이터 타입정의에 대한 고민

- 저장단위
  1. 카드번호는 16자리, 만료일 MM/YY, CVC, 비밀번호 한 번에 저장?
  2. 4자리씩, MM/YY 따로, CVC 자리수 따로, 비밀번호 각 자리 따로?
     근거: 입력 폼에서 받는 단위를 기준으로 저장하는 것이 옳다고 생각
     선택: 카드번호 4자리씩, 만료일 MM/YY 따로, CVC는 한번에, 비밀번호는 따로
- 데이터 타입
  근거: 폼 단위로 따로 저장할 것이기 때문에, 이를 반영하기 위해 배열 선택
  선택: 배열

### 제어컴포넌트와 비제어컴포넌트

Controlled Form

-> React의 state와 Form의 input value를 일치시키는 것을 말합니다.

unControlled Form

### input 컴포넌트 및 form관리

> input 컴포넌트 어떻게 모듈화할 것인가!

- 제어컴포넌트로 react의 state를 통해 input을 컨트롤한다.

> 어려웠던 점, 고민사항

- input컴포넌트의 props value(state값),type, placeholder, onChange, data-itentifier등 모든 속성을 받아오니, 일반적인 input을 따로 사용하는 것과 차이가 없다고 느꼈다.
- 또 ref처리를 위해 각 Input에 ref를 주어야하는지 어려움을 겪어, nextStep 선배들 코드에서 힌트를 얻고자 함.

> nextStep 코드 살펴보기

궁금한 점

- Input의 구조설계(props, 공통화수준) 어떠한지
- onChnage 이벤트핸들러 모듈화 여부
- useRef를 동적으로 사용하는 방법
- validation에서 오류 발생 시, error처리

> > case1. 비제어컴포넌트 by 재남님.

- **비제어컴포넌트 방식으로 폼 데이터 관리**하는 것이 가장 큰 특징
- 각각의 Input을 배열로 관리하여, InputArray[n] 으로 접근하여, inputRef, 현재 e.target이 되고 있는 input등을 추적관리 할 수 있다는 점이 인상적이었다.

- input의 data 관리에 대한 설계가 정말 당연하면서 탄탄하다고 느꼈다.
  - 카드상태를 상위에서 number,expire, cvc, cardName, alias 를 각각 하나의 string으로 받아 저장하는데, 세부구분이 필요한 cardForm 내에서는 배열의 형태로 각 input에 대한 dataType을 Map()으로 각 데이터를 저장하고, validation 이후 저장할 때에만 dataType을 string으로 각각 변환하여 저장하는 방식.
- 추가로 cvc, password 등 사용자 개인정보관련된 input은 따로두어 상태를 저장하지 않도록 하는 점도 배워야겠다고 생각했다.
- input의 pattern 속성을 통해 정규식으로 타입을 제한할 수 있다.

> > case2. 제어컴포넌트 by [용민님](https://github.com/next-step/react-payments/pull/14)

- state 객체로 폼상태를 관리하고 있다.
  - input의 onChange는 key, position을 주어 state를 업데이트만 하는 역할
  - setState시 validation Check
  - type, placholder

> > 수정할 사항

- cardData를 하나의 객체 상태로 관리하도록 함
- onChange는 하나의 핸들러로 관리함
- validation check는 input의 props로

- focus 이동은 아직 방향 못잡음..
  - 리뷰시 질문등록
  - ref, setFormdata, validation 부분이 정적으로 되어있는데, 동적으로 모듈화 시킬 수 있는 방법에 대한 고민..
  - validation check, change value, focus 이동이 하나의 함수안에 같이 있는 것 옳은가?

## step1 느낀 점

- dataType 설계에 대한 고민
- key,value 값으로 저장하는 것이, 상태 저장 및 사용에 편리할 것이라고 생각하여 input을 key로 1번, position으로 1번 더 객체화하여 저장하였다.
- 어떤 값은 2중 객체이고, 어떤 값은 아니기 때문에, setter함수도 공통적으로 사용하기 어려웠으며, error처리와 ref를 주는 것에 있어서도 모듈화하여 동적으로 처리하기가 굉장히 어려웠다.
- 재남님 코드를 보며, 해결방법에 대한 힌트를 발견하였는데(최종상태는 string, form에서는 Map()으로 상태 관리), step1이후 여유시간에 리팩토링해보면 좋겠다고 생각하였다.

## step1 리뷰 사항

- 코드 작성하기 전 어느정도 구조 설계를 하시는 지 궁금합니다.

  - 저의 경우, page별로 먼저 나누어 생각하고, 컴포넌트 단위를 먼저 생각해본 뒤(Card, CardForm), 컴포넌트에서 필요한 상태는 무엇이 있을까 정도를 생각하고 작성했습니다.

- (어려웠던 점) 전체적으로 코드가 정해진 기능구현에 초점이 맞추어져있어 유연하지 못하다는 생각이 제가 작성을 하는 내내 들었습니다. cardData의 상태를 객체형식으로 지정하고, 각 객체의 중첩정도가 다르다보니, 이 cardData를 동적(?)으로 모듈화하여 사용하기 어렵지 않았나 생각합니다..

  - 모든 input 마다 각각의 onChange핸들러가 존재하고, 또 각각의 onChange핸들러는 validation 체크, 상태변경(setState), focus이동등 많은 역할을 담당하고 있다.(우겨 넣은 느낌..)
  - focus이동하는 코드나 error를 띄우는 코드를 모듈화할 수 있지 않을까? 생각이 드는데, 아직은 어떻게 해야할 지 감이 오지않아 부족함을 느꼈습니다..

- (리뷰) validation관련 로직이 퍼져있는데, 1) 길이는 input 태그가 가지고 있는 속성으로, 2) onChange시 dataType에 대한 검증 (number인지) 3) 다음 페이지 이동 시, 빈 값이 있는지 검증, 효율적인 validation 방안이 있을지 궁금합니다..

## 이슈 모음

### 1.Router > path변경 시 렌더링 안되고 서버요청하는 이슈

`문제`

- SPA에서 path로 주소변경 시 페이지 이동이 아닌 resourse요청하는 오류 발생

`해결`

- webpack 설정 중 `output.publicPath: '/'`,``devServer.historyApiFallback:true`로 변경해주어 해결
- SPA에서 historyAPI / React-Router 사용시 설정해주어야 하는 부분

### 2 Style 적용 > clobal CSS적용안되는 이슈

`문제`

- css파일을 전역에 적용하려고 하는데, 적용되지 않았다.

```js
Refused to apply style from 'http://localhost:3000/src/styles/index.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
```

`해결시도`

- 경로가 루트폴더가 아닌 localhost를 찍고 있어, 웹팩 설정 중 path부분 설정을 잘못한 것으로 판단하고, 해당부분 찾아보려고 함

`해결`

- 서칭결과 entry에 해당하는 index.js에서 css파일을 import해주지 않아서 적용되지 않는 이슈였음
- 웹팩 빌드 시 entry.js에서 css파일 변환하고 번들링하여 빌드하는 것..!

```
// at index.js
import '../styles/index.css'
```

### 3.(Bug) 카드번호 재입력 시 모달창 뜨지 않음

`Bug`
카드번호 입력 후, 카드번호 수정할 때 모달 창이 뜨지 않는 버그 발견

`원인`
현재 모달창 뜨는 조건은, **입력된 번호로 저장된 card사를 찾지못하고 && 현재 저장된 카드사가 없을 때** 이다.

한 번 모달창에서 카드사를 선택하면, 선택된 카드사를 없앨 수 없기 때문에 모달이 다시 뜰 수 없다.

### 4. githubPage 관련 오류

## 참고 링크 모음

- [라이브러리 없이 router 구현하기](https://woomin.netlify.app/Posts/2021-02-26-react-router/)
- [제어컴포넌트, 비제어컴포넌트의 차이점](https://velog.io/@yukyung/React-%EC%A0%9C%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80-%EB%B9%84%EC%A0%9C%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90-%ED%86%BA%EC%95%84%EB%B3%B4%EA%B8%B0)

## 강의

### 1주차 세션

핵심

- 제어컴포넌트, 비제어컴포넌트 생각하며 작성했는가
- 스토리북을 통한 상호작용 검증을 시도했는가
  - 왜 스토리북이 나왔고, 어떤 역할을 할 수 있는지
    : 디자인토큰과 같다. 개발자와 디자이너간의 약속이라고도 할 수 있고, 코드를 몰라도 테스트해볼 수 있다는 점
- 컴포넌트를 분리하는 자신만의 기준을 정하고, 지키려고 노력하기
  (기준이 너무 다양하고, 사람마다 다르기 때문에)
  - 컴포넌트는 계속해서 변화할 수 밖에 없다.

form validation

- react-hooks-form 현업에서도 많이쓰고 좋다.
- 단 hooks 사용해야하기 때문에, class컴포넌트 사용하고 있는 프로젝트는 사용하기 어렵다.

### 2주차 세션

- web환경 공유하는 방법
  `github.com/~~ `을 `github.dev/~~` 로 바꾸어준다.
