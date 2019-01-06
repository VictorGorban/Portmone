var gulp = require('gulp');
var sass = require('gulp-sass');
//var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

var pathToSassFiles = "styles/sass/*.scss";
var pathToCss = "styles/css";
var pathToCssFiles  = "styles/css/*.css";

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

gulp.task('css', function() {
    return browserSync.reload({stream:false});
});

// Static Server + watching scss/html files
gulp.task('server', ['sass'], function() {

    browserSync.init({
        server: "."
    });


    gulp.watch(pathToSassFiles, ['sass']);
    //gulp.watch(pathToCssFiles, browserSync.stream);
    gulp.watch("./*.html").on('change', browserSync.reload);
});


gulp.task('default', ['server']);