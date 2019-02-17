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

gulp.task("watch", ["browserSync", "less"], function () {
    gulp.watch("less/*.less",["less"])
})

gulp.task("browserSync",function () {
    browserSync({
        server: {
            baseDir: "../qq-music",
            index: "index.html"
        }
    })
    // browserSync({
    //     server: {
    //         baseDir: ""
    //     }
    // })
})

