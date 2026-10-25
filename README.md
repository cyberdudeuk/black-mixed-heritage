const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const filterButtons = document.querySelectorAll('.filter-btn');
const storyCards = document.querySelectorAll('.story-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

    storyCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !matches);
    });
  });
});

const signupForm = document.querySelector('.signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const button = signupForm.querySelector('button');
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'You’re in!';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        signupForm.reset();
      }, 1800);
    }
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const activeNav = document.querySelectorAll('.main-nav a');
const activePage = window.location.pathname.split('/').pop() || 'index.html';
activeNav.forEach((link) => {
  const href = link.getAttribute('href');
  if (href === activePage) {
    link.classList.add('active');
  }
});

if (document.querySelector('.main-nav a.active') === null) {
  const homeLink = document.querySelector('.main-nav a[href="index.html"]');
  if (homeLink) homeLink.classList.add('active');
}

const root = document.documentElement;
root.style.setProperty('--gold-soft', '#f6dba0');

const footerText = document.querySelector('.site-footer p:last-child');
if (footerText) {
  footerText.setAttribute('role', 'note');
}

const focusableFooter = document.querySelector('.site-footer a');
if (focusableFooter) {
  focusableFooter.setAttribute('aria-label', 'Explore Black and Mixed Heritage');
}

