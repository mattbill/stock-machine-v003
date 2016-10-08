
var $ = require('gulp-load-plugins')(),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    config = require('./gulp.config.js')(),
    del = require('del'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-minify-css'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');



gulp.task('bower-js', function() {
    return gulp.src(config.bowerJsFiles)
        .pipe($.concat('bower-components.min.js'))
        .pipe(gulp.dest(config.dev));
});

gulp.task('bower-css-prod', function() {
    return gulp.src('./app/static/dev/bower-components.min.css')
        .pipe(gulp.dest(config.prod.css));
});


gulp.task('bower-css', function() {
    return gulp.src(config.bowerCssFiles)
        .pipe($.concat('bower-components.min.css'))
        .pipe(gulp.dest(config.dev));
});

gulp.task('bower-js-prod', function() {
    return gulp.src('./app/static/dev/bower-components.min.js')
        .pipe(gulp.dest(config.prod.js));
});

gulp.task('clean', function() {
    return del(config.clean);
});

gulp.task('css', ['less'], function() {
    return gulp.src(config.cssFiles)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(config.prod.css))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minify())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(config.prod.css));
});

gulp.task('fonts', function() {
    return gulp.src(config.fontFiles)
        .pipe(gulp.dest(config.prod.fonts));
});

gulp.task('html', function() {
    return gulp.src(config.htmlFiles)
        .pipe(gulp.dest(config.prod.html));
});

gulp.task('js', function() {
    return gulp.src(config.jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(config.prod.js))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.prod.js));
});

gulp.task('less', function(){
    return gulp.src(config.lessFiles)
        .pipe(concat('less.css'))
        .pipe(less())
        .pipe(gulp.dest(config.tmp))
});

gulp.task('typescript', function() {
    //TODO
});

//----------------------------------------

//Use the tasks below this line

gulp.task('dev',
    [
        'bower-css',
        'bower-js'
        //'typescript'
    ]
);

gulp.task('prod', function() {
    $.runSequence(
        'clean',
        'dev',
        [
            'html',
            'bower-css-prod',
            'bower-js-prod',
            'js',
            'fonts',
            'css'
        ]);
});
