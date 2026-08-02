/*
 * UZN TECH & SOFTWARE — app.js
 * index.html / kvkk.html / 404.html tarafından ortak olarak kullanılır.
 * Her IIFE, ait olduğu DOM elemanı sayfada yoksa güvenli şekilde erken çıkar (return),
 * bu sayede aynı dosya üç sayfada da sorunsuz çalışır.
 */


/* ---- Boot-line — hero'daki 'SYSTEM_BOOT...' daktilo efekti ---- */

  (function () {
    var el = document.getElementById('bootLine');
    if (!el) return;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      el.classList.add('boot-done');
      return;
    }

    var text = 'SYSTEM_BOOT... UZNTECH v1.0 ONLINE';
    var i = 0;
    el.textContent = '';
    var cursor = document.createElement('span');
    cursor.className = 'boot-cursor';
    cursor.textContent = '_';

    function typeNext() {
      if (i < text.length) {
        el.textContent = text.slice(0, i + 1);
        el.appendChild(cursor);
        i++;
        setTimeout(typeNext, 22);
      } else {
        setTimeout(function () {
          el.classList.add('boot-done');
        }, 350);
      }
    }
    typeNext();
  })();


/* ---- Mobil menü — hamburger toggle / backdrop ---- */

  (function () {
    var toggle = document.getElementById('menuToggle');
    var nav = document.getElementById('mobileNav');
    var backdrop = document.getElementById('mobileNavBackdrop');
    if (!toggle || !nav || !backdrop) return;

    function closeMenu() {
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    }

    function openMenu() {
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('is-open');
      backdrop.classList.add('is-open');
      document.body.classList.add('nav-open');
    }

    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    backdrop.addEventListener('click', closeMenu);
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  })();


/* ---- Reveal + scan-line — scroll'da fade-in/slide-up ve bölüm tarama animasyonu ---- */

  (function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Groups: items get a small staggered delay based on their position
    var groupSelectors = [
      '.card-grid > .card',
      '.feature-blocks > .feature-block',
      '.process-steps > .process-step',
      '.project-list > .project-row',
      '.testimonial-grid > .testimonial-card',
      '.skills-row > .skill-badge',
      '.bento-grid > .bento-cell',
      '.faq-list > .faq-item',
      '.timeline > .timeline-row',
      '.hero-specs > .spec'
    ];

    // Solo elements: fade in on their own, no stagger
    var soloSelectors = [
      '.hero .eyebrow', '.hero h1', '.hero-lede', '.hero-actions', '.hero-specs', '.credentials-strip',
      '.section > .eyebrow', '.section > h2', '.section-note',
      '.about-text', '.about-meta',
      '.contact-lede', '.contact-direct', '.contact-form'
    ];

    function markReveal(el, delayMs) {
      el.classList.add('reveal');
      if (delayMs) el.style.transitionDelay = delayMs + 'ms';
    }

    groupSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el, i) {
        markReveal(el, Math.min(i, 6) * 70);
      });
    });

    soloSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { markReveal(el); });
    });

    var revealEls = document.querySelectorAll('.reveal');

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });

    // Scan-line: sweep once per section the first time it enters view
    var scanEls = document.querySelectorAll('.scan-line');
    if (scanEls.length) {
      var scanObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-scanning');
            scanObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -60% 0px' });
      scanEls.forEach(function (el) { scanObserver.observe(el); });
    }
  })();


/* ---- Cursor spotlight, 3D tilt, magnetic butonlar, parallax katmanları ---- */

  (function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var canHover = window.matchMedia('(hover: hover)').matches;
    if (reduceMotion || !canHover) return;

    // Mouse-tracked spotlight glow
    var spotlight = document.querySelector('.cursor-spotlight');
    if (spotlight) {
      window.addEventListener('mousemove', function (e) {
        spotlight.style.setProperty('--mx', e.clientX + 'px');
        spotlight.style.setProperty('--my', e.clientY + 'px');
      }, { passive: true });
    }

    // Subtle 3D tilt on cards
    var tiltEls = document.querySelectorAll('.tilt');
    tiltEls.forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty('--ry', (px * 6).toFixed(2) + 'deg');
        el.style.setProperty('--rx', (py * -6).toFixed(2) + 'deg');
      }, { passive: true });
      el.addEventListener('mouseleave', function () {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });

    // Micro-parallax: skill icons inside bento cells shift a bit more than the card
    document.querySelectorAll('.bento-cell').forEach(function (el) {
      var icons = el.querySelectorAll('.skill-mono');
      if (!icons.length) return;
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        icons.forEach(function (icon) {
          icon.style.transform = 'translate(' + (px * 6).toFixed(1) + 'px,' + (py * 6).toFixed(1) + 'px)';
        });
      }, { passive: true });
      el.addEventListener('mouseleave', function () {
        icons.forEach(function (icon) { icon.style.transform = 'translate(0,0)'; });
      });
    });

    // Layered parallax: inner diagram shifts more than its box (feature illustrations)
    document.querySelectorAll('.parallax-box').forEach(function (box) {
      var layer = box.querySelector('.parallax-layer');
      if (!layer) return;
      box.addEventListener('mousemove', function (e) {
        var rect = box.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        layer.style.setProperty('--px', (px * 12).toFixed(1) + 'px');
        layer.style.setProperty('--py', (py * 12).toFixed(1) + 'px');
      }, { passive: true });
      box.addEventListener('mouseleave', function () {
        layer.style.setProperty('--px', '0px');
        layer.style.setProperty('--py', '0px');
      });
    });

    // Magnetic buttons — follow the cursor within their own bounds
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var mx = (e.clientX - rect.left - rect.width / 2) * 0.28;
        var my = (e.clientY - rect.top - rect.height / 2) * 0.35;
        btn.style.setProperty('--mbx', mx.toFixed(1) + 'px');
        btn.style.setProperty('--mby', my.toFixed(1) + 'px');
      }, { passive: true });
      btn.addEventListener('mouseleave', function () {
        btn.style.setProperty('--mbx', '0px');
        btn.style.setProperty('--mby', '0px');
      });
    });

    // Scroll-based parallax on the hero glow — moves slower than the page
    var heroEl = document.querySelector('.hero');
    if (heroEl) {
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var y = Math.min(window.scrollY * 0.15, 60);
          heroEl.style.setProperty('--scroll-y', y.toFixed(1) + 'px');
          // EK-5: sayfa geneli arka plan katmanları (circuit-bg, grid-overlay,
          // body::before yörünge halkası) için çok hafif bir parallax kayması.
          // Kaldırmak için sadece bu satırı sil (style.css'teki EK-5 bloğu
          // kalsa da zararsızdır, sadece hareket durur).
          var bgY = Math.min(window.scrollY * 0.04, 40);
          document.documentElement.style.setProperty('--bg-scroll-y', bgY.toFixed(1) + 'px');
          ticking = false;
        });
      }, { passive: true });
    }

    // PCB trace removed — kept hero parallax above only.
  })();


/* ---- Track-select — hero'daki ilgi alanı filtresi (yazılım/mekanik/siber/ikisi) ---- */

  (function () {
    var trackBtns = document.querySelectorAll('[data-track-btn]');
    var resetBtn = document.querySelector('[data-track-reset]');
    var trackedEls = document.querySelectorAll('[data-track]');
    var interestSelect = document.getElementById('ilgi-alani');
    var labels = {
      yazilim: 'Yazılım Geliştirme',
      mekanik: 'Mekanik & Otomasyon',
      siber: 'Siber Güvenlik',
      ikisi: 'Mekatronik (İkisi)'
    };

    function applyTrack(track) {
      if (track) {
        document.body.setAttribute('data-track', track);
      } else {
        document.body.removeAttribute('data-track');
      }
      trackBtns.forEach(function (btn) {
        btn.classList.toggle('is-active', btn.getAttribute('data-track-btn') === track);
      });
      trackedEls.forEach(function (el) {
        var elTrack = el.getAttribute('data-track');
        // 'ikisi' (Mekatronik) hiçbir şeyi gizlemez: hem gerçekten iki alanı birleştiren
        // içerik eklendiğinde onu göstermek, hem de henüz öyle bir içerik yokken boş
        // bölüm bırakmamak için "hepsini göster" gibi davranır.
        var hide = track && track !== 'ikisi' && elTrack !== track && elTrack !== 'ikisi';
        el.classList.toggle('is-track-hidden', hide);
      });
      if (interestSelect && track && labels[track]) {
        interestSelect.value = labels[track];
      }
      var url = new URL(window.location.href);
      if (track) { url.searchParams.set('track', track); } else { url.searchParams.delete('track'); }
      window.history.replaceState({}, '', url);
    }

    trackBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.body.getAttribute('data-track');
        var next = btn.getAttribute('data-track-btn');
        applyTrack(current === next ? null : next);
      });
    });
    if (resetBtn) {
      resetBtn.addEventListener('click', function () { applyTrack(null); });
    }

    var initial = new URL(window.location.href).searchParams.get('track');
    if (initial && labels[initial]) { applyTrack(initial); }
  })();


/* ---- Mini-terminal — 'hakkımda' bölümündeki yazan terminal animasyonu ---- */

  (function () {
    var cmdEl = document.getElementById('termCmd');
    var outEl = document.getElementById('termOut');
    var cursorEl = document.getElementById('termCursor');
    if (!cmdEl || !outEl) return;

    var screens = [
      { cmd: 'whoami', out: 'fatih_uzner — mekatronik mühendisi' },
      { cmd: 'cat skills.txt', out: 'python · c++ · java · go · kali linux · solidworks' },
      { cmd: './check_status.sh', out: 'SYSTEM: ONLINE — aktif, yeni projelere açık' }
    ];

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      cmdEl.textContent = screens[0].cmd;
      outEl.textContent = screens[0].out;
      if (cursorEl) cursorEl.style.display = 'none';
      return;
    }

    var idx = 0;

    function typeText(el, text, speed, done) {
      var i = 0;
      el.textContent = '';
      (function step() {
        if (i <= text.length) {
          el.textContent = text.slice(0, i);
          i++;
          setTimeout(step, speed);
        } else if (done) {
          done();
        }
      })();
    }

    function eraseText(el, speed, done) {
      (function step() {
        var text = el.textContent;
        if (text.length) {
          el.textContent = text.slice(0, -1);
          setTimeout(step, speed);
        } else if (done) {
          done();
        }
      })();
    }

    function runScreen() {
      var screen = screens[idx % screens.length];
      outEl.textContent = '';
      typeText(cmdEl, screen.cmd, 45, function () {
        setTimeout(function () {
          outEl.textContent = screen.out;
          setTimeout(function () {
            eraseText(cmdEl, 18, function () {
              outEl.textContent = '';
              idx++;
              setTimeout(runScreen, 400);
            });
          }, 2200);
        }, 300);
      });
    }

    runScreen();
  })();


/* ---- Command palette (cmdk) — Ctrl/Cmd+K ile hızlı gezinme ---- */

  (function () {
    var overlay = document.getElementById('cmdkOverlay');
    var input = document.getElementById('cmdkInput');
    var list = document.getElementById('cmdkList');
    var trigger = document.getElementById('cmdkTrigger');
    if (!overlay || !input || !list) return;

    var items = Array.prototype.slice.call(list.querySelectorAll('a[data-cmdk-item]'));
    var selectedIndex = 0;

    function visibleItems() {
      return items.filter(function (a) { return !a.parentElement.classList.contains('is-hidden'); });
    }
    function updateSelection() {
      items.forEach(function (a) { a.classList.remove('is-selected'); });
      var vis = visibleItems();
      if (vis[selectedIndex]) vis[selectedIndex].classList.add('is-selected');
    }
    function openPalette() {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      input.value = '';
      items.forEach(function (a) { a.parentElement.classList.remove('is-hidden'); });
      selectedIndex = 0;
      updateSelection();
      setTimeout(function () { input.focus(); }, 10);
    }
    function closePalette() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener('keydown', function (e) {
      var isOpen = overlay.classList.contains('is-open');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        isOpen ? closePalette() : openPalette();
      } else if (e.key === 'Escape' && isOpen) {
        closePalette();
      }
    });

    if (trigger) trigger.addEventListener('click', openPalette);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closePalette(); });

    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      items.forEach(function (a) {
        var match = a.textContent.toLowerCase().indexOf(q) !== -1;
        a.parentElement.classList.toggle('is-hidden', !match);
      });
      selectedIndex = 0;
      updateSelection();
    });

    input.addEventListener('keydown', function (e) {
      var vis = visibleItems();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, vis.length - 1);
        updateSelection();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, 0);
        updateSelection();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        var target = vis[selectedIndex];
        if (target) {
          closePalette();
          window.location.hash = target.getAttribute('href').replace('#', '');
        }
      }
    });

    items.forEach(function (a) {
      a.addEventListener('click', function () { closePalette(); });
    });
  })();


/* ---- Buton kıvılcım efekti — .btn tıklamalarında spark animasyonu ---- */

  (function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var rect = btn.getBoundingClientRect();
        var spark = document.createElement('span');
        spark.className = 'btn-spark';
        spark.style.left = (e.clientX - rect.left) + 'px';
        spark.style.top = (e.clientY - rect.top) + 'px';
        btn.appendChild(spark);
        spark.addEventListener('animationend', function () { spark.remove(); });
      });
    });
  })();
