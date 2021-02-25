
/*------------------------------------------------------------------------------------------------- 
 * Tâches Gulpjs : "development"
 *
 * Commandes Gulpjs en mode développement
 *
 * 
 * Lignes de commande : 
 *   - gulp watch    : Lance le live server et la génération rapide des fichiers css
 *   - gulp devBuild : Compile les fichiers sass (pas de minification) en fichiers css
 *   - gulp devClean : Supprime les fichiers css générés
 *
 * ------------------------------------------------------------------------------------------------
 * https://github.com/jdelauney/web-gulp-starter-kit
 * Licensed under MIT Open Source
  ------------------------------------------------------------------------------------------------- */
const { src, dest, series, task, watch } = require('gulp');
const { devOptions } = require('../settings');

/* Pour compiler les fichiers sass */
const sass = require('gulp-dart-sass');
/* Pour faire du post-process sur les fichiers css */
const postcss = require('gulp-postcss');
/* Pour créer un serveur local permettant un rafraîchissement live */
const browserSync = require('browser-sync').create();
/* pour supprimer des dossiers et fichiers */
const del = require("del");

/* ------------------------------------------------------------------------------------------
 * * [ Méthodes POST-PROCESS ]
 -------------------------------------------------------------------------------------------*/
/* Autoprefix des propriétés et valeurs css */
const autoprefixer = require('autoprefixer');
/* Compactage des medias queries */
const mqpacker = require('postcss-sort-media-queries');

/*
 * * Compilation des fichiers sass
 */
function compile_css(callback) {
  const processors = [
    autoprefixer(),
    mqpacker({sort: 'mobile-first'}),    
  ]; 

  src(`${devOptions.css.scssDir}/*.scss`, { allowEmpty: true }) 
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(processors))
  .pipe(dest(`${devOptions.css.distDir}`));  

  callback();
}


function dev_clean_css(callback) {
  del.sync(
    `${devOptions.css.distDir}/*.css`
  );
  callback();
}

function runLiveServer() {
  browserSync.init({
      server: {
          baseDir:  `${devOptions.srcDir}`
      }
  });
  watch(`${devOptions.css.scssDir}/**/*.scss`, series(compile_css)); 
  watch(`${devOptions.css.distDir}/**/*.css`).on('change', browserSync.reload);
  watch(`${devOptions.js.srcDir}/**/*.js`).on('change', browserSync.reload);
  watch(`${devOptions.srcDir}/**/*.html`).on('change', browserSync.reload);
}



task('devBuild', compile_css);
task('devClean', dev_clean_css);

task('watch',  runLiveServer);

//watch(`${config.css.scssDir}/*.scss`,  dev_compile_css);    

