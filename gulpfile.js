const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const del = require("del");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgsprite = require("gulp-svg-sprite");
const sync = require("browser-sync").create();

// Clean

const clean = () => {
  return del("build");
}

exports.clean = clean;

// Copy

const copy = () => {
  return gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/img/**/*.{jpg,png,svg}"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
}

exports.copy = copy;

// Image

const optiImage = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(imagemin([
    imagemin.mozjpeg({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"));
}

exports.optiImage = optiImage;

// Webp

const createWebp = () => {
  return gulp.src("source/img/*.{jpg,png}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
}

exports.createWebp = createWebp;

// Sprite

const createSprite = () => {
  return gulp.src("source/img/icons/*.svg")
  .pipe(svgsprite({
    mode: {
      stack: {
        sprite: "../sprite.svg"
      }
    }
  }))
  .pipe(gulp.dest("build/img/icons"));
}

exports.createSprite = createSprite;

// HTML

const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("build"))
  .pipe(sync.stream());
}

exports.html = html;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Scripts

const jsUglify = () => {
  return gulp.src("source/js/main-navigation.js")
  .pipe(uglify())
  .pipe(rename("main-navigation.min.js"))
  .pipe(gulp.dest("build/js"))
  .pipe(sync.stream());
}

exports.jsUglify = jsUglify;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html"));
}

// Build

const build = gulp.series (
  clean,
  gulp.parallel (
    copy,
    html,
    styles,
    createWebp,
    createSprite,
    jsUglify
  )
)

exports.build = build;

// Default

exports.default = gulp.series (
  clean,
  gulp.parallel (
    copy,
    html,
    styles,
    createWebp,
    createSprite,
    jsUglify
  ),
  gulp.series(
    server, watcher
  )
)
