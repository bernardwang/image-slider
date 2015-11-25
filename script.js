var slideNext = function(images, index){
	var num_images = images.length;
	var nextIndex = (index+1) % num_images;
	images[index].className = 'slider-image';
	images[nextIndex].className = 'slider-image show';
}


/**
 *	Adds event listeners
 *
 *	TODO: more robust, less assumptions
 */
var init = function() {
	var sliders = document.getElementsByClassName('slider');
	for(var sliderIndex = 0; sliderIndex < sliders.length; sliderIndex++) {
		var slider = sliders[sliderIndex];
		
		var images = slider.children[0].gallery.children; // hardcoded
		var nav = slider.children[1];

		for(var i = 0; i < images.length; i++) {
			(function(index) {
				images[i].addEventListener('click',function() {
					slideNext(images,index);
				});
			})(i);
		}
	}
};

init();