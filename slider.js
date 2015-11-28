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
		NAV: 'slider-nav',
		LIST: 'nav-list',
		LABEL: 'nav-label',
		SPACING: 'nav-spacing',
		DOT: 'nav-dot',
		DOT_SELECTED: 'nav-dot select'
	};

	/**
	 *	Animates image
	 */
	var updateImage = function (newIndex) {
		var position = -500 * newIndex + 'px';
		Velocity(images[0].parentElement, { translateX: position }, 500);
	}

	/**
	 *	Selects a new nav
	 */
	var updateNav = function (newIndex) {
		if (newIndex < 0 || newIndex >= images.length) {
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
		if (newIndex < spacing) {
			navList1.children[newIndex + 1].className = CLASSNAME.DOT_SELECTED;
		} else {
			navList2.children[newIndex - spacing + 1].className = CLASSNAME.DOT_SELECTED;
		}
	};

	/**
	 *	Updates image and nav dots
	 */
	var update = function (newIndex) {
		if (newIndex < 0 || newIndex >= images.length) {
			console.log('Invalid index, out of bounds');
			return;
		}

		updateImage(newIndex);
		updateNav(newIndex);
		currIndex = newIndex;
	}

	var initArrows = function () {
		var numImages = images.length;
		var nextArrow = gallery.children[1];
		var prevArrow = gallery.children[2];
		nextArrow.addEventListener('click', function () {
			var nextIndex = (currIndex + 1) % numImages;
			update(nextIndex);
		});
		prevArrow.addEventListener('click', function () {
			var prevIndex = ((currIndex - 1) + numImages) % numImages;
			update(prevIndex);
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
		images = gallery.children[0].children[0].children;
		nav = createNav();
		initArrows(); // Adds functionality to next and prev arrows

		// Adds functionality to
		for (var i = 0; i < images.length; i++) {
			// Create nav dot
			var dot = document.createElement('div');
			dot.className = CLASSNAME.DOT;
			(function (index) {
				dot.addEventListener('click', function () {
					update(index);
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
				var nextIndex = (currIndex + 1) % images.length;
				update(nextIndex);
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
