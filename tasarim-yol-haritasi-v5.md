# UZN TECH — Yol Haritası (v5)

Bu belge v4'ün yerine geçer. v4'te iki hatalı/eksik madde tespit edildi, bu
sürümde düzeltildi (bkz. "v4 Düzeltmeleri"). v3'teki FAZ 5/5.x/6 hâlâ
tamamlanmış durumda, özet aşağıda korunuyor.

## Tamamlanmış işler (özet — detay v3'te)

- **FAZ 5 / 5.0 / 5.x** — Z-ekseni ayrışması, manyetik imleç, mekanik akordeon,
  kademeli tipografi, zarif şifreleme (decrypt), JARVIS/HUD atmosfer sistemi,
  stagger belirme, boot-up sekansı, `.btn-primary` kontrast düzeltmesi.
- **FAZ 6 (Grup A–E)** — Akıllı tipografik hiyerarşi, görünmez sütun ızgarası,
  sessiz kılavuzlar, kademeli derinlik, buzlu cam, gölge iskelet, keskin
  alüminyum kenarlar, mikro-sismik geri bildirim, keskin dönüşlü yollar, ses
  dalgaları, fosforlu mürekkep, parallax yıldız tozu, kesik çizgili
  yörüngeler, ortam halesi, holografik projeksiyon, şeffaf veri katmanları,
  vektörel kesişim düğümleri, osiloskop doğrulama, terminal onay geri
  bildirimi, bağlantı ping testi, tolerans etiketi.

---

## v4 Düzeltmeleri

v4 yazılırken iki madde yanlış/eksik değerlendirilmişti, bu sürümde düzeltildi:

1. **"Nasıl Çalışıyorum süreç şeridi ekle" maddesi hatalıydı** — bu bölüm
   zaten mevcut (`index.html:652`, Görüşme & Analiz → Prototip → Teslim).
   v5'ten çıkarıldı.
2. **"GitHub/LinkedIn placeholder linkleri" maddesi yanlış konumlandırılmıştı**
   — `index.html`'de GitHub linki zaten gerçek (`github.com/FatihUzn`), CV
   linki de gerçek dosya adına işaret ediyor; sadece eski bir `<!-- TODO -->`
   yorumu temizlenmemiş. Asıl sorun `404.html`'de (`KULLANICI_ADIN`
   placeholder hâlâ duruyor) ve index.html'de **LinkedIn linkinin hiç
   olmaması**. FAZ 8'de bu iki ayrı, doğru maddeyle değiştirildi.

---

## Sabit Kalacaklar (KALMALI — dokunulmayacak, referans amaçlı)

Bunlar todo değil, ileride yanlışlıkla bozulmasın diye not düşülüyor:

- **Command palette (Ctrl/Cmd+K)** — gerçek çalışıyor, hızlı gezinme.
- **Track filtresi** (Yazılım/Mekanik/Siber/İkisi) — dekoratif değil, 17
  elementi filtreliyor, URL parametresine yazıyor. Sağlam bir özellik.
- **KVKK sayfası** — 289 satır, madde madde haklar, veri sorumlusu net.
- **`focus-visible` kapsamı** — 23 yerde tanımlı, klavye erişilebilirliği iyi.

---

## FAZ 7 — Görsel İnce Ayar

- [ ] **Kart Başlığı Parlaması** — `.update-card h3`: `color:
      var(--accent-bright)` + `text-shadow: 0 0 10px var(--accent-2-dim)`.
      Faz-bağımlı token olduğu için 3 fazda da otomatik uyum sağlıyor.
- [ ] **Atmosfer Sistemi İnce Ayarı**:
      1. `.grid-overlay` kesişim noktalarına küçük, soluk `--accent` vurgu
         noktaları (`.circuit-bg`'ye dokunulmuyor).
      2. `body[data-phase]` geçişini scroll-oranlı interpolasyonla
         akışkanlaştır (3 fazlı sistem korunur, sıçrama hissi kalkar).

---

## FAZ 8 — Yayın Öncesi Kritik

**Öncelik: Yüksek.** Temel işlevi (iletişim/güven/bulunabilirlik) etkiliyor.

- [ ] **CV linki doğrulama** *(atlandı — kullanıcı talebiyle)*
- [ ] **Formspree endpoint'i bağla** — `action="…/f/XXXXXXX"` hâlâ
      placeholder; gerçek Formspree ID gerekiyor (kullanıcıdan bekleniyor).
      Spam koruması (honeypot) ve hata durumu bu ID beklenmeden tamamlandı,
      ID geldiğinde sadece `action` değeri değişecek.
- [x] **Referanslar bölümü kararı dokümante edilsin** — `index.html`'deki
      testimonial bloğunun üstüne net bir KARAR notu eklendi: bilinçli
      olarak yorumda tutuluyor, ilk gerçek referans geldiğinde nasıl
      açılacağı 3 adımda yazılı.
- [ ] **Canonical URL etiketi** — `<link rel="canonical">` eklenecek;
      *NOT: `index.html`'deki `og:url` meta etiketinde zaten
      `https://fatihuzn.github.io/consulting/` yazıyor — bu doğru
      domain'se onaylayın, canonical + robots.txt + sitemap.xml'i bu
      URL'le tamamlarım.*
- [ ] **robots.txt + sitemap.xml** — *aynı not: domain muhtemelen
      `https://fatihuzn.github.io/consulting/` (og:url'den), onay
      bekleniyor.*
- [ ] **Asset doğrulama** *(atlandı — kullanıcı talebiyle)*
- [x] **404.html placeholder sosyal linkler** — GitHub linki `github.com/
      FatihUzn` ile değiştirildi (index.html ile tutarlı). LinkedIn linki
      hâlâ `KULLANICI_ADIN` placeholder'ı — gerçek profil URL'si gerekiyor
      (kullanıcıdan bekleniyor).
- [~] **LinkedIn linki eklensin** — index.html'e (header, mobil menü, footer)
      LinkedIn ikonu/linki eklendi, 404.html ile aynı placeholder URL'i
      kullanıyor. Gerçek profil adresi geldiğinde tek noktadan (aynı
      placeholder metniyle grep) değiştirilebilir.
- [x] **Formspree spam koruması** — Formspree'nin native `_gotcha` honeypot
      alanı forma eklendi, ekran dışına taşınarak (display:none değil, bazı
      botlar onu atlıyor) gizlendi. Formspree panelinden ek olarak
      reCAPTCHA/Akismet filtresi açılması önerilir (Settings → Spam
      Filtering).
- [x] **Form hata durumu tasarımı** — form artık native `submit()` yerine
      `fetch()` ile gönderiliyor; başarı hâlâ terminal animasyonuyla,
      hata durumunda (ağ hatası / Formspree hata kodu) ayrı bir hata
      terminali + "Tekrar Dene" butonu + e-posta fallback'i gösteriliyor.
      `prefers-reduced-motion`'da animasyon atlanıyor ama hata yakalama
      aynen çalışıyor.

---

## FAZ 9 — İçerik & Güven

**Öncelik: Orta.**

- [ ] **Stat-band — "Tamamlanan Proje: Yakında"** yerine somut bir rakam.
      *Gerçek proje sayısı gerekiyor (kullanıcıdan bekleniyor).*
- [ ] **Duyurular — 3 karttan 2'si "Yakında"** — tek karta indirilip yerine
      daha somut/güncel bir duyuru konulacak. *Yerine konacak gerçek
      duyuru metni gerekiyor (kullanıcıdan bekleniyor).*
- [ ] **Sertifika/program listesi somutlaştırılsın** — "6 Sertifika/Program"
      yazıyor ama nerede olduğu görünmüyor, About'ta kısa liste eklenmeli.
      *6 sertifikanın/programın tam listesi gerekiyor (kullanıcıdan
      bekleniyor) — şu an sadece "YetGen · Zirve 23" görünüyor.*
- [ ] **Güncellemeler ↔ Duyurular içerik çakışması** — iki bölüm de esasen
      "durum/yakında" bildirimi veriyor, art arda gelince "inşaat halinde"
      hissi ikiye katlanıyor. Birleştirilmesi ya da rollerin netçe
      ayrılması (biri "haber", biri "durum") değerlendirilmeli.
      *Karar kullanıcıdan bekleniyor — birleştirme site yapısını
      değiştireceği için önce yön belirlenmeli.*
- [x] **Hero credentials strip etiketi netleştirilsin** — kayan şeridin
      üstüne "İş Birlikleri & Eğitim" etiketi eklendi, yanlış olan
      `aria-label="Referanslar"` da "İş birlikleri ve eğitim kurumları"
      olarak düzeltildi.
- [ ] **Kısa bir "Hizmet Şartları" sayfası** — KVKK var ama proje
      kabul/iptal/ödeme şartlarına dair ayrı bir sayfa yok. *Gerçek
      şartlar (ödeme, iptal, teslim koşulları vb.) kullanıcıdan
      bekleniyor — bu içerik uydurulamaz.*
- [x] **WhatsApp hızlı iletişim butonu** — footer'daki hızlı işlemler
      şeridine "WhatsApp'tan Yaz" butonu eklendi (`wa.me/905343771414`),
      mevcut telefon numarası kullanıldı. *Varsayım: bu numara WhatsApp'ta
      da aktif — değilse href güncellenmeli.*

---

## FAZ 10 — Erişilebilirlik & UX Küçük Düzeltmeler

**Öncelik: Orta-Düşük.**

- [x] **Skip-to-content linki** — `index.html`, `404.html` ve `kvkk.html`
      body'sinin en başına `.skip-link` eklendi (Tab ile odaklanınca
      görünür), `<main id="top">` `tabindex="-1"` ile odaklanabilir yapıldı.
- [x] **Hero arama kutusu** — ayrı bir arama motoru kurmak yerine zaten var
      olan, gerçek çalışan command palette'e (Ctrl/Cmd+K) bağlandı: kutuya
      odaklanınca ya da yazmaya başlayınca palette açılıp yazılan metinle
      filtreleniyor, Enter ilk sonuca gidiyor.
- [x] **`--text-faint` kullanım kontrolü** — denetlendi: telefon/e-posta/
      konum/çalışma saatleri değerleri zaten `--text` ya da `--text-dim`
      kullanıyordu (`.telemetry-item`, `.contact-item`, `.footer-col`,
      `.footer-action-sub`), `--text-faint` sadece etiketlerde/dekoratif alt
      metinlerde. Kritik bilgi için ek değişiklik gerekmedi.
- [x] **Duyurular/Güncellemeler ‹ › ok butonları** — kaldırıldı. İkisi de
      sabit 3 sütunlu grid (gerçek kaydırılan bir carousel değil), bu
      yüzden işlevsel bir carousel kurmak 3 öğe için gereksiz karmaşıklık
      olurdu; dekoratif ve tıklanamaz oldukları için kaldırmak doğru seçim.
      İlgisiz kalan `.carousel-arrow` CSS kuralı da temizlendi.
- [ ] **`prefers-color-scheme` desteği** — *uygulanmadı, kullanıcı kararı
      gerekiyor.* Mevcut "dark/navy/light" sistemi bir açık/koyu mod
      tercihi DEĞİL, scroll konumuna bağlı kasıtlı bir anlatı geçişi
      (hero=siyah → hizmetler/hakkımda=lacivert → referanslar/iletişim=
      beyaz); hero'nun parçacık/HUD efektleri koyu zemine göre tasarlanmış.
      OS `light` tercihine göre hero'yu da açık başlatmak bu tasarımla
      çelişip görsel olarak bozuk görünebilir (test edilemedi). Öneri:
      ya bu maddeyi olduğu gibi kapatın (tasarım kasıtlı), ya da sadece
      tarayıcı `theme-color` meta etiketine `prefers-color-scheme` medya
      sorgusu ekleyin (adres çubuğu rengi, sayfa içeriği etkilenmez).

---

## FAZ 11 — Performans, SEO & Teknik Altyapı

**Öncelik: Düşük, zaman bulundukça.**

- [ ] **404 sayfasında dekoratif katman azaltma** — 9 sabit dekoratif katman
      aynı anda var; 404 gibi ikincil sayfada bir kısmı (`data-layers`,
      `vector-nodes`) kapatılabilir.
- [ ] **Google Fonts ağırlık sayısı azaltılsın** — Sora 600/700/800 + Inter
      400/500/600 + IBM Plex Mono 400/500 = 8 ağırlık; kullanılmayanlar
      çıkarılabilir. İsteğe bağlı olarak self-hosting de değerlendirilebilir
      (render-blocking isteği azaltır).
- [ ] **manifest.json eklensin** — icon setleri hazır, PWA/"ana ekrana ekle"
      için küçük bir ek iş.
- [ ] **WebP/AVIF görsel formatı** — tek gerçek görsel (`about-photo.jpg`)
      hâlâ jpg, `<picture>` ile küçültülebilir.
- [ ] **`.circuit-bg` deseni harici dosyaya taşınsın** — şu an CSS içine
      gömülü data-URI SVG, her yüklemede yeniden parse ediliyor; ayrı
      dosyaya alınırsa tarayıcı cache'inden faydalanır.
- [ ] **`FAQPage` schema.org verisi** — SSS bölümü var ama yapılandırılmış
      veri olarak işaretlenmemiş; eklenirse Google'da zengin sonuç çıkma
      ihtimali var.
- [ ] **Print stylesheet** — sayfa yazdırılırsa/PDF'e çevrilirse HUD
      efektleriyle koyu zeminle çıkar, kullanışsız olur.
- [ ] **Gizlilik-dostu analitik** (Plausible/Fathom/GoatCounter gibi
      çerezsiz) — şu an hiç ölçüm yok. KVKK metnine tek cümle eklemek
      yeterli olur.

---

**Uygulama sırası önerisi:** FAZ 8 (kritik) → FAZ 7 (görsel, zaten
kararlaştırıldı) → FAZ 9 (içerik/güven) → FAZ 10 (erişilebilirlik/UX) →
FAZ 11 (performans/SEO/teknik). FAZ 10 ve 11 birbirine bağımlı değil, zaman
bulundukça paralel de yapılabilir.

---

Son güncelleme: 05 Ağustos 2026 — v4 düzeltmeleri + 20 yeni madde eklendi.
Toplam açık madde: 2 (Faz 7) + 10 (Faz 8) + 7 (Faz 9) + 5 (Faz 10) + 8 (Faz 11) = 32.
