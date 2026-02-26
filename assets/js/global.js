/**
 * Shamikh Mushtaq - Premium Portfolio Global Script
 * GSAP Timelines, AOS Init, Custom Cursor, Typed.js, and Form Validation
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Advanced Preloader Logic ---
    const preloader = document.getElementById("preloader");
    const counterText = document.getElementById("loader-counter");
    const ringFill = document.querySelector(".ring-fill");
    
    // Properties to animate
    let loadState = { progress: 0 };
    
    // The exact length of the circle's circumference
    const circleLength = 339.292; 

    // Create a master GSAP timeline for the loader
    const loaderTL = gsap.timeline({
      onComplete: () => {
        preloader.style.display = "none";
        document.body.classList.remove("loading");
        initHeroAnimation();
      }
    });

    // 1. Initial fade in of the brand
    loaderTL.to(".loader-brand", { opacity: 1, duration: 1, ease: "power2.out" })
            .to(".loader-tagline", { opacity: 1, y: -5, duration: 1, ease: "power2.out" }, "-=0.5");

    // 2. Animate the percentage counter and SVG stroke simultaneously
    loaderTL.to(loadState, {
      progress: 100,
      duration: 2.5,
      ease: "power3.inOut",
      onUpdate: () => {
        // Update text
        counterText.textContent = Math.floor(loadState.progress) + "%";
        // Update SVG stroke-dashoffset (draws the ring)
        const offset = circleLength - (loadState.progress / 100) * circleLength;
        ringFill.style.strokeDashoffset = offset;
      }
    });

    // 3. The Climax ("World-Class" Transition)
    loaderTL.to(".loader-brand", { letterSpacing: "12px", duration: 1, ease: "power3.inOut" }, "-=0.5")
            .to(".loader-brand-blur", { opacity: 0.8, letterSpacing: "12px", duration: 1, ease: "power3.inOut" }, "-=1")
            .to([".loader-progress-ring", ".loader-tagline"], { opacity: 0, scale: 0.8, duration: 0.5, ease: "power2.in" })
            .to(".loader-brand-wrapper", { scale: 10, opacity: 0, duration: 1, ease: "power4.in" }, "+=0.2")
            // Split the background panels
            .to(".panel-left", { xPercent: -100, duration: 1.2, ease: "power4.inOut" }, "-=0.8")
            .to(".panel-right", { xPercent: 100, duration: 1.2, ease: "power4.inOut" }, "-=1.2");
  
    // --- Custom Cursor ---
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    const interactables = document.querySelectorAll("a, button, input, textarea, .project-card, .skill-card");
  
    // Only animate cursor on non-touch devices
    if(window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
    
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    
        // Smooth follow for outline
        cursorOutline.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
      });
    
      interactables.forEach(el => {
        el.addEventListener("mouseenter", () => {
          document.body.classList.add("hovering");
        });
        el.addEventListener("mouseleave", () => {
          document.body.classList.remove("hovering");
        });
      });
    }
  
    // --- Theme Toggle ---
    const themeBtn = document.querySelector(".theme-toggle");
    const htmlEl = document.documentElement;
    const themeIcon = themeBtn.querySelector("i");
  
    // Check local storage for preference
    const savedTheme = localStorage.getItem("portfolio_theme");
    if(savedTheme === "light") {
      htmlEl.classList.remove("dark-theme");
      htmlEl.classList.add("light-theme");
      themeIcon.classList.replace("fa-sun", "fa-moon");
    }
  
    themeBtn.addEventListener("click", () => {
      htmlEl.classList.toggle("light-theme");
      htmlEl.classList.toggle("dark-theme");
      
      if(htmlEl.classList.contains("light-theme")) {
        themeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("portfolio_theme", "light");
      } else {
        themeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("portfolio_theme", "dark");
      }
    });
  
    // --- Mobile Navigation ---
    const hamburger = document.querySelector(".hamburger");
    const navContainer = document.querySelector(".nav-container");
    const navLinks = document.querySelectorAll(".nav-link");
  
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navContainer.classList.toggle("active");
    });
  
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navContainer.classList.remove("active");
      });
    });
  
    // --- Header Scroll Effect ---
    const header = document.getElementById("site-header");
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  
    // --- Typed.js Initialization ---
    new Typed("#typed-text", {
      strings: [
        "Technical Lead",
        "Full-Stack Web Developer",
        "Digital Transformer",
        "UI/UX Enthusiast"
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true
    });
  
    // --- AOS Initialization ---
    AOS.init({
      duration: 800,
      offset: 100,
      once: true, // Animation plays only once on scroll
      easing: "ease-out-cubic"
    });
  
    // --- GSAP Hero Animations ---
    function initHeroAnimation() {
      const tl = gsap.timeline();
  
      tl.to(".hero-badge", { opacity: 1, y: -20, duration: 0.8, ease: "power3.out" })
        .from(".hero-title .title-line", { y: 100, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.4")
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".hero-desc", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .to(".hero-actions", { opacity: 1, y: -20, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .to(".scroll-indicator", { opacity: 1, duration: 1 }, "-=0.2");
  
      // Parallax effect on Hero scrolling
      gsap.to(".hero-content", {
        yPercent: 40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  
    // --- Security Restricts (From Original) ---
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && (e.key === "u" || e.key === "s" || (e.shiftKey && e.key === "I"))) {
        e.preventDefault();
      }
    });
  
    // --- Contact Form Handling ---
    const form = document.getElementById("contactForm");
    if(form) {
      const nameInput = form.querySelector('input[name="user_name"]');
      const emailInput = form.querySelector('input[name="user_email"]');
      const messageInput = form.querySelector('textarea[name="user_message"]');
  
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        let errorMsg = null;
        let errorInput = null;
  
        if (!nameInput.value.trim()) {
          errorMsg = "Please enter your name.";
          errorInput = nameInput;
        } else if (!emailInput.value.trim() || !emailInput.validity.valid) {
          errorMsg = "Please enter a valid email address.";
          errorInput = emailInput;
        } else if (!messageInput.value.trim()) {
          errorMsg = "Please enter a message.";
          errorInput = messageInput;
        }
  
        if (errorMsg) {
          Swal.fire({
            icon: "warning",
            title: "Hold on...",
            text: errorMsg,
            customClass: {
              popup: 'custom-swal-popup',
              confirmButton: 'custom-swal-button'
            },
            buttonsStyling: false
          }).then(() => {
            if(errorInput) errorInput.focus();
          });
          return;
        }
  
        // Submit via Netlify
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
  
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        })
        .then(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Thank you for reaching out. I'll get back to you shortly.",
            customClass: {
              popup: 'custom-swal-popup',
              confirmButton: 'custom-swal-button'
            },
            buttonsStyling: false
          });
          form.reset();
        })
        .catch(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Something went wrong while sending the message. Please try again.",
            customClass: {
              popup: 'custom-swal-popup',
              confirmButton: 'custom-swal-button'
            },
            buttonsStyling: false
          });
        });
      });
    }
  });
  