# React-Payment 페어리뷰

## [PR 링크](https://github.com/nextlevel-2022/react-payments/pull/9)

> ## 우병님이 요청한 리뷰 주안점

환경, 인프라

- 폴더 구조(page, component, share component)
- type과 interface중 일단은 interface로 전부 통일했는데 뭐가 어떤 상황에 쓰이는게 적절한지 알아야겠다.
- 프로젝트내에서 css-in-js만 쓰든지 css만 쓰든지 통일하는게 좋은건지??(경우에 따라 다른것 같은데 정확한 기준이 혹시 있을지)

가독성

- 한 페이지에서 보여주는 추상화 레벨을 동일하게 하자(읽는이에게 편하게 하기 위해?)

기능

- form elements 이동들 vs ref로 일일히 지정
- setter를 일일히 넘겨주는것이 반복되고 있는데 이걸 context provider를 이용하면 좋은건가?? 일일히 입력해주지 않아도 되서?? context provider를 적용하면 나중에 접했을 때 모를수도 있지 않을까? ==> 이래서 redux, recoil이 나온건가??
- cardNewPage에서 컴포넌트를 생성하는것을 굉장히 고민했는데 컴포넌트 자체의 생성 기준이 뭘지 찾아봐야겠다.
- cardNumberInput 로직에 대한 개선

> ## 리뷰

### 기능이슈

- 잘못된 값이라도 일단 채우면 다음 페이지로 이동되는 부분

### 좋았던 점

- 타입스크립트 사용하니, 정말 코드를 보기 편하다.
- New Page에서 가독성이 굉장히 좋다고 생각
  - CardForm.title, CardForm.button 으로 추상화수준을 맞추어 준 부분
  - 각 Input들이 추상화되어 있지만, 같은 위계를 지닌다는 것을 바로 알 수 있다는 점
- Utils, Validation 등 관심사 분리가 정말 잘 되있다고 생각이 들었습니다. 결과적으로 가독성과 유연성 모두 확보된 것 같아요!
- _focusOnNextRequiredInput에서 focus처리를 이렇게 해줄 수 있군요! 놀라웠습니다~~_
  - target.form을 통해 form의 elements에 접근하고, call을 통해서 배열메소드 사용하는 부분도 정말 인상적이었습니다.

### 개선하면 좋을 점

- Card의 props중 type의 범위가 조금 넓어보이는데(string), `type: 'new' | null` 로 명시하는 방법은 어떠하신지 궁금합니다ㅎ
- _cardNumberHandler, `isStringInputed ~ target.value_ = _target.value.replace_(/[^*0-9*]/g,'')`;
  - string이 입력되면 에러를 띄우고, replace 부분에서 string으로 입력된 값을 ‘’ 로 바꿔주시는 걸 의도한 걸까요? (

### 궁금

- form의 value 값을 React의 상태로 관리하면 제어컴포넌트, 아니라면 비제어컴포넌트라고 생각하는데,
  우병님의 경우는 비제어컴포넌트방식으로 설계하고 구현하신게 맞을까요? - string일 경우 return 으로 걸러져서 , target.value.replace가 의도된 대로 실행되는 경우가 언제인지 궁금합니다.
- _getCurrentCardNumberOnInputIndex 에서 useCallback 사용하신 이유가 있으실까요?_
  - cardNumber가 바뀔 때 마다 실행되어서 memoization의 효과는 없을 거라고 생각해서요..
- _isNeedCompanySelect 에서 `event.preventDefault_();` 를 사용하신 이유가 있으실까요?
  - form내부에서 button등에서 제출동작을 막기위해 사용한다고 알고 있는데, keypress 이벤트에 사용해주신 이유가 있을까요?
- scss 사용하신 이유가 있을까요? (중첩이나 mixin 사용 등의 이점이 있는 것으로 알고 있는데)

- ::before 속성으로 툴팁처리를 할 수 있군요. 배워갑니당~
  - 혹시 css어떤 속성이 이렇게 삼각형 모양이 나올 수 있도록 하는 걸까요? (border-width)
