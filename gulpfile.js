const {src,dest,watch,series,parallel} = require ('gulp');
const sass = require ('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

function css(done){
    //identificar donde esta el archivo
    src('src/scss/app.scss')
        //compilar SASS
        .pipe(sass())
        //guardarlo en una ubicación
        .pipe(dest('build/css'))

    done();
}

function dev(done){
    watch('src/scss/**/*.scss',css);

    done();
}

function imagenes(done){
    //identificar donde esta el archivo
    src('src/img/**/*')
        //compilar SASS
        .pipe(imagemin({
            optimizationLevel:3
        }))
        //guardarlo en una ubicación
        .pipe(dest('build/img'))

    done();
}

function cssBuild(done){

    src('build/css/app.css')
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(purgecss({
        content: ['index.html']
    }))
    .pipe(dest('build/css'))
    done();
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.build = cssBuild;

exports.default = parallel(css,dev);