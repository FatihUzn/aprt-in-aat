# UZN TECH — Yol Haritası (v8)

Bu belge v7'nin yerine geçer. v7'de listelenen **13.1 tamamlandı** —
aşağıda nasıl yapıldığıyla birlikte. Geri kalan FAZ 13 maddeleri
(13.2–13.5) hâlâ onay bekliyor.

---

## FAZ 12 — Tamamlandı ✅
(v7'deki 12.1–12.8 ile aynı, değişiklik yok.)

## FAZ 13.1 — Tamamlandı ✅ (v3 referansı olmadan)

v3'e ait bir ekran görüntüsü/dosya bu oturuma da yüklenmedi. Bu
yüzden "v3'e birebir referansla yeniden şekillendirme" yapılamadı;
onun yerine kod incelemesinde görülen somut bir eksiklik giderildi:

**Sorun:** `index.html`'deki U1 (Yetkinlik Alanları) topoloji
haritasında 3 uç düğümün (Mekanik, Yazılım, Siber) her birinde bir
`.node-diagram` SVG illüstrasyonu ve `.feature-list` (3 maddelik
somut yetkinlik listesi) varken, merkez düğüm (Mekatronik hub)
sadece kısa bir paragraf + etiketlerden oluşuyordu. Dört düğüm
görsel/bilgi zenginliği açısından tutarsızdı.

**Yapılan:**
- Hub paneline diğer 3 düğümle aynı düzende bir `feature-list`
  eklendi (3 madde, kesişimde çalışmanın somut anlamı — uydurma
  istatistik değil, betimsel).
- Hub paneline diğer 3 düğümle aynı boyut/stilde (`viewBox 0 0 220
  165`, mevcut CSS değişkenleriyle: `--line`, `--accent`,
  `--accent-2`, `--accent-bright`, `--signal`, `--bg`) yeni bir
  `.node-diagram` SVG'si eklendi: merkezdeki büyük halkadan üç uç
  düğüme (mekanik/yazılım/siber ikonlarıyla) kesikli çizgilerle
  yayılan bir "kesişim/yakınsama" şeması.
- Değişiklik sadece `index.html` içinde, `.topology-hub` içindeki
  `.node-panel` bloğunda; `style.css` ve `app.js`'e dokunulmadı
  (mevcut `.node-diagram` ve `.feature-list` kuralları zaten hazırdı).

**Not:** v3'ün gerçek dosyası/ekran görüntüsü ileride paylaşılırsa,
bu düğüm o referansla tekrar gözden geçirilebilir — şu anki hâli
onun yerine geçen, bağımsız bir tamamlama.

---

## FAZ 13 — Kalan aday liste (henüz onaylanmadı)

### 13.2 — Eksik/placeholder harici varlıklar
Bu oturuma hiç yüklenmedi, mevcut durumları bilinmiyor:
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
U4 SSS, U5 İletişim) örtüşmüyor. `hakkimda.html` da aynı deseni
miras aldı. İstenirse tek bir tutarlı numaralandırmaya çekilebilir.

### 13.5 — Demo projelerin gerçek projelerle değiştirilmesi
12.3'te eklenen 3 demo proje (`is-demo-project`), site yayına
alınmadan önce gerçek projelerle değiştirilmeli ya da kaldırılmalı.

---

Hangi maddeyle devam edelim: 13.2, 13.3, 13.4, 13.5 — yoksa hepsi mi?
