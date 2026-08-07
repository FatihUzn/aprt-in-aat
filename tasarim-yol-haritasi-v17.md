# UZN TECH — Yol Haritası (v17)

Bu belge v16'nın yerine geçer.

## Bu turda yapılan tek değişiklik
- `biz-kimiz.html` → `kurumsal.html` olarak yeniden adlandırıldı
  (kullanıcı: "biz kimiz" ismi estetik durmuyor, "Kurumsal" tercih
  edildi). Tüm nav/footer linkleri, title/meta/OG etiketleri ve
  section id (`kurumsal-full`) buna göre güncellendi.
- `hakkimda.html` redirect dosyası KALDIRILMADI — kullanıcı kararı:
  eski link/SEO güvenliği için dursun. Hedefi `kurumsal.html` olarak
  güncellendi.

## v11'de kaydedilen FAZ 15 iskeleti (aynen geçerli, sadece isim değişti)
- `kurumsal.html` — eski hakkimda.html içeriği + "Ekip Üyeleri" ve
  "Genel Kurul" placeholder bölümleri.
- `hakkimda.html` — kurumsal.html'e yönlendiren redirect sayfası.
- 4 track sayfası: `yazilim.html`, `mekanik-otomasyon.html`,
  `siber-guvenlik.html`, `mekatronik.html` — header/nav/footer var,
  içerik placeholder.

## Bilinçli olarak DOKUNULMAYANLAR (henüz kararlaştırılmadı)
- Anasayfadaki `#hizmetler` / U1 topology haritası — track sayfalarına
  link/önizleme bağlantısı henüz kurulmadı (açık nokta #5).
- Track kartlarının/`data-track` filtre mekanizmasının yeni sayfalarla
  ilişkisi henüz kurulmadı.
- Yazılım sayfasının alt bölümlerinin (Arduino, Web geliştirme) ayrı
  sayfa mı aynı sayfada mı olacağı netleşmedi (açık nokta #4).
- Ekip üyeleri / genel kurul içeriği kullanıcıdan gelecek.
- 14.2 (kutuların kaldırılması) hâlâ askıda.
- Anasayfadaki #hakkimda in-page nav bölümü hâlâ eski adıyla duruyor
  (kurumsal.html linkine bağlı ama kendi başlığı henüz gözden
  geçirilmedi) — istenirse ayrı bir turda ele alınabilir.

## Sıradaki adım
Kullanıcıyla birlikte: (a) U1 topology → track sayfaları bağlantı
şekli, (b) Yazılım alt bölüm yapısı, (c) gerçek içeriğin anasayfadan
4 track sayfasına dağıtımı konuşulacak, sonra içerik taşıma turu
başlayacak.

---

# v14 EKİ — Yazılım sayfası dolduruldu

## Bu turda yapılanlar
- `yazilim.html` gerçek içerikle dolduruldu:
  - Intro metni (topology node'undan uyarlandı) + Kullanılan Diller
    (Python, C++, Java, Go).
  - **Web Sitesi Geliştirme** alt bölümü: anasayfadan taşınan 3 gerçek
    proje (Golden Palace, WalkAbout Travel, Lok-Art) — GitHub linkleri
    dahil.
  - **Arduino & Gömülü Sistemler** alt bölümü: placeholder, içerik
    kullanıcıdan bekleniyor (TODO yorumu bırakıldı).
- Kullanıcı kararı: bu 3 proje **anasayfadan tamamen kaldırıldı**
  (artık sadece yazilim.html'de). `index.html`'deki proje listesi
  P01→P02 olarak yeniden numaralandırıldı (mekanik, siber — ikisi de
  hâlâ "Planlanan" placeholder).
- `index.html` projeler bölümüne "Yazılım projelerinin tamamı artık
  Yazılım sayfasında" linki eklendi.

## Açık kalan / bilinçli dokunulmayan noktalar
- Track filtre butonu (hero'daki "Yazılım" butonu) artık projeler
  listesinde hiçbir satırı filtrelemiyor (çünkü hepsi taşındı) —
  U1 topology ve bento gibi diğer bölümler hâlâ eski davranışta.
  Bu, açık nokta #5 (topology → track sayfa bağlantısı) çözülünce
  ele alınacak.
- Yazılım alt bölümünün "ayrı sayfa mı aynı sayfada mı" sorusu
  (açık nokta #4) fiilen "aynı sayfada bölüm" olarak uygulandı —
  ama bu geri alınabilir, kesin karar değil.

## Sıradaki adım
Diğer 3 track sayfası da aynı şekilde sıfırdan dolduruluyor
(Mekanik & Otomasyon, Siber Güvenlik, Mekatronik) — henüz gerçek
proje/içerik yok, kullanıcıdan gelecek.

---

# v15 EKİ — Kalan 3 track sayfası (Mekanik & Otomasyon, Siber
# Güvenlik, Mekatronik) intro içerikle dolduruldu

## Bu turda yapılanlar
Üç sayfaya da yazılım.html ile aynı desende (`about-role` + `about-text`
+ `skills-row`) intro bölümü eklendi. İçerik, anasayfadaki `#hizmetler`
U1 topology düğümlerinin (mekanik, siber, mekatronik hub) metinlerinden
**uyarlandı** — yeni bir şey icat edilmedi:

- **`mekanik-otomasyon.html`**: "Fikirden çalışan prototipe, tek elden."
  + SolidWorks / PLC / Mikrodenetleyici / Sensör-Aktüatör araç rozetleri.
- **`siber-guvenlik.html`**: "Güvenlik, sonradan eklenen bir özellik
  değil." + Kali Linux / Nmap / Sızma Testi / Ağ Analizi araç rozetleri.
- **`mekatronik.html`**: "İki dünyanın birleştiği yer." + "Üç Alan"
  rozetleri (Mekanik & Otomasyon / Yazılım Geliştirme / Siber Güvenlik).

Her sayfaya ayrıca boş bir **"Projeler"** alt başlığı (`h2.subsection-
heading`) eklendi, altında `section-placeholder-note` + TODO yorumu var.

## Bilinçli olarak yapılMAYAN
- **Gerçek proje eklenmedi.** Anasayfada mekanik/siber projeleri hâlâ
  "Planlanan" (`is-planned-project`) etiketiyle placeholder durumda —
  uydurma proje içeriği yazılmadı, kullanıcıdan bekleniyor.
- Track filtre butonlarının (mekanik/siber/ikisi) bu yeni sayfalarla
  ilişkisi hâlâ kurulmadı (açık nokta #5, v14'ten beri aynı durumda).
- `index.html` üzerinde herhangi bir değişiklik yapılmadı.

## Sıradaki adım (v15'te böyleydi, v16 ile değişti — aşağıya bkz.)
Kullanıcıdan üç sayfa için gerçek proje içeriği (Mekanik & Otomasyon,
Siber Güvenlik, Mekatronik/kesişim projeleri) bekleniyor — geldiğinde
yazılım.html'deki proje satırı (`project-row` + akordeon) deseniyle
eklenecek.

---

# v16 EKİ — 4 sayfaya YER TUTUCU (placeholder) örnek projeler eklendi

## Önemli bağlam
Kullanıcı önce Harvard Üniversitesi'nden proje eklenmesini istedi;
bu, gerçek olmayan bir kurumsal/akademik referans oluşturacağı için
**reddedildi** (siteye sahte kimlik iddiası eklemek olur). Kullanıcıya
alternatif sunuldu, kullanıcı **"gerçekçi ama kurum belirtmeyen örnek
projeler"** seçeneğini seçti.

## Bu turda yapılanlar
4 sayfaya, gerçekçi görünen ama hiçbir kuruma/kaynağa atıf yapmayan
2'şer örnek proje eklendi (toplam 8), yazılım.html'deki `project-row`
+ akordeon deseniyle:

- **`yazilim.html` → Arduino & Gömülü Sistemler**: P04 Otomatik
  Sulama Sistemi, P05 Engelden Kaçınan Robot.
- **`mekanik-otomasyon.html`**: P01 Otomatik Sıralama Kolu, P02
  Konveyör Bant Kontrol Sistemi.
- **`siber-guvenlik.html`**: P01 Ev Ağı Güvenlik Denetimi, P02 Yerel
  Test Ortamında Web Uygulaması Sızma Testi.
- **`mekatronik.html`**: P01 Otonom Hat Takip Robotu, P02 IoT Tabanlı
  Sera Otomasyonu.

Her projede GitHub linki YOK (gerçek repo olmadığı için link
eklenmedi — yazılım.html'deki 3 gerçek projeden farklı olarak).
Her sayfada, proje listesinin hemen üstünde HTML yorumu olarak
"YER TUTUCUDUR" notu bırakıldı — kaynak kodunu okuyan biri (kullanıcı
veya ileride başka biri) bunların gerçek olmadığını görebilsin diye.

## Bilinçli olarak yapılMAYAN / dikkat edilmesi gerekenler
- **Hiçbir kuruma, şirkete veya kişiye atıf yapılmadı.** Projeler
  jenerik "kendi kendine yapılan hobi/öğrenme projesi" tonunda yazıldı.
- **GitHub linki eklenmedi** — bu projeler için gerçek repo yok.
- Bu 8 proje **gerçek değil**, kullanıcı netleştirilene kadar sitede
  durabilir ama canlıya alınmadan/paylaşılmadan önce ya gerçek
  projelerle değiştirilmeli ya da açıkça kaldırılmalı. Kullanıcı bunun
  farkında (kendi ifadesiyle: site henüz sadece kendisi görecek).
- `index.html`, `kurumsal.html`, diğer sayfalara dokunulmadı.

## Sıradaki adım
Kullanıcı siteyi kafasında netleştirdikçe: (a) bu 8 yer tutucu
projeden hangileri gerçek projelerle değiştirilecek/kaldırılacak,
(b) site yayına alınmadan önce tüm yer tutucu içeriğin temizlenmesi
gerektiği hatırlatılmalı.

---

# v17 EKİ — Yer tutucu projeler 10'ar taneye çıkarıldı

## Bu turda yapılanlar
Kullanıcı isteğiyle, her sayfa/bölümdeki yer tutucu proje sayısı 2'den
10'a çıkarıldı (aynı desende: `project-row` + akordeon, kurum/kaynak
atfı yok, GitHub linki yok):

- **`yazilim.html` → Arduino & Gömülü Sistemler**: P04–P13 (10 proje).
  Web Sitesi Geliştirme bölümündeki 3 GERÇEK proje (P01–P03) aynen
  kaldı, dokunulmadı.
- **`mekanik-otomasyon.html`**: P01–P10 (10 proje).
- **`siber-guvenlik.html`**: P01–P10 (10 proje). Not: bu listede bir
  "kötü amaçlı yazılım davranış analizi (sandbox)" başlığı var — teknik
  detay/kod içermiyor, yalnızca izole/kapalı ortamda üst seviye
  gözlem yapıldığı belirtiliyor; saldırı tekniği veya zararlı kod
  vermiyor.
- **`mekatronik.html`**: P01–P10 (10 proje).

Her sayfadaki "YER TUTUCUDUR" HTML yorumu korundu.

## Teknik not (bu turda düzeltilen bir hata)
İlk ekleme denemesinde, projelerin HTML'e eklenme mantığında bir
string-replace hatası vardı (kapanan `</div>` etiketleri birden çok
noktada eşleşip içerik yanlış/tekrarlı ekleniyordu). Bu fark edilip
düzeltildi; son dosyalarda `<article class="project-row">` sayısı ve
açık/kapalı `<div>` sayıları doğrulandı (dengeli), P numaraları
sıralı kontrol edildi.

## Bilinçli olarak yapılMAYAN
- Hâlâ hiçbir kuruma/şirkete/kişiye atıf yapılmadı, GitHub linki
  eklenmedi — bu 38 proje (13+10+10+10 - 3 gerçek = 40 yer tutucu,
  yazilim'deki 3 gerçek dahil toplam 43 proje satırı) tamamen kurgusal
  yer tutucu içerik.
- `index.html`, `kurumsal.html` ve diğer sayfalara dokunulmadı.

## Sıradaki adım
Aynı hatırlatma geçerli: kullanıcı siteyi netleştirdikçe bu yer
tutucu projelerden hangilerinin gerçek içerikle değiştirileceğine
karar verecek; site yayına alınmadan önce tüm yer tutucu içerik
gözden geçirilmeli.
