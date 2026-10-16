/*
===============================================================
Gabriel Taché — Portfolio Ingénieur Cybersécurité
Interactions, Liquid Glass Nav, Filtres & Accessibilité
===============================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. GESTION DU MODE SOMBRE (LOCALSTORAGE + PRÉFÉRENCE SYSTÈME) ---
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const toggleSwitches = document.querySelectorAll('.toggle-switch');

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
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

  // --- 2. ANIMATION DE TYPING (TYPED.JS) ---
  if (window.Typed) {
    new Typed(".typedText", {
      strings: [
        "Ingénieur Cybersécurité",
        "Architecte Systèmes & Réseaux",
        "Ingénieur DevSecOps & Audit",
        "Sécurité des Systèmes Critiques"
      ],
      loop: true,
      typeSpeed: 68,
      backSpeed: 42,
      backDelay: 2200
    });
  }

  // --- 3. FERMETURE DU MENU MOBILE AU CLIC SUR UN LIEN ---
  const navLinks = document.querySelectorAll('.nav-link:not(.toggle-switch)');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // --- 4. FILTRAGE DYNAMIQUE DES PROJETS ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectBoxes = document.querySelectorAll('.project-box');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      projectBoxes.forEach(box => {
        const category = box.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          box.classList.remove('is-hidden');
        } else {
          box.classList.add('is-hidden');
        }
      });
    });
  });
});

// --- OUVERTURE / FERMETURE DU MENU MOBILE AVEC OVERLAY ---
function toggleMobileMenu() {
  const menu = document.getElementById("myNavMenu");
  const overlay = document.getElementById("nav-overlay");
  const toggleBtn = document.getElementById("menu-toggle-btn");
  if (!menu) return;

  const isOpen = menu.classList.toggle("responsive");
  if (overlay) overlay.classList.toggle("is-active", isOpen);
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    const icon = toggleBtn.querySelector("i");
    if (icon) icon.className = isOpen ? "uil uil-times" : "uil uil-bars";
  }
  document.body.style.overflow = isOpen ? "hidden" : "";
}

function closeMobileMenu() {
  const menu = document.getElementById("myNavMenu");
  const overlay = document.getElementById("nav-overlay");
  const toggleBtn = document.getElementById("menu-toggle-btn");
  if (!menu) return;

  menu.classList.remove("responsive");
  if (overlay) overlay.classList.remove("is-active");
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-expanded", "false");
    const icon = toggleBtn.querySelector("i");
    if (icon) icon.className = "uil uil-bars";
  }
  if (!document.body.classList.contains("modal-open")) {
    document.body.style.overflow = "";
  }
}

// Sécurité supplémentaire : fermer le menu si la fenêtre repasse en mode desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 940) {
    closeMobileMenu();
  }
});

// --- ACCORDÉON PFE EXTENSIBLE ---
function togglePFE() {
  const pfeDetails = document.getElementById("pfe-details");
  const pfeBtn = document.getElementById("pfe-toggle-btn");

  if (!pfeDetails || !pfeBtn) return;

  const isOpen = pfeDetails.classList.toggle("is-open");
  pfeBtn.setAttribute("aria-expanded", String(isOpen));

  const btnText = pfeBtn.querySelector("span");
  const btnIcon = pfeBtn.querySelector("i");

  if (isOpen) {
    if (btnText) btnText.textContent = "Masquer les responsabilités détaillées";
    if (btnIcon) btnIcon.className = "uil uil-angle-up";
  } else {
    if (btnText) btnText.textContent = "Afficher mes responsabilités détaillées";
    if (btnIcon) btnIcon.className = "uil uil-angle-down";
  }
}

// --- COPIE RAPIDE DE L'EMAIL AVEC NOTIFICATION TOAST ---
function copyEmail() {
  const email = "gabriel.tache.gt@gmail.com";
  const toast = document.getElementById("toast-notification");
  const copyIcon = document.getElementById("copy-icon");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(showCopyFeedback);
  } else {
    const tempInput = document.createElement("textarea");
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showCopyFeedback();
  }

  function showCopyFeedback() {
    if (copyIcon) copyIcon.className = "uil uil-check";
    if (toast) toast.classList.add("is-visible");

    setTimeout(() => {
      if (copyIcon) copyIcon.className = "uil uil-copy";
      if (toast) toast.classList.remove("is-visible");
    }, 2600);
  }
}

// --- SCROLL : LIQUID GLASS NAV, PROGRESSION, RETOUR EN HAUT & LIEN ACTIF ---
const sections = document.querySelectorAll('section[id]');

function handleScroll() {
  const scrollY = window.scrollY;
  const navHeader = document.getElementById("header");
  const backToTop = document.getElementById("back-to-top");
  const progressBar = document.getElementById("scroll-progress");

  // Adaptation subtile de la capsule Liquid Glass au scroll
  if (navHeader) {
    navHeader.classList.toggle("nav-scrolled", scrollY > 25);
  }

  // Bouton Retour en haut
  if (backToTop) {
    backToTop.classList.toggle("is-visible", scrollY > 450);
  }

  // Barre de progression
  if (progressBar) {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }

  // Liens actifs dans la navigation (barre desktop & tiroir mobile)
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 140;
    const sectionId = current.getAttribute('id');

    const links = document.querySelectorAll(`a.nav-link[href*="${sectionId}"]:not(.toggle-switch)`);
    links.forEach(l => {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        l.classList.add('active-link');
      } else {
        l.classList.remove('active-link');
      }
    });
  });
}

window.addEventListener('scroll', handleScroll, { passive: true });

// --- ANIMATIONS D'APPARITION (SCROLLREVEAL) ---
if (window.ScrollReveal) {
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '26px',
    duration: 900,
    reset: false,
    viewFactor: 0.12
  });

  sr.reveal('.badge-status', { origin: 'top' });
  sr.reveal('.featured-name', { delay: 80 });
  sr.reveal('.featured-text-info', { delay: 140 });
  sr.reveal('.featured-text-btn', { delay: 180 });
  sr.reveal('.social_icons', { delay: 220 });
  sr.reveal('.featured-image', { delay: 180, origin: 'right' });
  sr.reveal('.stat-card', { interval: 80 });
  sr.reveal('.top-header', {});
  sr.reveal('.info-card', { interval: 110 });
  sr.reveal('.pfe-card', { delay: 80 });
  sr.reveal('.skills-card', { interval: 90 });
  sr.reveal('.project-filters', { delay: 60 });
  sr.reveal('.project-box', { interval: 90 });
  sr.reveal('.contact-card', {});
}

// --- MODAL PROJET (CLIC & ACCESSIBILITÉ CLAVIER) ---
(function() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const titleEl = document.getElementById('pmodal-title');
  const bodyEl = document.getElementById('pmodal-body');
  const closeBtn = modal.querySelector('.pmodal__close');
  let lastFocusedElement = null;

  function openModal({ title, bodyNode }) {
    lastFocusedElement = document.activeElement;
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
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  document.querySelectorAll('.project-box').forEach(box => {
    const triggerProjectModal = () => {
      const title = box.dataset.title || box.querySelector('h3')?.textContent || 'Projet';
      const tpl = box.querySelector('template.project-body');
      const bodyNode = tpl ? tpl.content.cloneNode(true) : document.createTextNode('');
      openModal({ title, bodyNode });
    };

    box.addEventListener('click', triggerProjectModal);
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerProjectModal();
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    const dialog = modal.querySelector('.pmodal__dialog');
    if (dialog && !dialog.contains(e.target)) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal.classList.contains('is-open')) closeModal();
      closeMobileMenu();
    }
  });
})();
