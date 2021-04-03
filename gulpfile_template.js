/* function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask */

'use strict';

const gulp      = require('gulp'),
		watch       = require('gulp-watch'),
		prefixer    = require('gulp-autoprefixer'),
    // autoprefixer = require('autoprefixer'),
    // postcss     = require('gulp-postcss'),
		uglify      = require('gulp-uglify'), //Minify JavaScript with UglifyJS3
		sass        = require('gulp-sass'),
    Fiber       = require('fibers'),
		sourcemaps  = require('gulp-sourcemaps'),
		// rigger      = require('gulp-rigger'), //building engine to include files into each other
		cssmin      = require('gulp-clean-css'),
		imagemin    = require('gulp-imagemin'),
		pngquant    = require('imagemin-pngquant');
		// rimraf      = require('rimraf'), //a deep deletion module for node (like `rm -rf`)
		/*???*/ //replace     = require('gulp-replace'), //a string replace plugin for gulp 3
		/*???*/ //browserSync = require("browser-sync"), //live CSS Reload & Browser Syncing
    /*???*/ //reload      = browserSync.reload,
		// header      = require('gulp-header'); //gulp extension to add header to file(s) in the pipeline
    // rename      = require('gulp-rename');
		
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
      js: 'src/js/*.js', 
      style: 'src/scss/*.scss', 
      img: 'src/images/**/*.*', 
      fonts: 'src/fonts/**/*.*'
  },
  watch: { 
      html: 'src/**/*.html',
      // html: 'src/[^_]*.html', 
      js: 'src/js/**/*.js',
      style: 'src/scss/**/*.scss',
      img: 'src/images/**/*.*',
      fonts: 'src/fonts/**/*.*'
  }/* ,
  clean: './build' */
};

/* const config = {
  server: {
      baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "gulp_scss"
}; */

gulp.task('html:build', function () {
  return gulp.src(path.src.html) 
      // .pipe(rigger()) 
      .pipe(gulp.dest(path.build.html));
      // .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
  return gulp.src(path.src.js) 
      // .pipe(rigger()) 
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.js));
      // .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  return gulp.src(path.src.style)
      .pipe(sourcemaps.init())
      // .pipe(sass({fiber: Fiber, outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(sass({fiber: Fiber}).on('error', sass.logError))
      // .pipe(prefixer({ 
      //     browsers: ["> 1%", "last 40 versions", "ie > 6"]
      // })) 
      .pipe(prefixer()) 
      // .pipe(postcss([ autoprefixer() ]))
      .pipe(cssmin())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.css));
      // .pipe(reload({stream: true}));
});

// gulp.task('style:buildwp', function () {
//   return gulp.src(path.src.style)
//       .pipe(sourcemaps.init())
//       .pipe(sass())
//       .pipe(prefixer({
//           browsers: ['last 4 versions']
//       }))
//       .pipe(cssmin())
//       .pipe(sourcemaps.write())
//       .pipe(replace( '../fonts/', './fonts/') )
//       .pipe(header('/*\nTheme Name: 2u4u\nVersion: 1.0\nDescription: My 2u4u theme\nAuthor: UU\nAuthor URI: http://2u4u.ru\n*/\n'))

//       .pipe(gulp.dest(path.wp.css))
//       .pipe(reload({stream: true}));
// });

gulp.task('image:build', function () {
  return gulp.src(path.src.img)
      .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({progressive: true}),
        // use: [pngquant()],
        imagemin.optipng({
          plugins: [pngquant()]
        })
      ]))
      .pipe(gulp.dest(path.build.img))
      // .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  return gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.build.fonts))
});

/* gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'style:buildwp',
  'image:build',
  'fonts:build'
]);  *///задача build состоит из задач 'html:build', 'js:build', 'style:build', 'image:build' и 'fonts:build'
// gulp.task('build', function() {
//   return gulp.series([
//     'html:build',
//     'js:build',
//     'style:build',
//     'image:build',
//     'fonts:build'
//   ])
// });
// exports.build = gulp.series([
//       'html:build',
//       'js:build',
//       'style:build',
//       'image:build',
//       'fonts:build'
//     ]);
// function build() {
//   return [
//         'html:build',
//         'js:build',
//         'style:build',
//         'image:build',
//         'fonts:build'
//       ];
// }
// gulp.task('build', function() {
//   gulp.start('html:build', 'js:build', 'style:build', 'image:build', 'fonts:build');
// });

/* gulp.task('watch', function() {
  watch([path.watch.html], ['html:build']);
  watch([path.watch.style], ['style:build']);
   watch([path.watch.style], function(event, cb) {
      gulp.start('style:buildwp');
  }); 
  watch([path.watch.js], ['js:build']);
  watch([path.watch.img], ['image:build']);
  watch([path.watch.fonts], ['fonts:build']);
}); */
gulp.task('watch', function() {
  watch([path.watch.html], gulp.series('html:build'));
  watch([path.watch.style], gulp.series('style:build'));
  watch([path.watch.js], gulp.series('js:build'));
  watch([path.watch.img], gulp.series('image:build'));
  watch([path.watch.fonts], gulp.series('fonts:build'));
});

/* gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']); */
// gulp.task('default', ['build', 'watch']);
// gulp.task('default', function() {
//   return ['build', 'watch']
// });
exports.default = gulp.series(['html:build', 'js:build', 'style:build', 'image:build', 'fonts:build', 'watch']);