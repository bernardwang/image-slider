//
//	Slider.js
//

var Slider = function () {

	var currIndex = 0;

	var gallery; // Slider gallery element
	var images; // Gallery image elements
	var spacing; // Spacing for nav lists
	var label1; // First nav list label
	var label2; // Second nav list label

	// Element class name constants
	var CLASSNAME = {
		IMAGE: 'gallery-image',
		IMAGE_SHOW: 'gallery-image show',
		NAV: 'slider-nav',
		LIST: 'nav-list',
		LABEL: 'nav-label',
		SPACING: 'nav-spacing',
		TRIGGER: 'nav-trigger'
	};

	/**
	 *	Advances a slider to a specified index
	 */
	var slideTo = function (index) {
		if (index < 0 || index >= images.length) {
			console.log('Slide advance out of bounds');
			return;
		}
		images[currIndex].className = CLASSNAME.IMAGE;
		images[index].className = CLASSNAME.IMAGE_SHOW;
		currIndex = index;
	};

	/**
	 *	Advances a slider to the next image
	 */
	var slideNext = function () {
		var num_images = images.length;
		var nextIndex = (currIndex + 1) % num_images;
		images[currIndex].className = CLASSNAME.IMAGE;
		images[nextIndex].className = CLASSNAME.IMAGE_SHOW;
		currIndex = nextIndex;
	};

	/**
	 *	Advances a slider to the prev image
	 */
	var slidePrev = function () {
		var num_images = images.length;
		var prevIndex = ((currIndex - 1) + num_images) % num_images;
		images[currIndex].className = CLASSNAME.IMAGE;
		images[prevIndex].className = CLASSNAME.IMAGE_SHOW;
		currIndex = prevIndex;
	};

	/**
	 *	Initializes nav list
	 */
	var createNavList = function (text) {
		var navList = document.createElement('ul');
		var navLabel = document.createElement('div');
		var labelText = document.createTextNode(text);
		navLabel.className = CLASSNAME.LABEL;
		navList.className = CLASSNAME.LIST;
		navLabel.appendChild(labelText);
		navList.appendChild(navLabel);
		return navList;
	};

	/**
	 *	Initializes nav
	 */
	var createNav = function () {
		var nav = document.createElement('nav');
		nav.className = CLASSNAME.NAV;

		// Append first list
		nav.appendChild(createNavList(label1));

		// Valid spacing attribute, append spacer div and second list
		// Otherwise only use first list
		if (spacing > 0 && spacing < images.length) {
			var navSpacing = document.createElement('div');
			navSpacing.className = CLASSNAME.SPACING;
			nav.appendChild(navSpacing);
			nav.appendChild(createNavList(label2));
		} else {
			console.log('Spacing attribute on slider is invalid');
			spacing = images.length;
		}

		return nav;
	};

	/**
	 *	Binds events to slider, adds nav bar, adds auto advance sliding
	 *
	 *	TODO: more robust, less assumptions
	 */
	var initSlide = function (slider) {

		// Initialize instance variables
		gallery = slider.children[0];
		images = gallery.children[0].children;
		var nextArrow = gallery.children[1];
		var prevArrow = gallery.children[2];

		// Slider data attributes
		spacing = slider.dataset.spacing;
		label1 = slider.dataset.label1;
		label2 = slider.dataset.label2;

		nextArrow.addEventListener('click', function () {
			slideNext();
		});

		prevArrow.addEventListener('click', function () {
			slidePrev();
		});

		// Get nav element
		var nav = createNav();

		for (var i = 0; i < images.length; i++) {
			// Create nav trigger
			var trigger = document.createElement('li');
			trigger.className = CLASSNAME.TRIGGER;
			(function (index) {
				trigger.addEventListener('click', function () {
					slideTo(index);
				});
			})(i);

			// Add to appropriate nav list
			// hardcoded to account for spacer, FIX LATER
			if (i < spacing) {
				nav.children[0].appendChild(trigger);
			} else {
				nav.children[2].appendChild(trigger);
			}

			// Next image on click
			images[i].addEventListener('click', function () {
				slideNext();
			});
		}

		slider.appendChild(nav);
	};

	/**
	 *	Public methods
	 */
	return {
		init: initSlide
	};

};
