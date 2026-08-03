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

- [ ] **Piksel örneklemesiyle tarayıcıda doğrulama** — buton kontrastı,
      hover/focus renkleri ve `clip-path` + `box-shadow` birlikte render'ı
      gerçek tarayıcıda görsel olarak kontrol edilmeli (deploy sonrası).

## FAZ 5 — Çekirdek İnce İşçilik (kalanlar)

- [ ] **Z-Ekseni Ayrışması** — kart hover'ında katmanların Z ekseninde
      hafifçe ayrışması (mevcut `--depth-y-*` parallaks sisteminin hover hali).
- [ ] **Manyetik İmleç Çekimi** — buton/linklerin imleç yaklaşınca kendine
      çekmesi (`.magnet-settle` mantığının etkileşimli genişlemesi).
- [ ] **Mekanik Akordeon** — proje detayının yeni sayfa yerine satır arası
      milimetrik açılması.
- [ ] **Kademeli Tipografi** — büyük başlıkların yanına monospace referans
      kodları (`.ref` deseninin başlıklara genişlemesi).
- [ ] **Zarif Şifreleme** — hero'daki decrypt efektinin proje görsellerinde de
      (~0.5sn) tetiklenmesi.

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

## FAZ 6 — İkincil Katman (değişmedi, bekliyor)

- [ ] İnce İşlenmiş Derinlik, Akıllı Tipografik Hiyerarşi, Şeffaf Veri Katmanları,
      Görünmez Sütunlar, Sessiz Kılavuzlar, Mikro-Sismik Geri Bildirim, Vektörel
      Kesişim Düğümleri, Keskin Alüminyum Kenarlar, Gölge İskelet, Keskin Dönüşlü
      Yollar, Kesik Çizgili Yörüngeler, Parallax Yıldız Tozu, Ses Dalgaları,
      Holografik Projeksiyon, Buzlu Cam, Ortam Halesi, Fosforlu Mürekkep Etkisi,
      Terminal Onay Geri Bildirimi, Osiloskop Doğrulama, Tolerans Etiketi,
      Bağlantı Ping Testi.
      (Ayrıntılar önceki sürümde (v2) duruyor, kısaltıldı.)

---

Son güncelleme: 03 Ağustos 2026
