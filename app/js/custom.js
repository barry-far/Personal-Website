// ------------------------------------------------
// Table of Contents
// ------------------------------------------------
//
//  1. Loader & Main Section Loading Animation
//  2. Typed.js
//  3. Magnific Popup
//  4. Skillbars Settings
//  5. Vegas Settings
//  6. KBW-Countdown Settings
//  7. Mailchimp Notify Form
//  8. Contact Form
//  9. ParticlesJS Backgrounds
//  10. Project Detail Panels
//
// ------------------------------------------------
// Table of Contents End
// ------------------------------------------------

// Use strict mode for better error catching and performance
"use strict";

// Cache DOM elements for better performance
const domElements = {};

// Debounce function to limit execution of expensive handlers
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Initialize all event listeners
function initEventListeners() {
  // Showreel trigger click
  const showreelTrigger = document.getElementById('showreel-trigger');
  if (showreelTrigger) {
    showreelTrigger.addEventListener('click', function() {
      this.classList.toggle('rotate');
    });
  }
  
  // Project detail panel triggers
  const projectDetailLinks = document.querySelectorAll('.project-detail-link');
  projectDetailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const projectId = this.getAttribute('data-project');
      const detailPanel = document.getElementById(`details-${projectId}`);
      if (detailPanel) {
        detailPanel.classList.add('active');
        document.body.classList.add('overflow-hidden');
      }
    });
  });
  
  // Project detail panel close buttons
  const panelCloseButtons = document.querySelectorAll('.panel-close');
  panelCloseButtons.forEach(button => {
    button.addEventListener('click', function() {
      const detailPanel = this.closest('.project-details-panel');
      if (detailPanel) {
        detailPanel.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
      }
    });
  });
  
  // Initialize share buttons
  function initShareButtons() {
    document.querySelectorAll('.share-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.dataset.project;
        const projectURL = document.querySelector(`.project-direct-link[data-project="${projectId}"]`).textContent;
        const projectTitle = this.closest('.project-full-details').querySelector('h3').textContent;
        
        // Handle different share button types
        if (this.classList.contains('linkedin')) {
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectURL)}`);
        } else if (this.classList.contains('twitter')) {
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(projectTitle)}&url=${encodeURIComponent(projectURL)}`);
        } else if (this.classList.contains('facebook')) {
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectURL)}`);
        } else if (this.classList.contains('whatsapp')) {
          window.open(`https://wa.me/?text=${encodeURIComponent(projectTitle + '\n' + projectURL)}`);
        } else if (this.classList.contains('copy')) {
          copyProjectLink(projectId);
        }
      });
    });
  }

  // Add new initialization calls
  initShareButtons();
  
  // Close panel with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const activePanel = document.querySelector('.project-details-panel.active');
      if (activePanel) {
        activePanel.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
      }
    }
  });
}

// Load handler
window.addEventListener("load", function() {
  // Loader & Main Section Loading Animation
  setTimeout(function(){
    const loaderLogo = document.querySelector(".loader__logo");
    if (loaderLogo) {
      loaderLogo.classList.remove('fadeIn');
      loaderLogo.classList.add('fadeOut');
    }
  }, 600);

  setTimeout(function(){
    document.body.classList.add('loaded');
    document.body.classList.remove('overflow-hidden');
    
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.classList.add('fade', 'loaded');
    }
  }, 1200);

  // Initialize Typed.js
  initTyped();

  // Initialize ParticlesJS if present
  initParticlesJS();

  // Initialize event listeners
  initEventListeners();
});

// Initialize Typed.js
function initTyped() {
  const animatedHeadline = document.querySelector(".animated-headline");
  if (animatedHeadline && typeof Typed !== 'undefined') {
    new Typed('#typed', {
      stringsElement: '#typed-strings',
      loop: true,
      typeSpeed: 80,
      backSpeed: 30,
      backDelay: 2500
    });
  }
}

// Initialize ParticlesJS backgrounds
function initParticlesJS() {
  // Triangles BG - particlesJS
  const bgndTriangles = document.getElementById('triangles-js');
  if (bgndTriangles && typeof particlesJS !== 'undefined') {
    particlesJS('triangles-js', {
      particles: {
        number: {
          value: 33,
          density: {
            enable: true,
            value_area: 1420.4657549380909
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "triangle",
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.06313181133058181,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 11.83721462448409,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 4,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }

  // Particles BG - particlesJS
  const bgndParticles = document.getElementById('particles-js');
  if (bgndParticles && typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ead9ff"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.4,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 60,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 180,
          color: "#ffffff",
          opacity: 0.1,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse"
          },
          onclick: {
            enable: false,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 800,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 800,
            size: 80,
            duration: 2,
            opacity: 0.8,
            speed: 3
          },
          repulse: {
            distance: 100,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }
}

// DOM ready
document.addEventListener("DOMContentLoaded", function() {
  // Initialize all event listeners
  initEventListeners();
  
  // Initialize share buttons
  initShareButtons();
  
  // Initialize Magnific Popup
  initMagnificPopup();
  
  // Initialize Forms
  initForms();
  
  // Initialize other components as needed
  initSkillbars();
  initVegas();
  initCountdown();
});

// Initialize Magnific Popup
function initMagnificPopup() {
  if ($.magnificPopup) {
    $('#showreel-trigger').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
      callbacks: {
        beforeOpen: function() { document.body.classList.add('overflow-hidden'); },
        close: function() { document.body.classList.remove('overflow-hidden'); }
      }
    });
  }
}

// Initialize Skillbars
function initSkillbars() {
  if ($.fn.skillBars) {
    $('.skillbar').skillBars({
      from: 0,
      speed: 4000,
      interval: 100,
    });
  }
}

// Initialize Vegas
function initVegas() {
  const bgndKenburns = $('#bgndKenburns');
  if (bgndKenburns.length && $.fn.vegas) {
    bgndKenburns.vegas({
      timer: false,
      delay: 5000,
      transition: 'fade2',
      transitionDuration: 2000,
      slides: [
        { src: "https://dummyimage.com/1080x1440/636363/ffffff" },
        { src: "https://dummyimage.com/1080x1440/636363/ffffff" },
        { src: "https://dummyimage.com/1080x1440/636363/ffffff" }
      ],
      animation: [ 'kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight' ]
    });
  }
}

// Initialize Countdown
function initCountdown() {
  if ($.fn.countdown) {
    $('#countdown').countdown({until: $.countdown.UTCDate(+10, 2023, 2, 17), format: 'D'});
    $('#countdown-large').countdown({until: $.countdown.UTCDate(+10, 2023, 2, 17), format: 'DHMS'});
  }
}

// Initialize Forms
function initForms() {
  // Mailchimp Notify Form
  if ($.fn.ajaxChimp) {
    $('.notify-form').ajaxChimp({
      callback: mailchimpCallback,
      url: 'https://besaba.us10.list-manage.com/subscribe/post?u=e8d650c0df90e716c22ae4778&amp;id=54a7906900'
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); 
      const form = this;
      const name = form.querySelector('input[name="Name"]').value;
      const company = form.querySelector('input[name="Company"]').value;
      const phone = form.querySelector('input[name="Phone"]').value;
      const message = form.querySelector('textarea[name="Message"]').value;
      const mailtoLink = `mailto:bardia@mizegerd.agency?subject=${encodeURIComponent(name)} - ${encodeURIComponent(company)}&body=Phone number: ${encodeURIComponent(phone)}%0A%0A${encodeURIComponent(message)}`;
      window.location.href = mailtoLink;
      
      const contactSection = document.querySelector('.contact');
      if (contactSection) {
        contactSection.querySelector('.form').classList.add('is-hidden');
        contactSection.querySelector('.reply-group').classList.add('is-visible');
        
        setTimeout(function() {
          contactSection.querySelector('.reply-group').classList.remove('is-visible');
          contactSection.querySelector('.form').classList.remove('is-hidden');
          form.reset();
        }, 5000);
      }
    });
  }
}

// Mailchimp callback function
function mailchimpCallback(resp) {
  if (resp.result === 'success') {
    handleFormSuccess('.notify');
  } else if (resp.result === 'error') {
    handleFormError('.notify');
  }
}

// Handle form success
function handleFormSuccess(selector) {
  const element = document.querySelector(selector);
  if (!element) return;
  
  element.querySelector('.form').classList.add('is-hidden');
  element.querySelector('.subscription-ok').classList.add('is-visible');
  
  setTimeout(function() {
    element.querySelector('.subscription-ok').classList.remove('is-visible');
    element.querySelector('.form').classList.remove('is-hidden');
    const form = element.querySelector('form');
    if (form) form.reset();
  }, 5000);
}

// Handle form error
function handleFormError(selector) {
  const element = document.querySelector(selector);
  if (!element) return;
  
  element.querySelector('.form').classList.add('is-hidden');
  element.querySelector('.subscription-error').classList.add('is-visible');
  
  setTimeout(function() {
    element.querySelector('.subscription-error').classList.remove('is-visible');
    element.querySelector('.form').classList.remove('is-hidden');
    const form = element.querySelector('form');
    if (form) form.reset();
  }, 5000);
}

// Initialize share buttons
function initShareButtons() {
  const shareButtons = document.querySelectorAll('.share-btn');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const project = this.dataset.project;
      const projectUrl = document.querySelector(`.project-direct-link[data-project="${project}"]`).textContent;
      const projectTitle = document.querySelector(`#project-${project} h3`).textContent;
      
      // Prepare share text
      const shareText = `Check out this project: ${projectTitle}`;
      
      // Handle different share types
      if (this.classList.contains('linkedin')) {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`);
      } else if (this.classList.contains('twitter')) {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(projectUrl)}`);
      } else if (this.classList.contains('facebook')) {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectUrl)}`);
      } else if (this.classList.contains('whatsapp')) {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + projectUrl)}`);
      } else if (this.classList.contains('copy')) {
        copyProjectLink(project);
      }
    });
  });
}

// Function to copy project link to clipboard with user feedback
function copyProjectLink(projectId) {
  const projectLinkElement = document.querySelector(`.project-direct-link[data-project="${projectId}"]`);
  if (!projectLinkElement) return;
  
  // Get the link text
  const projectURL = projectLinkElement.textContent;
  
  // Get the base URL of the current page
  const baseURL = window.location.origin;
  
  // Create the full URL by combining the base URL and the project path
  const fullURL = baseURL + projectURL;
  
  // Copy to clipboard
  navigator.clipboard.writeText(fullURL).then(() => {
    // Find the copy button and show visual feedback
    const copyButton = document.querySelector(`.share-btn.copy[data-project="${projectId}"]`);
    if (copyButton) {
      const originalContent = copyButton.innerHTML;
      copyButton.innerHTML = '<i class="fa fa-check"></i>';
      
      // Find the copied message element
      const copiedMessage = copyButton.closest('.share-container').nextElementSibling;
      if (copiedMessage && copiedMessage.classList.contains('project-link-copied')) {
        // Show the "copied to clipboard" message
        copiedMessage.style.display = 'block';
        
        // Hide the message after 2 seconds
        setTimeout(() => {
          copiedMessage.style.display = 'none';
          copyButton.innerHTML = originalContent;
        }, 2000);
      } else {
        // If we can't find the message element, just reset the button after 2 seconds
        setTimeout(() => {
          copyButton.innerHTML = originalContent;
        }, 2000);
      }
    }
  }).catch(err => {
    console.error('Could not copy text: ', err);
    alert('Failed to copy link to clipboard.');
  });
}

// Initialize slideshows
function initSlideshows() {
  const slideshows = document.querySelectorAll('.project-slideshow');
  
  slideshows.forEach(slideshow => {
    const container = slideshow.querySelector('.slideshow-container');
    const slides = slideshow.querySelectorAll('.slide');
    const controls = slideshow.querySelector('.slide-controls');
    const prevBtn = slideshow.querySelector('.slide-prev');
    const nextBtn = slideshow.querySelector('.slide-next');
    
    if (!container || slides.length === 0) return;
    
    // Create dot controls
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('slide-dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => goToSlide(index));
      controls.appendChild(dot);
    });
    
    // Set up initial state
    let currentSlide = 0;
    
    // Function to go to a specific slide
    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      container.style.transform = `translateX(-${index * 100}%)`;
      currentSlide = index;
      
      // Update dots
      const dots = controls.querySelectorAll('.slide-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }
    
    // Set up navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
      });
    }
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
    
    // Pause auto-advance on hover
    slideshow.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    slideshow.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    });
    
    // Handle touch events for swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    container.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left, go to next slide
        goToSlide(currentSlide + 1);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right, go to previous slide
        goToSlide(currentSlide - 1);
      }
    }
  });
}

// Initialize static gallery image previews
function initGalleryPreviews() {
  const staticImages = document.querySelectorAll('.static-image img');
  
  staticImages.forEach(image => {
    image.addEventListener('click', () => {
      if ($.magnificPopup) {
        $.magnificPopup.open({
          items: {
            src: image.src
          },
          type: 'image',
          closeOnContentClick: true,
          mainClass: 'mfp-img-mobile',
          image: {
            verticalFit: true
          }
        });
      }
    });
  });
}

// DOM ready - add slideshows and gallery initialization
document.addEventListener("DOMContentLoaded", function() {
  // ... existing initialization code ...
  
  // Initialize project detail panels when opened
  const projectDetailLinks = document.querySelectorAll('.project-detail-link');
  projectDetailLinks.forEach(link => {
    link.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      const detailPanel = document.getElementById(`details-${projectId}`);
      
      if (detailPanel) {
        detailPanel.classList.add('active');
        document.body.classList.add('overflow-hidden');
        
        // Initialize slideshow and gallery in this panel
        initSlideshows();
        initGalleryPreviews();
      }
    });
  });
});
