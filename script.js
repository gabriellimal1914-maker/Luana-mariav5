/* =============================================
   REPAIR BROWS — script.js
   Interações, animações e integração WhatsApp
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────
  // NAV: scroll shadow + mobile toggle
  // ─────────────────────────────────────────────
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Fecha o menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ─────────────────────────────────────────────
  // SCROLL ANIMATIONS (Intersection Observer)
  // ─────────────────────────────────────────────
  const animElements = document.querySelectorAll(
    '.metodo-card, .dif-item, .ebook-list li, .sobre-p, ' +
    '.hero-stats .stat, .sobre-card, .resultado-item, .depo-card, .numero-item'
  );

  animElements.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animElements.forEach(el => observer.observe(el));

  // Sections fade
  document.querySelectorAll('.section').forEach(sec => {
    sec.style.opacity = '1';
  });

  // ─────────────────────────────────────────────
  // DEPOIMENTOS CAROUSEL
  // ─────────────────────────────────────────────
  const track = document.getElementById('depoTrack');
  const dotsContainer = document.getElementById('depoDots');

  if (track && dotsContainer) {
    const cards = track.querySelectorAll('.depo-card');
    let current = 0;
    let autoPlayInterval;

    // Criar dots
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'depo-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      current = index;
      const cardWidth = cards[0].offsetWidth + 16; // gap
      track.style.transform = `translateX(-${current * cardWidth}px)`;
      dotsContainer.querySelectorAll('.depo-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function next() {
      goTo((current + 1) % cards.length);
    }

    // Auto-play
    autoPlayInterval = setInterval(next, 4200);

    // Pause on interaction
    track.addEventListener('touchstart', () => clearInterval(autoPlayInterval), { passive: true });
    track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    track.addEventListener('mouseleave', () => {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(next, 4200);
    });

    // Touch/swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) goTo(Math.min(current + 1, cards.length - 1));
        else goTo(Math.max(current - 1, 0));
      }
    }, { passive: true });

    // Recalculate on resize
    window.addEventListener('resize', () => goTo(current), { passive: true });
  }

  // ─────────────────────────────────────────────
  // SMOOTH SCROLL para links âncora
  // ─────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ─────────────────────────────────────────────
  // MÁSCARA DE TELEFONE
  // ─────────────────────────────────────────────
  const telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function() {
      let v = this.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 6) {
        v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      } else if (v.length > 2) {
        v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      } else if (v.length > 0) {
        v = `(${v}`;
      }
      this.value = v;
    });
  }

  // ─────────────────────────────────────────────
  // WHATSAPP FLOAT: aparecer após scroll
  // ─────────────────────────────────────────────
  const wfBtn = document.getElementById('whatsappFloat');
  if (wfBtn) {
    // Visível por padrão em mobile
    window.addEventListener('scroll', () => {
      wfBtn.style.opacity = window.scrollY > 200 ? '1' : '0.85';
    }, { passive: true });
  }

});

// ─────────────────────────────────────────────
// FUNÇÃO GLOBAL: Enviar para WhatsApp
// ─────────────────────────────────────────────
function enviarWhatsApp() {
  const nome = document.getElementById('nome')?.value.trim();
  const telefone = document.getElementById('telefone')?.value.trim();
  const procedimento = document.getElementById('procedimento')?.value;
  const horario = document.getElementById('horario')?.value;

  // Validação simples
  if (!nome) {
    showAlert('Por favor, insira seu nome.');
    document.getElementById('nome').focus();
    return;
  }
  if (!telefone || telefone.replace(/\D/g, '').length < 10) {
    showAlert('Por favor, insira um número de WhatsApp válido.');
    document.getElementById('telefone').focus();
    return;
  }

  const proc = procedimento || 'Não informado';
  const hor = horario || 'Não informado';

  const msg =
    `Olá, Luana! 👋 Gostaria de agendar uma avaliação.\n\n` +
    `📋 *Meus dados:*\n` +
    `• Nome: ${nome}\n` +
    `• WhatsApp: ${telefone}\n` +
    `• Procedimento: ${proc}\n` +
    `• Melhor horário: ${hor}\n\n` +
    `Aguardo seu retorno! 😊`;

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/5511991675603?text=${encoded}`, '_blank', 'noopener,noreferrer');
}

function showAlert(msg) {
  // Toast nativo com fallback
  const existing = document.querySelector('.rb-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'rb-toast';
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '88px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#2D2520',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '0.875rem',
    zIndex: '999',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    animation: 'fadeIn 0.3s ease',
    maxWidth: 'calc(100vw - 40px)',
    textAlign: 'center',
    lineHeight: '1.4',
  });

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
