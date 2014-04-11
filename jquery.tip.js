(function(jQuery){
  var Tip = function(target, options){
    this.target = target;
    this.options = $.extend({
      html: target.attr('data-tip'),
      margin: 2,
      delay: 0
    }, options);

    this.tip = $('<div class="widget-tip">');
    this.text = $('<div class="widget-tip-text">');
    this.pointer = $('<div class="widget-tip-pointer">');
    this.tip.append(this.text).append(this.pointer);

    this.target.hover($.proxy(this.show, this), $.proxy(this.hide, this));
  };

  Tip.prototype.show = function(){
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
      var top = offset.top + $(target).outerHeight() + options.margin;
      var left = offset.left + ($(target).outerWidth() / 2) - ($(tip).outerWidth() / 2);

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
      $(this).dequeue();
    }).delay(224).queue(function(){
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
      $(this).dequeue();
    }).delay(224).queue(function(){
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
