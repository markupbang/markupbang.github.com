---
title: Automation
date: 2017-08-30 17:17:36
category:
---

```diff
+ node version 7.5.0
+ npm version 4.1.2
```

# Gulp setting

## 1. gulp-sass-lint
### gulp + gulp-sass-lint
- 'gulp-sass-lint'를 사용해 sass파일의 실수를 찾아주는 코드 검사기

#### npm install
```sh
npm install gulp-sass-lint --save-dev
```

#### gulpfile.js
##### 플러그인 호출, 경로 저장
```js
var gulp = require('gulp'),
    sassLint = require('gulp-sass-lint');
```

##### task 작성
```js
gulp.task('default', function () {
    return gulp.src('sass/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});
```
![difference](./src/images/sass-lint-img.png)
> 결론은 gulp-sass-lint 플러그인을 따로 쓰는것보다 gulp-sass의 error message가 훨씬 좋음

## 2. gulp clean-css clean-js
### gulp-clean
> gulp-clean: 기존 dist 파일 삭제

[gulp-clean](https://www.npmjs.com/package/gulp-clean)

#### npm install & use
```sh
npm install --save-dev gulp-clean

gulp clean-css
gulp clean-js
```

#### gulpfile.js
##### 플러그인 호출, 경로 저장
```js
var clean = require('gulp-clean');
```

##### task 작성
```js
gulp.task('clean-css', function() {
	return gulp.src(dist + '/*.css', {read: false})
            .pipe(clean());
});

gulp.task('clean-js', function() {
	return gulp.src(dist + '/*.js', {read: false})
			.pipe(clean());
});
```

## 3. gulp building
### browserify + vinyl-source-stream + vinyl-buffer + gulp-uglify + gulp-jshint
> gulp-sass: sass 파일병합, 빌드 [gulp-sass](https://www.npmjs.com/package/gulp-sass)
> browserify + vinyl-source-stream + vinyl-buffer: js 파일 병합, 빌드를 위한 플러그인 [gulp와 vinyl](http://programmingsummaries.tistory.com/382)
> gulp-uglify: js 파일 압축을 위한 플러그인
> gulp-jshint: js 코드 검사를 위한 플러그인 [JSHint 옵션](https://blog.outsider.ne.kr/1007)
> jshint-stylish: JSHint 에러 메세지의 가독성을 높여주는 플러그인

#### npm install
```sh
npm install browserify vinyl-buffer vinyl-source-stream gulp-uglify gulp-jshint jshint-stylish --save-dev
```

#### gulpfile.js
##### 플러그인 호출, 경로 저장
```js
var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify');
```

##### task 작성
- sass와 함께 빌드

```js
gulp.task('lint-js', function() {
    gulp.src(SRC.JS)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('sass', function() {
    gulp.src(SRC.SCSS)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(sourcemaps.write(DIR.MAP))
    .pipe(gulp.dest(dist));
});

gulp.task('js', ['lint-js'], function() {
    return browserify(DIR.SRC + '/js/entry.js')
   .bundle()
   .pipe(source('bundle.js'))
   .pipe(buffer())
   .pipe(sourcemaps.init({loadMaps: true}))
   .pipe(sourcemaps.write(DIR.MAP))
   .pipe(gulp.dest(dist));
});
```
## 4. gulp watch
### watch
> scss와 js파일이 변경되면 sass,js task(build)를 재실행

#### npm install
gulp 내장 플러그인

#### gulpfile.js
##### task 작성
- sass와 함께 빌드
```js
// watch
gulp.task('watch', function() {
    gulp.watch(SRC.SCSS, ['sass']);
    gulp.watch(SRC.JS, ['js']);
});
```

## 5. gulp minify
### Minify css, js
#### npm install & use
```sh
npm install --save-dev gulp-rename gulp-uglify gulp-uglifycss
```

#### gulpfile.js
##### 플러그인 호출, 경로 저장
```js
var uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename');
```

##### task 작성
```js
// min build
gulp.task('min-js', function(){
    gulp.src(dist +'/*.js')
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(dist));

});
gulp.task('min-css', function() {
    gulp.src(dist +'/*.css')
    .pipe(uglifycss({ //배포용
        "maxLineLen": 80,
        "uglyComments": true
    }))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(dist));
});
```

## 6. gulp imagemin
### Minify PNG, JPEG, GIF and SVG images with imagemin
#### npm install & use
```sh
npm install --save-dev gulp-rename gulp-uglify gulp-uglifycss
```

#### gulpfile.js
##### 플러그인 호출, 경로 저장
```js
var imagemin = require('gulp-imagemin');
```

##### task 작성
```js
gulp.task('imagemin', function() {
    gulp.src(SRC.IMG)
    .pipe(imagemin())
    .pipe(gulp.dest(dist))
});
```

------------------------------------------

# npm scripts
개발작업에서 사용되는 build와 배포에 사용되는 build를 구분한다.

## 1.devbuild(개발용) :
#### npm start
npm run devbuild

##### npm script
```sh
"devbuild": "npm run lint:sass && npm run lint:js && npm run watch:file"
```

### sass-lint
- sass파일의 실수를 찾아주는 코드 검사기: node-sass의 기본 lint를 사용해도 무방함

##### npm script
```sh
"lint:sass": "sass-lint -c .sass-lint.yml 'src/sass/utils/, src/sass/gtris.scss' -v -q"
```
[sass-lint](https://www.npmjs.com/package/sass-lint)

#### jshint
- 자바스크립트 코드 검사도구
[jshint](https://www.npmjs.com/package/jshint)
[jshint options](https://blog.outsider.ne.kr/1007)

##### npm script
```sh
"lint:js": "jshint --verbose src/js/util/ src/js/components"
```

#### nodemon
- 소스 수정시 자동으로 서버를 재시작 해주는 도구
[nodemon](https://nodemon.io/)

##### npm script
```sh
"watch:file": "nodemon -e scss,js --watch src -x \"npm run build:css && npm run build:js\""
```

#### node-sass
[node-sass](https://github.com/sass/node-sass)

##### npm script
```sh
"build:css": "node-sass --output-style compact --indent-type tab --indent-width 1 --source-map dist/map/ -o src/sass/utils/ src/sass/gtris.scss dist/gtris.css"
```

#### browserify
- js bundler
[browserify](http://browserify.org/)

##### npm script
```sh
"build:js": "browserify src/js/entry.js > dist/bundle.js"
```

## 2.build(배포용)
#### npm start
npm run build

##### npm script
```sh
"build": "npm run build:css && uglifyjs src/js/util/*.js src/js/components/*.js -o dist/bundle.min.js --source-map dist/map/bundle.min.js.map -p 5 -c -m"
```

### uglifyjs
- js파일 압축
[uglifyjs](http://lisperator.net/uglifyjs/)

##### npm script
```sh
uglifyjs src/js/util/*.js src/js/components/*.js -o dist/bundle.min.js --source-map dist/map/bundle.min.js.map -p 5 -c -m
```
