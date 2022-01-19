# CRA 없이 리액트 환경 구축해보기

## 개요

### 목적

- CRA는 Webpack, Babel등의 설정을 미리 세팅해준다는 것을 알고 있었지만, 실제로 어떻게 환경을 구축해나가는 지 알지 못했다.<br>
  webpackr과 Babel을 통한 환경 구성은 실무에서도 반드시 이루어지는 과정이기에 간단한 세팅을 직접 진행해보고자 한다.

### 하고 나면

- [ ] Webpack과 Babel이 무엇인지 정확히 알 수 있다
- [ ] CRA가 어떤 역할을 하는지 구체적으로 알 수 있다.
- [ ] 개발 환경의 변경,추가에 적용해볼 수 있다.

### 진행 순서

- Babel-컴파일러 이란?
- Webpack-번들러란?
- 환경 구축해보기
  - Babel설정
  - Webpack 설정
  - React 라이브러리 세팅
- 추가 번들러 설치하기
  - sass Or Typescript

## 바벨과 웹팩

### 바벨

React에서는 ES5/ES6 + JSX를 사용하게 된다. 따라서 이를 지원하지 않는 브라우저를 위해서는 반드시 `ES6 -> ES6`, `JSX -> JS` 로 변환해주어 **브라우저 호환성**을 높일 수 있어야한다.

> #### 바벨이란

바벨은 컴파일러의 종류 중 한 가지로, 컴파일러는 코드가 실행되기 이전 코드를 읽어, 다른 코드로 변환하는 작업을 의미한다.<br>

- 컴파일은 일반적으로 소스코드를 바이트코드로 변환하는 작업을 의미하므로, 바벨은 컴파일보다는 트랜스파일링(TransPiling)이 더 적합하다. <br><br>
  바벨은 `크로스 브라우징(Cross Browsing)`을 해결하기 위해 생겨났는데, 최신 브라우저에서만 동작하는 기능을 그렇지 않은 브라우저에서 구현해야하는 경우, 최신버전의 언어로 작성된 파일등이 정상적으로 동작할 수 있도록 한다.

> #### 바벨의 진행과정

바벨은 3단계로 빌드를 진행한다.<br>

1.`파싱(Parsing)` <br>
파싱 단계에서는 **코드를 읽고, 추상 구문 트리(AST)로 변환**한다.

2. `변환(Transforming)`<br>
   변환 단계에서는 **추상 구문 트리를 변경**한다.

3. `출력(Printing)`<br>
   출력 단계에서는 **변경된 결과물을 출력**한다.

> #### 플러그인과 프리셋

이 중 바벨은 파싱과 출력단계를 담당하고, 변환은 `플러그인(Plugin)`을 통해 진행한다. 플러그인은 **바벨이 어떤 코드를 어떻게 변환할지에 대한 규칙**을 나타내며, 직접 만들어 사용하는 커스텀 플러그인, 만들어진 플러그인을 설치하여 사용한다.<br>
es6의 const,let을 var로 바꾸고, 화살표함수를 일반함수로, 엄격모드를 적용하는 바벨 플러그인 설정은 다음과 같다.

```js
module.exports = {
  plugins: [
    "@babel/plugin-transform-block-scoping",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-strict-mode",
  ],
};
```

플러그인을 매번 설정하는 것은 번거로운 일이기 때문에, 필요한 플러그인을 목적에 따라 세트로 묶어놓는 경우가 많다. 이를 `프리셋(preset)`이라고 한다. <br>
es6+를 es5로 변환해주는 대표적은 프리셋인 preset-env패키지

```js
module.exports = {
  presets: ["@babel/preset-env"],
};
```

> #### 폴리필

`폴리필(polyfill)`은 최신버젼은 ECMAScript환경을 만들기 위해 필요한 코드가 실행하는 환경에 존재하지 않은 경우, **존재하지 않는 빌트인,메소드등을 추가하는 역할**을 한다. <br>
예를 들어, ES6에서 비동기처리를 위해 등장한 Promise객체는 직접 ES5로 변환할 수 없고, ie에서는 이를 인식할 수 없다. 따라서 직접 변환하는 것이 아니라 ES5만은 방식으로 Promise를 구현하여 이를 대체하는 과정이 필요하다.<br>
폴리필은 컴파일단계가 아닌 런타임(브라우저에서 실행되는 시점)단계에서 필요한 기능을 변환하여 사용한다. 적용하기 위해서는 `@babel/preset-env`는 옵션지정을 통해 필요한 폴리필등을 core-js에서 자동으로 import해오는 방식을 사용할 수 있다. <br>

```js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", // 폴리필 사용 방식 지정
        corejs: {
          // 폴리필 버전 지정
          version: 2,
        },
      },
    ],
  ],
};
```

빌드 과정에서의 변환된 코드(core js에서 import하여 사용)

```js
// 폴리필을 추가하여 빌드
npx babel app.js

// (before) app.js
new Promise();

// (after) app.js
"use strict";

require("core-js/modules/es6.promise");
require("core-js/modules/es6.object.to-string");

new Promise();
```

> #### 바벨로더

실무에서는 바벨을 직접적으로 사용하는 경우보다, 웹팩에 포함하여 통합해서 사용하는 경우가 많다. 이 때 바벨관련 처리를 담당하도록 하는 로더를 `바벨로더(babel-loader)`라고 한다. <br>
모든 js파일을 바벨로 처리할 수 있도록하면, 라이브러리 설치의 증가에 따라 빌드속도가 저하되기 때문에, node_modules는 일반적으로 제외하여 사용한다.<br>

- webpack 설정 시의 바벨로더 처리 부분

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader", // 바벨 로더를 추가한다
      },
    ],
  },
};
```

> #### 정리

바벨은 일관적인 방식으로 코딩하면서, 다양한 브라우져에서 돌아가는 어플리케이션을 만들기 위한 도구다.

바벨의 코어는 파싱과 출력만 담당하고 변환 작업은 플러그인이 처리한다.

여러 개의 플러그인들을 모아놓은 세트를 프리셋이라고 하는데 ECMAScript+ 환경은 env 프리셋을 사용한다.

바벨이 변환하지 못하는 코드는 폴리필이라 부르는 코드조각을 불러와 결과물에 로딩해서 해결한다.

babel-loader로 웹팩과 함께 사용하면 훨씬 단순하고 자동화된 프론트엔드 개발환경을 갖출 수 있다.

### 웹팩

> #### 정리

ECMAScript2015 이전에는 모듈을 만들기 위해 즉시실행함수와 네임스페이스 패턴을 사용했다. 이후 각 커뮤니티에서 모듈 시스템 스펙이 나왔고 웹팩은 ECMAScript2015 모듈시스템을 쉽게 사용하도록 돕는 역할을 한다.

엔트리포인트를 시작으로 연결되어 었는 모든 모듈을 하나로 합쳐서 결과물을 만드는 것이 웹팩의 역할이다. 자바스크립트 모듈 뿐만 아니라 스타일시트, 이미지 파일까지도 모듈로 제공해 주기 때문에 일관적으로 개발할 수 있다.

웹팩의 로더와 플러그인의 원리에 대해 살펴보았고 자주 사용하는 것들의 기본적인 사용법에 대해 익혔다.

## 개발환경 구성

> #### 패키지 매니저 세팅 (npm)

```
  npm init -y
```

프로젝트를 가장 기본값으로 시작하는 명령어(-y: "yes")

```
mkdir src public dist
cd src
touch index.js
```

- src: 리액트 작업할 폴더
- public: 정적파일들을 보관할 폴더 (ex.HTML, image,)
- dist: 번들링 결과물이 위치할 폴더
- index.js: entry포인트 지정

> #### 바벨 설치

```
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
```

- `@babel/core`: 바벨의 코어
- `@babel/preset-env`: 'ES6+ -> ES5' 로 트랜스파일링, 폴리필 설정해주는 프리셋
- `@babel/preset-react`: 'JSX -> JS' 로 트랜스파일링 해주는 프리셋
  <br>

```
// .babelrc
{
  "presets": ["@babel/env", "@babel/preset-react"]
}
```

- 바벨에서 설치한 라이브러리(프리셋)을 사용한다고 설정(`.babelrc`)

> #### 웹팩 설치

웹팩 코어 & 웹팩 로더 설치

```
npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader file-loader
```

- `webpack`: 웹팩 코어
- `webpack-cli`: 웹팩을 cli에서 사용
- `webpack-dev-server`: 실시간 개발 서버 환경 구동
- `css-loader`: css파일을 js에서 모듈처럼 사용할 수 있도록 변환
- `style-loader`: css-loader로 js화된 스타일을 돔(DOM)에 적용할 수 있도록 함
- `babel-loader`: 웹팩에서 babel을 자동으로 적용하도록 함
- `file-loader`: 이미지, 폰트 등의 파일을 사용할 수 있도록 함 <br><br>

플러그인 설치

```
npm install html-webpack-plugin clean-webpack-plugin
```

- `html-webpack-plugin`: 번들링한 js파일을 자동으로 html파일에 삽입해주고, 번들링된 결과물들을 자동으로 dist폴더에 옮겨주는 플러그인
- `clean-webpack-plugin`: 번들링할 때 마다 이전 번들링 결과를 제거하여 충돌을 방지
  <br><br>

웹팩설정파일 (`webpack.config.js`)

```
// webpack.config.js > module.exports 객체

```

- `entry`:
- `resolve`:
- `devtool`:
- `devServer`:
- `output`:
- `module`:
- `plugins`:
  <br><br>

package.json에 스크립트 명령어 입력

```
{
  "scripts":{
    "dev": "webpack-dev-server --progress --mode development",
    "build": "webpack --progress --mode production"
  }
}
```

## 참고

> #### 바벨

- [김정환님\_프론트엔드 개발환경의 이해](https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html)
- [devOwen_Babel이란 무엇인가](https://devowen.com/293)
- [medium_CRA없이 리액트 프로젝트 시작하기](https://medium.com/@_diana_lee/cra%EC%97%86%EC%9D%B4-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-feat-%EC%9B%B9%ED%8C%A9-%EB%B0%94%EB%B2%A8-74f5bc3c5da1)
- [배하람님\_CRA 없이 리액트 환경 만들기](https://baeharam.netlify.app/posts/react/React-CRA-%EC%97%86%EC%9D%B4-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%99%98%EA%B2%BD-%EB%A7%8C%EB%93%A4%EA%B8%B0)
- 굉장히 시각적으로 editor세팅이 좋다고 느꼈다.(추후참고)

> #### 웹펙

- [김정환님\_프론트엔드 개발환경의 이해](https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html)
