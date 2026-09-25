const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const yearEl = document.getElementById('year');
const tiltElements = document.querySelectorAll('.profile-card, .skill-card, .project-card, .timeline-content, .card-panel, .contact-box, .mini-stats li');
const educationImages = document.querySelectorAll('.education-image');
const introScreen = document.querySelector('.intro-screen');
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const typingText = document.querySelector('.typing-text');

const revealSections = document.querySelectorAll('.section-block');
const revealItems = document.querySelectorAll('.skills-grid > *, .project-grid > *, .certification-grid > *, .about-grid > *, .timeline-item');

revealSections.forEach((section) => section.classList.add('reveal-on-scroll'));
revealItems.forEach((item, index) => {
  item.classList.add('reveal-item');
  item.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealSections.forEach((section) => revealObserver.observe(section));

if (typingText) {
  const typingPhrases = [
    'I build ideas into modern digital experiences.',
    'I turn code into meaningful products.',
    'I solve real problems with technology.',
    'I am learning, building, and growing every day.'
  ];
  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const typePhrase = () => {
    const phrase = typingPhrases[phraseIndex];
    typingText.textContent = phrase.slice(0, characterIndex);

    if (!deleting && characterIndex < phrase.length) {
      characterIndex += 1;
      window.setTimeout(typePhrase, 75);
      return;
    }

    if (!deleting) {
      deleting = true;
      window.setTimeout(typePhrase, 1800);
      return;
    }

    if (characterIndex > 0) {
      characterIndex -= 1;
      window.setTimeout(typePhrase, 38);
      return;
    }

    deleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    window.setTimeout(typePhrase, 350);
  };

  typePhrase();
}

document.body.classList.add('intro-active');

if (introScreen) {
  window.setTimeout(() => {
    introScreen.classList.add('is-opening');
  }, 3650);

  window.setTimeout(() => {
    introScreen.remove();
    document.body.classList.remove('intro-active');
  }, 5000);
}

if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
  let cursorX = -100;
  let cursorY = -100;
  let ringX = -100;
  let ringY = -100;

  document.body.classList.add('cursor-ready');

  const moveCursor = () => {
    ringX += (cursorX - ringX) * 0.1;
    ringY += (cursorY - ringY) * 0.1;
    cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    window.requestAnimationFrame(moveCursor);
  };

  document.addEventListener('pointermove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
  });

  document.querySelectorAll('a, button, img').forEach((element) => {
    element.addEventListener('pointerenter', () => cursorRing.classList.add('is-hovering'));
    element.addEventListener('pointerleave', () => cursorRing.classList.remove('is-hovering'));
  });

  window.requestAnimationFrame(moveCursor);
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (tiltElements.length) {
  tiltElements.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 16;
      const rotateX = (0.5 - y) * 16;

      card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

const openFullscreen = (image) => {
  if (image?.requestFullscreen) {
    image.requestFullscreen();
  }
};

educationImages.forEach((image) => {
  image.addEventListener('click', () => openFullscreen(image));
});
