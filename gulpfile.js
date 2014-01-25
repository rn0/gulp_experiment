"use strict";

var gulp = require('gulp'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    es = require('event-stream');

gulp.task('css', function() {
    gulp.src('./assets/less/application.less')
        .pipe(less())
        .pipe(prefix("last 2 version", "> 1%", "ie 8", "ie 7"))
        .pipe(gulp.dest('./public/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('js', function() {
    return es.merge(
            gulp.src(['bower_components/jquery/jquery.min.js']),
            gulp.src(['./assets/js/*.js']).pipe(uglify())
        ).pipe(concat('application.min.js'))
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
