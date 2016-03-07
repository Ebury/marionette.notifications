// generated on 2016-02-09 using generator-gulp-webapp 1.1.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const testLintOptions = {
  env: {
    mocha: true
  }
};

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError());
  };
}

gulp.task('lint', lint('src/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

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

gulp.task('test', ['build'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': 'dist',
        '/bower_components': 'bower_components',
        '/node_modules': 'node_modules'
      }
    }
  });

  gulp.watch('src/**/*.js', ['build']);
  gulp.watch('src/**/*.js').on('change', reload);
  gulp.watch('test/**/*.html').on('change', reload);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
  gulp.watch('bower.json', ['wiredep:test']);
});

gulp.task('wiredep:test', () => {
  gulp.src('test/**/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('test'));
});