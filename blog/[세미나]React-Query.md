# React Query와 상태관리

2월 우아한테크 세미나 by 배민근

[참고 기술블로그](​https://techblog.woowahan.com/6339/)

### FE 상태관리에 대해

면접에서 상태관리에 대해 물어본다면?

(me)우선 여러곳에서 사용하는 state를 관리하는 것. 전역상태-지역상태

(민근) `주어진시간`에 대해 시스템을 나타내는 것으로 언제든지 변경될 수 있음
`주어진 시간`: 언제든지 변경될 수 있음
응용프로그램에 저장된 데이터로 개발자 입장에서는 관리해야하는 데이터이다.

모던 웹프론트엔드 개발
UI/UX 중요성이 커지고, 프로덕트 규모가 많이 커지면서 FE 수행하는 역할이 늘어나고, 그에 따라 관리하는 상태가 많아졌다.
`즉 상태관리의 필요성이 늘어났다.`

요약-상태관리란?

- 상태를 관리하는 방법에 관한 것
- 상태들은 시간에 따라 변화함
- React에서는 단방향 바인딩으로 props drilling 이슈 등장
- Redux, Mobx, Recoil등의 라이브러리로 해결하고 있음

### 주문 FE 프로덕트를 보며 가진 고민

1.고민
: 배민앱의 수많은 부분이 웹뷰를 통해 만들고 있다.
: micro Architecture로 너무 나누어져있기 때문에 Repo를 합치며, 레거시도 해결하고 신기술도 도입하기로 함
: 그 중 상태관리에 대한 고민이 있었고, Store의 비대함에서 문제를 느낌
: Store는 전역 상태과 저장되고 관리되는 공간인데, 상태관리보다 API 통신 코드가 너무 비중이 커서 본질을 잃었다고 생각

: Store에서 API 통신을 위한 로직을 분리하고, 전역상태관리 기능만을 Store에 유지하고자 함.

2. 서버에서 받아야하는 상태들의 특성
   : C

3. Store의 State를 2가지로 분리
   Client State VS Server State
   `OwnerShip` 관리하는 주체가 누구인가에 따라 state를 나누고자 함

4. 선택
   `React-Query` : Server State를 React-Query에 맡겨서 해결하도록 함

### React Query란

- 특징
  - 패치 캐시 업데이트
  - 선언적
  - Hook과 사용법이 같아 친근하고 심플하다.
- 공식문서에서는

  - Server State를 '가져오고', '캐시', '동기화', '데이터 업데이트' 기능

- 세가지 Core 컨셉

  - Queries
    보통 GET으로 받아올 대부분의 API에서 사용
    CRUD 중 Read에 해당하며, 데이터를 가져올 때 사용
    `useQuery(queryKey, queryFunc())`

    - queryKey는 데이터를 구분하는 key로 string형태와 Array형태로 사용한다
    - queryFunc는 Promise를 반환하는 함수로 api호출 함수가 들어간다.
    - useQuery의 반환 값으로 {data, error, isFetching, status, refetch}의 유용한 인터페이스 제공 (reduxSaga에서는 전부 직접 구현)
    - 3번째 인자로, custum option을 지정할 수 있다.
      - onSucess, onError, onSettled: query fetching 성공/실패/완료 시 실행할 동작들을 정의
      - retry : query동작 실패 시 자동으로 retry할 것인지에 대한 옵션
      - select: 성공 시 가져온 data를 가공해서 전달
    - 실제 사용 시, Queries라는 파일로 분리하여 사용

  - Mutations
    - Option
      - onMutate: Mutation 동작 전에 먼저 동작하는 함수, Optimistic update 적용할 때 유용 <br>
        낙관적으로 성공할 것이라고 보고, API결과를 받아보기 전에 미리 UI를 업데이트 하는 것. 실패하면 rollback함
  - Query Invalidation
    - queryClient.invalidateQueries()로 사용
    - 업데이트 전의 stale(상한) 코드를 refetch 하는 역할

### 캐싱과 Synchronization

> 캐싱

- stale-while-revalidate
  : 백그라운드에서 stale response를 revalidate를 하는 동안 캐시가 가진 stale response를 반환
  : ex.) 새 물건이 올 때 까지 옛날 물건을 보여준다.
  - cacheTime: 메모리에 있는 시간(해당 시간 이후에는 GC에 의해 처리,default 5분)
  - staleTime: 얼마의 시간이 흐른 후에 데이터를 stale 취급할 것인지 (default 0)
  - 탭을 이동하거나 탭의 포커스가 새로 될 떄에도 staleTime이 지난 쿼리들은 revalidate하여 업데이트 한다.
- Query 상태흐름
  [image](https://github.com/Outwater/StudyLog/blob/main/blog/%5B%EC%84%B8%EB%AF%B8%EB%82%98%5DReact%20Query-Query%EC%83%81%ED%83%9C%ED%9D%90%EB%A6%84.png)

- QueryClient 내부적으로 Context를 사용하고 있기때문에, 동일한 코드의 쿼리가 서로다른 컴포넌트에서도 사용 사능

### React Query 도입 이후 변화

- Store
  Client State만 남아

- 장점

  - 서버상태관리 용이 (직관적인 API 호출코드)
  - API 처리에 관한 각종 인터페이스, 옵션 제공
  - Client Store가 FE에서 반드시 필요한 전역상태만 남아 Store 답게 사용
  - Cache 전략에 효과적
  - devtools제공으로 디버깅용이

- 고민이 필요한 점

  - 컴포넌트가 상대적으로 비대해지는 문제 (Component 설계/분리에 대한 고민 필요)
  - 좀 더 난이도가 높아진 프로젝트 (Component들간의 유착 최소화 방법)

- 앞으로

  - 1년전보다 4배 많은 npm 다운로드 수
  - 중요한 건 트랜드가 아닌 why! 이게 왜 필요한가

- 추천
  - 수 많은 전역상태와 API 통신이 엮어 있어 Store가 비대해졌을 때
  - FE에서 데이터 Caching 전략에 대해 고민하시는 분
  - API 통신 관련 코드를 간단하게 구현하고 싶은 분

### 질문

1. A-B-C 라는 순차적인 데이터 요청이 필요할 때 어떻게 사용해야하나?

: 2번, 3번함수에서 enabled option을 false로 주는 방법

2.  받아온 server state를 통해 새로운 액션을 생생해야 하는 경우 어떻게 하나?
    : option의 onSuccess 옵션을 통해서, state를 받아온 직후 새로운 액션을 생성해준다.
