//引入套件
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();
var sass =  require('gulp-sass');
var clean = require('gulp-clean');
var reload = browserSync.reload;

//路徑變數

const web = {
    sass: [
        'sass/*.scss',
        'sass/**/*.scss'
    ],
    html: [
        'html/*.html',
        'html/**/*.html',
        'html/**/**/*.html'
    ],
    tmp: 'resources/assets/tmp/css/*.css'
};


//搬家
// gulp.task('concat', function () {
//     //do sometime
//     gulp.src('./dev/js/*.js').pipe(gulp.dest('dest/js'))
// });


//清除 dest
// gulp.task('clean', function () {
//     return gulp.src(['dest/*'], {
//             read: false
//         })
//         .pipe(clean());
// });




// gulp.task('minicss', ['auto'], function () {
//     gulp.src('dest/css/*.css')
//         .pipe(cleanCSS({
//             compatibility: 'ie8'
//         }))
//         .pipe(gulp.dest('dest/css/'));
// });



// gulp.task('watch', function () {
//     gulp.watch('css/*.css', ['auto']);
//     gulp.watch(['*.html' , '**/*.html'], ['template']);
// });





//html template

gulp.task('template', function () {
    gulp.src(['html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
});

//sass
gulp.task('sass', function () {
    return gulp.src(web.sass)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
  });

gulp.task('default', function () {
    browserSync.init({
        server: {
            //根目錄
            baseDir: "./",
            //首頁檔案
            index: "blank.html"
        }
    });
    //監看目標
    gulp.watch(web.html , ['template']).on('change', reload);
    // gulp.watch("./dev/js/*.js" ,['concat'] ).on('change', reload);
    gulp.watch(web.sass, ['sass']).on('change', reload);
    // gulp.watch("img/*").on('change', reload);
});