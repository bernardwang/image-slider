//
//	Slider.js
//

var Slider = function () {

	var currIndex = 0;
	var numImages = 0;

	var gallery; // Slider gallery element
	var images; // Gallery image elements
	var nav; // Nav element containing nav lists

	var spacing; // Spacing for nav lists
	var label1; // First nav list label
	var label2; // Second nav list label

	// Element class name constants
	var CLASSNAME = {
		GALLERY: 'slider-gallery',
		WRAPPER: 'gallery-wrapper',
		HOLDER: 'gallery-holder',
		ARROW_NEXT: 'gallery-arrow next',
		ARROW_PREV: 'gallery-arrow prev',
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
		var holder = images[0].parentElement; // Parent div of images
		var position = -500 * newIndex + 'px';
		Velocity(holder, { translateX: position }, 500); // ANIMATION
	}

	/**
	 *	Selects a new nav
	 */
	var updateNav = function (newIndex) {
		if (newIndex < 0 || newIndex >= numImages) {
			console.log('Invalid index out of bounds');
			return;
		}

		var navList1 = nav.children[0];	// hardcoded, FIX LATER
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
		if (newIndex < 0 || newIndex >= numImages) {
			console.log('Invalid index, out of bounds');
			return;
		}
		updateImage(newIndex);
		updateNav(newIndex);
		currIndex = newIndex;
	}

	var initArrows = function () {
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

	var createNavDot = function (index) {
		var dot = document.createElement('div');
		dot.className = CLASSNAME.DOT;
		dot.addEventListener('click', function () {
			update(index);
		});
		return dot;
	}

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
		nav = document.createElement('nav');
		nav.className = CLASSNAME.NAV;
		nav.appendChild(createNavList(label1)); // Append first list

		// Valid spacing attribute, append spacer div and second list
		// Otherwise only use first list
		if (spacing > 0 && spacing < numImages) {
			var navSpacing = document.createElement('div');
			navSpacing.className = CLASSNAME.SPACING;
			nav.appendChild(navSpacing);
			nav.appendChild(createNavList(label2));
		} else {
			console.log('Spacing attribute on slider is invalid');
			spacing = numImages;
		}
	};

	/**
	 *	Initializes Gallery
	 *
	 *	TODO: use template? something less ugly than this
	 */
	var createGallery = function (imageFrag) {
		gallery = document.createElement('div');
		var wrapper = document.createElement('div');
		var holder = document.createElement('div');
		var next = document.createElement('div');
		var prev = document.createElement('div');
		gallery.className = CLASSNAME.GALLERY;
		wrapper.className = CLASSNAME.WRAPPER;
		holder.className = CLASSNAME.HOLDER;
		next.className = CLASSNAME.ARROW_NEXT;
		prev.className = CLASSNAME.ARROW_PREV;
		gallery.appendChild(wrapper);
		gallery.appendChild(next);
		gallery.appendChild(prev);
		wrapper.appendChild(holder);
		holder.appendChild(imageFrag);

		images = holder.children;	// Sets image array
		initArrows(); // Binds listeners to arrows
	};

	/**
	 *	Populates DOM with gallery and nav, adds event listeners
	 */
	var initSlide = function (slider) {
		// Slider data attributes
		spacing = slider.dataset.spacing;
		label1 = slider.dataset.label1;
		label2 = slider.dataset.label2;
		numImages = slider.children.length;

		// Initialize images
		var imageFrag = document.createDocumentFragment();
		for(var i = 0; i < numImages; i++) {
			imageFrag.appendChild(slider.children[0]);
		}

		createGallery(imageFrag); // Create gallery element with image fragment
		createNav(); // Create nav element with images initilized;

		// Adds functionality to
		for (var i = 0; i < numImages; i++) {
			// Create nav dot, add to appropriate nav list
			var dot = createNavDot(i);
			var listIndex = (i < spacing) ? 0 : 2; 	// FIX LATER
			nav.children[listIndex].appendChild(dot);

			// Next image on click
			images[i].addEventListener('click', function () {
				var nextIndex = (currIndex + 1) % numImages;
				update(nextIndex);
			});
		}

		slider.appendChild(gallery);
		slider.appendChild(nav);
		update(0); // Selects the first image
	};

	/**
	 *	Public methods
	 */
	return {
		init: initSlide
	};

};
