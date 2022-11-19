const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Site Map
router.get('/sitemap.xml', function(req, res) {
  res.sendFile('sitemap.xml', { root: __dirname });
  });


// Reset Password Routes 
router.get("/passwordReset", authController.getReset) //Get form to enter email
  router.get("/es/passwordReset", authController.getResetES) //Get form to enter email
router.post("/passwordReset", authController.forgotPassword) // Send email
  router.post("/es/passwordReset", authController.forgotPasswordES) // Send email
router.get("/passwordReset/:token", authController.getResetForm) // Loads reset page using auto generated token. 
  router.get("/es/passwordReset/:token", authController.getResetFormES) // Loads reset page using auto generated token. 
router.put("/passwordReset/:token", authController.resetPassword) // Changes user's Password 
  router.put("/es/passwordReset/:token", authController.resetPasswordES) // Changes user's Password 

// Shared Routes (All Languages)
router.get("/logout", authController.logout);

//Main Routes English
    // Home
    router.get("/", homeController.getIndex); 
    // Share Your Salary 
    router.get("/share", ensureAuth, postsController.getShare);
    // Recent Salaries  (Eventually change route name below to salaries,)
    router.get("/feed", ensureAuth, postsController.getFeed);
    // Profile Page
    router.get("/profile", ensureAuth, postsController.getProfile);
    // Verify Salary
    router.get("/verify", postsController.getVerified);
    // Login
    router.get("/login", authController.getLogin);
    // Sign Up 
    router.get("/signup", authController.getSignup);
    // Features
    router.get("/features/", homeController.getComingSoon);
    // Log In
    router.post("/login", authController.postLogin);
    // Sign Up
    router.post("/signup", authController.postSignup);
    
// Spanish Routes
    // Home Page
    router.get("/es/", homeController.getIndexES);  
    // Share Your Salary 
    router.get("/es/share", ensureAuth, postsController.getShareES);
    // Recent Salaries 
    router.get("/es/feed", ensureAuth, postsController.getFeedES);
    // Profile Page
    router.get("/es/profile", ensureAuth, postsController.getProfileES);
    // Verify Salary
    router.get("/es/verify", postsController.getVerifiedES);
    // Login
    router.get("/es/login", authController.getLoginES);
    // Sign Up 
    router.get("/es/signup", authController.getSignupES);
    // Coming Soon
    router.get("/features/", homeController.getComingSoon);
    // Log In
    router.post("/es/login", authController.postLoginES);
    // Sign Up
    router.post("/es/signup", authController.postSignupES);


// French Routes (Incomplete)
   //router.get("/fr/", homeController.getIndexFR); 









module.exports = router;


if (typeof window !== 'undefined') {

(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
        } else {
          selectHeader.classList.remove('header-scrolled')
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
    /**
     * Gallery Slider
     */
    new Swiper('.gallery-slider', {
      speed: 400,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 30
        },
        1200: {
          slidesPerView: 7,
          spaceBetween: 30
        }
      }
    });
  
    /**
     * Initiate gallery lightbox 
     */
    const galleryLightbox = GLightbox({
      selector: '.gallery-lightbox'
    });
  
    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 40
        },
  
        1200: {
          slidesPerView: 2,
          spaceBetween: 40
        }
      }
    });
  
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    });
  
  })()

}