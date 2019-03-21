const gulp         = require('gulp');
const sass         = require('gulp-sass');
const babel        = require('gulp-babel');
const cleanCSS     = require('gulp-clean-css');
const uglify       = require('gulp-uglify');
const browserSync  = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const rename       = require('gulp-rename');
const concat       = require('gulp-concat');
const assetsPath   = '../assets/';

// Config
const config = {
    srcCSS: assetsPath + 'scss/**/*.scss',
    distCSS: assetsPath + 'css',
    srcJS: assetsPath + 'js/src/**/*.js',
    distJS: assetsPath + 'js'
};

// Server
function server() {
    browserSync.init({
        server: {
            baseDir: '../'
        }
    });
}

// Server reload
function reload(done) {
    browserSync.reload();
    done();
}

// Javascript
function compileJs() {
    return gulp.src(config.srcJS)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(config.distJS))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.distJS));
}

// Sass
function compileSass() {
    return gulp.src(config.srcCSS)
        .pipe(sass({outputStyle: 'expanded'})
        .on('error', sass.logError))
        .pipe(autoprefixer({cascade: false}))
        .pipe(gulp.dest(config.distCSS))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.distCSS));
}

// Combine Javascript files
function combineJs() {
    return gulp.src([
        //'path/to/file.js',
    ])
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest(config.distJS));
}

// Combine CSS files
function combineCss() {
    return gulp.src([
        assetsPath + 'vendors/css/normalize.min.css',
    ])
    .pipe(concat('vendors.min.css'))
    .pipe(gulp.dest(config.distCSS));
}

// Watch Sass files
function watchSass() {
    gulp.watch(config.srcCSS, gulp.series(compileSass, reload));
}

// Watch Javascript files
function watchJs() {
    gulp.watch(config.srcJS, gulp.series(compileJs, reload));
}

// Watch HTML files
function watchHtml() {
    gulp.watch('*.html', gulp.series(reload));
}

// Main task
gulp.task('default', gulp.parallel(server, watchSass, watchJs, watchHtml));

// Combine CSS files
gulp.task('concat-css', gulp.parallel(combineCss));

// Combine JS files
gulp.task('concat-js', gulp.parallel(combineJs));