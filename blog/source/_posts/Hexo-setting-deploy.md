---
title: Hexo 설정과 배포
date: 2017-12-11 14:48:53
category:
---

Hexo로 Github 블로그를 만들었지만 포스팅을 자주 하지 않다보니 배포 과정을 매번 잊어버려서 정리해두면 좋을것 같아 포스팅 한다.
포스팅 하는김에 블로그의 생성, 설정과 배포까지의 과정을 적어본다.

깃허브 페이지는 지킬(Jekyll)과 헥소(Hexo)가 많이 사용되며 지킬이 대표적으로 사용된다. 지킬을 살펴보니 Ruby로 구동되고 Hexo는 NodeJs로 구동되었다.
Ruby는 레거시의 느낌이라 나는 NodeJs로 구동되는 Hexo로 블로그를 만들기로 하였다.

* Github Page - [https://pages.github.com](https://pages.github.com)
* Hexo - [https://hexo.io](https://hexo.io)

## Github Pages로 Hosting과 웹페이지 만들기

#### Github Repository 생성하기
Github 가입 후 Repository를 생성한다.

1. New Repository, Repository 이름은 Username.github.io로 생성
2. Username은 Github 가입시의 사용자의 Username을 입력
3. Public / Private 중 Public 선택
4. Create Repositiory 버튼을 눌러 Repository 생성

#### Clone the Repository
Github에서 생성한 Repository를 로컬에 복사한다.
````bash
	git clone https://github.com/Username/Username.github.io
````

Terminal 사용에 익숙치 않다면 [https://pages.github.com](https://pages.github.com/)의 GiHub for Windows나 GitHub for Mac탭의 내용을 참고토록 한다.

#### Hello World
root 디렉토리에 index.html을 생성하고 Hello World를 찍어보자.
````bash
	cd Username.github.io
	echo "Hello World" > index.html
````

#### Push
변경한 내용을 Remote 저장소에 Push 한다.
````bash
	git add -all
	git commit -m "Init commit"
	git push -u origin master
````

#### and you're done!
브라우저에서 정상적으로 https://Username.github.io 에 접속되는지 확인 한다.

## Hexo
Hexo는 Jekyll와 함께 대표적으로 정적 페이지를 쉽게 만들 수 있도록 도와주는 서비스이다. Hexo의 경우에는 npm을 통해 쉽게 설치가 가능하고 한 줄의 Command Line을 통해 Github에 바로 배포 할 수 있으며, Jekyll과 마찬가지로 다양한 플러그인과 테마를 지원하고 있다.

#### 구성 요소 설치
* Node.Js - [https://nodejs.org/en/](https://nodejs.org/en/)
* Git - [https://pages.github.com/](https://pages.github.com/)


#### Hexo 설치와 블로그 생성
npm을 통해 hexo를 설치한다.
명령어 npm을 통해 hexo-cli모듈을 global하게 설치한다는 명령어이다.
````bash
	npm install -g hexo-cli
````

Hexo로 init명령어를 입력하게 되면 지정된 블로그 명으로 Hexo로 알아서 기본적인 블로그를 만들어 준다. 그리고 생성된 블로그 경로로 이동하여 npm install 명령어를 통해 필요한 모듈을 설치한다. 모듈은 package.json에 명시되어 있다.
````bash
	hexo init blog
	cd blog
	npm install
````

#### 설정파일 업데이트
Command Line을 통해 Hexo를 설치하고 블로그 생성이 완료되면 root 디렉토리에 **_config.yml**이라는 설정파일이 생성 되는데 이 곳에 블로그의 공통적인 속성을 설정할 수 있다. 자세한 정보는 [Hexo Documentation](https://hexo.io/ko/docs/)에서 확인할 수 있다.

#### Hexo 블로그 Github에 연동하기
Hexo로 생성한 블로그는 Github에 업로드해야지만 블로그에 접속하여 확인할 수 있다. Hexo를 사용하면 별도의 Git 명령어가 없어도 알아서 Github에 업로드 해준다. 그러기 위해서 Hexo와 Github간의 연결고리가 있어야 하는데 _config.yml을 통해 지정할 수 있다.

````
	# Deployment
	## Docs: https://hexo.io/docs/deployment.html
	deploy:
	  type: git
	  repo: https://github.com/Username/Username.github.io.git
 ````

#### 로컬에서 테스트
기본적인 설정이 완료가 되면 로컬에서 서버를 구동할 수 있다.
````bash
	hexo server
````

서버가 구동이 되면 [https://localhost:4000]https://localhost:4000 을 통해 브라우저에서 블로그에 접속할 수 있다.

## Github에 배포하기
Hexo 서버가 정상적으로 구동이 되면 Github Page Repository에 손쉽게 배포가 가능하다.

#### hexo-deployer-git 플러그인 설치
Hexo에서 Github에 업로드하기 위해 필요한 npm모듈을 설치하자. 생성한 블로그 폴더 경로로 이동하여 명령 창을 실행하여 npm명령어를 입력하자.
````bash
	npm install hexo-deployer-git --save
````

**__config.yml에 플러그인 설정**
````bash
	plugins:
	- hexo-deployer-git
````

#### Hexo 설정을 통해 정적 리소스 생성하기
````bash
	hexo generate
````

#### 배포하기
````bash
	hexo deplay
````
#### 생성과 배포를 동시 실행
Generate와 Deploy를 동시에 실행 할 수도 있다.
````bash
	hexo deplay --generate
````

배포가 완료되면 브라우저에서 Username.github.io로 접속해 정상적으로 배포가 되었는지 확인한다.

#### Clean
간혹 정상적으로 배포가 되었음에도 페이지가 업데이트 되지 않는 현상이 있는데, 이 경우에는 페이지를 clean후에 배포하면 해결된다.
````bash
	hexo clean
	hexo deploy --generate
````

## 테마 적용
Hexo에서는 아래의 페이지에서 다양한 Theme가 적용된 페이지를 소개하고 있다.
[https://hexo.io/themes/](https://hexo.io/themes/)

대부분의 Theme 페이지에서는 Github 링크가 포함되어 있는데 Theme를 적용하기 위한 자세한 설명을 포함하고 있다. 현재 블로그는 hexo-theme-chiangmai 라는 Theme를 사용하고 있다.
[https://github.com/stunstunstun/hexo-theme-chiangmai](https://github.com/stunstunstun/hexo-theme-chiangmai)

Theme를 적용하기 위해서는 hexo-theme-chiangmai Github 페이지에서 자세한 내용을 확인 할 수 있다. 주의사항으로는 Theme를 적용하기 위해서는 아래와 같이 Repository 상태를 Clean한 이후에 재배포 해야한다.


## 포스트 작성하기

#### 새 포스트 만들기
````bash
	hexo new post [post_name]
````

새 포스트를 만들면 root 디렉토리의 source/_posts 폴더에 Markdown 파일(.md)이 하나 생성되는데 Hexo에서는 Markdown 문서를 통해 포스트를 작성하게 된다.

#### 문서 제목 수정
생성된 Markdown 문서에서 제목을 수정할 수 있다.
````bash
---
title: Hexo 설정과 배포
date: 2017-12-11 14:48:53
---
````

#### 배포
````bash
	hexo deploy --generate
````

#### Github Markdowm Guide
Markdown 문서가 생소하다면 아래링크를 참고한다.
[https://guides.github.com/features/mastering-markdown/](https://guides.github.com/features/mastering-markdown/)
