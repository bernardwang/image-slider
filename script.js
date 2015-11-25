var SLIDER_CLASS = 'slider';
var IMAGE_CLASS = 'gallery-image';
var IMAGE_SHOW_CLASS = 'gallery-image show';
var TRIGGER_CLASS = 'nav-trigger';


var slideTo = function(images, index) {
	for(var i = 0; i < images.length; i++) {
		images[i].className = IMAGE_CLASS;	
	}
	images[index].className = IMAGE_SHOW_CLASS;
};

var slideNext = function(images, index) {
	var num_images = images.length;
	var nextIndex = (index+1) % num_images;
	images[index].className = IMAGE_CLASS;
	images[nextIndex].className = IMAGE_SHOW_CLASS;
};


/**
 *	Adds event listeners
 *
 *	TODO: more robust, less assumptions
 */
var init = function() {
	var sliders = document.getElementsByClassName(SLIDER_CLASS);
	for(var slideIndex = 0; slideIndex < sliders.length; slideIndex++) {
		var slider = sliders[slideIndex];
		var images = slider.children[0].children; // hardcoded, FIX LATER
		
		var nav = slider.children[1]; // hardcoded, FIX LATER
		var navSpacing = nav.dataset.spacing; // get spacing from data attribute
		var navLeft = nav.children[0];	// hardcoded, FIX LATER
		var navRight = nav.children[2];	// hardcoded, FIX LATER
		
		if(navSpacing < 0 || navSpacing > images.length) {
			console.log('Spacing attribute on slider is invalid');
			navSpacing = images.length;
		}
		
		for(var i = 0; i < images.length; i++) {
			(function(index) {
				// Create nav trigger
				var trigger = document.createElement('li');
				trigger.className = TRIGGER_CLASS;
				trigger.addEventListener('click', function() {
					slideTo(images,index);
				});
				
				// Separate nav trigger lists
				if(index < navSpacing){
					navLeft.appendChild(trigger);
				}
				else{
					navRight.appendChild(trigger);	
				}
				
				// Next image on click
				images[i].addEventListener('click', function() {
					slideNext(images,index);
				});
			})(i);
		}
	}
};

init();