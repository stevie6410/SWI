var gulp = require('gulp');
var manifest = require('gulp-manifest');

gulp.task('manifest', function(){
  gulp.src(['dist/*'], { base: './' })
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['*'],
      filename: 'cache.manifest',
      exclude: 'cache.manifest'
     }))
    .pipe(gulp.dest('dist'));
});