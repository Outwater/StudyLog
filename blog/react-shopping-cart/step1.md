# Step1

## TodoList

- 환경세팅
  - [x] CRA 환경세팅 진행
  - [x] Typescript, eslint, prettier 적용
  - [x] 폴더구조 세팅
  - [ ] Redux , Redux toolkit 사용
- 기본적인 마크업 적용

  - [x] 페이지 나누어 렌더링
  - [x] 라우팅 처리

- React Query로 ServerState 처리

  - [ ] React Query 공식문서 읽어보기
  - [ ] 데이터 확인
  - [ ] 받아온 데이터로 리스트렌더링

- GNB
  - [ ]
- [ ] 상품목록 페이지
  - [ ] 반응형 media 적용하기
  - [ ] 페이징 적용 방법 알아보기

### 추가 구현

- [ ] 페이징 -> infinite scroll
- [ ] redux Saga -> react query
- [ ] Admin 페이지
  - 상품의 추가,삭제, hidden 속성 관리

## 컴포넌트 및 상태 설계

## 기본적인 마크업 적용

### React-Router

> 설치 [cra에서 router 사용 링크](https://dev-yakuza.posstree.com/ko/react/create-react-app/react-router/)

`npm install --save react-router-dom`
`npm install --save-dev @types/react-router-dom`

### 이슈1 - alias path 설정관련 오류

> 이슈

`What`

- 폴더구조가 커질 것을 대비하여 깔끔한 import경로를 위해 alias로 절대경로를 지정해주고 싶은데, 읽지 못하는 이슈 발생

`when`

- tsconfig에서 path를 지정해주면 '@alias'를 통해 절대 경로로 접근가능해야하는 데 불가능한 상황 발생

`Why`

- tsconfig 뿐만 아니라 webpack에서의 경로설정도 바꿔주어야 하나, CRA로 만든 프로젝트는 webpack 설정 변경을 위해 eject를 해주어야 하기 때문에 CRA 장점을 잃게 된다.

`How Fix`

- `Craco`(Create React App Configuration Overide)를 통해 CRA 옵션을 eject하지 않고 변경할 수 있다.

1. Craco 설치
2. `craco.config.js` craco 옵션 설정
   : tsconfig 사용 & tsConfigPath 경로 설정
3. `tsconfig.paths.json`에서 alias paths 경로 설정
   : `@/* : ["src/*"]`
4. `tsconfig.json`에서 extends 옵션에 tsconfig.paths.json 경로 설정
   : tsconfig -> tsconfig.path.json를 overide 하도록 <br>
   (react가 tsconfig의 path를 자동으로 삭제하도록 하기 때문에)

- Craco 설치
  : npm install @craco/craco
  : npm install --save-dev craco-alias

`추가 실패`

- 실패 원인 분석: vscode에서 해당 모듈 path를 찾지 못하는 오류
- 시도2.
  baseUrl과 path를 유심히 보며 작성한 결과, 이상 없이 작동하게 됨.

- vscode상에서 경로를 찾지 못하는 것은, vscode 재시작하면 정상작동하는 것 확인
  - 시도1. ( 영향없었음 )
    "javascript.preferences.importModuleSpecifier": "non-relative"
    https://stackoverflow.com/questions/56387849/how-to-set-alias-path-via-webpack-in-cra-create-react-app-and-craco?rq=1

## GNB

## 상품목록 페이지
