/*
 * UZN TECH & SOFTWARE — app.js
 * index.html / kvkk.html / 404.html tarafından ortak olarak kullanılır.
 * Her IIFE, ait olduğu DOM elemanı sayfada yoksa güvenli şekilde erken çıkar (return),
 * bu sayede aynı dosya üç sayfada da sorunsuz çalışır.
 */


/* ---- FAZ 5.x / A — Açılış (boot-up) Sekansı ----
   Sadece ilk ziyarette (sessionStorage — sekme kapanınca sıfırlanır) ve
   prefers-reduced-motion kapalıyken çalışır. Overlay tamamen JS ile
   oluşturulup DOM'a ekleniyor; script bu satıra gelene kadar sayfa zaten
   normal render olmuş olabileceğinden çok kısa bir kare (frame) için gerçek
   içerik görünebilir — bunu tamamen ortadan kaldırmak için overlay'in HTML'e
   baştan (inline) eklenmesi gerekir, bu ilk sürümde kapsam dışı bırakıldı. */

  (function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    var already;
    try { already = sessionStorage.getItem('uznBootSeen'); } catch (e) { already = '1'; }
    if (already) return;
    try { sessionStorage.setItem('uznBootSeen', '1'); } catch (e) {}

    var overlay = document.createElement('div');
    overlay.className = 'boot-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<span class="boot-overlay-corner boot-overlay-corner-tl"></span>' +
      '<span class="boot-overlay-corner boot-overlay-corner-tr"></span>' +
      '<span class="boot-overlay-corner boot-overlay-corner-bl"></span>' +
      '<span class="boot-overlay-corner boot-overlay-corner-br"></span>' +
      '<div class="boot-overlay-lines"></div>' +
      '<div class="scan-line"></div>';
    document.body.appendChild(overlay);

    var linesEl = overlay.querySelector('.boot-overlay-lines');
    var scanEl = overlay.querySelector('.scan-line');
    var steps = ['BAĞLANTI KURULUYOR...', 'GÜVENLİK DUVARI: OK', 'ARAYÜZ YÜKLENİYOR...'];
    var i = 0;

    function nextStep() {
      if (i < steps.length) {
        var p = document.createElement('p');
        p.textContent = steps[i];
        linesEl.appendChild(p);
        i++;
        setTimeout(nextStep, 260);
      } else {
        setTimeout(function () {
          overlay.classList.add('is-leaving');
          setTimeout(function () { overlay.remove(); }, 420);
        }, 220);
      }
    }

    requestAnimationFrame(function () {
      overlay.classList.add('is-active');
      scanEl.classList.add('is-scanning');
      nextStep();
    });
  })();


/* ---- Boot-line — hero'daki 'SYSTEM_BOOT...' daktilo efekti ---- */

  (function () {
    var el = document.getElementById('bootLine');
    if (!el) return;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      el.classList.add('boot-done');
      window.dispatchEvent(new Event('uzn:boot-complete'));
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
          // FAZ 4 — boot satırı bitince hero başlığındaki şifre çözülme
          // efektini tetikle (bkz. aşağıdaki "Hero decrypt" bloğu).
          window.dispatchEvent(new Event('uzn:boot-complete'));
        }, 350);
      }
    }
    typeNext();
  })();


/* ---- Hero decrypt — FAZ 4: boot-line'ın genişletilmiş hali. "SYSTEM_BOOT"
   satırı bittiği anda hero başlığı kısa bir şifre-çözülme (decrypt) efektiyle
   netleşiyor. Sadece hero'da, sadece ilk açılışta çalışır — tüm sitede DEĞİL.
   Metin HTML'de baştan doğru halde durur, JS sadece görsel olarak geçici
   karıştırır; JS çalışmazsa veya prefers-reduced-motion aktifse hiçbir şey
   olmaz ve başlık zaten doğru görünür (no-JS fallback güvenli). ---- */

  (function () {
    var lines = document.querySelectorAll('.decrypt-line');
    if (!lines.length) return;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    var glyphs = '01#%&*+-/<>[]{}=';

    function scramble(el, done) {
      var text = el.textContent;
      var chars = text.split('');
      var start = null;
      var perCharMs = 26;
      var lockPad = 260;
      var totalMs = chars.length * perCharMs + lockPad;

      function frame(ts) {
        if (start === null) start = ts;
        var elapsed = ts - start;
        var out = '';
        for (var i = 0; i < chars.length; i++) {
          var c = chars[i];
          if (c === ' ') { out += ' '; continue; }
          var lockAt = i * perCharMs + lockPad;
          out += elapsed >= lockAt ? c : glyphs[(Math.random() * glyphs.length) | 0];
        }
        el.textContent = out;
        if (elapsed < totalMs) {
          requestAnimationFrame(frame);
        } else {
          el.textContent = text;
          if (done) done();
        }
      }
      requestAnimationFrame(frame);
    }

    function run() {
      var i = 0;
      function next() {
        if (i >= lines.length) return;
        var el = lines[i];
        i++;
        scramble(el, next);
      }
      next();
    }

    window.addEventListener('uzn:boot-complete', run, { once: true });
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

    // FAZ 5.x / C — Kademeli içerik belirmesi: solo elemanlar artık kendi
    // section'ları içinde DOM sırasına göre küçük bir gecikmeyle beliriyor
    // (başlık önce, alt metin/not birkaç onlarca ms sonra). Grupların
    // (kart/liste) kendi iç stagger'ı zaten yukarıda var, burada eklenen
    // sadece section başına düşen "eyebrow → başlık → not" sırası.
    var soloEls = Array.prototype.slice.call(document.querySelectorAll(soloSelectors.join(',')));
    var soloCounters = new Map();
    soloEls.forEach(function (el) {
      var container = el.closest('.hero, .section') || document.body;
      var count = soloCounters.get(container) || 0;
      if (count > 0) el.style.transitionDelay = Math.min(count, 4) * 90 + 'ms';
      soloCounters.set(container, count + 1);
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

    // FAZ 3 / Görünmez Mıknatıs Noktaları — Faz 1'de kutusu kaldırılan
    // serbest metin blokları (duyuru-card, service-tile, update-card)
    // ekrana girerken, en yakın hud-ambient düğümüne doğru birkaç
    // piksellik bir çekimle "oturuyor" — sanki sayfanın görünmez ağına
    // hafifçe mıknatıslanıyorlar. Düğüm bulunamazsa (ör. mobilde
    // hud-ambient gizli) sadece düz bir fade/rise-in olur, zararsız
    // şekilde geri düşer.
    var magnetEls = document.querySelectorAll('.magnet-settle');
    if (magnetEls.length) {
      // JS aktif olduğu için gizleme/animasyon etkisini şimdi "silahlandırıyoruz";
      // JS hiç çalışmazsa bu class hiç eklenmez, içerik normal görünür kalır.
      magnetEls.forEach(function (el) { el.classList.add('magnet-armed'); });
      var nodeEls = document.querySelectorAll('.hud-node');

      var applyMagnetOffset = function (el) {
        if (!nodeEls.length) return;
        var r = el.getBoundingClientRect();
        var ecx = r.left + r.width / 2;
        var ecy = r.top + r.height / 2;
        var best = null, bestDist = Infinity;
        nodeEls.forEach(function (node) {
          var nr = node.getBoundingClientRect();
          var d = Math.hypot(nr.left - ecx, nr.top - ecy);
          if (d < bestDist) { bestDist = d; best = nr; }
        });
        if (!best) return;
        var dx = best.left - ecx;
        var dy = best.top - ecy;
        var mag = Math.hypot(dx, dy) || 1;
        var clampPx = 5; // görünmez mıknatıs — çok küçük, dikkat çekmeyen bir kayma
        el.style.setProperty('--magnet-x', ((dx / mag) * clampPx).toFixed(1) + 'px');
        el.style.setProperty('--magnet-y', ((dy / mag) * clampPx).toFixed(1) + 'px');
      };

      if (reduceMotion || !('IntersectionObserver' in window)) {
        magnetEls.forEach(function (el) { el.classList.add('is-settled'); });
      } else {
        var magnetObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry, i) {
            if (entry.isIntersecting) {
              applyMagnetOffset(entry.target);
              entry.target.classList.add('is-settled');
              magnetObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
        magnetEls.forEach(function (el) { magnetObserver.observe(el); });
      }
    }

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


/* ---- Kinetik Tipografi İskeleti — FAZ 4: sadece "Yetkinlik Alanları" ve
   "Seçili Çalışmalar" başlıklarında (.kinetic-heading), büyük harfler
   yapısal bir ayraç gibi davranıyor. Sayfaya girerken harf harf hafifçe
   "yerine oturuyor". Ekran okuyucular için orijinal metin .visually-hidden
   span içinde saklanıyor, harf span'ları aria-hidden. JS çalışmazsa harfler
   hiç bölünmez — başlık CSS ile büyütülmüş/aralıklı normal metin olarak
   kalır, no-JS fallback güvenli. ---- */

  (function () {
    var headings = document.querySelectorAll('.kinetic-heading');
    if (!headings.length) return;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    headings.forEach(function (h) {
      var text = h.textContent.trim();

      var srSpan = document.createElement('span');
      srSpan.className = 'visually-hidden';
      srSpan.textContent = text;

      var wrap = document.createElement('span');
      wrap.setAttribute('aria-hidden', 'true');

      Array.from(text).forEach(function (ch, i) {
        if (ch === ' ') {
          wrap.appendChild(document.createTextNode(' '));
          return;
        }
        var span = document.createElement('span');
        span.className = 'kinetic-letter';
        span.textContent = ch;
        span.style.transitionDelay = (Math.min(i, 16) * 24) + 'ms';
        wrap.appendChild(span);
      });

      h.textContent = '';
      h.appendChild(srSpan);
      h.appendChild(wrap);

      if (reduceMotion || !('IntersectionObserver' in window)) {
        return; // harfler zaten opak/normal — armed class hiç eklenmiyor
      }

      h.classList.add('kinetic-armed');
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            h.classList.add('is-kinetic-set');
            obs.unobserve(h);
          }
        });
      }, { threshold: 0.3, rootMargin: '0px 0px -10% 0px' });
      obs.observe(h);
    });
  })();


/* ---- Cursor spotlight, 3D tilt, magnetic butonlar, parallax katmanları ---- */

  (function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var canHover = window.matchMedia('(hover: hover)').matches;
    if (reduceMotion || !canHover) return;

    // Mouse-tracked spotlight glow — --mx/--my documentElement üzerinde de
    // set ediliyor ki aşağıdaki "Sensör Tetikleyicileri" gibi başka
    // proximity efektleri de aynı imleç konumunu okuyabilsin.
    var spotlight = document.querySelector('.cursor-spotlight');
    var docEl = document.documentElement;
    window.addEventListener('mousemove', function (e) {
      if (spotlight) {
        spotlight.style.setProperty('--mx', e.clientX + 'px');
        spotlight.style.setProperty('--my', e.clientY + 'px');
      }
      docEl.style.setProperty('--cursor-x', e.clientX + 'px');
      docEl.style.setProperty('--cursor-y', e.clientY + 'px');
    }, { passive: true });

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

    // FAZ 3 / Sensör Tetikleyicileri (Proximity Fade) — cursor-spotlight'ın
    // genişletilmiş hali: dekoratif/ikincil etiketler (telemetri kodları,
    // nav referans numaraları) varsayılan olarak soluk durur, imleç
    // yaklaştıkça HUD bir "sensör" gibi onları fark edip parlatır. Sadece
    // ikincil/dekoratif metinlere uygulanıyor — okunabilirlik riski olan
    // ana içerik metinlerine (paragraf, başlık) DOKUNULMUYOR.
    var sensorEls = Array.prototype.slice.call(document.querySelectorAll('.sensor-fade'));
    if (sensorEls.length) {
      var sensorRects = [];
      var measureSensorRects = function () {
        sensorRects = sensorEls.map(function (el) { return el.getBoundingClientRect(); });
      };
      measureSensorRects();
      window.addEventListener('resize', measureSensorRects, { passive: true });

      var sensorRadius = 220; // px — bu yarıçapın dışında etki sıfır
      var sensorTicking = false;
      window.addEventListener('mousemove', function (e) {
        if (sensorTicking) return;
        sensorTicking = true;
        requestAnimationFrame(function () {
          for (var i = 0; i < sensorEls.length; i++) {
            var r = sensorRects[i];
            var cx = Math.max(r.left, Math.min(e.clientX, r.right));
            var cy = Math.max(r.top, Math.min(e.clientY, r.bottom));
            var dist = Math.hypot(e.clientX - cx, e.clientY - cy);
            var proximity = Math.max(0, 1 - dist / sensorRadius);
            sensorEls[i].style.setProperty('--proximity', proximity.toFixed(2));
          }
          sensorTicking = false;
        });
      }, { passive: true });

      // Scroll de rect'leri kaydırır — throttle'lı yeniden ölçüm.
      var sensorScrollTicking = false;
      window.addEventListener('scroll', function () {
        if (sensorScrollTicking) return;
        sensorScrollTicking = true;
        requestAnimationFrame(function () { measureSensorRects(); sensorScrollTicking = false; });
      }, { passive: true });
    }

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
          // EK-5 / FAZ 3 — Z-Derinlik Parallaks: tek hızlı kaymak yerine
          // üç kademeli hız, katmanları gerçekten "uzaklıklarına" göre
          // ayırıyor. Yakın katman (hud-ambient düğümleri) daha hızlı,
          // uzak katman (grid + yörünge halkası) daha yavaş kayar.
          // Kaldırmak için bu üç satırı silip eski tek satırlı --bg-scroll-y
          // halini geri koyman yeterli (style.css'teki EK-5 bloğu da geri
          // alınmalı, yoksa katmanlar hareketsiz kalır — zararsız).
          var root = document.documentElement;
          root.style.setProperty('--depth-y-near', Math.min(window.scrollY * 0.09, 90).toFixed(1) + 'px');
          root.style.setProperty('--depth-y-mid', Math.min(window.scrollY * 0.04, 40).toFixed(1) + 'px');
          root.style.setProperty('--depth-y-far', Math.min(window.scrollY * 0.018, 18).toFixed(1) + 'px');
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


/* ---- Ağ topolojisi haritası — bir düğüm açılınca diğerleri kapanır
   (native <details> davranışı JS'siz de çalışır; bu sadece harita
   üzerinde aynı anda birden fazla panel açık kalmasını önleyen bir
   iyileştirme, FAZ 2). ---- */

  (function () {
    var nodes = document.querySelectorAll('.topology-node');
    if (!nodes.length) return;
    nodes.forEach(function (node) {
      node.addEventListener('toggle', function () {
        if (!node.open) return;
        nodes.forEach(function (other) {
          if (other !== node) other.open = false;
        });
      });
    });
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


/* ---- Yukarı Dön — belli bir kaydırma mesafesinden sonra beliren, tek
   tıkla başa dönen buton. index.html ve kvkk.html'de var; buton yoksa
   IIFE hemen çıkar (404.html gibi kısa sayfalarda gerek yok). ---- */

  (function () {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var threshold = 640;

    function toggle() {
      if (window.scrollY > threshold) btn.classList.add('is-visible');
      else btn.classList.remove('is-visible');
    }
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  })();


/* ---- Yandan Hızlı Erişim rayı — sadece geniş ekranlarda görünen (CSS
   media query), üst nav'a dönmeden bölümler arası atlamayı sağlayan sabit
   ray. Aktif bölüm, IntersectionObserver ile viewport'un orta bandını
   kesen section'a göre işaretleniyor. Ray veya IntersectionObserver yoksa
   sessizce çıkar — sayfa etkilenmez. ---- */

  (function () {
    var rail = document.getElementById('sideRail');
    if (!rail) return;
    var links = Array.prototype.slice.call(rail.querySelectorAll('a[data-target]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    var sections = [];
    links.forEach(function (a) {
      var id = a.getAttribute('data-target');
      var section = document.getElementById(id);
      if (section) {
        map[id] = a;
        sections.push(section);
      }
    });
    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = map[entry.target.id];
        if (!link) return;
        links.forEach(function (a) { a.classList.remove('is-active'); });
        link.classList.add('is-active');
      });
    }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  })();


/* ---- FAZ 5.x / B — Scroll Atmosfer Kayması (siyah → lacivert → beyaz) ----
   Section'lar üç gruba ayrılıyor; aktif section hangi gruptaysa body'nin
   data-phase'i o gruba çekiliyor. Gerçek renk geçişi CSS tarafında
   (@property + transition ile) oluyor, burada sadece hangi perdede
   olduğumuzu işaretliyoruz. ---- */

  (function () {
    var body = document.body;
    var sections = Array.prototype.slice.call(document.querySelectorAll('main > section[id]'));
    if (!sections.length || !('IntersectionObserver' in window)) return;

    var phaseBySection = {
      hero: 'dark',
      guncellemeler: 'dark',
      hizmetler: 'navy',
      hakkimda: 'navy',
      projeler: 'navy',
      referanslar: 'light',
      sss: 'light',
      iletisim: 'light'
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var phase = phaseBySection[entry.target.id] || 'dark';
        if (phase === 'dark') {
          body.removeAttribute('data-phase');
        } else {
          body.setAttribute('data-phase', phase);
        }
      });
    }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  })();
