# UZN TECH — Yol Haritası (v7)

Bu belge v6'nın yerine geçer. v6'daki **FAZ 12'nin tamamı (12.1–12.8)
tamamlandı** — aşağıda her madde nerede/nasıl yapıldığıyla birlikte
listeleniyor. v7'nin geri kalanı, bu turda kod incelenirken görülen ama
kapsam dışı bırakılan açık uçlar üzerinden önerilen **FAZ 13 aday
listesi**.

---

## FAZ 12 — Tamamlandı ✅

### 12.1 — Scroll'a bağlı renk geçişi kaldırıldı
`app.js`'teki interpolasyon IIFE'sinin başına `return;` eklendi, kod
silinmedi. Sayfa artık sabit **dark** temada. `style.css`'teki
`data-phase` kuralları dokunulmadan duruyor (kullanılmıyor, zararsız).

### 12.2 — Track filtresi → gerçek yönlendirme
Eşleşmeyen kartlar zaten `display:none` ile gizleniyordu (soluklaşma
yoktu, bu kısım zaten istenen haldeymiş). Eklenen: track seçilince
otomatik olarak Hizmetler'e smooth-scroll (`prefers-reduced-motion`
saygılı); "Tümünü göster" metin butonu küçük yuvarlak bir **"×"**
butonuna dönüştürüldü (`app.js` track-select IIFE, `style.css`
`.track-reset`).

### 12.3 — Örnek/demo projeler eklendi
3 boş "Yakında" kartı, `data-track` etiketli ve **açıkça "Demo"
etiketli** (`.project-tag-demo`, `is-demo-project` class'ı) 3 gerçekçi
örnek projeyle değiştirildi (yazılım/mekanik/siber birer tane).
Kod içinde büyük uyarı yorumu: yayına almadan önce gerçek projelerle
değiştirilmeli.

### 12.4 — Yetkinlik Alanları (U1) zenginleştirildi
v3'ün eski hâli bu oturuma hiç yüklenmediği için birebir eski tasarıma
dönülemedi. Bunun yerine mevcut 4 düğümün (Mekatronik hub + Mekanik/
Yazılım/Siber) her birine **araç/teknoloji etiket satırı**
(`.tool-tags`) eklendi. Mini istatistik **eklenmedi** — elde
doğrulanmış bir rakam (proje sayısı, deneyim yılı vb.) olmadığından
uydurma bir sayı koymak yanıltıcı olurdu.
**Açık uçlu:** v3'ün ekran görüntüsü/dosyası paylaşılırsa bu bölüm ona
göre yeniden şekillendirilebilir (bkz. FAZ 13.1).

### 12.5 — Kişisel bilgiler ayrı sayfaya taşındı
Yeni `hakkimda.html` oluşturuldu (404.html ile aynı header/footer
iskeleti). Ana sayfadaki ~165 satırlık bölüm, foto + isim/rol + kısa
özet + "Devamını Oku →" linkine indirildi (`id="hakkimda"` korundu,
mevcut nav/side-rail/cmdk bağlantıları bozulmadı). `404.html`'deki
3 "Hakkımda" bağlantısı `hakkimda.html`'e güncellendi.

### 12.6 — Favicon üretildi
Mevcut nokta–çizgi–nokta logo amblemi baz alınarak `favicon.svg`
üretildi (renkler CSS değişkeni yerine sabit hex — favicon sayfa CSS
bağlamı dışında yüklendiği için `var()` çözümlenmiyordu, sekmedeki
boşluğun asıl sebebi muhtemelen buydu). Ayrıca referans verilip eksik
olan `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` de aynı
SVG'den üretildi.

### 12.7 — Footer hızlı işlemler hizalaması düzeltildi
`701px–1024px` için ara kırılma noktası eklendi (2 sütun); masaüstü
(4 sütun) ve mobil (1 sütun) davranışı korundu.

### 12.8 — Ağır HUD katmanları kapatıldı
Tek bir toggle bloğu eklendi (`body[data-hud="off"]`), köşe
parantezleri/grid-overlay/scan-line/telemetry/stardust/orbit/ambient-halo
katmanlarını gizliyor. `index.html` ve `404.html`'in `<body>`
etiketine `data-hud="off"` eklendi — silinmedi, geri açmak için
attribute kaldırılması yeterli. `.circuit-bg` dokunulmadı.

---

## FAZ 13 — Aday liste (henüz onaylanmadı)

Bu turda kod incelenirken fark edilen ama v6 kapsamının dışında kalan
açık uçlar. Hiçbiri uygulanmadı — hangileri istenirse onlarla devam
edilir.

### 13.1 — v3 referansıyla U1 (Yetkinlik Alanları) revizyonu
12.4'te not düşüldüğü gibi: v3'ün eski/daha dolu hâline ait bir ekran
görüntüsü ya da dosya paylaşılırsa, mevcut 4 düğüm ona birebir
referansla yeniden şekillendirilebilir.

### 13.2 — Eksik/placeholder harici varlıklar
Bu oturuma hiç yüklenmedi, yani mevcut durumları bilinmiyor (canlı
sitede olabilir de olmayabilir de):
- `assets/img/fatih-uzner.jpg` — Hakkımda fotoğrafı
- `assets/cv/Fatih-Uzner-CV.pdf` — "CV İndir" butonlarının hedefi
- `assets/icons/og-image.png` — sosyal medya paylaşım görseli (og:image)
- `kvkk.html` — footer'da ve iletişim formunda linklenen KVKK sayfası
- LinkedIn profili — `index.html`, `404.html`, `hakkimda.html`'de hâlâ
  `KULLANICI_ADIN` placeholder'ı ile duruyor (`<!-- TODO -->` yorumuyla
  işaretli)

### 13.3 — 404.html footer'ı index/hakkimda ile tutarsız
`hakkimda.html` oluşturulurken index.html'in daha güncel footer'ı
(WhatsApp butonu dahil 4 hızlı işlem) baz alındı. `404.html`'in
footer'ında hâlâ eski 3 işlemlik hâli var (WhatsApp yok). İstenirse
tek tip footer'a çekilebilir.

### 13.4 — 404.html / hakkimda.html nav numaralandırması
`404.html`'deki hızlı nav "U1/U3/U5/U8" etiketleri, `index.html`'in
gerçek bölüm numaralarıyla (U1 Hizmetler, U2 Hakkımda, U3 Projeler,
U4 SSS, U5 İletişim) örtüşmüyor — önceden beri var olan bir tutarsızlık,
bu turda dokunulmadı. `hakkimda.html` da aynı deseni miras aldı (nav'da
"U1 Hakkımda" derken sayfa içeriğinde "U2 — HAKKIMDA" yazıyor).
İstenirse tek bir tutarlı numaralandırmaya çekilebilir.

### 13.5 — Demo projelerin gerçek projelerle değiştirilmesi
12.3'te eklenen 3 demo proje (`is-demo-project`), site yayına
alınmadan önce gerçek projelerle değiştirilmeli ya da kaldırılmalı.

---

Hangi FAZ 13 maddesiyle devam edelim, yoksa hepsini mi görmek
istersin?
