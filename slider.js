//
//	Slider.js
//

var Slider = function () {

	var currIndex = 0;
	var numImages = 0;
	var timer = 0;

	var gallery; 	// Slider gallery element
	var images; 	// Gallery image elements
	var nav; 			// Nav element containing nav lists

	// Options
	var config = {
		spacing		: 0,		// Where size of nav lists
		label1		: '',		// First nav list name
		label2		: '',		// Second nav list name
		width			: '',		// Gallery width
		height		: '',		// Gallery height
		slide			: 500,	// Slide transition duration
		loop			: 5000	// Loop duration
	}

	// Element class name constants
	var CLASSNAME = {
		GALLERY			: 'slider-gallery',
		WRAPPER			: 'gallery-wrapper',
		HOLDER			: 'gallery-holder',
		ARROW_NEXT	: 'gallery-arrow next',
		ARROW_PREV	: 'gallery-arrow prev',
		NAV					: 'slider-nav',
		LIST				: 'nav-list',
		LABEL				: 'nav-label',
		SPACING			: 'nav-spacing',
		DOT					: 'nav-dot',
		DOT_SELECT	: 'nav-dot select'
	};

	/**
	 *	Animates image transition
	 */
	var updateImage = function (newIndex) {
		var holder = images[0].parentElement; // Parent div of images
		var position = -(config.width) * newIndex + 'px';
		Velocity(holder, { translateX: position }, config.slide);
	};

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

		if(!loop && timer != 0) { // resets timer if from mouse click
			startLoop();
		}
	};

	/**
	 *	Binds listeners to gallery arrows
	 */
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
	};

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

	var createNav = function () {
		nav = document.createElement('nav');
		nav.className = CLASSNAME.NAV;
		nav.appendChild(createNavList(config.label1)); // Append first list

		// Valid spacing attribute, append spacer div and second list
		// Otherwise only use first list
		if (config.spacing > 0 && config.spacing < numImages) {
			var navSpacing = document.createElement('div');
			navSpacing.className = CLASSNAME.SPACING;
			nav.appendChild(navSpacing);
			nav.appendChild(createNavList(config.label2));
		} else {
			config.spacing = numImages;
		}
	};

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

		initArrows(); 														// Binds listeners to arrows
		images = holder.children;									// Sets image array
		if(!config.width || !config.height) {			// If size not specified, set to first image size
			config.width = images[0].width;
			config.height = images[0].height;
		}
		wrapper.style.width = config.width+'px';	// Set gallery to correct size
		wrapper.style.height = config.height+'px';
	};

	/**
	 *	Sets interval for slide advance
	 */
	var startLoop = function () {
		stopLoop();
		timer = setInterval(function () {
			var nextIndex = (currIndex + 1) % numImages;
			update(nextIndex,true);
		}, config.loop);
	};

	/**
	 *	Clears and resets timer
	 */
	var stopLoop = function () {
		clearInterval(timer);
		timer = 0;
	};

	/**
	 *	Populates DOM with gallery and nav, adds event listeners
	 */
	var initSlide = function (slider) {
		// Slider data attributes
		config.spacing = slider.dataset.spacing;
		config.label1 = slider.dataset.label1;
		config.label2 = slider.dataset.label2;
		config.width = slider.dataset.width;
		config.height = slider.dataset.height;
		numImages = slider.children.length;

		// Move images to fragment
		var imageFrag = document.createDocumentFragment();
		for (var i = 0; i < numImages; i++) {
			imageFrag.appendChild(slider.children[0]);
		}

		createGallery(imageFrag); // Create gallery element with image fragment
		createNav(); // Create nav element with images initilized;

		// Adds functionality to
		for (var i = 0; i < numImages; i++) {
			// Create nav dot, add to appropriate nav list
			var dot = createNavDot(i);
			var listIndex = (i < config.spacing) ? 0 : 2; 	// FIX LATER
			nav.children[listIndex].appendChild(dot);

			// Next image on click
			images[i].addEventListener('click', function () {
				var nextIndex = (currIndex + 1) % numImages;
				update(nextIndex);
			});

			// Show images
			images[i].style.display = 'block';
		}

		slider.appendChild(gallery);
		slider.appendChild(nav);
		update(0); // Selects the first image
	};

	/**
	 *	Public methods
	 */
	return {
		init				: initSlide,
		startLoop 	: startLoop,
		stopLoop 		: stopLoop
	};

};
