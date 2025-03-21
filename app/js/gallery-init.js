/**
 * PhotoSwipe initialization for the image gallery
 * Optimized for performance and accessibility
 */
(function() {
  'use strict';
  
  // Initialize PhotoSwipe when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initPhotoSwipeFromDOM('.my-gallery');
    setupProjectLinks();
  });
  
  /**
   * Setup project detail links
   * This allows clicking a button to navigate to project details
   */
  function setupProjectLinks() {
    const projectButtons = document.querySelectorAll('.project-detail-link');
    
    projectButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation(); // Stop event from bubbling to PhotoSwipe
        const projectUrl = this.getAttribute('href');
        if (projectUrl) {
          window.open(projectUrl, '_blank');
        }
      });
    });
  }
  
  /**
   * Initializes PhotoSwipe from DOM elements
   * @param {string} gallerySelector - Gallery selector
   */
  function initPhotoSwipeFromDOM(gallerySelector) {
    // Parse slide data (url, title, size) from DOM elements
    var parseThumbnailElements = function(el) {
      var thumbElements = el.querySelectorAll('figure'),
          items = [],
          figureEl,
          linkEl,
          size,
          item;

      for(var i = 0; i < thumbElements.length; i++) {
        figureEl = thumbElements[i];
        
        // Include only element nodes
        if(figureEl.nodeType !== 1) {
          continue;
        }

        linkEl = figureEl.children[0]; // <a> element
        
        // Create slide object
        if (linkEl.getAttribute('data-size')) {
          size = linkEl.getAttribute('data-size').split('x');
        } else {
          // Default size if data-size is missing
          size = ['900', '1200'];
        }
        
        item = {
          src: linkEl.getAttribute('href'),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };

        if(linkEl.children.length > 0) {
          // <img> thumbnail element, retrieving thumbnail url
          item.msrc = linkEl.children[0].getAttribute('src');
        } 

        item.el = figureEl; // save link to element for getThumbBoundsFn
        
        // Caption handling with project link button
        if(figureEl.children.length > 1) {
          const figcaption = figureEl.children[1];
          let captionHTML = figcaption.innerHTML;
          
          // Extract project URL if it exists
          const projectBtn = figcaption.querySelector('.project-detail-link');
          const projectUrl = projectBtn ? projectBtn.getAttribute('href') : null;
          
          // Add "View Project" button to PhotoSwipe caption if URL exists
          if (projectUrl) {
            captionHTML += `<div class="pswp__project-link">
              <a href="${projectUrl}" class="btn btn-solid" target="_blank">
                <span class="btn-caption">View Project</span>
              </a>
            </div>`;
          }
          
          item.title = captionHTML;
        }

        items.push(item);
      }

      return items;
    };

    // Find nearest parent element
    var closest = function closest(el, fn) {
      return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // Triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
      e = e || window.event;
      
      // Don't open PhotoSwipe if clicking on project link button
      if (e.target.classList.contains('project-detail-link') || 
          e.target.closest('.project-detail-link')) {
        return true;
      }
      
      e.preventDefault ? e.preventDefault() : e.returnValue = false;

      var eTarget = e.target || e.srcElement;

      // Find root element of slide
      var clickedListItem = closest(eTarget, function(el) {
        return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
      });

      if(!clickedListItem) {
        return;
      }

      // Find index of clicked item by looping through all child nodes
      var clickedGallery = clickedListItem.parentNode,
          childNodes = clickedListItem.parentNode.childNodes,
          numChildNodes = childNodes.length,
          nodeIndex = 0,
          index;

      for (var i = 0; i < numChildNodes; i++) {
        if(childNodes[i].nodeType !== 1) { 
          continue; 
        }

        if(childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }

      if(index >= 0) {
        // Open PhotoSwipe if valid index found
        openPhotoSwipe( index, clickedGallery );
      }
      return false;
    };

    // Parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
      var hash = window.location.hash.substring(1),
      params = {};

      if(hash.length < 5) {
        return params;
      }

      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
        if(!vars[i]) {
          continue;
        }
        var pair = vars[i].split('=');  
        if(pair.length < 2) {
          continue;
        }           
        params[pair[0]] = pair[1];
      }

      if(params.gid) {
        params.gid = parseInt(params.gid, 10);
      }

      return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
          gallery,
          options,
          items;

      items = parseThumbnailElements(galleryElement);

      // Define options (if needed)
      options = {
        // Define gallery index (for URL)
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

        getThumbBoundsFn: function(index) {
          // See Options -> getThumbBoundsFn section of documentation for more info
          var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
              pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
              rect = thumbnail.getBoundingClientRect(); 

          return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
        },

        // History & focus options
        history: false,
        focus: true,
        
        // UI options for better mobile experience
        showAnimationDuration: 300,
        hideAnimationDuration: 300,
        
        // Allow HTML in captions
        addCaptionHTMLFn: function(item, captionEl) {
          if(!item.title) {
            captionEl.children[0].innerHTML = '';
            return false;
          }
          captionEl.children[0].innerHTML = item.title;
          return true;
        }
      };

      // PhotoSwipe opened from URL
      if(fromURL) {
        if(options.galleryPIDs) {
          // Parse real index when custom PIDs are used 
          for(var j = 0; j < items.length; j++) {
            if(items[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          // In URL indexes start from 1
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }

      // Exit if index not found
      if( isNaN(options.index) ) {
        return;
      }

      if(disableAnimation) {
        options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
      
      // Handle project link clicks inside PhotoSwipe
      gallery.listen('initialZoomInEnd', function() {
        const projectLinks = document.querySelectorAll('.pswp__project-link a');
        projectLinks.forEach(link => {
          link.addEventListener('click', function(e) {
            e.stopPropagation();
          });
        });
      });
    };

    // Loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i+1);
      galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
      openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
  }

  // Register service worker for offline capabilities if supported
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(
        function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        },
        function(err) {
          console.log('ServiceWorker registration failed: ', err);
        }
      );
    });
  }
})();

/**
 * Project Sharing Functionality
 * Handles sharing project details via social media, link copying, and QR code display
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize project sharing functionality
  initProjectSharing();
  
  // Check if URL has project parameter and open correct panel
  handleUrlParameters();
  
  // Add stylesheet link to head if not already present
  if (!document.querySelector('link[href="css/project-styles.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/project-styles.css';
    document.head.appendChild(link);
  }
});

/**
 * Check if URL contains project parameter and open the appropriate panel
 */
function handleUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('project');
  
  if (projectId) {
    // Wait a bit for DOM to be fully loaded
    setTimeout(() => {
      // First navigate to the works section
      const worksSection = document.getElementById('works');
      if (worksSection) {
        const worksTrigger = document.getElementById('works-trigger');
        if (worksTrigger) {
          worksTrigger.click();
        }
        
        // Then open the specific project panel
        setTimeout(() => {
          const detailPanel = document.getElementById(`details-${projectId}`);
          if (detailPanel) {
            detailPanel.classList.add('active');
            document.body.classList.add('overflow-hidden');
            
            // Scroll to the panel
            detailPanel.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1000); // Wait for works section to load
      }
    }, 500);
  }
}

/**
 * Initialize all project sharing functionality
 */
function initProjectSharing() {
  // Setup link copy functionality
  setupLinkCopy();
  
  // Setup social sharing buttons
  setupSocialSharing();
  
  // Add notification container for copy confirmation
  addCopyNotification();
}

/**
 * Setup functionality for copying project links
 */
function setupLinkCopy() {
  // Setup copy button functionality
  const copyButtons = document.querySelectorAll('.share-btn.copy');
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      const linkElement = document.querySelector(`.project-direct-link[data-project="${projectId}"]`);
      
      if (linkElement) {
        copyToClipboard(linkElement.textContent);
        showCopyNotification('Link copied to clipboard!');
      }
    });
  });
  
  // Setup direct link click-to-copy
  const directLinks = document.querySelectorAll('.project-direct-link');
  directLinks.forEach(link => {
    link.addEventListener('click', function() {
      copyToClipboard(this.textContent);
      showCopyNotification('Link copied to clipboard!');
    });
  });
}

/**
 * Setup social media sharing buttons
 */
function setupSocialSharing() {
  // LinkedIn sharing
  const linkedInButtons = document.querySelectorAll('.share-btn.linkedin');
  linkedInButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const projectId = this.getAttribute('data-project');
      const projectPanel = document.getElementById(`project-${projectId}`);
      
      if (projectPanel) {
        const title = projectPanel.querySelector('h3').textContent;
        const baseUrl = window.location.origin + window.location.pathname;
        const url = `${baseUrl}?project=${projectId}`;
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        window.open(linkedInUrl, 'share-linkedin', 'width=580,height=520');
      }
    });
  });
  
  // Twitter sharing
  const twitterButtons = document.querySelectorAll('.share-btn.twitter');
  twitterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const projectId = this.getAttribute('data-project');
      const projectPanel = document.getElementById(`project-${projectId}`);
      
      if (projectPanel) {
        const title = projectPanel.querySelector('h3').textContent;
        const baseUrl = window.location.origin + window.location.pathname;
        const url = `${baseUrl}?project=${projectId}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, 'share-twitter', 'width=550,height=450');
      }
    });
  });
  
  // Facebook sharing
  const facebookButtons = document.querySelectorAll('.share-btn.facebook');
  facebookButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const projectId = this.getAttribute('data-project');
      const projectPanel = document.getElementById(`project-${projectId}`);
      
      if (projectPanel) {
        const baseUrl = window.location.origin + window.location.pathname;
        const url = `${baseUrl}?project=${projectId}`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, 'share-facebook', 'width=580,height=520');
      }
    });
  });
  
  // WhatsApp sharing
  const whatsAppButtons = document.querySelectorAll('.share-btn.whatsapp');
  whatsAppButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const projectId = this.getAttribute('data-project');
      const projectPanel = document.getElementById(`project-${projectId}`);
      
      if (projectPanel) {
        const title = projectPanel.querySelector('h3').textContent;
        const baseUrl = window.location.origin + window.location.pathname;
        const url = `${baseUrl}?project=${projectId}`;
        const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent('Check out this project: ' + title + ' ' + url)}`;
        window.open(whatsAppUrl, 'share-whatsapp', 'width=580,height=520');
      }
    });
  });
}

/**
 * Add copy notification element to the DOM
 */
function addCopyNotification() {
  if (!document.querySelector('.copy-notification')) {
    const notificationDiv = document.createElement('div');
    notificationDiv.className = 'copy-notification';
    notificationDiv.textContent = 'Link copied to clipboard!';
    document.body.appendChild(notificationDiv);
  }
}

/**
 * Show notification when link is copied
 * @param {string} message - The message to display in the notification
 */
function showCopyNotification(message) {
  const notification = document.querySelector('.copy-notification');
  if (notification) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  }
}

/**
 * Copy text to clipboard
 * @param {string} text - The text to copy
 */
function copyToClipboard(text) {
  // Use navigator.clipboard API if available (more modern)
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .catch(err => {
        // Fallback to older method if navigator.clipboard fails
        fallbackCopyToClipboard(text);
      });
  } else {
    // Use fallback for older browsers
    fallbackCopyToClipboard(text);
  }
}

/**
 * Fallback method for copying to clipboard in older browsers
 * @param {string} text - The text to copy
 */
function fallbackCopyToClipboard(text) {
  // Create a temporary input element
  const input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  
  // Select and copy the text
  input.select();
  document.execCommand('copy');
  
  // Remove the temporary element
  document.body.removeChild(input);
}

/**
 * Add sharing functionality to each project detail
 * This is called when new project details are added dynamically
 * @param {string} projectId - The ID of the project
 */
function addSharingToProject(projectId) {
  // Setup copy functionality
  setupProjectLinkCopy(projectId);
  
  // Setup social sharing
  setupProjectSocialSharing(projectId);
}

/**
 * Social media sharing functions
 */
function shareOnLinkedIn(projectId) {
  const baseUrl = window.location.origin + window.location.pathname;
  const projectUrl = `${baseUrl}?project=${projectId}`;
  const title = document.querySelector(`#project-${projectId} h3`).textContent;
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}&title=${encodeURIComponent(title)}`;
  window.open(shareUrl, 'share-linkedin', 'width=580,height=520');
}

function shareOnTwitter(projectId) {
  const baseUrl = window.location.origin + window.location.pathname;
  const projectUrl = `${baseUrl}?project=${projectId}`;
  const title = document.querySelector(`#project-${projectId} h3`).textContent;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(projectUrl)}`;
  window.open(shareUrl, 'share-twitter', 'width=550,height=450');
}

function shareOnFacebook(projectId) {
  const baseUrl = window.location.origin + window.location.pathname;
  const projectUrl = `${baseUrl}?project=${projectId}`;
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectUrl)}`;
  window.open(shareUrl, 'share-facebook', 'width=580,height=520');
}

function shareOnWhatsApp(projectId) {
  const baseUrl = window.location.origin + window.location.pathname;
  const projectUrl = `${baseUrl}?project=${projectId}`;
  const title = document.querySelector(`#project-${projectId} h3`).textContent;
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${projectUrl}`)}`;
  window.open(shareUrl, 'share-whatsapp', 'width=580,height=520');
}

function copyProjectLink(projectId) {
  const baseUrl = window.location.origin + window.location.pathname;
  const projectUrl = `${baseUrl}?project=${projectId}`;
  navigator.clipboard.writeText(projectUrl).then(() => {
    const notification = document.querySelector(`[data-project="${projectId}"]`).nextElementSibling;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 2000);
  });
}
