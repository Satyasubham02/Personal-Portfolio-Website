document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Apply saved theme on load
  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  });

  //  Typing Effect 
  const typingElement = document.getElementById('typing');
  if (typingElement) {
    const typingTexts = ["Aspiring Web Developer", "Frontend Enthusiast", "Creative Designer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
      const currentText = typingTexts[textIndex];
      let displayText = '';

      if (isDeleting) {
        displayText = currentText.substring(0, charIndex--);
      } else {
        displayText = currentText.substring(0, charIndex++);
      }
      typingElement.textContent = displayText;

      let typeSpeed = isDeleting ? 75 : 150;

      if (!isDeleting && charIndex === currentText.length + 1) {
        isDeleting = true;
        typeSpeed = 1500; // Pause at end of word
      } else if (isDeleting && charIndex === -1) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500; // Pause before new word
      }
      
      setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();
  }

  //  Active Nav Link Highlighting on Scroll 
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Scroll Animations 
   const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target); // Optional: Stop observing after animation
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .section-title, .about-content, .contact-subtitle, .contact-form').forEach(el => {
        el.classList.add('reveal-on-scroll');
        scrollObserver.observe(el);
    });

  // --- Contact Form ---
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showToast('All fields are required!', true);
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast('Please enter a valid email address.', true);
            return;
        }
        
        showToast('Message sent successfully! 🚀');
        this.reset();
      });
  }
  
  function showToast(message, isError = false) {
      if(toast) {
          toast.textContent = message;
          toast.className = 'toast'; // Reset classes
          toast.classList.add(isError ? 'error' : 'success', 'show');
          
          setTimeout(() => {
              toast.classList.remove('show');
          }, 3000);
      }
  }

  //  Dynamic Year in Footer
  const yearSpan = document.getElementById('year');
  if(yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
