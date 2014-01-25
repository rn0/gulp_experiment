"use strict";

var gulp = require('gulp'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('css', function() {
    return gulp.src('./assets/less/application.less')
        .pipe(less())
        .pipe(prefix("last 2 version", "> 1%", "ie 8", "ie 7"))
        .pipe(gulp.dest('./public/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('js', function() {
    return gulp.src(['bower_components/jquery/jquery.js', './assets/js/*.js'])
        .pipe(concat('application.js'))
        .pipe(gulp.dest('./public/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
    gulp.watch('./assets/less/**', function(event) {
         gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
         gulp.run('css');
    });

    gulp.watch('./assets/js/**', function(event) {
         gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
         gulp.run('js');
    });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
