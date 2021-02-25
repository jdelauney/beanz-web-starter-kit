/* ------------------------------------------------------------------------------------------
 * * [ Importation des modules ]
 -------------------------------------------------------------------------------------------*/
/**
 * Tâches Gulp:
 * - gulp                : Tâche par défaut. Alias pour `gulp help`
 * - gulp devBuild       : Compilation des fichiers scss du dossier dev/styles/scss vers dev/styles
 * - gulp watch          : Observation et compilation auto des fichiers scss/js/html du dossier dev vers dev
 */



const { src, dest, series, parallel, watch, lastrun, task } = require('gulp');

const config = require('./builder/settings');

/*===========================================================================================*/
const imports = require('./builder/initialize.js');
/* ------------------------------------------------------------------------------------------
 * * [ Définition des tâches (Tasks) ]
 -------------------------------------------------------------------------------------------*/


/**
 Colors reference

Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
gulpBgWhite = "\x1b[47m" 

 */
 async function help() {
  console.log("");
  console.log("");
  console.log("\x1b[36m======================================== [ AIDE GULP SASSSWING] ========================================\x1b[0m");
  console.log("");
  console.log("\x1b[4mLancement d'une tâche :\x1b[0m");
  console.log("");
  console.log("  \x1b[31mgulp\x1b[0m \x1b[32m<nom_de_la_tache>\x1b[0m");
  console.log("");
  console.log("\x1b[4m\x1b[34mTâches disponibles pour le mode développement \x1b[0m ===> \x1b[31mles résultats sont envoyés dans le dossier \"dev\" \x1b[0m");
  console.log("");
  console.log("  - \x1b[32mdevBuild\x1b[0m : compile les fichier dev/styles/scss/*.scss dans dev/styles/css/*.css");    
  console.log("");
  console.log("  - \x1b[32mwatch\x1b[0m     : Observation des fichiers sass et compilation auto en cas de modifications");
  console.log("     > Initialisation du serveur live, si besoin"); 
  console.log("     > Observation des fichiers html/sass et compilation auto des fichiers");
  console.log("     > Recharchement des données sur le serveur live ");
  console.log("");
  console.log("\x1b[4m\x1b[33mTâches disponibles pour le mode production \x1b[0m ===> \x1b[31mles résultats sont envoyés dans le dossier \"dist\" \x1b[0m");
  console.log("");
  console.log("  - \x1b[32mcleanBuild\x1b[0m     : Nettoyage du dossier \"prod\""); 
  console.log("  - \x1b[32mbuild\x1b[0m : Déployement du projet en mode production");
  console.log("     > Compilation, épuration et minification des fichiers css.");
  console.log("     > Minification des fichiers html, javascript");
  console.log("     > Copie des ressources videos, audios et fonts");
  console.log("     > Optimisation des images GIF, PNG, JPEG, SVG");
  console.log("     > Conversion des images GIF, PNG, JPEG au format webp dans le dossier assets/images/webp");
  console.log("");
  console.log("\x1b[36m========================================================================================================\x1b[0m");
  console.log("");
  await Promise.resolve('');
 }


/* ------------------------------------------------------------------------------------------
 * * [ Tâches mode DEV ]
 -------------------------------------------------------------------------------------------*/





/*
 * * Observation des fichier sass et mise à jour automatique en cas de changement
 */




/* ------------------------------------------------------------------------------------------
 * * [ Tâches mode PROD ]
 -------------------------------------------------------------------------------------------*/
/* 
 * * Nettoyage du dossier dist
 */
// const prod_clean = () => del([ './dist' ]);


// function prod_build_css() {

// }

// function prod_clean_css() {

// }

// function prod_minify_css() {

// }

// function prod_optimize_images() {

// }

// function prod_minify_js() {
//   return src('./dev/scripts/**/*.js', { allowEmpty: true }) 
//         .pipe(minify({noSource: true}))
//         .pipe(dest('./dist/scripts'));
// }

// function prod_copy_html() {
//   return src('./dev/**/*.html', { allowEmpty: true }) 
//         .pipe(dest('./dist/'));

// }


// function prod_minify_html() {

// }

// function prod_build_zip() {

// }



/* 
 * * Création des fichiers en mode production
 */
// gulp.task('build-prod', function() {
//   const processorsTaskA = [
//     autoprefixer,    
//   ];
//   const processorsTaskB = [
//     autoprefixer,
//     mqpacker({sort: true}),
//     cssnano
//   ];
//   return gulp.src('dev/scss/**/*.scss') // Gets all files ending with .scss in app/scss
//     .pipe(sass().on('error', sass.logError))
//     .pipe(postcss(processorsTaskA))

//     .pipe(purgecss({content: ['dev/**/*.html']}))
//     .pipe(gulp.dest('dist'));    
// });


/* ------------------------------------------------------------------------------------------
 * * [ Exportation des tâches ]
 -------------------------------------------------------------------------------------------*/

//const devBuildCss = require("./builder/tasks/dev_build_css.js");

//task('dev_build_css', devBuildCss.dev_build_css);

 module.exports = {
   /* DEFAULT = AFFICHAGE DE L'AIDE */
   default : help,  

   /* MODE DEV */
//   //dev_build_css,

   /* MODE DEV-WATCH */
   //watch : watchFiles,
//   //syncWatch,

//   /* MODE PROD */
//   prod_clean,
//   prod_minify_js

};