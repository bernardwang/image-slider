/**
 *	Initalizes all sliders
 */
var init = function () {
	var imageSliders = [];
	var elements = document.getElementsByClassName('image-slider');

	for (var i = 0; i < elements.length; i++) {
		var slider = ImageSlider(); // Create new Slider object
		slider.init(elements[i]); // Initialize it with HTML element
		imageSliders.push(slider); // Save the Slider objects
	}

	// for testing loop
	var start = document.getElementById('start');
	var stop = document.getElementById('stop');
	start.addEventListener('click', function () {
		imageSliders[0].startLoop();
	});
	stop.addEventListener('click', function () {
		imageSliders[0].stopLoop();
	});

};

init();
