//
//	Slider.js
//

var Slider = function () {

	var currIndex = 0;
			var updateEvent = new Event('update');

	var gallery; // Slider gallery element
	var images; // Gallery image elements
	var nav; // Nav element containing nav lists

	var spacing; // Spacing for nav lists
	var label1; // First nav list label
	var label2; // Second nav list label

	// Element class name constants
	var CLASSNAME = {
		IMAGE: 'gallery-image',
		IMAGE_SELECTED: 'gallery-image selected',
		NAV: 'slider-nav',
		LIST: 'nav-list',
		LABEL: 'nav-label',
		SPACING: 'nav-spacing',
		TRIGGER: 'nav-trigger',
		TRIGGER_SELECTED: 'nav-trigger selected'
	};

	var updateImage = function (index) {
		images[currIndex].className = CLASSNAME.IMAGE;
		images[index].className = CLASSNAME.IMAGE_SELECTED;
	}

	/**
	 *
	 */
	var updateNav = function (index) {
		/*if (index < 0 || index >= images.length) {
			console.log('Invalid index out of bounds');
			return;
		}
		nav.dispatchEvent(updateEvent);*/

		var navList1 = nav.children[0];
		var navList2 = nav.children[2];

		if (currIndex < spacing) {
			navList1.children[currIndex + 1].className = CLASSNAME.TRIGGER;
		} else {
			navList2.children[currIndex + 1 - spacing].className = CLASSNAME.TRIGGER;
		}

		if (index < spacing) {
			navList1.children[index + 1].className = CLASSNAME.TRIGGER_SELECTED;
		} else {
			navList2.children[index + 1 - spacing].className = CLASSNAME.TRIGGER_SELECTED;
		}
	};

	var update = function (index) {
		updateImage(index);
		updateNav(index);
		currIndex = index;
	}

	/**
	 *	Advances a slider to a specified index
	 */
	var slideTo = function (index) {
		if (index < 0 || index >= images.length) {
			console.log('Invalid index out of bounds');
			return;
		}
		update(index);
	};

	/**
	 *	Advances a slider to the next image
	 */
	var slideNext = function () {
		var num_images = images.length;
		var nextIndex = (currIndex + 1) % num_images;
		update(nextIndex);
	};

	/**
	 *	Advances a slider to the prev image
	 */
	var slidePrev = function () {
		var num_images = images.length;
		var prevIndex = ((currIndex - 1) + num_images) % num_images;
		update(prevIndex);
	};

	var initArrows = function () {
		var nextArrow = gallery.children[1];
		var prevArrow = gallery.children[2];
		nextArrow.addEventListener('click', function () {
			slideNext();
		});
		prevArrow.addEventListener('click', function () {
			slidePrev();
		});
	};

	/**
	 *	Initializes nav list
	 */
	var createNavList = function (text) {
		var navList = document.createElement('div');
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
		// Slider data attributes
		spacing = slider.dataset.spacing;
		label1 = slider.dataset.label1;
		label2 = slider.dataset.label2;

		// Initialize instance variables
		gallery = slider.children[0];
		images = gallery.children[0].children;
		nav = createNav();

		for (var i = 0; i < images.length; i++) {
			// Create nav trigger
			var trigger = document.createElement('div');
			trigger.className = CLASSNAME.TRIGGER;
			(function (index) {
				trigger.addEventListener('click', function () {
					slideTo(index);
				});
				/*trigger.addEventListener('update', function () {
					if (index == currIndex) {
						trigger.className = CLASSNAME.TRIGGER_SELECTED;
					} else {
						trigger.className = CLASSNAME.TRIGGER;
					}
				}, true);*/
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

		slider.appendChild(nav); // Adds nav to DOM
		initArrows(); // Adds functionality to next and prev arrows
		update(0); // Selects the first image
	};

	/**
	 *	Public methods
	 */
	return {
		init: initSlide
	};

};
