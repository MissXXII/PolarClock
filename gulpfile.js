// Composant principal
var gulp = require('gulp');

// Composant de concaténation
var concat = require('gulp-concat');

// Uglification
var uglify = require('gulp-uglify');

// Pour renommer le fichier de sortie
var rename = require("gulp-rename");

// Sourcemaps
var sourcemaps = require('gulp-sourcemaps');

// Synchronisation avec la navigation
// pour charger à chaud les modifications
// des fichiers JS
var browserSync = require('browser-sync');


// Routes redirection
var proxy = require('proxy-middleware');

// Param url
var url = require('url');

// Tâche princiapale qui récupère tous
// les fichiers JS, les concatène, "minifie"
// et les "uflifie". On ajoute également
// l'extension ".min.js"
gulp.task('js', function() {
    return gulp.src(['src/**/eventEmitter.js','src/**/model.js','src/**/arc.js','src/**/view.js','src/**/controller.js','src/**/app.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('dist/app.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'));
});

// Tâche d'écoute sur les fichiers JS.
// Elle dépend  de la tâche "js".
gulp.task('js-watch', ['js'], browserSync.reload);

// Tâche principale qui permet d'agir comme un serveur web.
// Elle appelle également la tâche "js-watch" qui à son tour
// appelle la tâche "js"
gulp.task('serve', ['js'], function() {
    var proxyOptions = url.parse("http://localhost:8080/polarclock");
    proxyOptions.route = '/polarclock';
    browserSync({
        open:true,
        port:3000,
        server: {
            baseDir: "./",
            middleware: [proxy(proxyOptions)]
        }
    });
    gulp.watch('src/**/*.js', ['js-watch']);
    gulp.watch("./**/*.html").on('change', browserSync.reload);
});
