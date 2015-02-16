// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.

;(function ( $, window, document, undefined ) {
    
    "use strict";

    Handlebars.registerHelper('euri', function (str) {
	return encodeURIComponent(str);
    });

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
                
		var pluginName = "shareit",
				defaults = {
				    url: undefined,
				    title: undefined,
				    summary: undefined,
				    providor: undefined,
				    current_url: window.location.href,
				    facebook: {
					width: 520,
					height: 250,
					shareURLTemplate: Handlebars.compile('http://www.facebook.com/sharer.php?s=100&p[title]={{euri title}}&p[summary]={{euri summary}}&p[url]={{euri url}}'),


					windowSettings: function(plg) {
					    var setting = plg.settings.facebook;
					    return plg.settings.genericWindowSettings(setting);
					},
					open: function(plg) {
					    var setting = plg.settings.facebook;
					    plg.settings.genericOpen(plg,setting);
					}
				    },
				    twitter: {
					width: 626,
					height: 352,
					shareURLTemplate: Handlebars.compile('https://twitter.com/intent/tweet?original_referer={{euri current_url}}&text={{euri title}}&tw_p=tweetbutton&url={{euri url}}'),
					windowSettings: function(plg) {
					    var setting = plg.settings.twitter;
					    return plg.settings.genericWindowSettings(setting);
					},
					open: function(plg) {
					    var setting = plg.settings.twitter;
					    plg.settings.genericOpen(plg,setting);
					}
				    },
				    google: {
					width: 600,
					height: 600,
					shareURLTemplate: Handlebars.compile('https://plus.google.com/share?url={{euri url}}'),
					windowSettings: function(plg) {
					    var setting = plg.settings.google;
					    return plg.settings.genericWindowSettings(setting);
					},
					open: function(plg) {
					    var setting = plg.settings.google;
					    plg.settings.genericOpen(plg,setting);
					}
				    },
				    linkedin: {
					width: 620,
					height: 450,
					shareURLTemplate: Handlebars.compile('https://www.linkedin.com/shareArticle?mini=true&url={{euri url}}&title={{euri title}}&summary={{euri summary}}'),
					windowSettings: function(plg) {
					    var setting = plg.settings.linkedin;
					    return plg.settings.genericWindowSettings(setting);
					},
					open: function(plg) {
					    var setting = plg.settings.linkedin;
					    plg.settings.genericOpen(plg,setting);
					}
					
				    },
				    delicious: {
					width: 800,
					height: 600,
					shareURLTemplate: Handlebars.compile('https://delicious.com/save?v=5&provider={{euri providor}}&noui&jump=close&url={{euri url}}'),
					shareUrl: function(plg) {
					    return 
					},
					windowSettings: function(plg) {
					    var setting = plg.settings.linkedin;
					    return plg.settings.genericWindowSettings(setting);
					},
					open: function(plg) {
					    var setting = plg.settings.linkedin;
					    plg.settings.genericOpen(plg,setting);
					}
				    },
				    defaultSize: {
					width: 800,
					height: 350
				    },
				    genericWindowSettings: function(setting) {
					var winTop = (screen.height / 2) - (setting.height / 2);
					var winLeft = (screen.width / 2) - (setting.width / 2);
					return 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + setting.width + ',height=' + setting.height;
				    },
				    shareURL: function(plg, setting) {
					return setting.shareURLTemplate(plg.settings);
				    },
				    genericOpen: function(plg, setting) {
					window.open(plg.settings.shareURL(plg, setting), 'sharer', setting.windowSettings(plg));
				    }

				};
		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend(true, {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
		    init: function () {
			// Place initialization logic here
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.settings
			// you can add more functions like the one below and
			// call them like so: this.yourOtherFunction(this.element, this.settings).
			console.log("xD");
			console.log(this.settings.url);
			alert($(this));
			var plugin = this;
			
			plugin.bindClick(plugin.findShareElement(this.element, "facebook"), plugin.settings.facebook);
			plugin.bindClick(plugin.findShareElement(this.element, "google"), plugin.settings.google);
			plugin.bindClick(plugin.findShareElement(this.element, "linkedin"), plugin.settings.linkedin);
			plugin.bindClick(plugin.findShareElement(this.element, "twitter"), plugin.settings.twitter);
			plugin.bindClick(plugin.findShareElement(this.element, "delicious"), plugin.settings.delicious);


			

			//$(this.element).find("*").filter(function(){return $(this).data('shareFor') === 'twitter';}).css("color", "#FF0000").on("click", function(event) {
			//			    event.preventDefault();
			//    plugin.settings.twitter.open(plugin);
			//		    });
			
			//$(this.element).css("color", "#FF0000").on("click", function() {alert("Facebook");});
		    },
		    findShareElement: function(element, network_name) {
			var el = $(element).find("a").filter(function(){return $(this).data('shareFor') === network_name;})

			if (el.length == 0) {return false;}
			return el;
		    },
		    yourOtherFunction: function () {
			// some logic
		    },
		    
		    settingsFor: function( network ) {
			var plugin = this;
			switch( network ) { 			
			case "facebook" : 
			    return this.settings.facebook;
			    break;
			    
			case "twitter" : 
			    return this.settings.twitter;
			    break;
			    
			case "google" : 
			    return this.settings.google;
			    break;
			    
			case "linkedin" : 
			    return this.settings.linkedin;
			    break;
					
			case "delicious" : 	
			    return this.settings.delicious
			    break;
					
			default: 
			    return this.settings.defaultSize;

			    break;
			    
			}
				
		    },
		    bindClick: function(element, setting) {
			var plugin = this;
			if (element != false) {
			    element.attr({href: plugin.settings.shareURL(plugin, setting)}).on("click", function(event) {
				event.preventDefault();
				setting.open(plugin);
			    });
			}
		    },
		    facebookShare: function() {
			var winTop = (screen.height / 2) - (this.settings.facebook.height / 2);
			var winLeft = (screen.width / 2) - (this.settings.facebook.width / 2);
			window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + encodeURIComponent(this.settings.title) + '&p[summary]=' + encodeURIComponent(this.settings.summary) + '&p[url]=' + encodeURIComponent(this.settings.url), 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + this.settings.facebook.width + ',height=' + this.settings.facebook.height);
//			window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + "" + '&p[summary]=' + "" + '&p[url]=' + this.settings.url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
			}
		    });

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
		    return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
			    $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		    });
		};

})( jQuery, window, document );
