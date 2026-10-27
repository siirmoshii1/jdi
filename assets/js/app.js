/**
 * JDI SYSTEM - Interactive User Manual JavaScript
 * Zero external dependencies: pure vanilla ES6
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light/Dark Mode)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('jdi-theme') || (prefersDark ? 'dark' : 'light');
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('jdi-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      // Update icon
      themeToggleBtn.innerHTML = theme === 'dark' ? `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ` : `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // 2. Mobile Sidebar Toggle
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebar = document.getElementById('mainSidebar');

  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 900 && !sidebar.contains(e.target) && e.target !== sidebarToggleBtn) {
        sidebar.classList.remove('open');
      }
    });

    sidebar.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          sidebar.classList.remove('open');
        }
      });
    });
  }

  // 3. Font Scale Control (A- / A+)
  const fontDecBtn = document.getElementById('fontDecBtn');
  const fontIncBtn = document.getElementById('fontIncBtn');
  let currentFontScale = parseFloat(localStorage.getItem('jdi-font-scale') || '1.0');

  function updateFontScale(scale) {
    currentFontScale = Math.min(Math.max(scale, 0.85), 1.25);
    document.documentElement.style.setProperty('--font-scale', `${currentFontScale}rem`);
    localStorage.setItem('jdi-font-scale', currentFontScale.toString());
  }

  if (fontDecBtn) fontDecBtn.addEventListener('click', () => updateFontScale(currentFontScale - 0.05));
  if (fontIncBtn) fontIncBtn.addEventListener('click', () => updateFontScale(currentFontScale + 0.05));
  if (currentFontScale !== 1.0) updateFontScale(currentFontScale);

  // 4. Print Trigger
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Interactive Step Testing Checklist Tracker
  const stepCheckboxes = document.querySelectorAll('.step-check-input');
  const progressText = document.getElementById('progressText');
  let completedSteps = JSON.parse(localStorage.getItem('jdi-completed-steps') || '[]');

  function updateChecklistUI() {
    let checkedCount = 0;
    stepCheckboxes.forEach(cb => {
      const stepId = cb.dataset.stepId;
      const stepCard = cb.closest('.step-card');
      if (completedSteps.includes(stepId)) {
        cb.checked = true;
        checkedCount++;
        if (stepCard) stepCard.classList.add('completed');
      } else {
        cb.checked = false;
        if (stepCard) stepCard.classList.remove('completed');
      }
    });

    if (progressText) {
      progressText.textContent = `${checkedCount} / ${stepCheckboxes.length} Steps Tested`;
    }
  }

  stepCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const stepId = cb.dataset.stepId;
      if (cb.checked) {
        if (!completedSteps.includes(stepId)) completedSteps.push(stepId);
      } else {
        completedSteps = completedSteps.filter(id => id !== stepId);
      }
      localStorage.setItem('jdi-completed-steps', JSON.stringify(completedSteps));
      updateChecklistUI();
    });
  });

  updateChecklistUI();

  // 7. Lightbox for High-Resolution Screenshots
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const allImages = Array.from(document.querySelectorAll('.screenshot-img-wrap'));
  let currentImgIndex = 0;

  function openLightbox(index) {
    if (!lightbox || index < 0 || index >= allImages.length) return;
    currentImgIndex = index;
    const item = allImages[index];
    const img = item.querySelector('img');
    const captionEl = item.closest('.screenshot-container')?.querySelector('.screenshot-caption');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || 'JDI System Screenshot';
    lightboxCaption.textContent = captionEl ? captionEl.textContent.trim() : (img.alt || 'Screenshot Preview');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  allImages.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight' && currentImgIndex < allImages.length - 1) openLightbox(currentImgIndex + 1);
    if (e.key === 'ArrowLeft' && currentImgIndex > 0) openLightbox(currentImgIndex - 1);
  });

  // 8. Module Filter Tabs (Progress Report Matrix)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const moduleCards = document.querySelectorAll('.module-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      moduleCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 9. Quick Search Modal (Ctrl+K or Header Trigger)
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchTriggers = [document.getElementById('searchTrigger')];

  // Index searchable items from DOM
  const searchIndex = [];
  document.querySelectorAll('section[id], .step-card, .module-card').forEach(el => {
    const titleEl = el.querySelector('.step-title, .module-card-title, .section-title, .guide-title');
    const descEl = el.querySelector('.step-description, .submodule-desc, .section-desc, .guide-summary');
    if (titleEl) {
      searchIndex.push({
        id: el.id || el.closest('section')?.id || '',
        title: titleEl.textContent.trim(),
        desc: descEl ? descEl.textContent.trim().slice(0, 120) : '',
        category: el.classList.contains('step-card') ? 'Step Guide' : 
                  el.classList.contains('module-card') ? 'System Module' : 'Section',
        element: el
      });
    }
  });

  function openSearch() {
    if (!searchModal) return;
    searchModal.classList.add('active');
    searchInput.value = '';
    renderSearchResults(searchIndex.slice(0, 8));
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.remove('active');
  }

  function renderSearchResults(items) {
    if (!searchResults) return;
    if (items.length === 0) {
      searchResults.innerHTML = `
        <li style="padding: 24px; text-align: center; color: var(--text-muted);">
          No matching documentation found. Try another search keyword.
        </li>`;
      return;
    }

    searchResults.innerHTML = items.map((item, idx) => `
      <li class="search-result-item" data-index="${idx}">
        <div>
          <div class="search-result-title">${escapeHTML(item.title)}</div>
          <div class="search-result-cat">${escapeHTML(item.desc || item.category)}</div>
        </div>
        <span class="badge badge-primary">${escapeHTML(item.category)}</span>
      </li>
    `).join('');

    searchResults.querySelectorAll('.search-result-item').forEach((li, idx) => {
      li.addEventListener('click', () => {
        const selected = items[idx];
        closeSearch();
        selected.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        selected.element.style.outline = '2px solid var(--primary)';
        setTimeout(() => selected.element.style.outline = 'none', 2000);
      });
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  searchTriggers.forEach(t => t && t.addEventListener('click', openSearch));

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderSearchResults(searchIndex.slice(0, 8));
        return;
      }
      const matches = searchIndex.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
      renderSearchResults(matches.slice(0, 15));
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchModal?.classList.contains('active') ? closeSearch() : openSearch();
    }
    if (e.key === 'Escape' && searchModal?.classList.contains('active')) {
      closeSearch();
    }
  });

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // 10. Scrollspy for Active Sidebar Navigation
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').substring(1);
    return document.getElementById(id);
  }).filter(Boolean);

  function updateScrollSpy() {
    const scrollPos = window.scrollY + 100;
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section.offsetTop <= scrollPos) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
        break;
      }
    }
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();
});
