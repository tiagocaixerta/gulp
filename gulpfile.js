const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');


const paths = {
    styles: {
        src: './source/styles/**/*.scss',
        dest: './build/styles'
    },
    images: {
        src: './source/images/*',
        dest: './build/images'
    },
    scripts: {
        src: './source/scripts/**/*.js',
        dest: './build/scripts'
    }
};


function compileSass() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.styles.dest));
}


function compressImages() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}


function compressScripts() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}


const build = gulp.series(
    compileSass,
    compressImages,
    compressScripts
);


exports.compileSass = compileSass;
exports.compressImages = compressImages;
exports.compressScripts = compressScripts;


exports.default = build;
