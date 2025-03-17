
// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link on mobile
  const links = navLinks.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId !== '#') {
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Here you would typically send the data to a server
    // For demo purposes, we'll just log it and show an alert
    console.log({
      name,
      email,
      subject,
      message
    });
    
    alert('Message sent successfully! (This is a demo - no actual message was sent)');
    contactForm.reset();
  });
}

// Animate skill bars when in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Fix for About page skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    // Store the original width value as a data attribute if not already set
    if (!bar.hasAttribute('data-width')) {
      const widthValue = bar.style.width;
      bar.setAttribute('data-width', widthValue);
      // Initially set width to 0
      bar.style.width = '0';
    }
    
    // Check if the bar is in viewport
    if (isInViewport(bar) && !bar.classList.contains('animated')) {
      const width = bar.getAttribute('data-width');
      // Animate to the original width
      setTimeout(() => {
        bar.style.transition = 'width 1s ease-in-out';
        bar.style.width = width;
        bar.classList.add('animated');
      }, 200);
    }
  });
}

// Animate elements when they come into view
function animateOnScroll() {
  // Call skill bars animation
  animateSkillBars();
  
  // Animate other elements
  const fadeElements = document.querySelectorAll('.glass-card, .service-card, .project-card, .soft-skill-card');
  
  fadeElements.forEach(element => {
    if (isInViewport(element) && !element.classList.contains('faded-in')) {
      element.classList.add('faded-in');
      element.style.opacity = '0';
      setTimeout(() => {
        element.style.transition = 'opacity 0.5s, transform 0.5s';
        element.style.opacity = '1';
      }, 100);
    }
  });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Run animation once when the page loads
  animateOnScroll();
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Style Switcher
document.addEventListener('DOMContentLoaded', function() {
  // Create style element for dynamic CSS
  const dynamicStyle = document.createElement('style');
  document.head.appendChild(dynamicStyle);
  
  // Apply saved theme if exists
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }
  
  // Setup theme toggler click events
  document.querySelectorAll('.theme-color').forEach(color => {
    color.addEventListener('click', function() {
      const theme = this.getAttribute('data-color');
      applyTheme(theme);
      localStorage.setItem('theme', theme);
    });
  });
  
  // Toggle style switcher
  const styleSwitcherToggle = document.querySelector('.style-switcher-toggler');
  const styleSwitcher = document.querySelector('.style-switcher');
  
  if (styleSwitcherToggle && styleSwitcher) {
    styleSwitcherToggle.addEventListener('click', () => {
      styleSwitcher.classList.toggle('open');
    });
  }
  
  // Close style switcher when scrolling
  window.addEventListener('scroll', () => {
    if (styleSwitcher && styleSwitcher.classList.contains('open')) {
      styleSwitcher.classList.remove('open');
    }
  });
  
  // Theme color definitions
  function applyTheme(theme) {
    let colors = {
      '--neon-red': '#ff0000',
      '--neon-dark-red': '#cc0000'
    };
    
    switch(theme) {
      case 'red':
        colors = {
          '--neon-red': '#ff0000',
          '--neon-dark-red': '#cc0000'
        };
        break;
      case 'blue':
        colors = {
          '--neon-red': '#0088ff',
          '--neon-dark-red': '#0066cc'
        };
        break;
      case 'green':
        colors = {
          '--neon-red': '#00cc66',
          '--neon-dark-red': '#009944'
        };
        break;
      case 'yellow':
        colors = {
          '--neon-red': '#ffcc00',
          '--neon-dark-red': '#cc9900'
        };
        break;
    }
    
    // Apply the colors to root variables
    let css = ':root {';
    for (const [key, value] of Object.entries(colors)) {
      css += `${key}: ${value};`;
    }
    css += '}';
    
    dynamicStyle.innerHTML = css;
    
    // Update active state in switcher
    document.querySelectorAll('.theme-color').forEach(el => {
      el.classList.remove('active');
      if (el.getAttribute('data-color') === theme) {
        el.classList.add('active');
      }
    });
  }
});