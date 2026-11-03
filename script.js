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
  if (window.innerWidth > 1020) {
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
        const wasActive = l.classList.contains('active');
        l.classList.add('active-link');
        l.classList.add('active');
        if (!wasActive && l.parentElement && l.parentElement.id === 'navLinks' && window.updateNavbarActivePill) {
          window.updateNavbarActivePill(l);
        }
      } else {
        l.classList.remove('active-link');
        l.classList.remove('active');
      }
    });
  });
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Support de position de scroll via paramètre d'URL (pour audits et tests visuels)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('scroll')) {
  const scrollTarget = parseInt(urlParams.get('scroll'), 10);
  if (!isNaN(scrollTarget)) {
    window.scrollTo(0, scrollTarget);
    handleScroll();
  }
}

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
    if (window.rebuildLiquidGlassMaps) {
      requestAnimationFrame(window.rebuildLiquidGlassMaps);
    }
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


/*
================================================================================
MOTEUR OPTIQUE LIQUID GLASS V26 — CHROMIUM (DESKTOP + MOBILE) & VRAI SAFARI WEBKIT
- Détection par `navigator.vendor` : Chrome, Edge, Opera et leur simulateur
  Mobile DevTools restent 100% sur le filtre SVG `#lg-navbar-filter`.
- Sur Mobile (`<= 1020px`), la Normal Map utilise uniquement le biseau extérieur
  pur de la capsule (`8px`, échelles `12 / 15 / 18`) sans interférence des sous-boutons.
- Suppression totale de `safariRimCanvas` (zéro halo bleu/gris peint, zéro trou
  au-dessus de `.profile-img`).
================================================================================
*/
(() => {
  'use strict';

  const OPTICS = {
    bezelDesktop: 14,
    bezelMobile: 8,
    photoFeatherPx: 20
  };

  // Détection exacte du moteur :
  // Sur Chrome, Edge, Opera (y compris en mode iPhone dans l'inspecteur DevTools !),
  // `navigator.vendor` est "Google Inc." et `window.chrome` existe.
  // Sur un VRAI Safari macOS ou un VRAI iPhone iOS, `navigator.vendor` est "Apple Computer, Inc.".
  const ua = navigator.userAgent || '';
  const vendor = navigator.vendor || '';
  const isRealAppleWebKit = /Apple Computer/i.test(vendor) && (!window.chrome || /CriOS|FxiOS|EdgiOS/i.test(ua));
  const isFirefox = /firefox/i.test(ua);
  const urlParams = new URLSearchParams(window.location.search);
  const forceSafari = urlParams.get('safari') === '1';
  const isSafariOrFirefox = forceSafari || isRealAppleWebKit || isFirefox;

  if (isSafariOrFirefox) {
    document.body.classList.add('lg-safari-engine');
  } else {
    document.body.classList.remove('lg-safari-engine');
  }

  const state = {
    mouseX: window.innerWidth * 0.5,
    mouseY: 40,
    curX: window.innerWidth * 0.5,
    curY: 40,
    navWidth: 0,
    navHeight: 0,
    baseNavNormals: null,
    wasOverlappingPhoto: false
  };

  const XLINK_NS = 'http://www.w3.org/1999/xlink';

  function setFeImageHref(feImageEl, dataUrl, w, h) {
    if (!feImageEl || !dataUrl) return;
    if (w && h) {
      feImageEl.setAttribute('width', String(w));
      feImageEl.setAttribute('height', String(h));
    }
    feImageEl.setAttribute('href', dataUrl);
    feImageEl.setAttributeNS(XLINK_NS, 'xlink:href', dataUrl);
  }

  function smootherstep(edge0, edge1, x) {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function sdRoundedBoxCentered(px, py, cx, cy, halfW, halfH, cornerRadius) {
    const r = Math.max(2, Math.min(cornerRadius, halfW - 1, halfH - 1));
    const lx = Math.abs(px - cx) - (halfW - r);
    const ly = Math.abs(py - cy) - (halfH - r);
    const outDist = Math.hypot(Math.max(lx, 0), Math.max(ly, 0));
    const inDist = Math.min(Math.max(lx, ly), 0);
    return outDist + inDist - r;
  }

  function evalBalancedOuterBezel(x, y, cx, cy, halfW, halfH, cornerRadius, bezelPx) {
    const r = Math.max(2, Math.min(cornerRadius, halfW - 1, halfH - 1));
    const bezel = Math.min(bezelPx, r * 0.80);
    const dist = sdRoundedBoxCentered(x, y, cx, cy, halfW, halfH, r);

    if (dist > 0.5) return null;

    const inwardDist = -dist;
    if (inwardDist >= bezel) {
      return { nx: 0, ny: 0 };
    }

    const t = 1 - (inwardDist / bezel);
    const curve = Math.pow(smootherstep(0, 1, t), 1.35);

    const eps = 1.0;
    const dx = sdRoundedBoxCentered(x + eps, y, cx, cy, halfW, halfH, r) -
               sdRoundedBoxCentered(x - eps, y, cx, cy, halfW, halfH, r);
    const dy = sdRoundedBoxCentered(x, y + eps, cx, cy, halfW, halfH, r) -
               sdRoundedBoxCentered(x, y - eps, cx, cy, halfW, halfH, r);
    const len = Math.hypot(dx, dy) || 1;

    return {
      nx: (dx / len) * curve * 0.90,
      ny: (dy / len) * curve * 0.72
    };
  }

  const navbarEl = document.getElementById('liquidNavbar');
  const navMapEl = document.getElementById('lg-navbar-map');
  const panelMapEl = document.getElementById('lg-panel-map');
  const btnMapEl = document.getElementById('lg-btn-map');
  const dispREl = document.getElementById('lg-nav-disp-r');
  const dispGEl = document.getElementById('lg-nav-disp-g');
  const dispBEl = document.getElementById('lg-nav-disp-b');
  const navLinksContainer = document.getElementById('navLinks');
  const activePillEl = document.getElementById('navActivePill');
  const profileImgEl = document.querySelector('.profile-img');

  if (!navbarEl || !navMapEl) return;

  // Nettoyage de sécurité si un ancien canvas Safari existait
  navbarEl.querySelectorAll('.lg-safari-rim-canvas').forEach(el => el.remove());

  const navLinks = navLinksContainer ? Array.from(navLinksContainer.querySelectorAll('a')) : [];

  const navCanvas = document.createElement('canvas');
  const navCtx = navCanvas.getContext('2d');
  let navImgData = null;

  function syncResponsiveFilterScales() {
    if (!dispREl || !dispGEl || !dispBEl) return;
    const isMobileViewport = window.innerWidth <= 1020;
    if (isMobileViewport) {
      dispREl.setAttribute('scale', '12.0');
      dispGEl.setAttribute('scale', '15.0');
      dispBEl.setAttribute('scale', '18.0');
    } else {
      dispREl.setAttribute('scale', '24.0');
      dispGEl.setAttribute('scale', '32.0');
      dispBEl.setAttribute('scale', '40.0');
    }
  }

  function buildBaseNavbarNormals() {
    syncResponsiveFilterScales();

    const navRect = navbarEl.getBoundingClientRect();
    const w = Math.max(120, Math.round(navRect.width || 1060));
    const h = Math.max(44, Math.round(navRect.height || 68));
    const isCompactNav = h < 60 || window.innerWidth <= 1020;

    state.navWidth = w;
    state.navHeight = h;
    if (!state.baseNavNormals || state.baseNavNormals.length !== w * h * 2) {
      state.baseNavNormals = new Float32Array(w * h * 2);
    }

    if (navCanvas.width !== w || navCanvas.height !== h) {
      navCanvas.width = w;
      navCanvas.height = h;
      navImgData = navCtx.createImageData(w, h);
    }

    const subButtons = [];
    // Sur Desktop (> 1020px), on ajoute les micro-biseaux des boutons internes dans le couloir central
    if (!isCompactNav) {
      const addSubButton = (el, bezelPx, strength) => {
        if (!el) return;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) return;
        const r = el.getBoundingClientRect();
        if (r.width < 10 || r.height < 10) return;
        const halfW = r.width * 0.5;
        const halfH = r.height * 0.5;
        subButtons.push({
          cx: (r.left - navRect.left) + halfW,
          cy: (r.top - navRect.top) + halfH,
          halfW,
          halfH,
          radius: Math.min(halfW, halfH),
          bezel: Math.min(bezelPx, halfH * 0.42),
          strength
        });
      };

      navLinks.forEach(link => addSubButton(link, 6.0, 0.48));
      addSubButton(activePillEl, 7.0, 0.68);
      navbarEl.querySelectorAll('.theme-toggle, .btn-nav').forEach(btn => {
        addSubButton(btn, 6.5, 0.65);
      });
    }

    const halfW = w * 0.5;
    const halfH = h * 0.5;
    const mainRadius = Math.min(halfW, halfH);
    const bezel = isCompactNav ? OPTICS.bezelMobile : OPTICS.bezelDesktop;

    for (let y = 0; y < h; y++) {
      const py = y + 0.5;
      for (let x = 0; x < w; x++) {
        const px = x + 0.5;
        const vIdx = (y * w + x) * 2;

        const bezelVec = evalBalancedOuterBezel(px, py, halfW, halfH, halfW, halfH, mainRadius, bezel);
        if (!bezelVec) {
          state.baseNavNormals[vIdx] = 0;
          state.baseNavNormals[vIdx + 1] = 0;
          continue;
        }

        let nx = bezelVec.nx;
        let ny = bezelVec.ny;

        // Pondération douce : les micro-biseaux des boutons n'interfèrent jamais avec le biseau extérieur
        const outerMag = Math.min(1, Math.hypot(nx, ny) * 1.4);
        const innerWeight = 1 - outerMag;

        if (innerWeight > 0.05) {
          for (let i = 0; i < subButtons.length; i++) {
            const sb = subButtons[i];
            if (Math.abs(px - sb.cx) <= sb.halfW && Math.abs(py - sb.cy) <= sb.halfH) {
              const subVec = evalBalancedOuterBezel(px, py, sb.cx, sb.cy, sb.halfW, sb.halfH, sb.radius, sb.bezel);
              if (subVec && (subVec.nx !== 0 || subVec.ny !== 0)) {
                nx += subVec.nx * sb.strength * innerWeight;
                ny += subVec.ny * sb.strength * innerWeight;
              }
            }
          }
        }

        state.baseNavNormals[vIdx] = Math.max(-0.95, Math.min(0.95, nx));
        state.baseNavNormals[vIdx + 1] = Math.max(-0.95, Math.min(0.95, ny));
      }
    }
  }

  function renderNavbarMapWithPhotoMask(forceRender = false) {
    if (isSafariOrFirefox) return; // Safari utilise le compositeur natif CSS ::after sans canvas

    if (!state.baseNavNormals || !navImgData) {
      buildBaseNavbarNormals();
    }

    const w = state.navWidth;
    const h = state.navHeight;
    const navRect = navbarEl.getBoundingClientRect();

    let hasPhotoOverlap = false;
    let photoCx = -9999;
    let photoCy = -9999;
    let photoR = 0;
    const feather = OPTICS.photoFeatherPx;

    if (profileImgEl) {
      const pRect = profileImgEl.getBoundingClientRect();
      if (pRect.width > 10 && pRect.height > 10) {
        photoCx = (pRect.left + pRect.width * 0.5) - navRect.left;
        photoCy = (pRect.top + pRect.height * 0.5) - navRect.top;
        photoR = Math.max(pRect.width, pRect.height) * 0.5;

        const closestX = Math.max(0, Math.min(w, photoCx));
        const closestY = Math.max(0, Math.min(h, photoCy));
        const distSq = (photoCx - closestX) ** 2 + (photoCy - closestY) ** 2;
        hasPhotoOverlap = distSq < (photoR + feather) ** 2;
      }
    }

    if (!forceRender && !hasPhotoOverlap && !state.wasOverlappingPhoto) {
      return;
    }
    state.wasOverlappingPhoto = hasPhotoOverlap;

    const data = navImgData.data;
    const normals = state.baseNavNormals;
    const innerR = Math.max(0, photoR - 4);
    const outerR = photoR + feather;

    for (let y = 0; y < h; y++) {
      const py = y + 0.5;
      for (let x = 0; x < w; x++) {
        const px = x + 0.5;
        const pIdx = (y * w + x) * 4;
        const vIdx = (y * w + x) * 2;

        let nx = normals[vIdx];
        let ny = normals[vIdx + 1];

        if (nx === 0 && ny === 0) {
          data[pIdx] = 128;
          data[pIdx + 1] = 128;
          data[pIdx + 2] = 255;
          data[pIdx + 3] = 255;
          continue;
        }

        if (hasPhotoOverlap) {
          const dPhoto = Math.hypot(px - photoCx, py - photoCy);
          if (dPhoto <= innerR) {
            nx = 0;
            ny = 0;
          } else if (dPhoto < outerR) {
            const factor = smootherstep(innerR, outerR, dPhoto);
            nx *= factor;
            ny *= factor;
          }
        }

        const nz = Math.sqrt(Math.max(0.04, 1 - nx * nx - ny * ny));
        data[pIdx]     = Math.max(0, Math.min(255, Math.round(128 + nx * 127)));
        data[pIdx + 1] = Math.max(0, Math.min(255, Math.round(128 + ny * 127)));
        data[pIdx + 2] = Math.max(0, Math.min(255, Math.round(128 + nz * 127)));
        data[pIdx + 3] = 255;
      }
    }

    navCtx.putImageData(navImgData, 0, 0);
    setFeImageHref(navMapEl, navCanvas.toDataURL('image/png'), w, h);
  }

  function generateBalancedBezelMap(width, height, cornerRadius, bezelPx) {
    const w = Math.max(64, Math.round(width));
    const h = Math.max(36, Math.round(height));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;

    const halfW = w * 0.5;
    const halfH = h * 0.5;

    for (let y = 0; y < h; y++) {
      const py = y + 0.5;
      for (let x = 0; x < w; x++) {
        const px = x + 0.5;
        const idx = (y * w + x) * 4;
        const bezelVec = evalBalancedOuterBezel(px, py, halfW, halfH, halfW, halfH, cornerRadius, bezelPx);

        if (!bezelVec || (bezelVec.nx === 0 && bezelVec.ny === 0)) {
          data[idx] = 128; data[idx + 1] = 128; data[idx + 2] = 255; data[idx + 3] = 255;
          continue;
        }

        const nz = Math.sqrt(Math.max(0.04, 1 - bezelVec.nx * bezelVec.nx - bezelVec.ny * bezelVec.ny));
        data[idx]     = Math.max(0, Math.min(255, Math.round(128 + bezelVec.nx * 127)));
        data[idx + 1] = Math.max(0, Math.min(255, Math.round(128 + bezelVec.ny * 127)));
        data[idx + 2] = Math.max(0, Math.min(255, Math.round(128 + nz * 127)));
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL('image/png');
  }

  function rebuildOpticalMaps() {
    if (isSafariOrFirefox) return;
    buildBaseNavbarNormals();
    renderNavbarMapWithPhotoMask(true);

    if (btnMapEl) {
      setFeImageHref(btnMapEl, generateBalancedBezelMap(200, 50, 25, 11), 200, 50);
    }
    if (panelMapEl) {
      setFeImageHref(panelMapEl, generateBalancedBezelMap(480, 480, 28, 16), 480, 480);
    }
  }

  window.rebuildLiquidGlassMaps = rebuildOpticalMaps;

  let lastPillTarget = null;
  let pillAnimRaf = null;

  function updateActivePill(targetLink) {
    if (!targetLink || !activePillEl || !navLinksContainer) return;
    if (window.getComputedStyle(navLinksContainer).display === 'none') return;

    const newWidth = targetLink.offsetWidth;
    const newX = targetLink.offsetLeft - 4;
    activePillEl.style.width = `${newWidth}px`;
    activePillEl.style.transform = `translate3d(${newX}px, 0, 0)`;

    if (isSafariOrFirefox || lastPillTarget === targetLink) {
      lastPillTarget = targetLink;
      return;
    }
    lastPillTarget = targetLink;

    if (pillAnimRaf) cancelAnimationFrame(pillAnimRaf);
    const start = performance.now();
    const duration = 330;

    function syncPillLens(now) {
      buildBaseNavbarNormals();
      renderNavbarMapWithPhotoMask(true);
      if (now - start < duration) {
        pillAnimRaf = requestAnimationFrame(syncPillLens);
      } else {
        pillAnimRaf = null;
      }
    }
    pillAnimRaf = requestAnimationFrame(syncPillLens);
  }
  window.updateNavbarActivePill = updateActivePill;

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => updateActivePill(link));
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      updateActivePill(link);
    });
  });

  if (navLinksContainer) {
    navLinksContainer.addEventListener('mouseleave', () => {
      const current = navLinksContainer.querySelector('a.active') || navLinks[0];
      if (current) updateActivePill(current);
    });
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (isSafariOrFirefox) return;
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(() => {
        renderNavbarMapWithPhotoMask(false);
        scrollTicking = false;
      });
    }
  }, { passive: true });

  window.addEventListener('pointermove', (e) => {
    state.mouseX = e.clientX;
    state.mouseY = e.clientY;
  }, { passive: true });

  function animateLight() {
    state.curX += (state.mouseX - state.curX) * 0.14;
    state.curY += (state.mouseY - state.curY) * 0.14;
    const navRect = navbarEl.getBoundingClientRect();
    navbarEl.style.setProperty('--local-x', `${(state.curX - navRect.left).toFixed(1)}px`);
    navbarEl.style.setProperty('--local-y', `${(state.curY - navRect.top).toFixed(1)}px`);
    requestAnimationFrame(animateLight);
  }

  const ro = new ResizeObserver(() => {
    const current = navLinksContainer ? (navLinksContainer.querySelector('a.active') || navLinks[0]) : null;
    if (current) updateActivePill(current);
    rebuildOpticalMaps();
  });
  ro.observe(navbarEl);

  function boot() {
    const active = navLinksContainer ? (navLinksContainer.querySelector('a.active') || navLinks[0]) : null;
    if (active) updateActivePill(active);
    rebuildOpticalMaps();
  }

  requestAnimationFrame(() => {
    boot();
    animateLight();
  });
  window.addEventListener('load', boot);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(boot);
  }
})();
