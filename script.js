/**
 * ÉGLISE ÉVANGÉLIQUE UNION RENAISSANCE D'HOMMES EN CHRIST (URHC)
 * Script Principal des Interactions & Fonctionnalités (100% en Français)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Détection de JavaScript pour les animations
  document.documentElement.classList.replace('no-js', 'js');

  // 2. Gestion de l'En-tête Collant (Sticky Header Elevation)
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

  // 3. Tiroir de Navigation Mobile Accessible
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose = document.getElementById('mobileClose');

  const openDrawer = () => {
    mobileDrawer?.classList.add('open');
    mobileOverlay?.classList.add('open');
    mobileToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobileClose?.focus();
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', openDrawer);
  mobileClose?.addEventListener('click', closeDrawer);
  mobileOverlay?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      closeDrawer();
      mobileToggle?.focus();
    }
  });

  // 4. Système de Notification Toast
  const showToast = (message) => {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.className = 'toast-notification';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };
  window.showToast = showToast;

  // 5. Lecteur Audio Interactif pour les Prédications
  const playPauseBtn = document.getElementById('btnPlayPause');
  const progressFill = document.getElementById('audioProgressFill');
  const currentTimeEl = document.getElementById('audioCurrentTime');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');

  let isPlaying = false;
  let currentSeconds = 854; // Exemple 14:14
  let totalSeconds = 2732;  // Exemple 45:32
  let timerInterval = null;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
        playPauseBtn.setAttribute('aria-label', 'Mettre en pause la prédication');
        showToast('Lecture de la prédication en cours...');

        timerInterval = setInterval(() => {
          if (currentSeconds < totalSeconds) {
            currentSeconds++;
            if (currentTimeEl) currentTimeEl.textContent = formatTime(currentSeconds);
            if (progressFill) progressFill.style.width = `${(currentSeconds / totalSeconds) * 100}%`;
          } else {
            clearInterval(timerInterval);
            isPlaying = false;
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
          }
        }, 1000);
      } else {
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
        playPauseBtn.setAttribute('aria-label', 'Écouter la prédication');
        clearInterval(timerInterval);
        showToast('Prédication mise en pause.');
      }
    });
  }

  // Permettre de changer de sermon depuis la liste
  window.selectSermon = (title, preacher, duration) => {
    const titleEl = document.getElementById('currentSermonTitle');
    const preacherEl = document.getElementById('currentSermonPreacher');
    if (titleEl) titleEl.textContent = title;
    if (preacherEl) preacherEl.textContent = preacher;
    currentSeconds = 0;
    if (currentTimeEl) currentTimeEl.textContent = '0:00';
    if (progressFill) progressFill.style.width = '0%';
    showToast(`Prédication sélectionnée : « ${title} »`);
    if (playPauseBtn && !isPlaying) {
      playPauseBtn.click();
    }
  };

  // 6. Filtrage Interactif des Prédications & Événements
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const parent = this.closest('.filter-tabs');
      if (parent) {
        parent.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
      }
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter') || 'tous';
      const itemsContainer = document.querySelector('.filterable-grid');
      if (itemsContainer) {
        const items = itemsContainer.querySelectorAll('.filterable-item');
        items.forEach((item) => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'tous' || category === filterValue) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      }
    });
  });

  // 7. Sélection des Montants de Don
  const givingBtns = document.querySelectorAll('.giving-amount-btn');
  const customAmountInput = document.getElementById('customAmount');

  givingBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      givingBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      if (customAmountInput) {
        customAmountInput.value = this.getAttribute('data-amount') || '';
      }
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
      givingBtns.forEach((b) => b.classList.remove('active'));
    });
  }

  // 8. Gestionnaires de Formulaires (Contact, Don, Prière, Témoignage)
  window.handleGeneralSubmit = (e, successMessage) => {
    e.preventDefault();
    const form = e.target;
    showToast(successMessage || 'Votre message a été transmis avec succès. Que Dieu vous bénisse !');
    form.reset();
  };

  // 9. Bouton Remonter en Haut de Page
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

  // 10. Animations d'Apparition Progressive (IntersectionObserver)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-in').forEach((el) => el.classList.add('visible'));
  }
});
