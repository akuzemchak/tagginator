/* -------------------------------------------------- *
 * Tagginator 1.0
 * Updated: 06/24/2010
 * -------------------------------------------------- *
 * Author: Aaron Kuzemchak
 * URL: http://aaronkuzemchak.com/
 * Copyright: 2010 Aaron Kuzemchak
 * License: MIT License
** -------------------------------------------------- */
(function($) {
	// main function
	$.fn.tagginator = function(options) {
		// merge options
		var settings = $.extend({}, $.fn.tagginator.defaults, options);
		
		// loop through matches
		return this.each(function() {
			// define variables
			var $list = $(this),
				$tags = $list.find(settings.item);
			
			// add class to all tags
			$tags.addClass('tagginator');
			
			// activate tags with checked inputs
			$tags.filter(':has(input:checked)').addClass(settings.activeClass);
			
			// disable other tags if max is reached
			if(settings.max && $tags.filter('.' + settings.activeClass).length >= settings.max) {
				// add disabled class to tags not selected
				disableFields($tags, settings);
			}
			
			// add click action to tags
			$tags.click(function(e) {
				// define variables
				var $this = $(this),
					$input = $this.find('input'),
					numTags = $tags.filter('.' + settings.activeClass).length;
				
				// prevent default behavior
				e.preventDefault();
				
				// if disabled
				if($this.hasClass(settings.disabledClass)) {
					// execute callback, if specified
					if(typeof settings.disabledClick === 'function') {
						settings.disabledClick($this);
					}
				}
				
				// if currently selected
				else if($this.hasClass(settings.activeClass)) {
					// remove class and uncheck the input
					$this.removeClass(settings.activeClass);
					$input.attr('checked', '');
					
					// restore disabled tags if less than max
					if(settings.max && (numTags - 1) < settings.max) {
						// remove disabled class
						disableFields($tags, settings, true);
					}
				}
				
				// if not currently selected
				else {
					// add class and check the input
					$this.addClass(settings.activeClass);
					$input.attr('checked', 'checked');
					
					// disable other tags if this will be max
					if(settings.max && numTags == (settings.max - 1)) {
						// add disabled class to tags not selected
						disableFields($tags, settings);
					}
				}
			});
		});
	};
	
	// default options
	$.fn.tagginator.defaults = {
		item: 'label', // the selector for the tags
		activeClass: 'active', // class applied to active tags
		disabledClass: 'disabled', // class applied to disabled tags if max is used
		max: null, // maximum number of tags you can select
		disabledClick: null // callback function that receives the clicked tag as the argument
	};
	
	// disable fields
	function disableFields($items, settings, enable) {
		// if we are enabling disabled fields
		if(enable === true) {
			// remove disabled class
			$items.not('.' + settings.activeClass).removeClass(settings.disabledClass);
		}
		
		// if we are disabling
		else {
			// add disabled class
			$items.not('.' + settings.activeClass).addClass(settings.disabledClass);
		}
	}
})(jQuery);