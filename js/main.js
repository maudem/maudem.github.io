

(function() {
    'use strict';
  
    // Check to make sure service workers are supported in the current browser,
    // and that the current page is accessed from a secure origin. Using a
    // service worker from an insecure origin will trigger JS console errors. See
    // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
    var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(
          /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
      );
  
    if ('serviceWorker' in navigator &&
        (window.location.protocol === 'https:' || isLocalhost)) {
      navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set:
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            var installingWorker = registration.installing;
  
            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break;
  
                case 'redundant':
                  throw new Error('The installing ' +
                                  'service worker became redundant.');
  
                default:
                  // Ignore
              }
            };
          }
        };
      }).catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
    }
  
    // web font loader
    WebFont.load({
        google: {
        families: ['Caveat', 'Raleway', 'Rock+Salt']
        }
    });

    // about brain
 
    const svgPath = document.querySelectorAll('.path');

    const svgText = anime({
    targets: svgPath,
    loop: false,
    direction: 'alternate',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 5000,
    delay: (el, i) => { return i * 100 }
    });
    
    // mobile slide menu
    $(document).ready(function(){
        $('.sidenav').sidenav();
      });
            
    // $("#slideshow > div:gt(0)").hide();

    // setInterval(function() { 
    // $('#slideshow > div:first')

    //     .show("slide", { direction: "left" }, 1000)
    //     .next()
    //     .hide("slide", { direction: "left" }, 1000)
    //     .end()
    //     .appendTo('#slideshow');
    // },  3000);


    // let imgArray = document.querySelectorAll('.icon-scroll'), i=0;

    // function autoSwipe(){
    //     if(i>= imgArray.length) {
    //         i=0;

    //         for(let i = 0; i< imgArray.length; i++) {
    //             imgArray[i].style.left = '100%';
    //             imgArray[i].style.transition = '0s';
    //         }
    //     }
    //     setTimeout(
    //         function() {
    //            for(let i = 0; i < imgArray.length; i++) {
    //             imgArray[i].style.transition = '.7s'
    //           }
    //             imgArray[i - 1].style.left = '0' 
    //         }
    //               , 0)
    //          setTimeout(
    //          function() {
    //             imgArray[i - 1].style.left = '-100%'
    //          }
    //               , 2000)
    //           setTimeout(autoSwipe, 2000)
    //         i++
    //       } i = 0;  
    // autoSwipe();
    // document.getElementById("icon-scroll").appendChild(img);
    // img.src = 'assets/images/brain.svg';

    
  })();

