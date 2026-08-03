# UZN TECH — "Kutulardan Kurtulma" Tasarım Yol Haritası

40 fikirlik beyin fırtınasından süzülen, **iş hedefine (proje/iş almaya) zarar vermeyen** ve teknik
kimliğinizi (mekatronik + siber güvenlik) güçlendiren maddeler aşağıda. Fazlar sırayla uygulanmalı —
her faz bir öncekinin üzerine güvenle inşa edilir. Tamamlanan maddeyi `[x]` yaparak işaretleyin.

---

## FAZ 1 — Temel: Kutuları Görünmez Kıl (düşük risk, hızlı, temel taşı)

- [x] **Görünmez Kapsayıcılar** — kart arka planı/border'ını kaldır, sadece hizalamayla tut
      (önce `duyuru-grid` üzerinde pilot uygula, iyi durursa `service-tile`, `update-grid`'e yay)
- [x] **Milimetrik Blueprint Grid** — arka planda ince, teknik çizim hissi veren hizalama çizgileri
      (Lazer İzdüşümleri fikriyle birleşti — aynı uygulama)
- [x] **Osiloskop Dalga Geçişleri** — mevcut `section-wave` / `stat-band-wave` SVG dalgalarını
      osiloskop dalga formuna çevir (izole, düşük riskli değişiklik)
- [x] **Sürekli Bant (credentials-strip)** — "Bahçeşehir · Denizbank · YetGen · Zirve 23 · Elite Case"
      şeridini yavaş, sonsuz kayan bir bant haline getir

## FAZ 2 — İmza Değişiklik: Ağ Topolojisi (en yüksek etki, en büyük efor)

- [x] **Şematik Bağlantılar + Ağ Topolojisi Haritası** — "Yetkinlik Alanları" bölümünü kutulardan
      çıkarıp `hud-ambient` düğümleriyle bütünleşen, birbirine ince çizgilerle bağlı düğüm haritasına
      çevir. Bir düğüme tıklayınca kutu açılmadan, düğüm genişleyerek içeriği göstersin.
      *(Bu, 40 fikir içindeki en güçlü ve en ayırt edici değişiklik — tek başına bir faz.)*

## FAZ 3 — Derinlik ve Mikro-etkileşim (mevcut sistemleri zenginleştirme)

- [x] **Z-Derinlik Parallaks** — tek hızlı `--bg-scroll-y` yerine üç kademeli hız:
      `--depth-y-near` (hud-ambient düğümleri, en hızlı), `--depth-y-mid` (circuit-bg),
      `--depth-y-far` (grid-overlay + merkezi yörünge halkası, en yavaş). `prefers-reduced-motion`
      ve `hover:none` durumlarında JS zaten çalışmıyor, katmanlar hareketsiz kalıyor.
- [x] **Sensör Tetikleyicileri (Proximity Fade)** — `cursor-spotlight`'ın imleç konumu artık
      `documentElement` üzerinde de yayınlanıyor; yeni `.sensor-fade` sınıfı sadece ikincil/dekoratif
      metinlere (hud-telemetry etiketleri, nav `.ref` kodları) uygulandı — ana içerik metinlerine
      dokunulmadı. İmleç yaklaştıkça `--proximity` (0-1) ile opaklık artıyor.
- [x] **Görünmez Mıknatıs Noktaları** — Faz 1'de kutusu kaldırılan serbest bloklar (`duyuru-card`,
      `service-tile`, `update-card`) artık `.magnet-settle` taşıyor; ekrana girerken en yakın
      `hud-node`'a doğru 2-5px'lik küçük bir çekimle "oturuyor". JS çalışmazsa (`.magnet-armed`
      hiç eklenmediği için) içerik normal, tam opak görünür — no-JS fallback güvenli.

## FAZ 4 — İsteğe Bağlı Süslemeler (bütçe kalırsa, dikkatli/az dozda)

- [x] **Kısmi Şifre Çözülme Efekti** — sadece hero başlığında, var olan `boot-line` efektinin
      genişletilmiş hali (tüm sitede DEĞİL — sadece ilk açılış anı). `SYSTEM_BOOT` satırı bitince
      `uzn:boot-complete` event'i tetikleniyor, hero `<h1>` içindeki `.decrypt-line` span'ları
      (`Mekanik hassasiyet.` / `Yazılım zekâsı.`) sırayla kısa bir karışık-karakter → doğru-metin
      efektiyle netleşiyor. Metin HTML'de baştan doğru duruyor (JS sadece geçici görsel karıştırma
      yapıyor), `prefers-reduced-motion` ve no-JS durumunda hiçbir şey değişmiyor. Ekran okuyucular
      için `.visually-hidden` span'da orijinal metin saklı, animasyonlu kopya `aria-hidden`.
- [x] **Kinetik Tipografi İskeleti** — "Yetkinlik Alanları" ve "Seçili Çalışmalar" başlıklarında
      (`.kinetic-heading`), büyük/aralıklı harfler yapısal ayraç gibi kullanıldı; açıklama
      metinlerine dokunulmadı. Harfler `hud-node` mıknatıs mantığıyla aynı IntersectionObserver
      desenini kullanarak sayfaya girerken hafifçe "yerine oturuyor". JS'siz veya
      `prefers-reduced-motion` durumunda harfler bölünse de armed class hiç eklenmiyor, başlık
      sadece CSS ile büyütülmüş/aralıklı normal metin olarak kalıyor — no-JS fallback güvenli.
      Erişilebilirlik için orijinal metin `.visually-hidden` span'da, harf span'ları `aria-hidden`.

---

## Uygulamayacağımız fikirler (ve neden)

Bulunabilirliği, mobil kullanımı veya ilk izlenimi riske atan, iş hedefine zarar veren fikirler:

CLI dizin ağacı navigasyonu · Sıfır Alan (negative space dominance) · Fizik motorlu / yerçekimli metin ·
Fisheye mercek · Parçacık dağılımı (particle swarm) · Tam gizli hover-only içerik · Koordinat sistemi
navigasyonu · Patlatılmış perspektif (exploded view) · Tersine mühendislik (kaostan sadeliğe) ·
Yatay-only scroll · Free-roam canvas · Sinematik pan-only scroll · Liquid accordion · Infinite tape ·
Holografik glitch metin · Kayan veri şeridi (data cascade, credentials-strip dışında) ·
İçi içe geçen çarklar (curved text — okunabilirlik sorunu)

**Ortak gerekçe:** Bu bir sanat enstalasyonu değil, iş/proje getirmesi gereken bir mühendislik sitesi.
Ziyaretçi 5-10 saniyede "ne yapıyor, nasıl ulaşırım" sorusuna cevap bulamazsa siteden çıkar.

---

## İlerleme Notu
_Bu dosyayı güncelleyerek hangi fazda olduğumuzu takip edebiliriz. Her faz bitince kısa bir
"öncesi/sonrası" ekran görüntüsü alıp burada referans olarak tutmak faydalı olur._

Son güncelleme: 02 Ağustos 2026 (Faz 4 + faz sonrası iyileştirmeler + kod temizliği tamamlandı)

## Faz sonrası küçük iyileştirmeler (kullanıcı geri bildirimi üzerine)

- [x] **Renk teması — grafit + bakır** — mevcut mavi paletten "grafit zemin +
      bakır/bronz accent" temasına geçildi (4 palet önerisi arasından seçildi).
      `:root` değişkenleri güncellendi; ayrıca sitede 77 yerde doğrudan gömülü
      eski mavi hex/rgba değeri vardı (SVG data-URI'ler, stat-band gradient'i,
      gölgeler) — hepsi bulunup çevrildi. Bilinçli olarak dokunulmayanlar:
      terminal-pencere trafik ışığı noktaları ve "çevrimiçi" durum yeşili
      (semantik anlamları var, marka rengiyle ilgisiz). Ana buton metni beyazdan
      koyu bronza çevrildi (kontrast: ~3.9:1 → ~4.5:1). Piksel örneklemesiyle
      tarayıcıda doğrulandı.

## Diğer iyileştirmeler (kullanıcı geri bildirimi üzerine)

- [x] **Duyurular → "Daha Fazla" linki düzeltildi** — gerçek bir hedefi olmadığı için
      `#iletisim`'e rastgele yönlendiriyordu (geri bildirimdeki "bir yere tıklayınca
      aşağıya gidiyor" şikâyetinin kaynağıydı). Link kaldırıldı.
- [x] **Yukarı Dön butonu** — belli bir kaydırma mesafesinden sonra beliren, tek tıkla
      başa dönen sabit buton (`index.html`, `kvkk.html`). `prefers-reduced-motion`
      aktifse animasyonsuz anında zıplıyor.
- [x] **Yandan Hızlı Erişim rayı** — sadece geniş ekranlarda (≥980px) görünen, üst nav'a
      dönmeden bölümler arası atlamayı sağlayan sabit ray (`#sideRail`). Aktif bölüm
      IntersectionObserver ile otomatik işaretleniyor, dar ekranda gizleniyor (mobilde
      zaten hamburger menü var). JS/IntersectionObserver yoksa render edilmez, sayfa
      etkilenmez.
- [x] **Gerçek tarayıcıda doğrulama** — Playwright ile masaüstü (1440px) ve mobil
      (390px) genişliklerde, normal / `prefers-reduced-motion` / JS kapalı senaryolarında
      test edildi: hero decrypt efekti doğru metinle sonuçlanıyor, kinetik başlıklar
      mobilde satır kırılmasında sorun çıkarmıyor, no-JS'te tüm içerik normal ve doğru
      görünüyor, side-rail/back-to-top beklenen breakpoint'lerde açılıp kapanıyor.
- [x] **Kod temizliği** — proje boyunca birikmiş ölü kod tarandı ve kaldırıldı:
      - `style.css`'de HTML'de hiç kullanılmayan 8 class tamamen silindi: eski
        `.card-grid`/`.card`/`.card-ref`/`.card-list` (yorumda "legacy, kept
        for reference" yazan ama hiç referans edilmeyen kart grid'i),
        `.footer-address`, ve `.stat-strip`/`.stat-num`/`.stat-label`
        (Faz 1 öncesi basit istatistik şeridi — yerini `.stat-band` full-bleed
        versiyonu aldı, eskisi silinmeden kalmıştı). ~60 satır CSS azaldı.
      - Kullanılmayan `.feature-visual` referansı 3 ayrı grouped selector'dan
        çıkarıldı (o class'a sahip hiçbir eleman kalmamış, muhtemelen erken
        bir tasarım fikrinin izi).
      - style.css'in en başındaki güncelliğini yitirmiş "footer henüz koyu
        re-skin almadı, ADIM 4 sırada" notu silindi — Footer ADIM 4 zaten
        tamamlanmıştı, not kafa karıştırıyordu.
      - Kontrol: her iki dosyada da (`style.css`, `app.js`) kalan tüm
        class/id referansları HTML'de karşılık buluyor, tarayıcıda JS hatası
        yok, sayfa uçtan uca sorunsuz render ediyor.
