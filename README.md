# custom-slider	

## About
A custom slider widget built for [Lisa](https://github.com/LisaVuong)

Built with plain JS, [Velocity.js](http://julian.com/research/velocity/), and SASS/Compass

Demo at [http://bernard.wang/image-slider/](http://bernard.wang/image-slider/)

## Features
* Multiple sliders on a page, each controlled independently
* No id's needed
* No JQuery needed
* Simple slider markup, rest of the HTML is builtout with JS
* Responsive!
* Optional settings with HTML data attributes
  * 'data-spacing' - Option for having separated images, sets position of divider
  * 'data-label1', 'data-label2' - If spacing attribute is set, these two labels will be shown
* Methods
	* start - Automatically slide after duration
	* stop - Stop automatic sliding
	* next - Advance to next slide
	* prev - Advance to previous slide
	
## Usage

HTML
```
<figure class='image-slider'
		 data-spacing='0'			
		 data-label1='Final'	
		 data-label2='Process'>		
	<img class='gallery-image'src=''/>
	<img class='gallery-image'src=''/>
	<img class='gallery-image'src=''/>
	<img class='gallery-image'src=''/>
</figure>
```

JS
```javascript
var imageSliders = []; // List of all sliders
var elements = document.getElementsByClassName('image-slider'); // Select every slider element
for (var i = 0; i < elements.length; i++) {
	var slider = ImageSlider(); // Create new Slider object
	slider.init(elements[i]); // Initialize it
	imageSliders.push(slider); // Save the Slider object for future use
}
```