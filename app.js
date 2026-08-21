/*
 * UZN TECH & SOFTWARE — app.js
 * index.html / kvkk.html / 404.html tarafından ortak olarak kullanılır.
 * Her IIFE, ait olduğu DOM elemanı sayfada yoksa güvenli şekilde erken çıkar (return),
 * bu sayede aynı dosya üç sayfada da sorunsuz çalışır.
 */

/* ---- Paylaşılan yardımcı: decrypt/scramble efekti ----
   Hero başlığındaki decrypt-line'lar ve FAZ 5 / Zarif Şifreleme kapsamında
   proje detay panelinin ilk açılışında kullanılan ortak fonksiyon. Metin
   HTML'de baştan doğru halde durur, bu sadece görsel bir geçici karıştırma;
   çağıran taraf prefers-reduced-motion kontrolünü kendi yapar. */
function uznScramble(el, totalMs, done) {
  var text = el.textContent;
  var chars = text.split('');
  var glyphs = '01#%&*+-/<>[]{}=';
  var start = null;
  function frame(ts) {
    if (start === null) start = ts;
    var elapsed = ts - start;
    var out = '';
    for (var i = 0; i < chars.length; i++) {
      var c = chars[i];
      if (c === ' ') { out += ' '; continue; }
      var lockAt = (i / chars.length) * totalMs * 0.7;
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
      '<div class="boot-overlay-content">' +
        '<svg class="boot-overlay-logo" width="56" height="56" viewBox="0 0 22 22" aria-hidden="true">' +
          '<circle class="boot-overlay-logo-dot boot-overlay-logo-dot-a" cx="4" cy="11" r="2.2"/>' +
          '<line class="boot-overlay-logo-line" x1="6.2" y1="11" x2="15.8" y2="11"/>' +
          '<circle class="boot-overlay-logo-dot boot-overlay-logo-dot-b" cx="18" cy="11" r="2.2"/>' +
        '</svg>' +
        '<div class="boot-overlay-lines"></div>' +
        '<div class="boot-overlay-progress"><span class="boot-overlay-progress-fill"></span></div>' +
      '</div>';
    document.body.appendChild(overlay);

    var linesEl = overlay.querySelector('.boot-overlay-lines');
    var progressEl = overlay.querySelector('.boot-overlay-progress-fill');
    var steps = ['BAĞLANTI KURULUYOR...', 'GÜVENLİK DUVARI: AKTİF', 'ARAYÜZ YÜKLENİYOR...'];
    var i = 0;

    function nextStep() {
      if (i < steps.length) {
        var p = document.createElement('p');
        p.textContent = steps[i];
        linesEl.appendChild(p);
        i++;
        setTimeout(nextStep, 550);
      } else {
        setTimeout(function () {
          overlay.classList.add('is-leaving');
          setTimeout(function () { overlay.remove(); }, 500);
        }, 500);
      }
    }

    requestAnimationFrame(function () {
      overlay.classList.add('is-active');
      // Işık çubuğu, boot sekansının toplam süresiyle eşleşecek şekilde
      // ~2.15s'de doluyor (3 adım x 550ms + 500ms bekleme). Adım sayısı ya
      // da gecikmeler değişirse .boot-overlay-progress-fill animasyon
      // süresi de (style.css) buna göre güncellenmeli.
      if (progressEl) progressEl.classList.add('is-filling');
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

    function run() {
      var i = 0;
      function next() {
        if (i >= lines.length) return;
        var el = lines[i];
        i++;
        var totalMs = el.textContent.length * 26 + 260;
        uznScramble(el, totalMs, next);
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


/* ---- FAZ 5 / Mekanik Akordeon — proje detayı yeni sayfaya gitmeden,
   satır arası açılıyor. Aynı anda tek satır açık kalır (bir sonraki
   tıklanınca öncekiler kapanır) — CAD çekmece gibi tek seferde bir
   göz açık. Detay ilk kez açıldığında içindeki [data-decrypt-target]
   metni FAZ 5 / Zarif Şifreleme kapsamında ~0.5sn'lik bir decrypt
   efektiyle beliriyor (hero'daki decrypt'in aynı ortak fonksiyonu,
   uznScramble). Gerçek proje görselleri eklendiğinde aynı efekt
   görsellere de taşınabilir; şimdilik görsel olmadığı için metne
   uygulanıyor. ---- */

  (function () {
    var rows = document.querySelectorAll('.project-row');
    if (!rows.length) return;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    rows.forEach(function (row) {
      var head = row.querySelector('.project-row-head');
      var wrap = row.querySelector('.project-detail-wrap');
      if (!head || !wrap) return;
      var decrypted = false;

      // Kapalı detay hem ekran okuyucudan gizlenmeli hem de klavye Tab
      // sırasından çıkmalı. Eskiden sadece aria-hidden vardı; içindeki
      // linkler görünmez olduğu halde Tab ile odaklanılabiliyordu
      // (ekran okuyucu "burada bir şey yok" derken imleç oraya atlıyordu).
      // `inert` ikisini birden halleder; desteklemeyen tarayıcı için
      // aria-hidden yedek olarak kalıyor.
      function setHidden(el, hidden) {
        el.setAttribute('aria-hidden', hidden ? 'true' : 'false');
        if (hidden) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
      }

      setHidden(wrap, true);

      function close() {
        row.classList.remove('is-open');
        head.setAttribute('aria-expanded', 'false');
        setHidden(wrap, true);
      }
      function open() {
        rows.forEach(function (other) {
          if (other !== row) other.classList.remove('is-open');
        });
        rows.forEach(function (other) {
          var otherHead = other.querySelector('.project-row-head');
          var otherWrap = other.querySelector('.project-detail-wrap');
          if (other !== row) {
            if (otherHead) otherHead.setAttribute('aria-expanded', 'false');
            if (otherWrap) {
              otherWrap.setAttribute('aria-hidden', 'true');
              otherWrap.setAttribute('inert', '');
            }
          }
        });
        row.classList.add('is-open');
        head.setAttribute('aria-expanded', 'true');
        setHidden(wrap, false);

        if (!decrypted) {
          decrypted = true;
          var target = wrap.querySelector('[data-decrypt-target]');
          if (target && !reduceMotion) {
            uznScramble(target, 500);
          }
        }
      }

      head.addEventListener('click', function () {
        if (row.classList.contains('is-open')) close();
        else open();
      });
    });
  })();


/* ---- Reveal — scroll'da fade-in/slide-up ---- */

  (function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Groups: items get a small staggered delay based on their position
    var groupSelectors = [
      '.card-grid > .card',
      '.process-steps > .process-step',
      '.project-list > .project-row',
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

    // Yumuşak yerine oturma (eski adıyla "Görünmez Mıknatıs Noktaları").
    // NOT: Eskiden her eleman en yakın .hud-node düğümüne doğru birkaç piksel
    // çekiliyordu. Ama HUD katmanı (data-hud="off") kapatıldığından o düğümler
    // display:none idi; getBoundingClientRect() hepsi için 0,0 dönüyor,
    // dolayısıyla "en yakın düğüm" hesabı anlamsızdı ve tüm elemanlar aynı
    // yöne kayıyordu. Düğüm arama kaldırıldı; görsel sonuç (fade + rise-in)
    // aynı kaldı, her frame'de yapılan gereksiz rect ölçümü gitti.
    var magnetEls = document.querySelectorAll('.magnet-settle');
    if (magnetEls.length) {
      // JS aktif olduğu için animasyonu "silahlandırıyoruz"; JS hiç çalışmazsa
      // bu class hiç eklenmez ve içerik normal görünür kalır.
      magnetEls.forEach(function (el) { el.classList.add('magnet-armed'); });

      if (reduceMotion || !('IntersectionObserver' in window)) {
        magnetEls.forEach(function (el) { el.classList.add('is-settled'); });
      } else {
        var magnetObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-settled');
              magnetObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
        magnetEls.forEach(function (el) { magnetObserver.observe(el); });
      }
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
      // FAZ 5 / Kademeli Tipografi: başlığın içindeki .heading-ref (mono
      // referans kodu) harf-bölme mantığına dahil edilmemeli — önce ayrı
      // tutulup en sona, aria-hidden wrap'in dışına geri ekleniyor.
      var refEl = h.querySelector('.heading-ref');
      if (refEl) refEl.parentNode.removeChild(refEl);

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
      if (refEl) h.appendChild(refEl);

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

    // ---- Birleşik imleç efektleri (spotlight + manyetik butonlar + sensör etiketleri) ----
    // Eskiden bunlar üç ayrı window 'mousemove' dinleyicisiydi ve manyetik olan
    // HER karede tüm .magnetic elemanlar için getBoundingClientRect() çağırıyordu.
    // Bu, her karede zorunlu bir layout (reflow) demekti — imleci hızlı
    // hareket ettirince kare düşmesinin ana sebebi. Artık tek dinleyici + tek
    // requestAnimationFrame var; ölçümler önbellekte tutuluyor ve yalnızca
    // scroll/resize sonrası tazeleniyor.
    var magneticBtns = Array.prototype.slice.call(document.querySelectorAll('.magnetic'));
    var sensorEls = Array.prototype.slice.call(document.querySelectorAll('.sensor-fade'));
    var spotlight = document.querySelector('.cursor-spotlight');

    if (spotlight || magneticBtns.length || sensorEls.length) {
      var PROXIMITY_RADIUS = 90;  // px — .magnetic kenarından itibaren çekim yarıçapı
      var SENSOR_RADIUS = 220;    // px — .sensor-fade parlama yarıçapı
      var ptrX = -99999, ptrY = -99999;
      var framePending = false, rectsDirty = true;
      var magnetRects = [], sensorRects = [];

      function measureRects() {
        magnetRects = magneticBtns.map(function (el) { return el.getBoundingClientRect(); });
        sensorRects = sensorEls.map(function (el) { return el.getBoundingClientRect(); });
        rectsDirty = false;
      }

      function resetMagnets() {
        magneticBtns.forEach(function (btn) {
          btn.style.setProperty('--mbx', '0px');
          btn.style.setProperty('--mby', '0px');
        });
      }

      function frame() {
        framePending = false;
        if (rectsDirty) measureRects();

        if (spotlight) {
          spotlight.style.setProperty('--mx', ptrX + 'px');
          spotlight.style.setProperty('--my', ptrY + 'px');
        }

        for (var i = 0; i < magneticBtns.length; i++) {
          var r = magnetRects[i];
          if (!r) continue;
          // İmlecin elemanın kutusuna en yakın mesafesi (kutunun içindeyse 0)
          var dx = Math.max(r.left - ptrX, 0, ptrX - r.right);
          var dy = Math.max(r.top - ptrY, 0, ptrY - r.bottom);
          var edgeDist = Math.sqrt(dx * dx + dy * dy);
          if (edgeDist > PROXIMITY_RADIUS) {
            magneticBtns[i].style.setProperty('--mbx', '0px');
            magneticBtns[i].style.setProperty('--mby', '0px');
            continue;
          }
          var pull = 1 - edgeDist / PROXIMITY_RADIUS;  // 0 (uzak) → 1 (üzerinde)
          var cx = r.left + r.width / 2;
          var cy = r.top + r.height / 2;
          magneticBtns[i].style.setProperty('--mbx', ((ptrX - cx) * 0.28 * pull).toFixed(1) + 'px');
          magneticBtns[i].style.setProperty('--mby', ((ptrY - cy) * 0.35 * pull).toFixed(1) + 'px');
        }

        // Dekoratif/ikincil etiketler (telemetri kodları, nav referans numaraları)
        // varsayılan olarak soluk durur, imleç yaklaştıkça parlar. Ana içerik
        // metinlerine (paragraf, başlık) uygulanmıyor — okunabilirlik riski var.
        for (var j = 0; j < sensorEls.length; j++) {
          var sr = sensorRects[j];
          if (!sr) continue;
          var nx = Math.max(sr.left, Math.min(ptrX, sr.right));
          var ny = Math.max(sr.top, Math.min(ptrY, sr.bottom));
          var dist = Math.hypot(ptrX - nx, ptrY - ny);
          sensorEls[j].style.setProperty('--proximity', Math.max(0, 1 - dist / SENSOR_RADIUS).toFixed(2));
        }
      }

      function schedule() {
        if (framePending) return;
        framePending = true;
        requestAnimationFrame(frame);
      }

      window.addEventListener('mousemove', function (e) {
        ptrX = e.clientX; ptrY = e.clientY;
        schedule();
      }, { passive: true });

      // Scroll ve resize rect'leri kaydırır; bir sonraki karede yeniden ölçülür.
      window.addEventListener('scroll', function () { rectsDirty = true; schedule(); }, { passive: true });
      window.addEventListener('resize', function () { rectsDirty = true; schedule(); }, { passive: true });

      // İmleç pencereden çıkınca butonları nötrle.
      document.addEventListener('mouseleave', resetMagnets);
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
          // iki kademeli hız, katmanları "uzaklıklarına" göre ayırıyor:
          // orta katman (.circuit-bg) daha hızlı, uzak katman (body::before
          // halkaları) daha yavaş kayar.
          // Kaldırmak için bu üç satırı silip eski tek satırlı --bg-scroll-y
          // halini geri koyman yeterli (style.css'teki EK-5 bloğu da geri
          // alınmalı, yoksa katmanlar hareketsiz kalır — zararsız).
          var root = document.documentElement;
          root.style.setProperty('--depth-y-mid', Math.min(window.scrollY * 0.04, 40).toFixed(1) + 'px');
          root.style.setProperty('--depth-y-far', Math.min(window.scrollY * 0.018, 18).toFixed(1) + 'px');
          ticking = false;
        });
      }, { passive: true });
    }

    // PCB trace removed — kept hero parallax above only.
  })();


/* ---- Track-select — hero'daki ilgi alanı seçici (yazılım/mekanik/siber/ikisi) ----
   v20 GÜNCELLEMESİ: Artık ne filtre ne de sayfa-içi yönlendirme —
   4 buton `<a href>` olarak doğrudan ilgili track sayfasına
   (yazilim.html, mekanik-otomasyon.html, siber-guvenlik.html,
   mekatronik.html) gidiyor. Eski JS (data-track-btn tıklama,
   #hizmetler'e kaydırma, topology düğümü otomatik açma, iletişim
   formundaki "ilgi alanı" alanını otomatik doldurma) tamamen
   kaldırıldı — bunlara gerek kalmadı, tarayıcı linki normal şekilde
   izliyor. */


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


/* ---- Command palette (cmdk) — Ctrl/Cmd+K ile hızlı gezinme ----
   Hero'daki arama kutusu (`#heroSearchInput`) daha önce tamamen
   dekoratifti (JS karşılığı yoktu). Ayrı bir arama motoru kurmak yerine
   zaten var olan, gerçek çalışan command palette'e bağlandı: hero
   kutusuna odaklanınca ya da yazmaya başlayınca palette açılıyor ve
   yazılan metin doğrudan palette'in filtresine aktarılıyor. */

  (function () {
    var overlay = document.getElementById('cmdkOverlay');
    var input = document.getElementById('cmdkInput');
    var list = document.getElementById('cmdkList');
    var trigger = document.getElementById('cmdkTrigger');
    var heroInput = document.getElementById('heroSearchInput');
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
    function filterList(q) {
      q = q.trim().toLowerCase();
      items.forEach(function (a) {
        var match = a.textContent.toLowerCase().indexOf(q) !== -1;
        a.parentElement.classList.toggle('is-hidden', !match);
      });
      selectedIndex = 0;
      updateSelection();
    }
    // Liste öğeleri hem sayfa-içi çapa (#projeler) hem de başka bir sayfa
    // (kurumsal.html) olabilir. Eskiden koşulsuz `location.hash` set ediliyordu,
    // bu yüzden "Kurumsal" seçilince URL `#kurumsal.html` olup hiçbir yere
    // gitmiyordu. Artık href'in türüne göre davranıyor.
    function goToItem(el) {
      var href = el.getAttribute('href') || '';
      if (href.charAt(0) === '#') window.location.hash = href;
      else if (href) window.location.href = href;
    }

    function openPalette(presetQuery) {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      input.value = presetQuery || '';
      filterList(input.value);
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

    if (trigger) trigger.addEventListener('click', function () { openPalette(); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closePalette(); });

    input.addEventListener('input', function () { filterList(input.value); });

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
          goToItem(target);
        }
      }
    });

    items.forEach(function (a) {
      a.addEventListener('click', function () { closePalette(); });
    });

    if (heroInput) {
      heroInput.addEventListener('focus', function () {
        openPalette(heroInput.value);
      });
      heroInput.addEventListener('input', function () {
        if (!overlay.classList.contains('is-open')) openPalette(heroInput.value);
        else { input.value = heroInput.value; filterList(input.value); }
      });
      heroInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          var vis = visibleItems();
          if (vis[0]) {
            closePalette();
            heroInput.blur();
            goToItem(vis[0]);
          }
        }
      });
    }
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


/* ---- Scroll Atmosfer Kayması — KALDIRILDI (v6 / FAZ 12.1) ----
   Sayfa tek sabit temada (dark) kaldığına karar verildiği için scroll'a bağlı
   renk geçişi sistemi tamamen silindi. Eskiden buradaki IIFE'nin ilk satırı
   `return;` idi, yani ~130 satır ölü kod taşınıyordu. CSS karşılığı da
   (effects.css içindeki @property blokları, :root transition ve
   body[data-phase="navy"/"light"] kuralları) aynı temizlikte kaldırıldı.
   Geri istenirse git geçmişinden alınabilir. ---- */

/* ==========================================================================
   FAZ 6 / Grup B — Tipografi & Grid
   (v2 elde yok; ayrıntı ve kaldırma talimatları için style.css'teki aynı
   başlıklı yorum bloklarına ve tasarim-yol-haritasi-v3.md'ye bakın.)
   ========================================================================== */

/* ---- FAZ 6 / Görünmez Sütunlar ----
   Alt+G ile <html> üzerinde .uzn-show-guides toggle'lanıyor; asıl görsel
   karşılığı (12 sütunluk çizgi deseni) tamamen CSS'te (body::after).
   Burada sadece klavye kısayolu + kısa bir HUD bildirimi var. Form
   alanlarında yazarken kısayolun tetiklenmemesi için input/textarea
   odaktaysa yok sayılıyor. */
(function () {
  var toastTimer = null;

  function showToast(text) {
    var existing = document.querySelector('.guide-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'guide-toast';
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = text;
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('is-shown'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-shown');
      setTimeout(function () { toast.remove(); }, 300);
    }, 1600);
  }

  document.addEventListener('keydown', function (e) {
    if (!e.altKey || e.key.toLowerCase() !== 'g') return;
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    e.preventDefault();
    var on = document.documentElement.classList.toggle('uzn-show-guides');
    showToast(on ? 'KOLON IZGARASI — AÇIK · 12 SÜTUN' : 'KOLON IZGARASI — KAPALI');
  });
})();

/* ---- FAZ 6 / Sessiz Kılavuzlar ----
   Her bölüm ilk kez görünür olduğunda kenarlarında kısa bir "ölçüm" yanıp
   sönmesi tetikleniyor, ~550ms sonra kalıcı-ama-çok-soluk bir ize
   (.guide-settled) dönüşüyor. threshold 0 + rootMargin yok, yani B'deki
   (atmosfer) gözlemcinin aksine bölüm ekranın herhangi bir kenarından
   girer girmez tetiklenir — bu daha çok bir "sınır algılama" hissi verir. */
(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll('main > section[id]'));
  if (!sections.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    sections.forEach(function (s) { s.classList.add('guide-settled'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      observer.unobserve(el);
      el.classList.add('guide-pulse');
      setTimeout(function () {
        el.classList.remove('guide-pulse');
        el.classList.add('guide-settled');
      }, 550);
    });
  }, { threshold: 0 });

  sections.forEach(function (s) { observer.observe(s); });
})();


/* ==========================================================================
   FAZ 6 / Grup A — Yüzey & Derinlik
   (Buzlu Cam ve Keskin Alüminyum Kenarlar tamamen CSS'te; burada sadece
   Gölge İskelet'in yükleme durumunu yöneten JS var. Ayrıntı için
   style.css'teki aynı başlıklı yorum ve tasarim-yol-haritasi-v3.md.)
   ========================================================================== */

/* ---- FAZ 6 / Gölge İskelet ----
   .img-skeleton taşıyan her <img> için: zaten yüklenmişse (cache'ten,
   `complete`) shimmer'ı hemen kapat; değilse `load` (veya hata durumunda
   `error`, sonsuza dek shimmer'da kalmasın diye) olayını bekle. */
(function () {
  var imgs = document.querySelectorAll('img.img-skeleton');
  if (!imgs.length) return;

  imgs.forEach(function (img) {
    function settle() { img.classList.add('is-loaded'); }
    if (img.complete && img.naturalWidth > 0) {
      settle();
    } else {
      img.addEventListener('load', settle, { once: true });
      img.addEventListener('error', settle, { once: true });
    }
  });
})();


/* ==========================================================================
   FAZ 6 / Grup E — Etkileşim Geri Bildirimi
   (Keskin Dönüşlü Yollar ve Ses Dalgaları tamamen CSS'te; burada sadece
   Mikro-Sismik Geri Bildirim'in tetikleyicisi var. Ayrıntı için
   style.css'teki aynı başlıklı yorumlar ve tasarim-yol-haritasi-v3.md.)
   ========================================================================== */

/* ---- FAZ 6 / Mikro-Sismik Geri Bildirim ----
   Tek bir delegated 'click' dinleyici — sayfada kaç tane .btn/.project-row-head/
   .quick-tile/.footer-action olursa olsun tek listener yeterli. Zaten
   animasyonluyken tekrar tıklanırsa (animationend beklemeden) class'ı
   kaldırıp bir sonraki frame'de tekrar ekliyor, böylece hızlı art arda
   tıklamalarda da her seferinde görünür bir titreşim oluyor. */
(function () {
  var SEL = '.btn, .project-row-head, .quick-tile, .footer-action';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest(SEL) : null;
    if (!el) return;
    el.classList.remove('uzn-seismic');
    // eslint-disable-next-line no-unused-expressions
    void el.offsetWidth; // reflow — animasyonu class yeniden eklenmeden önce sıfırlar
    el.classList.add('uzn-seismic');
    el.addEventListener('animationend', function handler() {
      el.classList.remove('uzn-seismic');
      el.removeEventListener('animationend', handler);
    });
  });
})();


/* ==========================================================================
   FAZ 6 / Grup C — HUD & Veri
   (Şeffaf Veri Katmanları, Vektörel Kesişim Düğümleri, Bağlantı Ping Testi
   ve Osiloskop Doğrulama tamamen CSS'te; burada sadece Terminal Onay Geri
   Bildirimi'nin JS'i var. Ayrıntı için style.css'teki aynı başlıklı
   yorumlar ve tasarim-yol-haritasi-v3.md.)
   ========================================================================== */

/* ---- Terminal Onay Geri Bildirimi + Hata Durumu ----
   İletişim formu artık native `form.submit()` yerine `fetch()` ile
   gönderiliyor (Accept: application/json), çünkü hatayı (ağ hatası,
   Formspree'nin döndürdüğü hata kodu, limit aşımı vb.) yakalayabilmek
   için gerçek sonucu bilmemiz lazım — native submit sayfayı terk edip
   gider, başarısız olsa da kullanıcı bunu göremezdi.
   Akış: submit → mini-terminal'de kısa bir log dizisi "yazılıyor" (sadece
   kozmetik, sonucu beklemeden başlar) → fetch tamamlanınca ya son satır
   "OK" ile bitip form sıfırlanıyor, ya da terminal gizlenip
   `#submitError` kutusu (retry butonuyla) gösteriliyor.
   `prefers-reduced-motion` açıksa yazma animasyonu atlanıyor ama
   fetch + hata yakalama aynen çalışıyor. JS hiç çalışmazsa (script
   yüklenemedi vb.) form kendi native `action`'ına düşer, bu da Formspree
   için hâlâ geçerli bir gönderim yoludur. KALDIRMAK İÇİN: bu IIFE'yi sil
   + style.css'teki "Terminal Onay Geri Bildirimi" ve "Form Hata Durumu"
   bloklarını sil + index.html'deki `.submit-terminal` / `#submitError`
   div'lerini sil. */
(function () {
  var form = document.querySelector('.contact-form');
  var box = document.getElementById('submitTerminal');
  var textEl = document.getElementById('submitTerminalText');
  var errorBox = document.getElementById('submitError');
  var retryBtn = document.getElementById('submitRetry');
  var errorMsg = document.getElementById('submitErrorMsg');
  if (!form || !box || !textEl || !errorBox) return;

  // Formspree endpoint'i hâlâ yer tutucuysa (action=".../f/XXXXXXX") POST etmenin
  // anlamı yok: 404 döner, kullanıcı boşuna "gönderiliyor" animasyonu izleyip
  // genel bir hata görür. Bu durumda hiç istek atmadan doğrudan e-posta yolunu
  // gösteriyoruz. Gerçek endpoint girilince bu dal kendiliğinden devre dışı kalır.
  var endpointHazir = (form.getAttribute('action') || '').indexOf('XXXXXXX') === -1;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var lines = [
    'baglanti kuruluyor…',
    'veri paketleniyor…',
    'gonderiliyor…'
  ];

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

  function runLines(idx, done) {
    if (idx >= lines.length) { done(); return; }
    typeText(textEl, lines[idx], 22, function () {
      setTimeout(function () { runLines(idx + 1, done); }, 260);
    });
  }

  function doSubmit() {
    if (!endpointHazir) {
      box.hidden = true;
      errorBox.hidden = false;
      if (errorMsg) {
        errorMsg.innerHTML = '<span class="mini-terminal-prompt">!</span> ' +
          'Form altyapısı henüz bağlanmadı — mesajın gönderilemedi.';
      }
      if (retryBtn) retryBtn.hidden = true;
      errorBox.scrollIntoView({ block: 'nearest' });
      return;
    }
    errorBox.hidden = true;
    box.hidden = false;

    var sendRequest = function () {
      var data = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          textEl.textContent = 'gonderiliyor — OK';
          form.reset();
        } else {
          throw new Error('Sunucu hatasi: ' + res.status);
        }
      }).catch(function () {
        box.hidden = true;
        errorBox.hidden = false;
      });
    };

    if (reduceMotion) {
      textEl.textContent = 'gonderiliyor…';
      sendRequest();
    } else {
      runLines(0, sendRequest);
    }
  }

  form.addEventListener('submit', function (e) {
    if (!form.checkValidity()) return; // geçersizse tarayıcı kendi uyarısını göstersin
    e.preventDefault();
    doSubmit();
  });

  if (retryBtn) {
    retryBtn.addEventListener('click', function () {
      doSubmit();
    });
  }
})();
