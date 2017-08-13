[![GitHub release](https://img.shields.io/github/release/rfc4252/AVM.svg)]()

# Automatic Vending Machine

### v2.0.0

- `lib/framework/View.js` -> 확장 가능한 구조로 개선
- `lib/framework/Model.js` -> 일부 함수를 `Model.prototype`으로 이동시켜 성능 개선
- `lib/utils/selector.js` -> jQuery-style 돔 셀렉터 유틸 추가
  - 각 뷰에 해당 유틸을 적용한 코드 적용

### `v1.0.0 > v2.0.0` 변경된 코드

- https://github.com/rfc4252/AVM/compare/master...additional

### 개발 결과물

개발 결과물은 `dist/index.html`을 실행하여 바로 확인하실 수 있습니다. :)

다시 빌드하기를 원하실 경우 의존성 모듈을 설치하신 후 아래 명령어를 실행해 주세요!

```bash
npm run build
```

### 설명

- `src/lib/framework`
 
  - 간단하게 작성한 `View`, `Model` 객체 입니다. 코드 작성시 통일성과 `Publish/Subscribe` 패턴을 이용한 데이터 처리를 위해 만들었습니다.
   
- `src/lib/utils`

  - 공통적으로 사용되는 로직을 모아 두었습니다.
 
- `src/component`

  - `Console`, `Display`, `Payment` 세개의 컴포넌트는 각각 하나의 `View`와 `Model`을 가지고 있습니다. 서로 다른 컴포넌트 간 의존성과 복잡성을 줄이기 위해 `View - View`끼리 접근 하지 않도록 구현하였고, 필요한 경우 다른 컴포넌트의 `Model`의 데이터를 업데이트하여 처리하도록 하였습니다.

### 의존성 모듈 설치

아래 개발문서 또는 테스트 케이스를 실행하기 위해 필요한 의존성 모듈을 인스톨해 주세요!  

```bash
npm i
```

### 개발문서

[JSDoc](http://usejsdoc.org/)을 이용하여 소스코드내 주석 정보를 문서로 추출하여 확인하실 수 있습니다.

```bash
npm run docs
```

### 유닛 테스트

테스트는 [mocha](https://mochajs.org/)와 [chai](http://chaijs.com/)를 이용하여 [Node](https://nodejs.org)에서 실행되는 유닛 테스트 입니다.

```bash
npm test
```

### 감사합니다 :)
