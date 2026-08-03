# UZN TECH — Yol Haritası (Faz 5+)

Site şu anki temel iskeletiyle (görünmez kapsayıcılar, blueprint grid, ağ topolojisi
haritası, z-derinlik parallaks, sensör tetikleyicileri, decrypt/kinetik tipografi)
sağlam bir noktada. Bu belge, o temelin üzerine **ince işçilik** ekleyen ve
**renk temasını değiştiren** bir sonraki aşamayı planlıyor. Aynı ilke geçerli:
iş hedefine (proje/iş almaya) zarar vermeyen, mobilde/ilk izlenimde okunabilirliği
bozmayan, mevcut sistemlerin doğal uzantısı olan maddeler önce; yenilikler sonra.

---

## FAZ 5.0 — Tema Geçişi: Siyah-Mavi (önce yapılmalı, her şeyin üzerine oturacak)

- [x] **Renk paleti — siyah + gece/elektrik mavisi**
      Turuncu-bakır paletten soğuk, yüksek kontrastlı bir siyah-mavi temaya
      geçildi. Uygulanan değerler (elitlik/kontrast gözetilerek seçildi, WCAG AA
      doğrulandı):
      - `--bg: #06070a` · `--bg-panel: #0e1117` · `--bg-panel-alt: #121620`
        (neredeyse saf siyah, hafif soğuk/mavi alt ton — "antrasit" değil,
        gerçek siyaha yakın)
      - `--accent: #3d6fe0` (gece/elektrik mavisi, ana vurgu)
      - `--accent-bright: #6a94f0` (hover/parlak durum)
      - `--accent-2: #2a4fb0` (koyu mavi, glow/gradient tabanı)
      - `--signal` / `--text: #e7eaf1` (soğuk kırık beyaz)
      - Buton metni: **beyazdan siyaha çevrildi** — `.btn-primary` artık `color: #000000`
        kullanıyor. Not: önce sitenin zemin tonu `var(--bg)` (`#06070a`) denendi, ama
        accent (`#3d6fe0`) üzerinde kontrastı yalnızca ~4.36:1 çıkıyor ve AA sınırının
        (4.5:1) altında kalıyor — bu yüzden saf siyaha (`#000000`) geçildi, oran ~4.55:1
        ve AA sınırını (dar farkla) geçiyor. `.btn-spark` tıklama efekti (yazı değil,
        dekoratif nokta) beyaz bırakıldı, kapsam dışı.
- [x] **Tarama ve tam geçiş** — `:root` değişkenlerinin yanı sıra, SVG data-URI'lerine
      gömülü hex değerler (`%23...`) ve `rgba()` olarak yazılmış glow/gölge renkleri
      tarandı ve çevrildi. Bu taramada ayrıca bir önceki (bakır→şampanya) geçişinde
      atlanmış 3 eski değer de (`stat-band` bölümünün kendi trace rengi `#c9853f` ve
      gradient uçları `#3e351f`/`#170f08`) yakalanıp düzeltildi.
- [x] **Footer'ın kendi lokal renk override'ı** (`--text`, `--signal` vb.) kontrol
      edildi ve sıcak tonlardan (`#ece7e0`, `#bdb0a0`, `#8f8275`) soğuk mavi-gri
      dengine (`#e7eaf1`, `#a9b4c9`, `#7684a0`) çevrildi.
- [ ] **Piksel örneklemesiyle tarayıcıda doğrulama** — özellikle buton kontrastı ve
      hover/focus renklerinin gerçek ekranda göründüğü gibi test edilmesi
      (bu adım henüz yapılmadı, deploy sonrası kontrol edilmeli).

---

## FAZ 5 — Çekirdek İnce İşçilik (mevcut sistemlerin doğrudan uzantısı, düşük risk)

- [ ] **Z-Ekseni Ayrışması** — proje/hizmet kartlarının üzerine gelindiğinde
      büyümek yerine, katmanların (metin/arka plan/görsel) birbirinden hafifçe
      Z ekseninde ayrışması. Mevcut `--depth-y-*` parallaks sisteminin hover'a
      taşınmış hali.
- [ ] **Manyetik İmleç Çekimi** — butonlar/linkler imleç yaklaştığında hafifçe
      kendine çeker. Mevcut `.magnet-settle` mantığının etkileşimli genişlemesi.
- [ ] **Mekanik Akordeon** — proje detayına tıklanınca yeni sayfaya gitmek yerine,
      içerik satır arasında milimetrik bir hareketle aşağı açılır.
- [x] **Ağ Düğümü Ayırıcılar** — bölüm ayırıcı düz çizgiler yerine, üzerinde
      1-2 parlak nokta olan, `hud-ambient` diliyle uyumlu ince kılavuzlar.
      Uygulandı: `.timeline-row`, `.faq-item` ve mobil `.topology-node`
      ayırıcılarına, `hud-node-pulse` animasyonunu paylaşan küçük bir nokta
      (`::before`/`::after`) eklendi. Saf CSS, HTML değişikliği yok.
- [x] **Şevli Köşeler** — buton/etiket/form gibi kalan az sayıdaki kapalı yüzeyde,
      yuvarlak köşe yerine 45°'lik keskin kesim.
      Uygulandı: `.btn` artık `border-radius:0` + `clip-path` ile 45° kesik
      köşeli. Kapsam şimdilik yalnızca butonlarla sınırlı; etiket/form
      alanları (varsa) ayrı bir adımda ele alınacak. **Doğrulanmadı:** bazı
      tarayıcılarda `box-shadow`'un `clip-path` ile birlikte nasıl
      render edildiği tarayıcıda görsel olarak kontrol edilmeli (aşağıdaki
      FAZ 5.0 piksel doğrulama maddesiyle birleşti).
- [ ] **Kademeli Tipografi** — büyük başlıkların sol üstüne bitişik, monospace
      referans kodları (nav'daki `.ref` deseninin başlıklara genişlemesi).
- [ ] **Zarif Şifreleme** — hero'daki decrypt efektinin, proje görselleri ilk
      ekrana girdiğinde de (çok kısa, 0.5sn) tetiklenmesi.
- [x] **Hedefleme Braketi** — klavyeyle gezinirken (`:focus-visible`), mevcut
      `hud-brackets` köşe motifinin küçültülmüş hali odaklanan elemanın etrafında
      belirir. Yeni görsel dil icat etmiyor, saf erişilebilirlik + marka tutarlılığı.
      Uygulandı: `a, button, input, textarea, select, summary` için ortak
      `:focus-visible` kuralı, 4 köşede küçük braket çizen `background`
      gradyanlarıyla (gerçek `<svg>` köşelerin CSS-only taklidi). `.btn`'in
      `overflow:hidden`'ı odaklanınca `visible`'a alındı ki braketler
      kesilmesin. **Doğrulanmadı:** gerçek klavye gezintisiyle görsel kontrol
      gerekiyor.
- [x] **Sinyal LED'i** — side-rail'deki aktif bölüm noktası, zaten tanımlı
      `hud-node` pulse animasyonuyla küçük bir "yanan LED" gibi gösterilir.
      Uygulandı: `.side-rail a.is-active .side-rail-dot` için ayrı, box-shadow
      yoğunluğunu nefes aldıran bir `side-rail-led-pulse` animasyonu eklendi
      (mevcut `hud-node-pulse` doğrudan kullanılmadı çünkü onun opacity 0.15'e
      düşen kısmı, zaten dolu/aktif noktanın solid rengini bozardı).

---

## FAZ 6 — İkincil Katman (Faz 5 oturduktan sonra, tek tek pilot edilerek eklenecek)

- [ ] İnce İşlenmiş Derinlik (1px iç parlama, tıklanabilir alanlarda)
- [ ] Akıllı Tipografik Hiyerarşi (hover'da renk yerine font ağırlığı artışı)
- [ ] Şeffaf Veri Katmanları (buzlu cam tooltip)
- [ ] Görünmez Sütunlar (metni görünmez dikey sütunlara hapsetmek)
- [ ] Sessiz Kılavuzlar / Milimetrik Cetvel Kenarları (ekran kenarında soluk çentikler — tek madde olarak birleştirildi)
- [ ] Mikro-Sismik Geri Bildirim (kritik tıklamada 1-2px'lik anlık hareket)
- [ ] Vektörel Kesişim Düğümleri (grid hizalama noktalarında silik + işaretleri)
- [ ] Keskin Alüminyum Kenarlar (başlık yanında ince dikey referans çizgisi)
- [ ] Gölge İskelet (şeffaf zemin + keskin gölge)
- [ ] Keskin Dönüşlü Yollar (dekoratif bağlantı çizgilerinin 90°/45° karakteri)
- [ ] Kesik Çizgili Yörüngeler (proje görseli etrafında hedef kilitleme çizgisi)
- [ ] Parallax Yıldız Tozu (arka planda çok yavaş süzülen ikincil katman)
- [ ] Ses Dalgaları / Spektrogram (hakkımda/iletişim metni yanında ince çizgiler)
- [ ] Holografik Projeksiyon (anahtar kelime altında hafif scan-line ışığı)
- [ ] Buzlu Cam (odak dışı içeriğin üzerini örten yarı saydam katman)
- [ ] Ortam Halesi (odaklanılan içeriğin arkasında hafif ışık sızıntısı — yeni mavi paletle uyumlu tonda)
- [ ] Fosforlu Mürekkep Etkisi (yeni beliren metnin kısa süre daha parlak olup sönmesi)
- [ ] Terminal Onay Geri Bildirimi (e-posta/telefon kopyalanınca `>_ Kopyalandı` etiketi)
- [ ] Osiloskop Doğrulama (form validasyonunda kırmızı hata yerine dalga motifi)
- [ ] Tolerans Etiketi (hizmet/yetkinlik etiketleri yanında dekoratif "±0.02" notasyonu)
- [ ] Bağlantı Ping Testi (sosyal ikon hover'ında kısa "doğrulanıyor" mikro-animasyonu)

---

## İlerleme Notu

Bu belge Faz 5'ten itibaren başlıyor; önceki fazların (1-4) tamamlanmış kayıtları
projenin geçmiş sürüm geçmişinde/commit loglarında duruyor, burada tekrar
edilmedi. Her madde tamamlandığında `[x]` yapılarak işaretlenmeli.

Son güncelleme: 03 Ağustos 2026
