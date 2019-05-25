# Application Management System 3

## 프로젝트 구성원

ICISTS 19VP 권기훈
ICISTS 19TD 백승호, 장봉준

문서화 작성자: 장봉준 bonjune.github.io (malloc099@gmail.com)

## 소개
ICISTS 2019의 참가자 신청을 위한 Client-Side 어플리케이션입니다. Javascript, Typescript 로 작성된 React Framework 어플리케이션이며, User Authentication, Database 등 벡엔드 부분은 Google Firebase를 이용하여 구현하였습니다. Firebase 계정은 ICISTS 공식 계정인 icists@icists.org입니다.

## Prerequisite
다음 자료를 정독, 실습하고 이 문서를 읽기 바랍니다. 중요도에 따라 참고 자료를 정리해두었으니, 필수 자료는 꼭 읽고 나머지는 필요에 따라 읽으시면 됩니다.  
Javascript를 모르더라도 C나 Java 등 여타 프로그래밍 언어의 사용 경험은 필수적입니다.

### Necessary
1. [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
2. [React App with Firebase](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/)
3. [Asynchronous Javascript](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)

### Furthermore
1. [Firebase, Getting Started](https://firebase.google.com/docs/web/setup?hl=ko)
2. [TypeScript Documentation](https://www.typescriptlang.org/docs/home.html)
3. [TypeScript Configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

필요한 자료는 구글링을 통하여 찾아주시고 반드시 프로젝트 관리를 위해 좋은 자료는 기록해주시기 바랍니다. 또한 Javascript의 스펙은 반드시 MDN을 통해 참고 바랍니다. **(W3School, 생활코딩 등 공식 문서 외 자료 참조 금지!)**

## Development

### 개발 과정 소개

우선 어플리케이션은 create-react-app을 이용해 제작되었으며, 개발 도중 TypeScript로 메인 언어가 변경되었습니다. 이는 [Application Form](frontend/src/components/Application/index.tsx)을 다룰 때 많은 정보를 다루다 보면 개발자의 실수가 불가피 해지기 때문에, interface를 통해 정확한 형식을 강제할 수 있는 기능이 필요했기 때문입니다. 더 나아가 TypeScript를 이용하면 런타임에서 일어날 수 있는 데이터가 undefined가 되는 오류라든지, 멤버 변수를 까먹어서 개발속도가 느려지는 등의 문제를 사전에 방지할 수 있습니다.

### 개발 환경 설정

다음과 같은 개발 환경을 구축하세요.

1. node.js, npm(or yarn)
2. git
3. Google Chrome, React Developer Tools
4. 프로젝트 관리자로 부터 .env 설정 파일을 받아 /frontend/src/ 에 위치시키세요.

React 앱은 node.js로 로컬 서버를 실행하며 개발하게 되므로 node.js 설치는 필수적입니다. 또한 node package를 이용해 라이브러리를 설치 및 관리하기 때문에 npm 또는 yarn 설치가 필수적입니다. 또한 프로젝트 관리를 위해 git을 설치하시고, React 앱의 디버깅을 위해 React Developer Tools(Chrome에서 사용 가능)을 반드시 설치하여 사용하시기 바랍니다. React Develper Tools를 이용하면 state과 props, 그리고 context를 추적할 수 있기 때문에 버그가 발생한 위치를 찾는 데 매우 유용하며 개발 시간을 단축시켜 줍니다.

개발 환경 설정이 끝났다면 frontend 디렉토리에서 `yarn start`를 이용해 로컬 서버를 실행할 수 있습니다. 또한 `yarn build`를 실행하면 tsconfig.json의 `outDir`에 정의된 대로 build 디렉터리에 프로젝트가 production용으로 컴파일됩니다. `firebase deploy`를 통해 컴파일된 프로젝트를 deploy하면 됩니다. firebase.json의 `public`에 build 디렉터리를 호스팅하라고 정의되어 있습니다.

### 프로젝트 구조

create-react-app으로 시작된 어플리케이션 특성상 [frontend/src/index.tsx](frontend/src/index.tsx) 파일을 통해 어플리케이션이 시작됩니다. 해당 파일을 참고하면 App 전체에 Firebase Context가 제공되는 것을 확인할 수 있습니다.

다시 App은 [frontend/src/components/App/index.js](frontend/src/components/App/index.js)에서 구조가 정의됩니다. 일단 NavBar Component와 Footer가 있고, Router의 Switch를 통해서 그 아래 부분의 컴포넌트가 달라지는 것을 확인할 수 있습니다.

#### Context

이 프로젝트에서는 불필요한 컴포넌트까지도 props를 전달받는 것을 막고, 프로젝트 전체에서 데이터 흐름을 정리하기 위해 react context를 사용합니다. 이 프로젝트에서는 Firebase, Authentication, Authorization, EmailVerification이 Context로 제공됩니다.

##### Firebase Context

[Firebase](frontend/src/components/Firebase/firebase.js)에 정의된 Firebase Class의 Instance를 제공하기 위해 사용됩니다. Firebase Instance는 React App 전체에 걸쳐 하나만 존재해야 하기 때문에 임의로 `new Firebase()`와 같이 새로운 Instance를 생성하는 명령어를 **절대** 작성하면 안됩니다. Firebase Instance는 Firebase Context를 통해서만 제공되어야 합니다.

##### Authentication, Authorization, EmailVerification Context

[Session](frontend/src/components/Session) 디렉터리에 정의되어 있습니다. withAuthentication Context는 유저가 로그인되어 있는 경우 authUser에 user 정보를 전달하고 그렇지 않으면 `null`을 전달합니다. withAuthorization은 앞에서 설정한 authUser의 값을 검사하여 현재 유저가 로그인되어 있는 지를 검사하고, 로그인되어 있지 않은 경우의 Behavior를 정의해두었습니다. withEmailVerification은 Authorization로 인증이 되어 있는 상태 이더라도, user의 `emailVerified`를 검사해 이메일 인증을 검사합니다. 마찬가지로, 인증이 되어 있지 않은 경우의 Behavior를 정의합니다.

##### 기타

거의 모든 Component들을 [Necessary - 2](#Prerequisite) React with Firebase를 참고하여 작성하였습니다. 해당 문서를 보고, 실습한 후 나머지 컴포넌트들을 이해하면 될 것 같습니다.

### Branches

master 브랜치는 정상적으로 build, deploy가 가능한 커밋만 올라갑니다. 때문에 추가적으로 기능을 구현해야하거나, 버그를 고쳐야 할 경우, 따로 branch를 개설해서 master에 PR를 올리세요.
