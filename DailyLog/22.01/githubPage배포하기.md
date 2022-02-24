### 발생이슈

- bundle.js를 찾지못함
  원인: webpack 설정 올바르지 못하여서 발생

  1. `webpack.config.js`의 output의 `publicPath:"/"` 에서 `publicPath:"./"`로 수정 <br />

     - 경로를 `github.io/bundle.js` 에서 `github.io/react-payment/bundle.js` 로 올바르게 찾게 됨

  2. `entry`: 최상단 js파일의 주소 <br>
     `output.path`: 번들링된 파일이 저장되기 위한 폴더명과 위치(ex.build) <br>
     plugins 중 `HtmlWebpackPlugin({template: --})` : 가장 처음의 정적페이지인 html파일의 주소

- router 관련처리

  1. BrowserRouter + basename 지정 && 404error 트릭으로 설정

  githubPage는 SPA을 지원하지 않기 때문에, 루트주소가 아닌 다른 주소로 들어왔을 경우 404페이지를 거쳐, 원하는 페이지로 이동하게 함.

  - `/add` -> `/404` 에서 add쿼리로 처리 -> `/`에서 쿼리처리된 URL을 받아 해석하여 history 변경하기 -> `/add`
  - 참고 [링크](https://iamsjy17.github.io/react/2018/11/04/githubpage-SPA.html)

  2. HashRouter 사용하여 처리

- 배포시

  - webpack.config.js의 `output.publickPath: "./"`로 수정
  - App.jsx의 BrowserRouter의 `basename="/react-payments"` 속성 추가

- 개발 시
  - webpack.config.js의 `output.publickPath: "/"`로 사용
  - App.jsx의 BrowserRouter의 `basename="/react-payments"` 속성 삭제
