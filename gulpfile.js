var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('sass-dev', function(){
	return gulp.src('app/assets/stylesheets/styles.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('dist/assets/css'))
	.pipe(browserSync.stream());
});

gulp.task('sass', function(){
	return gulp.src('app/assets/stylesheets/styles.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('dist/assets/css'))
	.pipe(browserSync.stream());
});

gulp.task('jade', function() {
	return gulp.src('./app/*.jade')
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest('./dist'));
});

// Static server
/*gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});
*/


gulp.task('watch',['sass-dev', 'jade'] , function() {

	browserSync.init({
		server: "./dist"
	});

	gulp.watch('app/*.jade', ['jade']);
    gulp.watch('app/assets/stylesheets/**/*.scss', ['sass-dev']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});