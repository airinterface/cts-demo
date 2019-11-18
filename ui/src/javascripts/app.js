import './views/MapContainer'

/**
 * main app that initialize main vue app. 
 */
class App {
   constructor(){
      var data = {
      };
	   	var vm = new Vue({
		  el: '#app', 
		  data: data
		})


   }
}

App.initialize = function(){
	self.$app = new App();
};

if (document.readyState === 'loading') {  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', App.initialize);
} else {  // `DOMContentLoaded` has already fired
  App.initialize();
}