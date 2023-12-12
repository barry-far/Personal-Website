// ------------------------------------------------
// Table of Contents
// ------------------------------------------------
//
//  1. SVG Fallback
//  2. Chrome Smooth Scroll
//  3. Images Moving Ban
//  4. Fullscreen Layout
//  5. PhotoSwipe Gallery Images Replace
//  6. Main Menu, Sections and Popup Behavior
//
// ------------------------------------------------
// Table of Contents End
// ------------------------------------------------

$(function() {

  // SVG Fallback
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {
  };

  // Images Moving Ban
  $("img, a").on("dragstart", function(event) { event.preventDefault(); });

  // Fullscreen Layout
  function fullscreenLayout() {
    $(".fullscreen").css({
        height: $(window).height()
    });
  };
  fullscreenLayout();
  $(window).resize(function(){
    fullscreenLayout();
  });

  // PhotoSwipe Gallery Images Replace
  $('.works-link')
    // Background set up
    .each(function(){
    $(this)
    // Add a photo container
    .append('<div class="picture"></div>')
    // Set up a background image for each link based on data-image attribute
    .children('.picture').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
  });

  // Main Menu, Sections and Popup Behavior
  var main           = $('#main'),
      menu           = $('#menu'),
      menuTrigger    = $('#menu-trigger'),
      menuClose      = $('#menu-close'),
      notify         = $('#notify'),
      notifyTrigger  = $('#notify-trigger'),
      notifyClose    = $('#notify-close'),
      homeTrigger    = $('#home-trigger'),
      about          = $('#about'),
      aboutTrigger   = $('#about-trigger'),
      aboutClose     = $('#about-close'),
      works          = $('#works'),
      worksTrigger   = $('#works-trigger'),
      worksClose     = $('#works-close'),
      contact        = $('#contact'),
      contactTrigger = $('#contact-trigger'),
      contactClose   = $('#contact-close');

  // Notify Form Open
  notifyTrigger.on('click', function(event){
    event.preventDefault();
    main.addClass('notify-is-visible');
    $('body').addClass('overflow-hidden');
    setTimeout(function(){
      notify.addClass('animate-in');
    }, 600);
    setTimeout(function(){
      notifyClose.addClass('is-scaled-up');
    }, 1200);
  });

  // Notify Form Close
  notifyClose.on('click', function(event){
    event.preventDefault();
    notify.addClass('animate-out');
    setTimeout(function(){
      main.removeClass('notify-is-visible');
      notify.removeClass('animate-in animate-out');
      notifyClose.removeClass('is-scaled-up');
      $('body').removeClass('overflow-hidden');
    }, 600);
  });

  // Menu Open
  menuTrigger.on('click', function(event){
    event.preventDefault();
    menu.addClass('animate-in');
    setTimeout(function(){
      menuClose.addClass('is-scaled-up');
      $('body').addClass('overflow-hidden');
      main.addClass('menu-is-visible');
    }, 1200);
  });
  // Menu Close
  menuClose.on('click', function(event){
    event.preventDefault();
    menu.addClass('animate-out');
    setTimeout(function(){
      main.removeClass('menu-is-visible');
    }, 700);
    setTimeout(function(){
      menu.removeClass('animate-in animate-out');
      menuClose.removeClass('is-scaled-up');
      $('body').removeClass('overflow-hidden');
    }, 1200);
  });
  // Back to Home Section from Menu
  homeTrigger.on('click', function(event){
    event.preventDefault();
    menu.addClass('animate-out');
    setTimeout(function(){
      main.removeClass('menu-is-visible');
    }, 700);
    setTimeout(function(){
      menu.removeClass('animate-in animate-out');
      menuClose.removeClass('is-scaled-up');
      $('body').removeClass('overflow-hidden');
    }, 1200);
  });
  // Menu Link Ckick Action
  $('.menu .inner-link').on('click', function(event){
    event.preventDefault();
    main.addClass('move-out');
    menu.addClass('move-out');
    $('.rotate-object').addClass('is-hidden');
    setTimeout(function(){
      menu.removeClass('animate-in animate-out move-out');
      menuClose.removeClass('is-scaled-up');
      main.removeClass('menu-is-visible move-out');
      //main.addClass('image-closed');
      $('body').addClass('overflow-hidden');
    }, 2100);
  });
  // Section Close Button Action
  $('.inner .section-close').on('click', function(event){
    event.preventDefault();
    setTimeout(function(){
      main.addClass('move-in');
      $('.rotate-object').removeClass('is-hidden');
    }, 900);
    setTimeout(function(){
      main.removeClass('move-in');
      $('body').removeClass('overflow-hidden');
    }, 2000);
  });

  // About Section Open
  aboutTrigger.on('click', function(event){
    event.preventDefault();
    setTimeout(function(){
      about.addClass('animate-in');
    }, 600);
    setTimeout(function(){
      aboutClose.addClass('is-scaled-up');
    }, 1200);
  });
  // About Section Close
  aboutClose.on('click', function(event){
    event.preventDefault();
    about.addClass('animate-out');
    setTimeout(function(){
      about.addClass('to-back');
    }, 600);
    setTimeout(function(){
      about.removeClass('animate-in animate-out to-back');
      aboutClose.removeClass('is-scaled-up');
    }, 2000);
  });
  // Works Section Open
  worksTrigger.on('click', function(event){
    event.preventDefault();
    setTimeout(function(){
      works.addClass('animate-in');
    }, 600);
    setTimeout(function(){
      worksClose.addClass('is-scaled-up');
    }, 1200);
  });
  // Works Section Close
  worksClose.on('click', function(event){
    event.preventDefault();
    works.addClass('animate-out');
    setTimeout(function(){
      works.addClass('to-back');
    }, 600);
    setTimeout(function(){
      works.removeClass('animate-in animate-out to-back');
      worksClose.removeClass('is-scaled-up');
    }, 2000);
  });

  // Contact Section Open
  contactTrigger.on('click', function(event){
    event.preventDefault();
    setTimeout(function(){
      contact.addClass('animate-in');
    }, 600);
    setTimeout(function(){
      contactClose.addClass('is-scaled-up');
    }, 1200);
  });
  // Contact Section Close
  contactClose.on('click', function(event){
    event.preventDefault();
    contact.addClass('animate-out');
    setTimeout(function(){
      contact.addClass('to-back');
    }, 600);
    setTimeout(function(){
      contact.removeClass('animate-in animate-out to-back');
      contactClose.removeClass('is-scaled-up');
    }, 2000);
  });

});
