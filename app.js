function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

$(function() {
  // This will select everything with the class smoothScroll
  // This should prevent problems with carousel, scrollspy, etc...
  $('.smoothScroll').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1300); // The number here represents the speed of the scroll in milliseconds
        return false;
      }
    }
  });
});

// Smooth scrolling for navigation links with enhanced effects
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetID = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetID);
        
        // Add a subtle glow effect to the clicked link
        this.style.textShadow = '0 0 20px var(--accent-color)';
        setTimeout(() => {
            this.style.textShadow = '';
        }, 1000);
        
        window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add a subtle glow effect when elements come into view
            if (entry.target.classList.contains('project') || entry.target.classList.contains('project2')) {
                entry.target.style.boxShadow = '0 0 30px var(--accent-glow)';
                setTimeout(() => {
                    entry.target.style.boxShadow = '';
                }, 2000);
            }
        }
    });
}, observerOptions);

// Observe all sections and projects
document.querySelectorAll('.section, .project, .project2').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Parallax effect for the landing page background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const landingPage = document.getElementById('landing-page');
    
    if (landingPage) {
        const rate = scrolled * -0.5;
        landingPage.style.transform = `translateY(${rate}px)`;
    }
});

// Mouse move effect for interactive elements
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Create subtle glow effect following mouse
    const glowElements = document.querySelectorAll('.project, .project2, nav');
    glowElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementX = rect.left + rect.width / 2;
        const elementY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2)
        );
        
        if (distance < 200) {
            const intensity = (200 - distance) / 200;
            element.style.setProperty('--mouse-glow', `${intensity * 0.3}`);
        } else {
            element.style.setProperty('--mouse-glow', '0');
        }
    });
});

// Enhanced hover effects for project cards
document.querySelectorAll('.project, .project2').forEach(project => {
    project.addEventListener('mouseenter', function() {
        // Add floating animation
        this.style.animation = 'projectFloat 3s ease-in-out infinite';
        
        // Enhance glow effect
        this.style.boxShadow = `
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 50px var(--accent-glow),
            0 0 100px var(--accent-glow)
        `;
    });
    
    project.addEventListener('mouseleave', function() {
        this.style.animation = '';
        this.style.boxShadow = '';
    });
});

// Typing effect for the main title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const title = document.querySelector('#landing-page h1');
    if (title) {
        const originalText = title.textContent;
        typeWriter(title, originalText, 150);
    }
});

// Smooth reveal animation for profile picture
window.addEventListener('load', () => {
    const profilePic = document.querySelector('.profile-picture');
    if (profilePic) {
        profilePic.style.opacity = '0';
        profilePic.style.transform = 'scale(0.5) rotate(180deg)';
        
        setTimeout(() => {
            profilePic.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            profilePic.style.opacity = '1';
            profilePic.style.transform = 'scale(1) rotate(0deg)';
        }, 1000);
    }
});

// Add CSS for the new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes projectFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
    
    .project, .project2 {
        --mouse-glow: 0;
        box-shadow: 0 0 20px calc(var(--mouse-glow) * 100px) var(--accent-glow);
    }
    
    /* Enhanced focus states for accessibility */
    nav a:focus,
    .project a:focus,
    .project2 a:focus {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
    }
    
    /* Loading animation for images */
    .project img, .project2 img {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    .project img.loaded, .project2 img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Image loading animation
document.querySelectorAll('.project img, .project2 img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    // If image is already loaded
    if (img.complete) {
        img.classList.add('loaded');
    }
});

// Smooth scroll to top functionality
function createScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-color);
        color: var(--primary-bg);
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px var(--accent-glow);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.transform = 'scale(1.1)';
        scrollButton.style.boxShadow = '0 10px 25px var(--accent-color)';
    });
    
    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.transform = 'scale(1)';
        scrollButton.style.boxShadow = '0 5px 15px var(--accent-glow)';
    });
}

// Initialize scroll to top button
createScrollToTop();

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can go here
}, 16)); // ~60fps
  