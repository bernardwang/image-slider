/**
 *	Initalizes all sliders
 */
var init = function() {
	var sliders = [];
	var elements = document.getElementsByClassName('slider');
	for(var i = 0; i < elements.length; i++) {
		var slider = Slider();
		slider.init(elements[i]);
		sliders.push(slider);
	}
};

init();
