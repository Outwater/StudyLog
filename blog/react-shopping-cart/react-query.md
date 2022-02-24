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

-
