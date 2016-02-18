// generated on 2016-02-09 using generator-gulp-webapp 1.1.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError());
  };
}

gulp.task('lint', lint('src/**/*.js'));

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('build', ['lint'], () => {
  return gulp.src('src/**/*.js')
    .pipe(gulp.dest('dist'))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.rename({suffix: '.min'}))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});