const gulp              = require('gulp');
const sass              = require('gulp-sass');
const babel             = require('gulp-babel');
const cleanCSS          = require('gulp-clean-css');
const uglify            = require('gulp-uglify');
const browserSync       = require('browser-sync').create();
const autoprefixer      = require('gulp-autoprefixer');
const rename            = require('gulp-rename');
const concat            = require('gulp-concat');
const panini            = require('panini');
const del               = require('del');

// Config
const config = {
    srcCSS: '../assets/scss/**/*.scss',
    srcJS: '../assets/js/**/*.js',
    srcHTML: '../html/{layouts,pages,partials}/**/*.html',
    srcHTMLPages: '../html/pages/**/*.html',

    distCSS: '../dist/assets/css',
    distJS: '../dist/assets/js',
    dist: '../dist'
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

// Reload HTML files
function reloadHtml(done) {
    panini.refresh();
    done();
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

// HTML
function compileHtml() {
    return gulp.src(config.srcHTMLPages)
        .pipe(panini({
            root: '../html/pages/',
            layouts: '../html/layouts/',
            partials: '../html/partials/'
        }))
        .pipe(gulp.dest(config.dist));
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
            '../assets/vendors/css/normalize.min.css',
        ])
        .pipe(concat('vendors.min.css'))
        .pipe(gulp.dest(config.distCSS));
}

// Remove dist folder
function removeDist() {
    return del(config.dist + '**', {force: true});
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
    gulp.watch(config.srcHTML, gulp.series(reloadHtml, compileHtml, reload));
}

// Build dist folder
const build = gulp.series(removeDist, gulp.parallel(compileHtml, compileSass, compileJs, combineCss));
gulp.task('build', build);

// Main task
gulp.task('default', gulp.series(build, gulp.parallel(server, watchSass, watchJs, watchHtml)));

// Combine CSS files
gulp.task('concat-css', gulp.parallel(combineCss));

// Combine JS files
gulp.task('concat-js', gulp.parallel(combineJs));