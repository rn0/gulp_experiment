"use strict";

var gulp = require('gulp'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    prefix = require('gulp-autoprefixer');

gulp.task('css', function() {
    gulp.src('./assets/less/application.less')
        .pipe(less())
        .pipe(prefix("last 2 version", "> 1%", "ie 8", "ie 7"))
        .pipe(gulp.dest('./public/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', function() {
    gulp.watch('./assets/less/**', function(event) {
       gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
       gulp.run('css');
     });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
