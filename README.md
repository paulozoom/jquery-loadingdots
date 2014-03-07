# Loading Dots

Loading Dots is a jQuery plugin for “Loading...” behaviour, with incremental dots.

## Install

With bower: `bower install jquery-loadingdots`.

## Usage

### Options

Call `loadingdots()` on your jQuery object. Takes optional parameters, which default to:
```javascript
{
  word:   'Loading',  // String: Word prefixing the dots
  dots:   3,          // Number: Maximum number of dots
  speed:  400         // Number: Time, in miliseconds, between dots increase
}
```

Examples:

```javascript
// With default parameters
$('p').loadingdots();

// With custom parameters
$('p').loadingdots({ word: 'Processing', speed: 250 });

// You can set an empty string
$('p').loadingdots({ word: '', dots: 5 });
```

You can also set options via `data-*` attributes:
* `data-loadingdots-word`: Word prefixig the dots
* `data-loadingdots-dots`: Maximum number of dots
* `data-loadingdots-speed`: Time, in miliseconds, between dots increase

Example:
```html
<!-- No word and 5 dots -->
<p data-loadingdots-word="Processing" data-loadingdots-speed="250"></p>

<!-- You can set an empty string -->
<p data-loadingdots-word="" data-loadingdots-dots="5"></p>
```

### Methods

If you pass a string to `loadingdots` after initializing it, you can control its behaviour.

Available methods:
* `pause`: Pauses the dots.
* `play`: Resumes the dots.
* `increment`: Manually increments one dot.
* `stop`: Stops the dots (calls `pause`) and clears the element’s HTML content.
* `start`: Builds the element’s HTML content and starts the dot (calls `play`)

Examples:
```javascript
// Init
$('p').loadingdots();

// Immediately pause
$('p').loadingdots('pause');

// Manually increments one dot when button is pressed
$('button').on('click', function(){
  $('p').loadingdots('increment');
});
```

## Customization

You can customize the element and its contents with CSS with the following classes:
* `loading`: the target element itself
* `word`: the word prefix
* `dots`: the dots

Example:
```html
<p class="loading">
  <span class="word">Loading</span>
  <span class="dots">..</span>
</p>
```

**Bonus:** if dots are paused, the element has an additional `paused` class.
```html
<p class="loading paused">
  <span class="word">Loading</span>
  <span class="dots">..</span>
</p>
```

## Thanks

This plugin is based on a CSS-Tricks plugin from 2010: http://css-tricks.com/loading-dots-plugin/
