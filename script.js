// Hamburger menu toggle for mobile
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbar-menu');
const body = document.body;

function toggleMenu(forceClose = false) {
  if (!navbarMenu || !hamburger) return;
  if (forceClose) {
    navbarMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
    return;
  }
  navbarMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
  const expanded = navbarMenu.classList.contains('open');
  hamburger.setAttribute('aria-expanded', expanded);
  body.classList.toggle('menu-open', expanded);
}

if (hamburger) {
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });
  hamburger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    }
  });
}

if (navbarMenu) {
  navbarMenu.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' || e.target.classList.contains('contact-btn-mobile')) {
      toggleMenu(true);
    }
  });
}

document.addEventListener('click', function(e) {
  if (!navbarMenu || !hamburger) return;
  if (!navbarMenu.contains(e.target) && !hamburger.contains(e.target)) {
    toggleMenu(true);
  }
});

// Section Two Slider Functionality
(function() {
  const slidesTemplate = document.getElementById('section-two-slides');
  if (!slidesTemplate) return;
  const slides = Array.from(slidesTemplate.content.children);
  let current = 0;
  const imgEl = document.getElementById('section-two-img');
  const contentEl = document.getElementById('section-two-content');
  const prevBtn = document.getElementById('section-two-prev');
  const nextBtn = document.getElementById('section-two-next');

  function showSlide(idx) {
    const slide = slides[idx];
    if (!slide) return;
    // Update image
    const imgSrc = slide.getAttribute('data-img');
    if (imgEl) imgEl.src = imgSrc;
    // Update content
    if (contentEl) {
      // Remove all children
      while (contentEl.firstChild) contentEl.removeChild(contentEl.firstChild);
      // Clone slide content (excluding data-img)
      Array.from(slide.children).forEach(child => {
        contentEl.appendChild(child.cloneNode(true));
      });
    }
  }
  function gotoPrev() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }
  function gotoNext() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }
  if (prevBtn) prevBtn.addEventListener('click', gotoPrev);
  if (nextBtn) nextBtn.addEventListener('click', gotoNext);
  // Initialize
  showSlide(current);
  
  // Ensure initial image is visible
  if (imgEl) {
    console.log('Initial image src:', imgEl.src);
    imgEl.style.opacity = '1';
    imgEl.style.visibility = 'visible';
    imgEl.style.display = 'block';
  }
})();

// Explore Functionality Section Slider
(function() {
  const slidesTemplate = document.getElementById('features-slides');
  if (!slidesTemplate) return;
  const slides = Array.from(slidesTemplate.content.children);
  let current = 0;
  const contentEl = document.getElementById('features-content');
  const imgEl = document.getElementById('features-img');
  const prevBtn = document.getElementById('features-prev');
  const nextBtn = document.getElementById('features-next');

  function showSlide(idx) {
    const slide = slides[idx];
    if (!slide) return;
    // Fade out image
    if (imgEl) {
      imgEl.classList.add('switching');
      setTimeout(() => {
        const imgArr = JSON.parse(slide.getAttribute('data-imgs'));
        imgEl.src = imgArr[0];
        // Set zoom and fit based on slide
        if (imgArr[0].includes('pixel')) {
          imgEl.style.transform = 'scale(1)';
          imgEl.classList.add('pixel-img');
        } else {
          imgEl.style.transform = 'scale(1.18)';
          imgEl.classList.remove('pixel-img');
        }
        imgEl.onload = () => {
          imgEl.classList.remove('switching');
          imgEl.style.opacity = '1';
          imgEl.style.visibility = 'visible';
          imgEl.style.display = 'block';
        };
        imgEl.onerror = () => {
          imgEl.classList.remove('switching');
          imgEl.style.opacity = '1';
          imgEl.style.visibility = 'visible';
          imgEl.style.display = 'block';
        };
      }, 180);
    }
    // Update features content
    if (contentEl) {
      while (contentEl.firstChild) contentEl.removeChild(contentEl.firstChild);
      Array.from(slide.children).forEach(child => {
        contentEl.appendChild(child.cloneNode(true));
      });
    }
  }
  function gotoPrev() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }
  function gotoNext() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }
  if (prevBtn) prevBtn.addEventListener('click', gotoPrev);
  if (nextBtn) nextBtn.addEventListener('click', gotoNext);
  // Initialize
  showSlide(current);
})(); 