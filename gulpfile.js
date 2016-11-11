
var $ = require('gulp-load-plugins')(),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    config = require('./gulp.config.js')(),
    del = require('del'),
    gulp = require('gulp'),
    inject = require('gulp-inject'),
    less = require('gulp-less'),
    minify = require('gulp-minify-css'),
    naturalSort = require('gulp-natural-sort'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript'),
    tsconfig = require('./tsconfig.json'),
    uglify = require('gulp-uglify');


gulp.task('clean', function() {
    return del(config.clean);
});


//-------------------- dev --------------------

gulp.task('compile:ts', function() {
    var obj = config.dev.compile.ts;
    return gulp.src(obj.src)
        .pipe(ts(tsconfig.compilerOptions))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(obj.dest))
});
gulp.task('compile:less', function(){
    var obj = config.dev.compile.less;
    return gulp.src(obj.src)
        .pipe(concat(obj.fileName))
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(obj.dest))
});

gulp.task('inject:dev', function () {
    var obj = config.dev.inject;
    return gulp.src(obj.target)
        .pipe(inject(
            gulp.src(obj.src, {read: false}),
            {
                ignorePath: [config.dev.dir.replace('./', '')],
                addRootSlash: false
            }
        ))
        .pipe(naturalSort())
        .pipe(rename(obj.filename))
        .pipe(gulp.dest(obj.dest));
});


//-------------------- prod --------------------

gulp.task('copy:fonts', function() {
    var obj = config.prod.copy.fonts;
    return gulp.src(obj.src)
        .pipe(gulp.dest(obj.dest));
});
gulp.task('copy:html', function() {
    var obj = config.prod.copy.html;
    return gulp.src(obj.src)
        .pipe(gulp.dest(obj.dest));
});

gulp.task('css', function() {
    var obj = config.prod.css;
    return gulp.src(obj.src)
        .pipe(concat(obj.fileName))
        .pipe(gulp.dest(obj.dest))
        .pipe(minify())
        .pipe(rename(obj.fileNameMin))
        .pipe(gulp.dest(obj.dest));
});
gulp.task('js', function() {
    var obj = config.prod.js;
    return gulp.src(obj.src)
        .pipe(concat(obj.fileName))
        .pipe(gulp.dest(obj.dest))
        .pipe(rename(obj.fileNameMin))
        .pipe(uglify())
        .pipe(gulp.dest(obj.dest));
});

gulp.task('inject:prod', function () {
    var obj = config.prod.inject;
    return gulp.src(obj.target)
        .pipe(inject(
            gulp.src(obj.src, {read: false}),
            {
                ignorePath: [config.prod.dir.replace('./', '')],
                addRootSlash: false
            }
        ))
        .pipe(naturalSort())
        .pipe(rename(obj.fileName))
        .pipe(gulp.dest(obj.dest));
});


//-------------------- watch --------------------

gulp.task('watch:less', function() {
    gulp.watch([config.dev.compile.less.src], ['less'])
});
gulp.task('watch:typescript', function() {
    gulp.watch([config.dev.compile.ts.src], ['ts'])
});


//========================================

//Use the tasks below this line

gulp.task('dev', function() {
    $.runSequence(
        'clean',
        [
            'compile:less',
            'compile:ts'
        ],
        'inject:dev'
    );
});

gulp.task('prod', function() {
    $.runSequence(
        [
            'copy:fonts',
            'copy:html',
            'css',
            'js'
        ],
        'inject:prod'
    );
});

gulp.task('watch', ['watch:less', 'watch:typescript']);
