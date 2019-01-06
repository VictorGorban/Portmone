/*function defaultTask(cb) {
  // place code for your default task here
  console.log('Привет, это я, твой тестовый таск');
  cb();
}

exports.default = defaultTask
*/
/*'use strict';
var gulp = require('gulp'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	reload = browserSync.reload;

var path = {
	build: { // Куда складывать готовые файлы
		css: 'dev/styles/css/'
	}
	src: { // откуда брать исходники
		style: 'dev/styles/sass/'
	}


}*/
var gulp = require('gulp');
var sass = require('gulp-sass');
//var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

var pathToSassFiles = "dev/styles/sass/*.scss";
var pathToCss = "dev/styles/css";
var pathToCssFiles = "dev/styles/css/**/*.css";

/*gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src(pathToSassFiles) // Берем источник. Один файл?
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest(pathToCss)) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream:true}))
});*/

/*gulp.task('sync', function(){ // Создаем таск "sass"
    browserSync.init({
    	server: {
    		baseDir: "dev"
    	}
    });
});
*/

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(pathToSassFiles)
        .pipe(sass())
        .pipe(gulp.dest(pathToCss))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('server', ['sass'], function() {

    browserSync.init({
        server: "./dev"
    });

    gulp.watch(pathToSassFiles, ['sass']);
    gulp.watch("./dev/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['server']);