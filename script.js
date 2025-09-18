// --- Dark mode toggle (optionnel) ---
document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('toggle-switch');
  if (toggleSwitch) {
    toggleSwitch.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  }
});

// --- Navigation burger ---
function myMenuFunction(){
  const menuBtn = document.getElementById("myNavMenu");
  if(!menuBtn) return;
  if(menuBtn.className === "nav-menu"){
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

// --- Ombre nav au scroll ---
window.onscroll = function() { headerShadow() };
function headerShadow() {
  const navHeader = document.getElementById("header");
  if(!navHeader) return;
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.8)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

// --- Typed effect ---
if (window.Typed) {
  new Typed(".typedText", {
    strings: ["Web Designer", "Developer", "Coder"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000
  });
}

// --- ScrollReveal ---
if (window.ScrollReveal) {
  const sr = ScrollReveal({ origin:'top', distance:'80px', duration:2000, reset:true });
  sr.reveal('.featured-text-card', {});
  sr.reveal('.featured-name', { delay:100 });
  sr.reveal('.featured-text-info', { delay:200 });
  sr.reveal('.featured-text-btn', { delay:200 });
  sr.reveal('.social_icons', { delay:200 });
  sr.reveal('.featured-image', { delay:300 });
  sr.reveal('.project-box', { interval:200 });
  sr.reveal('.top-header', {});
  const srLeft = ScrollReveal({ origin:'left', distance:'80px', duration:2000, reset:true });
  srLeft.reveal('.about-info', { delay:100 });
  srLeft.reveal('.contact-info', { delay:100 });
  const srRight = ScrollReveal({ origin:'right', distance:'80px', duration:2000, reset:true });
  srRight.reveal('.skills-box', { delay:100 });
  srRight.reveal('.form-control', { delay:100 });
}

// --- Active link on scroll ---
const sections = document.querySelectorAll('section[id]');
function scrollActive() {
  const scrollY = window.scrollY;
  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector('.nav-menu a[href*=' + CSS.escape(sectionId) + ']');
    if(!link) return;
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

// --- Modal projet (texte uniquement) ---
(function(){
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const titleEl = document.getElementById('pmodal-title');
  const bodyEl  = document.getElementById('pmodal-body');
  const closeBtn= modal.querySelector('.pmodal__close');

  function getBodyHTMLFromBox(box){
    const tpl = box.querySelector('template.project-body');
    if (tpl) {
      return tpl.content.cloneNode(true);
    }
    const lbl = box.querySelector('label');
    if (lbl) {
      const frag = document.createElement('div');
      frag.innerHTML = lbl.innerHTML;
      return frag;
    }
    return document.createTextNode('');
  }

  function openModal({ title, bodyNode }) {
    titleEl.textContent = title || '';
    bodyEl.innerHTML = '';
    if(bodyNode) bodyEl.appendChild(bodyNode);
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
      const bodyNode = getBodyHTMLFromBox(box);
      openModal({ title, bodyNode });
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { const dialog = modal.querySelector('.pmodal__dialog'); if (dialog && !dialog.contains(e.target)) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });
})();
