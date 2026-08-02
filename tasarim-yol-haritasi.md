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

- [ ] **Şematik Bağlantılar + Ağ Topolojisi Haritası** — "Yetkinlik Alanları" bölümünü kutulardan
      çıkarıp `hud-ambient` düğümleriyle bütünleşen, birbirine ince çizgilerle bağlı düğüm haritasına
      çevir. Bir düğüme tıklayınca kutu açılmadan, düğüm genişleyerek içeriği göstersin.
      *(Bu, 40 fikir içindeki en güçlü ve en ayırt edici değişiklik — tek başına bir faz.)*

## FAZ 3 — Derinlik ve Mikro-etkileşim (mevcut sistemleri zenginleştirme)

- [ ] **Z-Derinlik Parallaks** — var olan `parallax-box` / scroll parallax'ı derinlik katmanlarıyla
      zenginleştir (Kademeli Parallaks fikri)
- [ ] **Sensör Tetikleyicileri (Proximity Fade)** — var olan `cursor-spotlight`'ı, fareye yakın
      metinlerin opaklığını artıracak şekilde genişlet
- [ ] **Görünmez Mıknatıs Noktaları** — scroll sırasında serbest metin blokları `hud-ambient`
      düğümlerine hafifçe "oturur" gibi hizalansın

## FAZ 4 — İsteğe Bağlı Süslemeler (bütçe kalırsa, dikkatli/az dozda)

- [ ] **Kısmi Şifre Çözülme Efekti** — sadece hero başlığında, var olan `boot-line` efektinin
      genişletilmiş hali (tüm sitede DEĞİL — sadece ilk açılış anı)
- [ ] **Kinetik Tipografi İskeleti** — 1-2 bölüm başlığında (ör. "MEKATRONİK") büyük harfleri
      yapısal ayraç olarak dene, açıklama metinlerinde asla kullanma

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

Son güncelleme: 02 Ağustos 2026
