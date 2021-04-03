'use strict';

const gulp       = require('gulp'),
    watch        = require('gulp-watch'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    uglify       = require('gulp-uglify'), //Minify JavaScript with UglifyJS3
    sass         = require('gulp-sass'),
    Fiber        = require('fibers'),
    sourcemaps   = require('gulp-sourcemaps'),
    cssmin       = require('gulp-clean-css'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant');
		
sass.compiler = require('sass'); // Dart Sass

const path = {
  build: { 
      html: 'build/',
      js: 'build/js/',
      css: 'build/css/',
      img: 'build/images/',
      fonts: 'build/fonts/'
  },
  src: { 
      html: 'src/*.html', 
      js: 'src/js/**/*.js', 
      style: 'src/scss/*.scss', 
      img: 'src/images/**/*.*', 
      fonts: 'src/fonts/**/*.*'
  },
  watch: { 
      html: 'src/**/*.html',
      js: 'src/js/**/*.js',
      style: 'src/scss/**/*.scss',
      img: 'src/images/**/*.*',
      fonts: 'src/fonts/**/*.*'
  }
};

gulp.task('html:build', function () {
  return gulp.src(path.src.html) 
      .pipe(gulp.dest(path.build.html));
});

gulp.task('js:build', function () {
  return gulp.src(path.src.js) 
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.js));
});

gulp.task('style:build', function () {
  return gulp.src(path.src.style)
      .pipe(sourcemaps.init())
      .pipe(sass({fiber: Fiber}).on('error', sass.logError))
      .pipe(postcss([ autoprefixer() ]))
      .pipe(cssmin())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
  return gulp.src(path.src.img)
      .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({progressive: true}),
        imagemin.optipng({
          plugins: [pngquant()]
        })
      ]))
      .pipe(gulp.dest(path.build.img));
});

gulp.task('fonts:build', function() {
  return gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.build.fonts));
});

gulp.task('watch', function() {
  watch([path.watch.html], gulp.series('html:build'));
  watch([path.watch.style], gulp.series('style:build'));
  watch([path.watch.js], gulp.series('js:build'));
  watch([path.watch.img], gulp.series('image:build'));
  watch([path.watch.fonts], gulp.series('fonts:build', 'style:build'));
});

exports.default = gulp.series(['html:build', 'js:build', 'style:build', 'image:build', 'fonts:build', 'watch']);
