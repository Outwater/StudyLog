# React Query 적용하기

### Why React Query ?

현재 미션에서 사용해야하는 Global State는 모두 Server에서 fetch받아와 사용하는 Server State가 전부이다.
Store의 역할 분리에 따른 필요성
Store = ServerState + ClientState 이 결합된 상태로 사용되고 있는데,
ServerState는 그 특징을 고려하여 React Query로 관리하고, 기존의 Client에서 전역 상태 관리로써의 기능은 Redux가 담당하게 하고자 함.

### Step

1. React Query로 Products 받아오기

- domain에 따라 useHooks로 분리하여 데이터fetching 관리하기 `useProducts, useOrders, useCarts`

2. 받아온 Products로 컴포넌트 렌더링 하기

- Page에 바로 useProducts로 받아온 data를 렌더링해주면 되나? (의문 -> roy님 사용패턴 확인하기)

3. 데이터 수정 액션에 따른 처리 해보기



### 이슈

Mutation 사용 시, mutation을 mutations에 모듈로 선언하고 가져왔을 때, invalid hook call 에러 발생

: 컴포넌트 내부에서 선언 시 오류 발생x

: hooks는 컴포넌트에서만 선언가능

: muation.ts에서 바로 선언,사용할 수 없으며, mutation.ts에서 useMuataion을 반환하는 callback함수를 만들고, 
callback함수를 컴포넌트 내에서 호출함으로, 컴포넌트 내부에서 hooks가 동작할 수 있도록 함.


: (+@) mutate : onAddCart 를 통해 mutate함수에 대한 alias 설정 가능.


: Typescript Generic 사용하는 것에 애먹음 mutator 타입 (https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD-%ED%83%80%EC%9E%85-%EB%B3%80%EC%88%98)