var gulp = require("gulp");
var less = require("gulp-less");
var browserSync = require("browser-sync");


gulp.task("less",function() {
    return gulp.src("./less/app.less")
                .pipe(less())
                .pipe(gulp.dest("./css/"))
                .pipe(browserSync.reload({
                    stream: true
                }))
})
gulp.task("html",function() {
    return gulp.src("./index.html")
                .pipe(browserSync.reload({
                    stream: true
                }))
})
gulp.task("js-watch",function() {
    return gulp.src("./scripts/*.js")
                .pipe(browserSync.reload({
                    stream: true
                }))
})

gulp.task("watch", ["browserSync", "less","html"], function() {

    gulp.watch("./less/*.less",["less"]);
    gulp.watch("./index.html",["html"]);
    gulp.watch("./scripts/*.js",["js-watch"]);

})
gulp.task("browserSync",function () {
    browserSync({
        server: {
            baseDir: "../qq-music",
        }
    })
})