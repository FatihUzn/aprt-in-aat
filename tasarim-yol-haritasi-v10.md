# UZN TECH — Yol Haritası (v10)

Bu belge v9'un yerine geçer. FAZ 12 ve FAZ 13 tamamlandı (bkz. v8/v9).
13.2 hâlâ kullanıcı isteğiyle askıda (LinkedIn kullanıcı adı, fotoğraf,
CV — sağlanmadı). FAZ 14'teki iki belirsiz madde (14.3, 14.5) bu turda
netleşti — aşağıda güncel hâliyle. Hiçbiri henüz uygulanmadı.

---

## FAZ 14 — Aday liste (netleşti, uygulama bekliyor)

### 14.1 — Boot/bağlanıyor efekti çok hızlı
**Konum:** `app.js`, "FAZ 5.x / A — Açılış (boot-up) Sekansı" bloğu.

Sayfa ilk açıldığında (sekme başına bir kez, `sessionStorage.uznBootSeen`;
`prefers-reduced-motion` açıksa çalışmaz) sırayla:
1. "BAĞLANTI KURULUYOR..."
2. "GÜVENLİK DUVARI: OK"
3. "ARAYÜZ YÜKLENİYOR..."

Satırlar arası **260ms**, bitişte **220ms** bekleme + **420ms** fade-out.
Toplam ~1.4sn — çok kısa.

**Yapılacak:** Adım aralığını ve bitiş bekleme süresini artırmak (örn.
260ms → 450-600ms bandı). Kesin değer kullanıcıyla hız hissi üzerinden
kalibre edilecek.

---

### 14.2 — Tüm "kutucuklar" kaldırılsın, arka plan üstüne yazı + renk kodlu vurgu
**Kapsam:** `project-row`, `bento-cell`, `node-panel`, `quick-tile` gibi
~41 kutu/panel bileşeni.

**Yapılacak:** Arka plan/border/gölge kaldırılıp içerik doğrudan sayfa
zemini üstünde bırakılacak. Her bileşenin taşıdığı aksan rengi
(`--accent`, `--accent-2`, `--signal` vb.) kutunun arka planından
metnin rengine/vurgusuna taşınacak — renk kodlaması (yazılım/mekanik/
siber ayrımı) korunacak.

**Not:** Geniş kapsamlı — bölüm bölüm yapılacak (proje listesi → bento
grid → topology paneller vb.), sıralama uygulama sırasında netleşecek.

---

### 14.3 — "Kare adımlı" osiloskop-izi geçişleri kaldırılsın ✅ netleşti
**Kullanıcı ekran görüntüsüyle netleşti:** Kastedilen, "Eğitim
İlerlemesi" kartının üstünde/altında görünen, dikdörtgen→çizgi→
dikdörtgen deseniyle ilerleyen bölüm geçiş çizgisi.

**Konum:** `style.css` → `.section-wave`, `.section-wave-top`,
`.section-wave-bottom` (satır ~849-873). CSS'teki yorum bunu doğruluyor:
*"FAZ 1 / Osiloskop Dalga Geçişleri: yumuşak S-eğrisi yerine, kare
adımlı bir dijital sinyal / osiloskop izi."* — `data:image/svg+xml`
olarak kodlanmış, kare-basamaklı bir path.

**Kullanım yerleri (`index.html`):** Sadece "Eğitim İlerlemesi"
(`stat-circle-band`) çevresinde değil, sitede **8 yerde** kullanılıyor
(satır 452/465, 801/826, 1008/1042, 1096/1169 — Hizmetler, İletişim
formu gibi başka bölüm geçişlerinde de var).

**Kapsam kararı:** Kullanıcı "vs" ifadesiyle genele işaret etti —
**sitedeki tüm `section-wave-top`/`section-wave-bottom` kullanımları**
kaldırılacak (sadece eğitim bölümüyle sınırlı değil). Kaldırıldıktan
sonra o geçiş noktalarına ne konacağı (düz çizgi, boşluk, farklı bir
ayraç vb.) ayrı bir konu — bu fazda sadece kaldırma var.

---

### 14.4 — Site çok uzun, kategorize edelim; anasayfadaki kişisel bilgiler azalsın
**Konum:** `index.html` içindeki `#hakkimda` özet bloğu.

**Yapılacak:** Anasayfadaki Hakkımda özetini küçültmek ya da kaldırıp
sadece `hakkimda.html`'e yönlendiren bir bağlantı/kart haline getirmek.
Genel sayfa uzunluğu için diğer bölümlerin de daraltılabilir olup
olmadığına bakılacak — kapsamın sadece Hakkımda'yla mı sınırlı olduğu
uygulama sırasında netleşecek.

---

### 14.5 — Favicon tarayıcı sekmesinde görünmüyor ✅ netleşti + kök sebep bulundu
**Kök sebep doğrulandı:** Kullanıcının paylaştığı GitHub repo ekran
görüntüsünde (`github.com/FatihUzn/consulting`), `favicon.svg`,
`favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` dosyaları
**repo kökünde** duruyor — `assets/icons/` diye bir klasör repo'da
**yok**. Ama tüm HTML dosyaları (`index.html`, `404.html`,
`hakkimda.html`, `kvkk.html`) ve `manifest.json`, bu dosyaları
`assets/icons/favicon.svg` gibi bir yoldan bekliyor → 404 → favicon
hiç yüklenmiyor.

**Yapılacak:** `<link rel="icon" ...>`, `<link rel="apple-touch-icon"
...>` etiketlerindeki ve `manifest.json`'daki `icons[].src` yollarını,
dosyaların repo kökünde durduğu gerçek yapıya göre düzeltmek (örn.
`assets/icons/favicon.svg` → `favicon.svg`). Düşük riskli, tek seferde
uygulanabilir bir düzeltme.

---

## Uygulama sırası (öneri)
Düşük riskten yükseğe: **14.5** (yol düzeltme, dakikalar sürer) →
**14.3** (CSS'ten belirli bir bloğun kaldırılması, netleşti) → **14.1**
(zamanlama ayarı) → **14.4** (içerik/yapı kararı gerektiriyor) →
**14.2** (en geniş kapsamlı, muhtemelen birkaç adımda).

Kullanıcı onayı bekleniyor: bu sırayla mı gidilecek, yoksa farklı bir
öncelik mi var.
