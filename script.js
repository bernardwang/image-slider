var SLIDER_CLASS = 'slider';
var IMAGE_CLASS = 'slider-image';
var IMAGE_SHOW_CLASS = 'slider-image show';


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
	var sliders = document.getElementsByClassName('slider');
	for(var sliderIndex = 0; sliderIndex < sliders.length; sliderIndex++) {
		var slider = sliders[sliderIndex];
		var images = slider.children[0].children; // hardcoded, FIX LATER
		var nav = slider.children[1].children[0]; // hardcoded, FIX LATER

		for(var i = 0; i < images.length; i++) {
			(function(index) {
				var trigger = document.createElement('li');
				trigger.className = 'slider-trigger';
				trigger.addEventListener('click', function() {
					slideTo(images,index);
				});
				images[i].addEventListener('click', function() {
					slideNext(images,index);
				});
				nav.appendChild(trigger);
			})(i);
		}
	}
};

init();