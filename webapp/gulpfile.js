var config = require('./gulp.config.js')(),
    del = require('del'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('styles', function() {
    return gulp.src(config.css)
        .pipe($.minifyCss())
        .pipe($.concat('styles.css'))
        .pipe(gulp.dest(config.temp));
});


gulp.task('bower-js', function() {
    return gulp.src(config.js)
        .pipe($.concat('bower_components.js'))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean', function() {
    return del([config.temp]);
});

gulp.task('default', function() {
    $.runSequence('clean', ['styles', 'bower-js']);
});