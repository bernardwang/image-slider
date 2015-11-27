//
//	Slider.js
//

var Slider = function () {

	var currIndex = 0;

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
		DOT: 'nav-dot',
		DOT_SELECTED: 'nav-dot selected'
	};

	var updateImage = function (index) {
		images[currIndex].className = CLASSNAME.IMAGE;
		images[index].className = CLASSNAME.IMAGE_SELECTED;
	}

	/**
	 *	Selects a new nav
	 */
	var updateNav = function (index) {
		if (index < 0 || index >= images.length) {
			console.log('Invalid index out of bounds');
			return;
		}

		var navList1 = nav.children[0];
		var navList2 = nav.children[2];

		// Update dot in correct list
		if (currIndex < spacing) {
			navList1.children[currIndex + 1].className = CLASSNAME.DOT;
		} else {
			navList2.children[currIndex - spacing + 1].className = CLASSNAME.DOT;
		}
		if (index < spacing) {
			navList1.children[index + 1].className = CLASSNAME.DOT_SELECTED;
		} else {
			navList2.children[index - spacing + 1].className = CLASSNAME.DOT_SELECTED;
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
		initArrows(); // Adds functionality to next and prev arrows

		// Adds functionality to
		for (var i = 0; i < images.length; i++) {
			// Create nav dot
			var dot = document.createElement('div');
			dot.className = CLASSNAME.DOT;
			(function (index) {
				dot.addEventListener('click', function () {
					slideTo(index);
				});
			})(i);

			// Add to appropriate nav list
			// hardcoded to account for spacer, FIX LATER
			if (i < spacing) {
				nav.children[0].appendChild(dot);
			} else {
				nav.children[2].appendChild(dot);
			}

			// Next image on click
			images[i].addEventListener('click', function () {
				slideNext();
			});
		}

		slider.appendChild(nav); // Adds nav to DOM
		update(0); // Selects the first image
	};

	/**
	 *	Public methods
	 */
	return {
		init: initSlide
	};

};
