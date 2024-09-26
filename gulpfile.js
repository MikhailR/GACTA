let gulp = require('gulp'),
    sass = require('gulp-dart-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    cssMedia = require('gulp-group-css-media-queries'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter');

// import gulp from 'gulp';
// import sass from 'gulp-dart-sass';
// import  browserSync from 'browser-sync';
// import uglify from 'gulp-uglify';
// import concat from 'gulp-concat';
// import rename from 'gulp-rename';
// import cssmin from 'gulp-cssmin';
// import del from 'del';
// import autoprefixer from 'gulp-autoprefixer';
// import cssMedia from 'gulp-group-css-media-queries';
// import ttf2woff from 'gulp-ttf2woff';
// import ttf2woff2 from 'gulp-ttf2woff2';
// import fonter from 'gulp-fonter';

//Удаление старой папки DIST перед новой выгрузкой файлов на продакшн
gulp.task('clean', async function(){
  del.sync('dist');
});

//Конвертация шрифтов из .eot в .ttf (вызывается вручную)
gulp.task('otf2ttf', function(){
  return gulp.src('app/fonts/*.eot')
          .pipe(fonter({formats: ['ttf']}))
          .pipe(gulp.dest('app/fonts/'));
});

//Конвертация шрифтов из .ttf в .woff (вызывается вручную)
gulp.task('ttf2woff', function(){
  return gulp.src(['app/fonts/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('app/fonts/'));
});

//Конвертация шрифтов из .ttf в .woff2 (вызывается вручную)
gulp.task('ttf2woff2', function(){
  return gulp.src(['app/fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(gulp.dest('app/fonts/'));
});

//Компиляция css-файла стилей из scss-файла
gulp.task('scss', function(){
  return gulp.src('app/scss/style.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(cssMedia())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions'],
      cascade: false
    }))
    //сохраняем полную версию файла стилей
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    //сохраняем минифицированную версию файла стилей
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

// "normalize.css": "^8.0.1"
// функция для "склеивания" css-файлов используемых jquery-плагинов
gulp.task('libs-styles', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'app/libs/swiper.css'
    // 'node_modules/slick-carousel/slick/slick.css'
    ])
      .pipe(concat('libs.min.css'))
      .pipe(cssmin())
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.reload({stream: true}))
});

//остлеживание изменений в html-файлах
gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true}))
});

//остлеживание изменений в js-файлах
gulp.task('js', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});

// функция для "склеивания" js-файлов используемых jquery-плагинов
gulp.task('libs-scripts', function(){
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'app/libs/swiper.js'
    // 'app/libs/jquery.maskedinput.js'
    // 'node_modules/slick-carousel/slick/slick.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

//функция для синхронизации изменений в браузере
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
});

//выгрузка готовых файлов для продакшена
gulp.task('export', async function(){
  let buildHtml = gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));
  let buildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));
  let buildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));
  let buildFonts = gulp.src('app/fonts/**/*.{woff,woff2}')
        .pipe(gulp.dest('dist/fonts'));
  let buildImages = gulp.src('app/images/**/*.*')
        .pipe(gulp.dest('dist/images'));

  // let buildMailer = gulp.src('app/phpmailer/**/*.*')
  //       .pipe(gulp.dest('dist/phpmailer'));
  // let buildMail = gulp.src('app/mail.php')
  //       .pipe(gulp.dest('dist'));
});

//общая функция отслеживания изменений в рабочих файлах
gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('js'))
});

//функция удаления старой папки с продакшеном и созданием новой с готовыми файлами
gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('libs-styles','libs-scripts', 'scss', 'browser-sync', 'watch'));
// gulp.task('default', gulp.parallel('libs-styles','scss', 'browser-sync', 'watch'));