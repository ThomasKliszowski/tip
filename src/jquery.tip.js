(function(jQuery){
  var $ = jQuery;
  var Tip = function(target, options){
    this.target = target;
    this.options = $.extend({
      html: target.attr('data-tip'),
      margin: 4,
      delay: 0,
      direction: 'bottom'
    }, options);

    this.tip = $('<div class="widget-tip">');
    this.text = $('<div class="widget-tip-text">');
    this.pointer = $('<div class="widget-tip-pointer">');
    this.tip.append(this.text).append(this.pointer);
    this.setClass('bottom');

    // Test if device supports touch events
    if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch){
      // Listen touch events
      $(window).on('touchend', function(e){
        target = $(e.target).closest(this.target);
        this[target.length ? 'show' : 'hide']();
      }.bind(this));
    }else{
      // Listen hover / blur events
      this.target.hover($.proxy(this.show, this), $.proxy(this.hide, this));
    }
  };

  Tip.prototype.setClass = function(cls){
    if($.inArray(cls, ['top', 'bottom']) != -1){
      this.tip.removeClass('bottom top').addClass(cls);
    }
  };

  Tip.prototype.show = function(){
    var self = this;
    var target = this.target;
    var text = this.text;
    var tip = this.tip;
    var options = this.options;

    tip.clearQueue().delay(options.delay).queue(function(){
      tip.removeClass('animate').removeClass('active');
      $(this).dequeue();
    }).delay(50).queue(function(){
      text.html(options.html);
      $('body').append(tip);

      // Move tip
      var offset = $(target).offset();
      var targetHeight = $(target).outerHeight();
      var targetWidth = $(target).outerWidth();
      var tipHeight = tip.outerHeight();
      var tipWidth = tip.outerWidth();
      var windowHeight = $(window).height();
      var windowWidth = $(window).width();

      var top = 0;
      var left = offset.left + (targetWidth / 2) - (tipWidth / 2);

      // Check top / bottom
      if(options.direction == 'bottom'){
        if(offset.top + targetHeight + tipHeight + options.margin < windowHeight){
          // Bottom
          top = offset.top + targetHeight + options.margin;
          self.setClass('bottom');
        }else{
          // Top
          tip.removeClass('bottom').addClass('top');
          top = offset.top - tipHeight - options.margin;
          self.setClass('top');
        }
      }else{
        if(offset.top - tipHeight - options.margin > 0){
          // Top
          top = offset.top - tipHeight - options.margin;
          self.setClass('top');
        }else{
          // Bottom
          top = offset.top + targetHeight + options.margin;
          self.setClass('bottom');
        }
      }

      // Check with there is enough space (horizontally)
      if(offset.left + (targetWidth / 2) + (tipWidth / 2) > windowWidth){
        left -= offset.left + (targetWidth / 2) + (tipWidth / 2) - windowWidth + options.margin;
      }else if(offset.left + (targetWidth / 2) - (tipWidth / 2) < 0){
        left = options.margin;
      }

      tip.css({
        'top': top,
        'left': left
      });

      $(this).dequeue();
    }).delay(0).queue(function(){
      tip.addClass('animate');
      $(this).dequeue();
    }).delay(50).queue(function(){
      tip.addClass('active');
      transitionEnd(tip).bind($.proxy(function(){
        $(this).dequeue();
        transitionEnd(tip).unbind();
      }, this));
    }).queue(function(){
      tip.removeClass('animate');
      $(this).dequeue();
    });
  };

  Tip.prototype.hide = function(){
    var text = this.text;
    var tip = this.tip;

    tip.clearQueue().delay(0).queue(function(){
      tip.addClass('animate');
      $(this).dequeue();
    }).delay(50).queue(function(){
      tip.removeClass('active');
      transitionEnd(tip).bind($.proxy(function(){
        $(this).dequeue();
        transitionEnd(tip).unbind();
      }, this));
    }).queue(function(){
      tip.removeClass('animate');
      tip.detach();
      $(this).dequeue();
    });
  };

  jQuery.fn.tip = function(options){
    if(typeof options != typeof {}) option = {};

    $(this).each(function(){
      if($(this).attr('data-tip')){
        new Tip($(this), options);
      }
    });
  };
})(jQuery);
