const gulp = require('gulp')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css')
const imageMin = require('gulp-imagemin')
const rename = require('gulp-rename')

// 拷贝html
gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'))
})

//压缩js文件
gulp.task('scripts', () => {
    return gulp.src('src/js/**/*')
        //将es6编译成es5
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(uglify())
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'))
})

//压缩css文件
gulp.task('styles', () => {
    return gulp.src('src/css/*.css')
        .pipe(cleanCSS())
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
})

// 拷贝iconfont文件夹
gulp.task('iconfont', () => {
    return gulp.src('src/css/iconfont/*')
        .pipe(gulp.dest('dist/css/iconfont'))
})

//压缩图片
gulp.task('images', () => {
    return gulp.src('src/imgs/*')
        .pipe(imageMin())
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/imgs'))
})

//监视copy任务
gulp.task('auto', () => {
    gulp.watch('src/*.html', gulp.series('html'))
    gulp.watch('src/js/**/*', gulp.series('scripts'))
    gulp.watch('src/css/**/*', gulp.series('styles'))
    gulp.watch('src/css/iconfont/*', gulp.series('iconfont'))
    gulp.watch('src/imgs/*', gulp.series('images'))
})

//默认任务
gulp.task('default', gulp.series('html', 'scripts', 'styles', 'iconfont', 'images', 'auto'))