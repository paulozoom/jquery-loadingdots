/* global jQuery */

/**
 * Loading Dots plugin
 * @param   {Object} [options] - Configuration options. Defaults to {word: 'Loading', dots: 3, speed: 400}
 * @return  {jQuery}
 */
(function($) {

  $.fn.loadingdots = function(options) {

    var defaultOptions = {
      word:   'Loading',
      dots:   3,
      speed:  400
    };

    return this.each(function(i, el) {

      /**
       * The `base` object holds all plugin logic
       */
      var base = {

        // jQuery object of targe element
        $el:      $(el),

        // stores `window.setInterval` for pausing/stopping
        interval: null,

        // Set options
        init: function(options) {
          this.options = options;
          this.start();
        },

        // Update the element’s HTML, and call `play` method
        start: function() {
          this.$el.html('<span class="word"></span><span class="dots"></span>').addClass('loading');
          this.$el.find('.word').text(this.options.word);
          this.play();
        },

        // Set an interval for the `increment` method, starting the dots behaviour
        play: function() {
          this.$el.removeClass('paused');
          window.clearInterval(this.interval);
          this.interval = window.setInterval($.proxy(this.increment, this), this.options.speed);
        },

        // Increment one dot up to `options.dots`, after which it clears all the dots, starting over
        increment: function() {
          var $dots = this.$el.find('.dots');
          if ($dots.text().length >= this.options.dots) {
            $dots.text('');
          } else {
            $dots.append('.');
          }
        },

        // Pause dots
        pause: function() {
          this.$el.addClass('paused');
          window.clearInterval(this.interval);
        },

        // Pause dots, clear the element’s HTML
        stop: function() {
          this.pause();
          this.$el.empty().removeClass('loading');
        }
      };

      /**
       * Inits plugin. The `options` may be:
       *   object/undefined/null - overrides `defaultOptions` with `options` (if any), and starts plugin
       *   string                - calls the corresponding `base` method
       */
      var dataObjectKey = 'loadingdots';
      if (!options || typeof options == 'object') {

        // If Loading Dots hasn't been initialized yet
        if (!$(el).data(dataObjectKey)) {

          // Fetch options set via data-loadingdots-(word|dots|speed)
          var dataOptions = {};
          $.each(defaultOptions, function(key) {
            var dataOption = $(el).data(dataObjectKey+'-'+key);
            if (dataOption !== undefined) { dataOptions[key] = dataOption; }
          });

          // Override `defaultOptions` with `options`, and then with `dataOptions`
          var _options = $.extend({}, defaultOptions, options, dataOptions);

          // Set `base` as data-loadingdots, and init with _options
          $(el).data(dataObjectKey, base);
          $(el).data(dataObjectKey).init(_options);

        }
        else { // If Loading Dots is initialized, call start
          $(el).data(dataObjectKey).start();
        }
      }
      else if (typeof options == 'string') {
        $(el).data(dataObjectKey)[options]();
      }

    });

  };

})(jQuery);