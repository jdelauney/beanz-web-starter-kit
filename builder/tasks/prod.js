/*------------------------------------------------------------------------------------------------- 
 * Tâches Gulpjs : "production"
 *
 * Commande Gulpjs pour la mise en production des fichiers de dev
 *
 * 
 * Ligne de commande : 
 *   - gulp build : Génération et optimisation des fichiers de dev vers la production
 *
 * ------------------------------------------------------------------------------------------------ 
 * https://github.com/jdelauney/web-gulp-starter-kit
 * Licensed under MIT Open Source
  ------------------------------------------------------------------------------------------------- */
const { src, dest, series, task, parallel} = require('gulp');
const { prodOptions } = require('../settings');

/* Pour compiler les fichiers sass */
const sass = require('gulp-dart-sass');
/* Pour faire du post-process sur les fichiers css */
const postcss = require('gulp-postcss');
/* Pour supprimer les classes non utilisées dans le css */
const purgecss = require('gulp-purgecss');
/* Pour concatener des fichiers */
const concat = require('gulp-concat');
/* Optimisation des images */
const imagemin = require('gulp-imagemin');
/* amelioration de la compression des images */
const imageminZopfli = require('imagemin-zopfli');
/* Optimisation des images PNG*/
const imageminPngquant = require('imagemin-pngquant');
/* Optimisation des images JPEG*/
const imageminMozjpeg = require('imagemin-mozjpeg');
/* convertion des images vers le format webp */
const imageminWebp = require('imagemin-webp');
/* Met en cache les fichiers générés */
const cache = require('gulp-cache');
/* pour supprimer des dossiers et fichiers */
const del = require('del');
/* pour renommer des fichiers */
const rename = require('gulp-rename');
/* pour minifier les fichiers javascript */
const minify = require('gulp-minify');
/* pour minifier les fichiers html */
const htmlmin = require('gulp-html-minifier-terser');

/* ------------------------------------------------------------------------------------------
 * * [ Méthodes POST-PROCESS ]
 -------------------------------------------------------------------------------------------*/
/* Autoprefix des propriétés et valeurs css */
const autoprefixer = require('autoprefixer');
/* Compactage des medias queries */
const mqpacker = require('postcss-sort-media-queries');
/* Minification du css */
const cssnano = require('cssnano');


function cleanBuild(callback) {
  del.sync(
    `${prodOptions.distDir}/**`, 
    {force:true}
  );
  callback();
}

/*
 * * Compilation des fichiers sass, autoprefixage, nettoyage et minification
 */
function compile_css(callback) {
  const processors = [
    autoprefixer(),
    mqpacker({sort: 'mobile-first'}),
    cssnano({
        preset: ['default', {
            // preset options here, e.g...
            discardComments: { removeAll: true }
        }]
    })
  ]; 

  src(`${prodOptions.css.scssDir}/*.scss`, { allowEmpty: true }) 
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(processors))       
  .pipe(dest(`${prodOptions.css.distDir}`));  

  callback();
}

/*
* * Suppression des classes css non utilisée
*/
function purge_css(callback) {
  src(`${prodOptions.css.distDir}/**/*.css`)
  .pipe(
    purgecss({
      content: [`${prodOptions.js.srcDir}/**/*.js`, `${prodOptions.srcDir}/**/*.html`],      
      variables: true,      
      fontFace: true,
      keyframes: true     
    })
  )
  // .pipe(
  //   rename({
  //     suffix: '-min'
  //   })
  // )
  .pipe(dest(`${prodOptions.css.distDir}`));

  callback();
}

/*
* * Optimisation des images png, jpg, svg et gif
*/
function optimize_images(callback) {
  src(`${prodOptions.images.srcDir}/**/*.{gif,png,jpg,svg}`)
  .pipe(cache(imagemin([
      imageminZopfli({
        more: true
        // iterations: 50 // very slow but more effective
      }),
      //png
      imageminPngquant({
        speed: 1,
        quality: [0.90, 1] //lossy settings
      }),
      //gif
      imagemin.gifsicle({
        interlaced: true,
        optimizationLevel: 3
      }),      
      //jpg 
      imageminMozjpeg({
        progressive:true,
        quality: 75
      }),
      //svg
      imagemin.svgo({
        plugins: [{
            removeViewBox: false
        }]
      }),
      
  ])))
  .pipe(dest(`${prodOptions.images.distDir}`));
  callback();
}

/*
* * Minification des fichiers javascript
*/
function minify_js(callback) {
  src(`${prodOptions.js.srcDir}/**/*.js`)
  .pipe(minify({
    ext:{
        min:'.js'
    },
    compress: true,
    noSource: true      
  }))
  .pipe(dest(`${prodOptions.js.distDir}`));
  callback();
}

/*
* * Minification des fichiers html (https://github.com/terser/html-minifier-terser)
*/
function minify_html(callback) {
  src(`${prodOptions.srcDir}/**/*.html`)
  .pipe(htmlmin({ 
    html5:true,
    collapseWhitespace: true,
    //removeComments:true;
  }))
  .pipe(dest(`${prodOptions.distDir}`));
  callback();
}

/*
* * Conversion des images gif, png et jpg vers le format webp
*/
function convert_images_to_webp(callback) {
  src(`${prodOptions.images.distDir}/**/*.{gif,png,jpg}`)
  .pipe(imagemin([
    imageminWebp({
      quality: 50,
      autoFilter: true
    })
  ]))
  .pipe(
    rename({
      extname: '.webp'
    })
  )
  .pipe(dest(`${prodOptions.images.distDir}/webp`));
  callback();
}

/*
* * Copie les fichiers fonts
*/
function copy_fonts(callback) {
  src(`${prodOptions.fonts.srcDir}/**/*.*`)
  .pipe(dest(`${prodOptions.fonts.distDir}`));
  callback();
}

/*
* * Copie les fichiers videos
*/
function copy_videos(callback) {
  src(`${prodOptions.videos.srcDir}/**/*.*`)
  .pipe(dest(`${prodOptions.videos.distDir}`));
  callback();
}

/*
* * Copie les fichiers audios
*/
function copy_sounds(callback) {
  src(`${prodOptions.sounds.srcDir}/**/*.*`)
  .pipe(dest(`${prodOptions.sounds.distDir}`));
  callback();
}


task('cleanBuild', series(cleanBuild));
task('build', series(cleanBuild, compile_css, minify_js, minify_html,                
              optimize_images, convert_images_to_webp, purge_css,
              parallel(copy_fonts, copy_videos, copy_sounds)));