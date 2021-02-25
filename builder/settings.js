/* ------------------------------------------------------------------------------------------------------
* Configuration des variables pour les modes "Développement" et "Production"
 -------------------------------------------------------------------------------------------------------- */

const DevOptions = function () {
	const config = this;

  config.srcDir = './dev';   
	config.distDir = './dev'; 

  config.css = {
		scssDir: `${config.srcDir}/styles/scss`,
		distDir: `${config.distDir}/styles/css`, 
		devDir: `${config.srcDir}/styles`, 

		// Renaming this changes the name of the generated CSS file
		// Make sure you update your template file
		//distFileName: 'devBuild' 
  };
  
// Javascript-related vars
	config.js = {
		srcDir: `${config.srcDir}/scripts`,
    //entry-points		
		distDir: `${config.distDir}/scripts`,

		//distFileName: 'devBuild'
  };
};  

const ProdOptions = function () {
	const config = this;

  config.srcDir = './dev';   
	config.distDir = './prod'; 

  config.css = {
		scssDir: `${config.srcDir}/styles/scss`,
		distDir: `${config.distDir}/styles/css`, 
		srcDir: `${config.srcDir}/styles`, 

		// Renaming this changes the name of the generated CSS file
		// Make sure you update your template file
		//distFileName: 'default' 
  };
  
// Javascript-related vars
	config.js = {
		srcDir: `${config.srcDir}/scripts`,
    //entry-points		
		distDir: `${config.distDir}/scripts`,

		//distFileName: 'default'
  };

	config.fonts = {
		srcDir: `${config.srcDir}/assets/fonts`, 
		distDir: `${config.distDir}/assets/fonts`
	}; 

  config.videos = {
    srcDir: `${config.srcDir}/assets/videos`, 
    distDir: `${config.distDir}/assets/videos`
  };

  config.images = {
    srcDir: `${config.srcDir}/assets/images`, 
    distDir: `${config.distDir}/assets/images`
  };   

  config.sounds = {
    srcDir: `${config.srcDir}/assets/sounds`, 
    distDir: `${config.distDir}/assets/sounds`
  };   
};  

module.exports = {
  devOptions : new DevOptions(),
  prodOptions : new ProdOptions()
};
