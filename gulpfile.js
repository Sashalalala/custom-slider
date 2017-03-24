'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	prefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    rimraf = require('rimraf'),  
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var path = {
    langDir:'code/locales',
	out:{
		html:'out/',
		js:'out/js',
		css:'out/style',
		img:'out/img',
		fonts:'out/fonts'
	},
	code:{
		html:'code/*.html',
		js:'code/js/*.js',
		css:'code/style/main.scss',
		img:'code/img/**/*.*',
		fonts:'code/fonts/**/*.*'
	},
	watch:{
		html:'code/*.html',
		js:'code/js/*.js',
		css:'code/style/**/*.scss',
		img:'code/img/**/*.*',
		fonts:'code/fonts/**/*.*'
	},
	clean:"./out"
};

var config = {
    server: {
        baseDir: "./out"
    },
    tunnel: true,
    host: 'localhost',
    port: 9100,
    logPrefix: "zadanie"
};


gulp.task('html', function(){
    return gulp.src(path.code.html)
           .pipe(gulp.dest(path.out.html))
           .pipe(reload({stream: true}));
});

gulp.task('js', function () {
    gulp.src(path.code.js)
        .pipe(gulp.dest(path.out.js))
        .pipe(reload({stream: true}));
});

gulp.task('scss', function () {
    gulp.src(path.code.css) 
        .pipe(sass()) 
        .pipe(prefixer())
        .pipe(gulp.dest(path.out.css))
        .pipe(reload({stream: true}));
});

gulp.task('image', function () {
    gulp.src(path.code.img, { buffer: false })      
        .pipe(gulp.dest(path.out.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts', function() {
    gulp.src(path.code.fonts)
        .pipe(gulp.dest(path.out.fonts))
});

gulp.task('build', [
    'html',
    'js',
    'scss',
    'fonts',
    'image'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('scss');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
