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

## FAZ 5.x — JARVIS / HUD Efektleri (yeni yön)

Sıralama önemli: B, C'nin ve gelecekteki renk geçişlerinin altyapısını
(`IntersectionObserver`) paylaşıyor — önce B, sonra C, en son A önerilir
(A en gösterişli ama iş mantığına en az bağlı, bu yüzden en güvenle sona bırakılır).

- [ ] **B — Scroll'a göre atmosfer kayması**: `IntersectionObserver` ile aktif
      bölüm (Hakkımda/Hizmetler/Projeler/İletişim) tespit edilir; `--accent`
      ve glow tonları bölümden bölüme yumuşak transition ile kayar. Ana metin
      rengi (`--text` vb.) sabit kalır — sadece vurgu/HUD katmanı değişir.
- [ ] **C — Kademeli (stagger) içerik belirmesi**: mevcut `.reveal` sistemine
      gecikme eklenir; bir bölüm görünür olduğunda içindeki elemanlar sırayla
      (~70-100ms arayla) belirir. Uzun paragraflarda kelime değil, blok/satır
      bazında gecikme (okumayı yormamak için).
- [ ] **A — Açılış (boot-up) sekansı**: ilk ziyarette ~1-1.5sn'lik "sistem
      başlatılıyor" sekansı (mono-font sistem satırları + `hud-brackets`
      köşelerin oturması + tarama çizgisi), ardından içerik açığa çıkar.
      `sessionStorage` ile tekrar oynatılmaz; `prefers-reduced-motion`'da
      tamamen atlanır.

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
