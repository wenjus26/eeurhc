/**
 * Église Évangélique Union Renaissance d'Hommes en Christ (URHC)
 * Interactions, Modales, Recherche, Animations et Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Élévation de l'en-tête lors du défilement
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Menu mobile toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Fermer le menu lors du clic sur un lien
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Défilement fluide pour les liens internes
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });

  // 4. Modales interactives
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('.trigger-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal');
      const titleAttr = btn.getAttribute('data-title');
      
      if (modalId === 'modal-info' && titleAttr) {
        const titleEl = document.getElementById('modal-info-title');
        if (titleEl) titleEl.textContent = titleAttr;
      }

      if (modalId) openModal(modalId);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('.modal-close') || e.target.closest('.modal-close-btn')) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(closeModal);
    }
  });

  // 5. Toast notification
  const showToast = (message) => {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  window.handleModalVisiteSubmit = (form) => {
    const nom = form.querySelector('#visite-nom')?.value || 'Cher ami';
    document.querySelectorAll('.modal-backdrop.open').forEach(closeModal);
    showToast(`Merci ${nom} ! Votre visite a bien été enregistrée. À très bientôt !`);
    form.reset();
  };

  window.handleNewsletterSubmit = (form) => {
    const email = form.querySelector('input[type="email"]')?.value;
    showToast(`Merci ! Votre inscription avec ${email} a bien été enregistrée.`);
    form.reset();
  };

  window.handleSearchSubmit = () => {
    const type = document.getElementById('typeCulte')?.value;
    const jour = document.getElementById('jourCulte')?.options[document.getElementById('jourCulte').selectedIndex]?.text;
    showToast(`Recherche pour : ${jour}. Nous vous attendons avec joie !`);
    
    // Défilement doux vers la section Culte
    const target = document.getElementById('rejoignez-nous');
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // 6. Intersection Observer pour les animations progressives
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-in').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }

  // 7. Bouton Remonter en haut de page
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
