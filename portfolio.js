// DOM Elements
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
    navLinks.classList.remove('active');
  }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Update active nav link based on scroll position
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').substring(1) === current) {
      item.classList.add('active');
    }
  });
  
  // Animate sections on scroll
  animateSections();
});

// Handle contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would normally send the form data to a server
    // For now, we'll just log it and show a success message
    console.log({ name, email, subject, message });
    
    // Show success message
    const formSuccess = document.createElement('div');
    formSuccess.className = 'form-success';
    formSuccess.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <p>Thanks for your message, ${name}! I'll get back to you soon.</p>
    `;
    
    // Replace form with success message
    contactForm.innerHTML = '';
    contactForm.appendChild(formSuccess);
    
    // Style the success message
    document.querySelector('.form-success').style.textAlign = 'center';
    document.querySelector('.form-success').style.padding = '30px';
    document.querySelector('.form-success i').style.fontSize = '3rem';
    document.querySelector('.form-success i').style.color = 'var(--success-color)';
    document.querySelector('.form-success i').style.marginBottom = '15px';
  });
}

// Animate sections when they come into view
function animateSections() {
  const triggerBottom = window.innerHeight * 0.8;
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    
    if (sectionTop < triggerBottom) {
      section.classList.add('active');
    }
  });
}

// Typing effect for hero section
function typeEffect(element, text, speed = 100) {
  let i = 0;
  
  // Clear the element's content first
  element.innerHTML = '';
  
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  
  typing();
}

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
  // Animate hero section immediately
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.classList.add('active');
  }
  
  // Check for sections in view on initial load
  animateSections();
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Initialize skill bars animation if they exist
  const skillBars = document.querySelectorAll('.skill-progress');
  if (skillBars.length > 0) {
    skillBars.forEach(bar => {
      const progress = bar.dataset.progress;
      setTimeout(() => {
        bar.style.width = `${progress}%`;
      }, 500);
    });
  }
  
  // Add CSS for form success and animations
  const style = document.createElement('style');
  style.innerHTML = `
    .form-success {
      animation: fadeIn 0.5s ease-in-out;
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .skill-progress {
      transition: width 1s ease-in-out;
    }
  `;
  document.head.appendChild(style);
  
  // Optional: Uncomment to enable typing effect on hero heading
  const heroTitle = document.querySelector('.hero-text h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    setTimeout(() => {
      typeEffect(heroTitle, text, 70);
    }, 500);
  }
  
  // Optional: Uncomment to enable project filtering

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filter = button.dataset.filter;
        
        // Filter projects
        projectCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
          } else if (card.classList.contains(filter)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Optional: Uncomment to enable dark/light mode toggle

  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      body.classList.add(savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
      
      // Save preference to localStorage
      if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark-theme');
      } else {
        localStorage.removeItem('theme');
      }
    });
  }
});