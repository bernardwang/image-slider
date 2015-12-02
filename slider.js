//
//	Slider.js
//

var Slider = function () {

	var currIndex = 0;
	var numImages = 0;
	var timer = 0;

	var images;
	var navList1;
	var navList2;

	// Options
	var config = {
		spacing			: 0, 		// Where size of nav lists
		label1			: '', 	// First nav list name
		label2			: '', 	// Second nav list name
		width				: '', 	// Gallery width
		height			: '', 	// Gallery height
		slideSpeed	: 500,	// Slide transition duration
		loopSpeed		: 5000	// Loop duration
	};

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
		DOT_SELECT: 'nav-dot select'
	};

	/**
	 *	Animates image transition
	 */
	var updateImage = function (newIndex) {
		var holder = images[0].parentElement; // Parent div of images
		var position = -(100 / numImages) * newIndex + '%';
		Velocity(holder, {
			translateX: position
		}, config.slideSpeed);
	};

	/**
	 *	Selects a new nav
	 */
	var updateNav = function (newIndex) {
		if (newIndex < 0 || newIndex >= numImages) {
			console.log('Invalid index out of bounds');
			return;
		}

		// Update dot in correct list
		if (currIndex < config.spacing) {
			navList1.children[currIndex + 1].className = CLASSNAME.DOT;
		} else {
			navList2.children[currIndex - config.spacing + 1].className = CLASSNAME.DOT;
		}
		if (newIndex < config.spacing) {
			navList1.children[newIndex + 1].className = CLASSNAME.DOT_SELECT;
		} else {
			navList2.children[newIndex - config.spacing + 1].className = CLASSNAME.DOT_SELECT;
		}
	};

	/**
	 *	Updates image and nav dots
	 */
	var update = function (newIndex, loop) {
		if (newIndex < 0 || newIndex >= numImages) {
			console.log('Invalid index, out of bounds');
			return;
		}
		updateImage(newIndex);
		updateNav(newIndex);
		currIndex = newIndex;

		// Resets loop if running
		if (!loop && timer !== 0) {
			startLoop();
		}
	};

	var createNavDot = function (index) {
		var dot = document.createElement('div');
		dot.className = CLASSNAME.DOT;
		dot.addEventListener('click', function () {
			update(index);
		});
		return dot;
	};

	var createNavList = function (text) {
		var list = document.createElement('div');
		var label = document.createElement('div');
		label.className = CLASSNAME.LABEL;
		list.className = CLASSNAME.LIST;
		label.appendChild(document.createTextNode(text));
		list.appendChild(label);
		return list;
	};

	var createNav = function () {
		var nav = document.createElement('nav');
		nav.className = CLASSNAME.NAV;

		// Append first list
		navList1 = createNavList(config.label1);
		nav.appendChild(navList1);

		// Append spacer div and second list if spacing is valid
		if (config.spacing > 0 && config.spacing < numImages) {
			var navSpacing = document.createElement('div');
			navSpacing.className = CLASSNAME.SPACING;
			navList2 = createNavList(config.label2);

			nav.appendChild(navSpacing);
			nav.appendChild(navList2);
		} else {
			config.spacing = numImages;
		}

		// Adds dots to nav lists
		for (var i = 0; i < numImages; i++) {
			var dot = createNavDot(i);
			if (i < config.spacing) {
				navList1.appendChild(dot);
			} else {
				navList2.appendChild(dot);
			}
		}

		return nav;
	};

	var createGalleryArrows = function (gallery) {
		var next = document.createElement('div');
		var prev = document.createElement('div');
		next.className = CLASSNAME.ARROW_NEXT;
		prev.className = CLASSNAME.ARROW_PREV;
		next.addEventListener('click', nextSlide);
		prev.addEventListener('click', prevSlide);
		return [next, prev];
	};

	var createGallery = function (slider) {
		var gallery = document.createElement('div');
		var wrapper = document.createElement('div');
		var holder = document.createElement('div');
		var arrows = createGalleryArrows();
		gallery.className = CLASSNAME.GALLERY;
		wrapper.className = CLASSNAME.WRAPPER;
		holder.className = CLASSNAME.HOLDER;

		// Initialize gallery images
		var imageFrag = document.createDocumentFragment();
		for (var i = 0; i < numImages; i++) {
			var image = slider.children[0];
			imageFrag.appendChild(image);
			image.style.width = 100 / numImages + '%'; // Responsive image width
			image.style.display = 'block'; // Show images
			image.addEventListener('click', nextSlide);
		}
		holder.style.width = 100 * numImages + '%';		// Responsive slide transitions
		wrapper.style.maxWidth = config.width + 'px';	// Set Gallery maxWidth
		wrapper.style.paddingBottom = config.width / config.height * 100 + '%'; // height scales proportionally

		gallery.appendChild(wrapper);
		gallery.appendChild(arrows[0]);
		gallery.appendChild(arrows[1]);
		wrapper.appendChild(holder);
		holder.appendChild(imageFrag);
		images = holder.children; // Saves images

		return gallery;
	};

	/**
	 *	Starts loop for slide advance
	 */
	var startLoop = function () {
		stopLoop();
		timer = setInterval(nextSlide, config.loopSpeed);
	};

	/**
	 *	Clears and resets timer
	 */
	var stopLoop = function () {
		clearInterval(timer);
		timer = 0;
	};

	/**
	 *	Advances to next slide
	 */
	var nextSlide = function () {
		var nextIndex = (currIndex + 1) % numImages;
		update(nextIndex);
	}

	/**
	 *	Advances to previous slide
	 */
	var prevSlide = function () {
		var prevIndex = ((currIndex - 1) + numImages) % numImages;
		update(prevIndex);
	}

	/**
	 *	Gets and removes config variables from data attributes
	 */
	var initConfig = function (slider) {
		config.spacing = slider.dataset.spacing;
		config.label1 = slider.dataset.label1;
		config.label2 = slider.dataset.label2;
		config.width = slider.dataset.width;
		config.height = slider.dataset.height;
		slider.removeAttribute('data-spacing');
		slider.removeAttribute('data-label1');
		slider.removeAttribute('data-label2');
		slider.removeAttribute('data-width');
		slider.removeAttribute('data-height');

		// If size isnt set, default to first image's size
		var firstImg = slider.children[0];
		if (!config.width || !config.height) {
			config.width = firstImg.width;
			config.height = firstImg.height;
		}
	};

	/**
	 *	Populates DOM with gallery and nav, adds event listeners
	 */
	var initSlide = function (slider) {
		initConfig(slider);
		numImages = slider.children.length;

		var gallery = createGallery(slider); // Create gallery element
		var nav = createNav(); // Create nav element
		slider.appendChild(gallery);
		slider.appendChild(nav);

		update(0); // Selects the first image
	};

	/**
	 *	Public methods
	 */
	return {
		init		: initSlide,
		start		: startLoop,
		stop		: stopLoop,
		next		: nextSlide,
		prev		: prevSlide
	};

};
