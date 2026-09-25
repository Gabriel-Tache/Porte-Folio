/*
===============================================================
Gabriel Taché — Portfolio
Interactions & animations
===============================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- GESTION DU MODE SOMBRE VIA LOCALSTORAGE ---
  const savedTheme = localStorage.getItem('portfolio-theme');
  const toggleSwitches = document.querySelectorAll('.toggle-switch');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    updateThemeIcons(true);
  }

  toggleSwitches.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
      updateThemeIcons(isDark);
    });
  });

  function updateThemeIcons(isDark) {
    toggleSwitches.forEach(sw => {
      const icon = sw.querySelector('i');
      if (icon) {
        icon.className = isDark ? 'uil uil-sun' : 'uil uil-moon';
      }
    });
  }

  // --- ANIMATION DE TYPING (TYPED.JS) ---
  if (window.Typed) {
    new Typed(".typedText", {
      strings: [
        "Étudiant Ingénieur",
        "Spécialisé Cybersécurité",
        "Architecte Systèmes & Réseaux"
      ],
      loop: true,
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // --- FERMETURE DU MENU MOBILE AU CLIC SUR UN LIEN ---
  const navLinks = document.querySelectorAll('.nav-link:not(.toggle-switch)');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menuBtn = document.getElementById("myNavMenu");
      if (menuBtn && menuBtn.classList.contains("responsive")) {
        menuBtn.classList.remove("responsive");
      }
    });
  });
});

// --- ACCORDÉON PFE EXTENSIBLE SANS MODIFIER L'IMAGE ---
function togglePFE() {
  const pfeDetails = document.getElementById("pfe-details");
  const pfeBtn = document.getElementById("pfe-toggle-btn");

  if (!pfeDetails || !pfeBtn) return;

  const isOpen = pfeDetails.classList.toggle("is-open");
  const btnText = pfeBtn.querySelector("span");
  const btnIcon = pfeBtn.querySelector("i");

  if (isOpen) {
    if (btnText) btnText.textContent = "Masquer les détails techniques";
    if (btnIcon) btnIcon.className = "uil uil-angle-up";
  } else {
    if (btnText) btnText.textContent = "Afficher les détails techniques";
    if (btnIcon) btnIcon.className = "uil uil-angle-down";
  }
}

// --- OUVERTURE / FERMETURE MENU MOBILE ---
function myMenuFunction() {
  const menuBtn = document.getElementById("myNavMenu");
  if (!menuBtn) return;
  menuBtn.classList.toggle("responsive");
}

// --- NAVBAR AU SCROLL ---
window.addEventListener('scroll', () => {
  const navHeader = document.getElementById("header");
  if (!navHeader) return;

  if (window.scrollY > 30) {
    navHeader.classList.add("nav-scrolled");
  } else {
    navHeader.classList.remove("nav-scrolled");
  }
});

// --- SURBRILLANCE DU LIEN ACTIF DANS LA NAV ---
const sections = document.querySelectorAll('section[id]');
function scrollActive() {
  const scrollY = window.scrollY;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');

    const link = document.querySelector(`.nav-menu a[href*="${sectionId}"]:not(.toggle-switch)`);
    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

// --- SCROLLREVEAL ---
if (window.ScrollReveal) {
  const sr = ScrollReveal({
    origin: 'top',
    distance: '40px',
    duration: 1200,
    reset: false,
    viewFactor: 0.15
  });

  sr.reveal('.badge-status', {});
  sr.reveal('.featured-name', { delay: 100 });
  sr.reveal('.featured-text-info', { delay: 150 });
  sr.reveal('.featured-text-btn', { delay: 200 });
  sr.reveal('.social_icons', { delay: 200 });
  sr.reveal('.featured-image', { delay: 200 });
  sr.reveal('.stat-card', { interval: 100 });
  sr.reveal('.top-header', {});
  sr.reveal('.info-card', { interval: 120 });
  sr.reveal('.pfe-card', { delay: 100 });
  sr.reveal('.skills-card', { interval: 100 });
  sr.reveal('.project-box', { interval: 100 });
  sr.reveal('.contact-card', {});
}

// --- MODAL PROJET ---
(function() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const titleEl = document.getElementById('pmodal-title');
  const bodyEl = document.getElementById('pmodal-body');
  const closeBtn = modal.querySelector('.pmodal__close');

  function openModal({ title, bodyNode }) {
    titleEl.textContent = title || 'Détails du projet';
    bodyEl.innerHTML = '';
    if (bodyNode) bodyEl.appendChild(bodyNode);

    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.project-box').forEach(box => {
    box.addEventListener('click', () => {
      const title = box.dataset.title || box.querySelector('h3')?.textContent || 'Projet';
      const tpl = box.querySelector('template.project-body');
      const bodyNode = tpl ? tpl.content.cloneNode(true) : document.createTextNode('');
      openModal({ title, bodyNode });
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    const dialog = modal.querySelector('.pmodal__dialog');
    if (dialog && !dialog.contains(e.target)) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();
