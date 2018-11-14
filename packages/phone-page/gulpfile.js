const gulp = require('gulp');
const execa = require('execa');

gulp.task('start', () => {
  return Promise.all([
    execa('yarn http-server ./site -p 8180'),
    execa('yarn http-server ./site -p 8181')
  ]);
});
