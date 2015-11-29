/**
 *	Initalizes all sliders
 */
var init = function() {
	var sliders = [];
	var elements = document.getElementsByClassName('slider');

	for(var i = 0; i < elements.length; i++) {
		var slider = Slider();	// Create new Slider object
		slider.init(elements[i]);	// Initialize it with HTML element
		sliders.push(slider);	// Save the Slider object
	}

	// for testing loop
	var start = document.getElementById('start');
	var stop = document.getElementById('stop');
	start.addEventListener('click',function(){
		sliders[0].startLoop();
	});
	stop.addEventListener('click',function(){
		sliders[0].stopLoop();
	});

};

init();
