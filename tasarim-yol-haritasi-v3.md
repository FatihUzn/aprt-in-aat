# UZN TECH — Yol Haritası (Faz 5+, v3)

Tamamlanmış maddeler (FAZ 5.0 tema geçişi, Ağ Düğümü Ayırıcılar, Şevli Köşeler,
Hedefleme Braketi, Sinyal LED'i) bu belgeden çıkarıldı — geçmiş sürüm/commit
kayıtlarında duruyorlar. Bu belge sadece açık ve yeni maddeleri listeler.

**Not (denendi, vazgeçildi):** Tüm gövde metnini siyaha çevirme fikri test edildi
— koyu zemin üzerinde metin pratikte görünmez hale geldiği için vazgeçildi.
Mevcut açık renkli metin şeması (`--text`, `--text-dim`, `--text-faint`) korunuyor.
"Siyah + elektrik mavisi elitliği" hissi, metin renginden değil, atmosfer/efekt
katmanından (aşağıdaki FAZ 5.x) verilecek.

---

## FAZ 5.0 — Kalan doğrulama

- [x] **Kod seviyesinde doğrulama** (tarayıcı bu ortamda mevcut değildi, gerçek
      piksel testi kullanıcıda kaldı) — `.btn-primary` metin/zemin kontrastı
      hesaplandı: siyah metin dark fazda 4.55:1 (geçiyor) ama **navy fazda
      3.93:1, light fazda 3.44:1 — WCAG AA (4.5:1) altında kalıyordu.**
      Metin beyaza (#ffffff) çevrildi, üç fazda da geçiyor (4.62/5.34/6.1).
      `clip-path` + `box-shadow` birlikte kullanımı (`.btn`) incelendi:
      `clip-path` tüm box-shadow'u da polygon şekline kırpıyor, bu muhtemelen
      istenen "beveled glow" görünümü ama gerçek tarayıcıda gölgenin köşelerde
      ne kadar "kesik" durduğu görsel olarak kontrol edilmeli.
- [ ] **Gerçek tarayıcıda görsel doğrulama** (deploy sonrası, kullanıcı) —
      yukarıdaki bulgu dahil, hover/focus renkleri ve genel render.

## FAZ 5 — Çekirdek İnce İşçilik (kalanlar)

- [x] **Z-Ekseni Ayrışması** — `.tilt` kartlarda (`bento-cell`,
      `testimonial-card`) ve `project-row`'da `transform-style: preserve-3d`
      + iç katmanlara (etiket/tırnak/ref-tag = yakın, içerik = uzak)
      hover'da `translateZ` ayrışması eklendi.
- [x] **Manyetik İmleç Çekimi** — `.magnetic` artık sadece üzerine gelince
      değil, 90px'lik bir yakınlık yarıçapı içinde mesafeyle orantılı
      çekiliyor (document-level mousemove + rAF). Footer CTA linklerine de
      `.magnetic` eklendi. Nav linklerine dokunulmadı (ayrı bir proximity-fade
      sistemleri var, çakışmasın diye).
- [x] **Mekanik Akordeon** — proje satırları artık `<button>` başlık +
      `grid-template-rows: 0fr→1fr` tekniğiyle satır arası açılan detay
      paneli. **Not:** projeler bölümünde henüz gerçek içerik/görsel yok
      (hepsi "Yakında" placeholder'ı), bu yüzden detay paneli de placeholder
      metinle geldi — gerçek proje eklenince aynı yapı (`.project-row-head` +
      `.project-detail-wrap`, `id`/`aria-controls` eşleşmesi) korunarak
      içerik doldurulmalı.
- [x] **Kademeli Tipografi** — 8 ana bölüm başlığına (`.heading-ref`)
      REF.01–REF.08 mono referans kodları eklendi. `kinetic-heading` harf
      bölme JS'i bu yeni span'ı harflere bölmesin diye ayrıca düzeltildi.
- [x] **Zarif Şifreleme** — hero decrypt fonksiyonu (`uznScramble`) paylaşılan
      bir yardımcıya çıkarıldı; proje detay paneli ilk açıldığında aynı efekt
      ~0.5sn'lik metin decrypt'i olarak tetikleniyor. **Not:** madde aslen
      "proje görsellerinde" diyordu ama henüz proje görseli yok — şimdilik
      metne uygulandı, gerçek proje görselleri eklenince aynı efektin
      görsellere (ör. bir pikselasyon/gürültü wipe'ı olarak) taşınması ayrı
      bir iş.

## FAZ 5.x — JARVIS / HUD Efektleri

- [x] **B — Scroll'a göre atmosfer kayması**: `main > section[id]` bazlı
      `IntersectionObserver`, aktif bölüme göre `body[data-phase]` set ediyor
      (dark/navy/light). Tüm zemin/çizgi/metin/vurgu renkleri `@property` ile
      animatable color kaydedildi, geçiş JS'siz, tarayıcı interpolasyonuyla
      yumuşak. Perdeler: hero+güncellemeler=siyah, hizmetler/hakkımda/
      projeler=lacivert, referanslar/sss/iletişim=beyaz (metin de otomatik
      koyuya dönüyor, `.stat-band-card`'daki mantığın aynısı). Footer'a
      dokunulmadı, o zaten sabit koyu lacivert bant.
- [x] **C — Kademeli (stagger) içerik belirmesi**: mevcut grup stagger'ının
      (kart/liste) yanına, section başına düşen solo elemanlar (eyebrow/
      başlık/not) için de DOM sırasına göre ~90ms aralıklı gecikme eklendi.
- [x] **A — Açılış (boot-up) sekansı**: ilk ziyarette (`sessionStorage`,
      sekme kapanınca sıfırlanır) ~1.4sn'lik tam sayfa katman — 4 köşe
      braketi + 3 mono sistem satırı + mevcut `scan-line` sweep'i, sonra
      kayboluyor. `prefers-reduced-motion`'da hiç çalışmıyor. **Bilinen sınır:**
      overlay tamamen JS ile ekleniyor (HTML'e gömülü değil), bu yüzden çok
      yavaş cihazda gerçek içeriğin bir kare için görünüp sonra kararması
      ihtimali var — tamamen önlemek için overlay markup'ının 3 HTML dosyasına
      da inline olarak eklenmesi gerekir (henüz yapılmadı).

---

## FAZ 6 — İkincil Katman

**Not (v2 kaybı):** Bu 20 maddenin ayrıntılı tarifleri v2 sürümünde duruyordu,
elde değil — bu yüzden her madde, mevcut sitenin JARVIS/HUD diline (mono
referans kodları, `body[data-phase]` atmosfer sistemi, sensor-fade, magnetic
vb.) uygun şekilde **yeniden yorumlanarak** uygulanıyor. Her grupta bu
yorumun ne anlama geldiği kısaca not düşülüyor.

Uygulama sırası, token/zaman riskini azaltmak için **en küçük kapsamdan en
büyüğe**: Grup B → Grup A → Grup E → Grup D → Grup C.
(B=Tipografi/Grid, A=Yüzey/Derinlik, E=Etkileşim, D=Atmosfer/Hareket, C=HUD/Veri)

### Grup B — Tipografi & Grid ✅ tamamlandı

- [x] **Akıllı Tipografik Hiyerarşi** — dağınık sabit `rem` değerleri yerine
      `:root`'ta tek bir akışkan ölçek (`--fs-h2` + `--ls-display/--ls-label`
      token'ları). Genel `h1,h2,h3` kuralı ve global `h2` boyutu bu token'lara
      bağlandı; bileşene özel başlık boyutları (kart başlıkları vb.)
      dokunulmadı. Ayrıca `text-wrap: balance` (başlıklar) ve
      `text-wrap: pretty` (paragraflar) eklendi — desteklenmeyen tarayıcıda
      sessizce yok sayılır.
- [x] **Görünmez Sütunlar** — `main`'in gerçek içerik kutusuna (1240px/64px)
      hizalanan 12 sütunluk bir ızgara artık **gerçekten var** ama normalde
      hiç görünmüyor (`opacity:0`, `body::after`, HTML'e dokunmadan). **Alt+G**
      kısayoluyla açılıp kapanabiliyor (kısa bir HUD bildirimiyle), input/
      textarea odaktayken kısayol pasif. Tasarım/QA amaçlı bir "gizli" araç.
- [x] **Sessiz Kılavuzlar** — her bölüm (`main > section[id]`) ekrana ilk
      girdiğinde üst/alt kenarında kısa bir çizgi bir kez "yanıp sönüyor"
      (ölçüm anı hissi), ~550ms sonra kalıcı ama neredeyse görünmez (~%4.5
      opaklık) bir ize dönüşüyor. Sadece ilk girişte tetiklenir, tekrar
      etmez — "sessiz" kalması bilinçli bir tercih.
      **Bilinen sınır:** kenar çizgileri `left/right: -64px` ile main
      padding'ini "kanıyor" — çok dar custom container'ı olan (varsayılan
      dışı) sayfalarda hizası tekrar kontrol edilmeli.

### Grup A — Yüzey & Derinlik ✅ tamamlandı

- [x] **İnce İşlenmiş Derinlik** — tek düz gölge kuralı yerine `:root`'ta
      3 kademeli `--elev-1/2/3` token seti (dinlenen kart / yüzen panel /
      üst katman overlay). `skill-badge`, `testimonial-card`, form alanları,
      `bento-cell` → elev-1; `quick-tiles`, `mini-terminal` → elev-2;
      `cmdk-panel`, `mobile-nav` → elev-3 (ikisi de öncesinde gölgesizdi).
      Görsel değer aynı kaldığı için mevcut hiçbir yüzeyin görünümü
      kırılmadı, sadece tek yerden yönetilir hale geldi.
- [x] **Buzlu Cam** — sitede zaten `mini-terminal` ve `cmdk-overlay`'de
      vardı; `quick-tiles`, `telemetry-strip` ve `mobile-nav`'a da taşındı
      (`@supports` korumalı, `backdrop-filter` yoksa eski opak zemin
      renkleri hiç değişmeden kalıyor).
- [x] **Gölge İskelet** — genel amaçlı `.img-skeleton` sınıfı: shimmer
      placeholder, görsel yüklenince (`load`/`error`, app.js) otomatik
      kapanıyor. Şu an sitedeki tek gerçek `<img>` (about-photo) bu sınıfı
      taşıyor; ileride eklenecek proje görselleri de aynı sınıfı alması
      yeterli — ekstra iş gerekmez.
- [x] **Keskin Alüminyum Kenarlar** — FAZ 5.0'daki geometrik "Şevli
      Köşeler"den farklı olarak, malzeme/ışık odaklı: `bento-cell`,
      `mini-terminal`, `cmdk-panel`, `mobile-nav` üst kenarında ortadan
      parlayan ince (2px) bir gradyan çizgi, varsayılanda soluk,
      hover/açık durumda netleşiyor.

### Grup E — Etkileşim Geri Bildirimi ✅ tamamlandı

- [x] **Mikro-Sismik Geri Bildirim** — `.btn`, `.project-row-head`,
      `.quick-tile`, `.footer-action` tıklandığında ~350ms'lik çok küçük
      (±1.5px) çok eksenli bir titreşim (bir sismografın iğnesi gibi).
      Delegated tek `click` dinleyicisi, `animationend`'de class'ı
      temizliyor; form gönderimine/gerçek navigasyona müdahale etmiyor,
      salt görsel.
- [x] **Keskin Dönüşlü Yollar** — nav linkleri ve 404 sayfasındaki hızlı
      bağlantılarda düz kayan çizgi yerine `steps()` timing ile "adım adım"
      çizilen bir yatay iz + sağ uçtan inen kısa bir dikey çentik — bir PCB
      izinin L dönüşü gibi, hep dik açı, hiç eğri yok.
- [x] **Ses Dalgaları** — footer'daki "Hemen Ara" (tel:) linkine 4 barlık
      minik bir eşitleyici eklendi (telefon → ses, en doğrudan eşleşme);
      varsayılanda sabit/soluk, hover/focus'ta sırayla zıplıyor. 3 sayfada
      da aynı tek linke `<span class="wave-bars">` eklendi.

### Grup D — Atmosfer & Hareket (sürüyor)

- [x] **Fosforlu Mürekkep Etkisi** — yorumu: sade renk-hover'lı metin
      linklerinde (`footer-col a`, `footer-top-link`, `footer-bottom-left a`,
      `telemetry-item`) hover'da hızlı "yanma" (0.12s, accent rengi + hafif
      glow) ama mouse çekilince yavaş "sönme" (1.6s) — fosforlu mürekkebin
      ışığı emip yavaşça bırakması gibi. Saf CSS: base kuralda yavaş
      transition, `:hover` kuralında hızlı transition (asimetrik geçiş),
      JS gerekmedi. `prefers-reduced-motion`'da glow hiç uygulanmıyor,
      geçiş anlık renk değişimine düşüyor. Nav linkleri (proximity-fade),
      error-links (PCB iz efekti) ve butonlar (mikro-sismik) bu efektin
      kapsamı dışında tutuldu — zaten kendi hover dillerine sahipler.
- [x] **Parallax Yıldız Tozu** — yorumu: yeni bir parçacık motoru kurulmadı,
      EK-5'te zaten var olan `--depth-y-near/--depth-y-far` scroll parallax
      değişkenlerine `calc()` ile ölçeklenerek "biniyor". İki derinlik
      kademeli (near/far), sabit ama elle seçilmiş nokta konumları, tek
      nefes alan (senkron) bir twinkle opaklık animasyonu. Mobilde
      (≤700px) kapalı, `prefers-reduced-motion`'da hareket durur ama toz
      görünür kalır.
- [x] **Kesik Çizgili Yörüngeler** — yorumu: EK-2'deki (sabit, düz çizgili)
      merkezi halkadan ve about-photo'daki dönen kesik halkadan farklı:
      iki eşmerkezli kesik çizgili halka, kendisi dönmüyor, sadece
      `stroke-dashoffset` akıtılarak üzerindeki kesikler "veri akışı" gibi
      kayıyor — PCB izi diliyle tutarlı, daha sakin bir hareket.
- [x] **Ortam Halesi** — yorumu: imleç takibi değil (o rol zaten
      `.magnetic`/sensor-fade'de), sayfanın kendi "nefes alan" ışığı:
      bulanık, yavaşça sürüklenen tek bir ışık lekesi, rengi
      `--accent-2-dim` faz değişkenine bağlı olduğu için dark/navy/light
      geçişlerinde otomatik uyum sağlıyor.
- [x] **Holografik Projeksiyon** — yorumu: sitedeki tek gerçek görsele
      (about-photo) uygulandı — hover/focus'ta ince tarama çizgileri +
      kısa "sinyal kaybı" flicker'ı, `mix-blend-mode: screen` ile
      boyamadan biniyor. HTML değişikliği gerekmedi, salt CSS.
      **Not:** ileride eklenecek proje görsellerine de aynı hover dili
      (`.about-photo-wrap::after` deseni) taşınabilir, ayrı bir iş.

Grup D tamamlandı. **Bilinen sınır:** 4 yeni katman da (`stardust-field`,
`orbit-field`, `ambient-halo`) diğer HUD katmanları gibi `position: fixed`
+ `z-index: 1`; kod seviyesinde önceki katmanlarla aynı yığılma düzenini
izliyor ama gerçek tarayıcıda üst üste binme / performans (özellikle
düşük güçlü mobil, blur filtreleri) görsel olarak doğrulanmalı.

### Grup C — HUD & Veri ✅ tamamlandı
- [x] **Şeffaf Veri Katmanları** — yorumu: gerçek veri yok, sahte ama
      inandırıcı iki satırlık "sensör okuması" içeren camsı (Grup A buzlu
      cam token'larıyla tutarlı) küçük paneller. İki satır aynı hücrede
      üst üste durup CSS ile karşılıklı fade yapıyor — "veri tazeleniyormuş"
      hissi tamamen CSS, JS gerekmedi.
- [x] **Vektörel Kesişim Düğümleri** — yorumu: hud-ambient'teki yumuşak
      sürekli nabız atan yuvarlak düğümlerle karıştırılmasın diye bilinçli
      olarak farklı bir dil: köşeli "+" işaretli, çoğu zaman sönük, çok
      seyrek (uzun döngü) kısa bir "spark" veren düğümler.
- [x] **Osiloskop Doğrulama** — yorumu: `.badge-wave`'den (skill-badge
      hover dalgası, önceden var olan ayrı bir efekt) farklı olarak,
      "doğrulama" kelimesi birebir alındı: iletişim formunda bir alan
      geçerli olduğunda (`:valid`) altında osiloskop izi çiziliyor
      (`stroke-dashoffset`), saf CSS.
- [x] **Terminal Onay Geri Bildirimi** — yorumu: mini-terminal'in
      (hakkımda bölümü) yazı dili forma taşındı. Submit anında gerçek
      gönderim ~900ms ertelenip yerine kısa bir log dizisi "yazılıyor",
      sonra native `form.submit()` ile devam ediyor (submit event tekrar
      tetiklenmiyor, sonsuz döngü riski yok). `prefers-reduced-motion`'da
      veya JS hata verirse hiç araya girmeden normal gönderime düşer.
- [x] **Bağlantı Ping Testi** — yorumu: header telemetry şeridindeki
      (telefon/e-posta/konum) her satıra küçük bir durum noktası eklendi;
      sürekli açık bir LED değil — kısa bir "ping" gönderip yanıt alan,
      sonra sönen bir döngü, 3 öğe farklı gecikmeyle (senkron olmasın diye).
- [x] **Tolerans Etiketi** — yorumu: "mekanik hassasiyet" markasına
      gönderme — Mühendislik & CAD bento hücresinin köşesinde duran,
      teknik resim tolerans kutucuğu formatında (⌀12 H7 ±0.018) küçük bir
      mono damga. Dekoratif, sadece bu tek hücrede.

**Bilinen sınır:** Terminal Onay Geri Bildirimi `form.checkValidity()`'ye
güveniyor — tarayıcı gerçek doğrulamayı geçirmezse (ör. gerekli alan boş)
JS araya girmiyor, tarayıcı kendi native uyarısını gösteriyor; bu doğru
davranış ama gerçek tarayıcıda (özellikle Safari'nin native validation
UI'ı) görsel olarak bir kez kontrol edilmeli. Ayrıca Formspree action'ı
hâlâ placeholder (`XXXXXXX`) — gerçek endpoint bağlanmadan form submit
akışı uçtan uca test edilemez.

---

Bu sürümdeki tüm planlı maddeler (FAZ 5, FAZ 5.x, FAZ 6 Grup A/B/C/D/E)
tamamlandı. Kalan iş: yukarıdaki "Bilinen sınır" notları + gerçek proje
içeriği eklendiğinde FAZ 5'teki placeholder notlarının (Mekanik Akordeon,
Zarif Şifreleme) güncellenmesi. Yeni bir yol haritası olmadan sırada
planlı madde yok.

---

Son güncelleme: 05 Ağustos 2026 (FAZ 6 / Grup C tamamlandı — planlı tüm maddeler bitti)
