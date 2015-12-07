# custom-slider	

## About
A custom slider widget built for [Lisa](https://github.com/LisaVuong)

Built with plain JS, [Velocity.js](http://julian.com/research/velocity/), and Compass for styling

Demo at [http://bernard.wang/image-slider/](http://bernard.wang/image-slider/)

## Features
* Multiple sliders on a page, each controlled independently
* No id's needed
* No Jquery
* Simple slider markup, rest of the HTML is builtout with JS
* Responsive! Image ratio is preserved with resizing
* Individual options with HTML data attributes
  * Nav bar spacing
  * Nav bar labels
  * Max width and max height (Also specifies ratio)
* Methods
  * start - Automatically slide after duration (default 5000ms)
  * stop - Stop automatic sliding
  * next - Advance to next slide
  * prev - Advance to previous slide
