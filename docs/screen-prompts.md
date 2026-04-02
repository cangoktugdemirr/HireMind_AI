# HireMind AI - Sayfa ve Modal Promptları

Bu dosya, HireMind AI projesindeki tüm sayfa ve modal tasarımları için prompt listesini içerir. Her prompt, design.md dosyasındaki kurallarla birlikte kullanılmalıdır.

**Kullanım:** Her promptu design.md ile birlikte tasarım aracına (Google Stitch vb.) gönderin.

---

## Sayfa Listesi

### Auth Sayfaları
1. [Giriş Sayfası (Login)](#prompt-1-giriş-sayfası)
2. [Kayıt Sayfası (Register)](#prompt-2-kayıt-sayfası)

### Aday Sayfaları
3. [Aday Paneli - CV Doldurulmamış](#prompt-3-aday-paneli---cv-doldurulmamış)
4. [Aday Paneli - Mülakat Yok](#prompt-4-aday-paneli---mülakat-yok)
5. [Aday Paneli - Bekleyen Mülakat Var](#prompt-5-aday-paneli---bekleyen-mülakat-var)
6. [Aday Paneli - Mülakat Tamamlandı](#prompt-6-aday-paneli---mülakat-tamamlandı)
7. [Özgeçmiş Formu](#prompt-7-özgeçmiş-formu)
8. [Mülakat Sayfası](#prompt-8-mülakat-sayfası)

### İK Sayfaları
9. [İK Paneli - Boş Durum](#prompt-9-İk-paneli---boş-durum)
10. [İK Paneli - İlanlar Mevcut](#prompt-10-İk-paneli---İlanlar-mevcut)
11. [Yeni İlan Oluştur](#prompt-11-yeni-İlan-oluştur)
12. [İlan Detay Sayfası](#prompt-12-İlan-detay-sayfası)
13. [Bireysel Rapor Sayfası](#prompt-13-bireysel-rapor-sayfası)

### Modallar
14. [Mülakat Başlama Onay Modalı](#prompt-14-mülakat-başlama-onay-modalı)
15. [Mülakat Gönderme Onay Modalı](#prompt-15-mülakat-gönderme-onay-modalı)
16. [Mülakat Terk Uyarı Modalı](#prompt-16-mülakat-terk-uyarı-modalı)
17. [İlan Oluşturma Sonuç Modalı](#prompt-17-İlan-oluşturma-sonuç-modalı)
18. [Çıkış Onay Modalı](#prompt-18-çıkış-onay-modalı)

---

## PROMPT 1: Giriş Sayfası

**Sayfa türü:** Auth sayfası (sidebar ve header yok)
**Kullanıcı:** Tüm kullanıcılar
**Erişim:** Uygulamanın ilk açıldığı sayfa. Giriş yapmamış kullanıcılar bu sayfayı görür.

### Prompt

Açık gri (#F3F4F6) arka planlı, tam ekran bir giriş sayfası tasarla. Sayfanın tam ortasında (hem dikey hem yatay) beyaz bir giriş kartı yer alır.

Kartın üst tarafında (kartın dışında, ortalanmış olarak):
- Küçük bir yapay zeka temalı ikon (beyin veya nöron ikonu, koyu lacivert #1E3A5F renkte)
- Hemen altında "HireMind AI" metni (20px, bold, #1E3A5F)
- Altında "Akıllı Mülakat Asistanı" sloganı (14px, regular, #6B7280)

Beyaz kart (genişlik: 420px, köşe yuvarlama: 8px, gölge: 0 4px 6px rgba(0,0,0,0.07)):

Kart başlığı olarak "Giriş Yap" metni (20px, semibold, #111827), ortalanmış.

Altında iki form alanı, dikey sırayla:
1. "E-posta" etiketli metin girişi (placeholder: "ornek@email.com")
2. "Şifre" etiketli şifre girişi (placeholder: "Şifrenizi girin", sağ tarafta göz ikonu ile göster/gizle)

Her etiket alanın üstünde, 6px boşlukla. Inputlar tam genişlik, yükseklik 40px, kenarlık 1px solid #D1D5DB, köşe yuvarlama 6px.

Form alanlarının altında tam genişlikte "Giriş Yap" birincil butonu (arka plan: #1D4ED8, metin: beyaz, yükseklik: 40px, köşe yuvarlama: 6px).

Butonun altında ortalanmış bir metin satırı:
"Hesabınız yok mu?" (gri metin) + "Kayıt Ol" (mavi bağlantı, #2563EB)

Kart iç boşluğu: 32px. Tüm form öğeleri arasında 16px dikey boşluk.

---

## PROMPT 2: Kayıt Sayfası

**Sayfa türü:** Auth sayfası (sidebar ve header yok)
**Kullanıcı:** Yeni kullanıcılar
**Erişim:** Giriş sayfasındaki "Kayıt Ol" bağlantısından

### Prompt

Açık gri (#F3F4F6) arka planlı, tam ekran bir kayıt sayfası tasarla. Düzen giriş sayfası ile aynı: sayfanın tam ortasında beyaz bir kart.

Kartın üst tarafında (kartın dışında, ortalanmış olarak):
- Yapay zeka temalı ikon (koyu lacivert #1E3A5F)
- "HireMind AI" metni (20px, bold, #1E3A5F)
- "Akıllı Mülakat Asistanı" sloganı (14px, regular, #6B7280)

Beyaz kart (genişlik: 420px, köşe yuvarlama: 8px, gölge: md):

Kart başlığı: "Kayıt Ol" (20px, semibold, #111827), ortalanmış.

Form alanları dikey sırayla:
1. "Ad Soyad" etiketli metin girişi (placeholder: "Adınız ve soyadınız")
2. "E-posta" etiketli metin girişi (placeholder: "ornek@email.com")
3. "Şifre" etiketli şifre girişi (placeholder: "En az 6 karakter", sağ tarafta göz ikonu)
4. "Şifre Tekrar" etiketli şifre girişi (placeholder: "Şifrenizi tekrar girin")
5. "Hesap Türü" alanı: Yan yana iki seçenek kartı (toggle card yapısı):
   - Sol kart: Kullanıcı ikonu + "Aday" metni
   - Sağ kart: Bina/ofis ikonu + "İK Uzmanı" metni
   - Seçili olan kart: mavi kenarlık (2px solid #1D4ED8), açık mavi arka plan (#EFF6FF)
   - Seçili olmayan kart: gri kenarlık (1px solid #D1D5DB), beyaz arka plan
   - Her kart eşit genişlikte, aralarında 12px boşluk

Tüm alanlar zorunlu, etiketlerin yanında kırmızı yıldız (*).

Form alanlarının altında tam genişlikte "Kayıt Ol" birincil butonu.

Butonun altında ortalanmış metin satırı:
"Zaten hesabınız var mı?" (gri) + "Giriş Yap" (mavi bağlantı, #2563EB)

Kart iç boşluğu: 32px. Form öğeleri arası: 16px.

---

## PROMPT 3: Aday Paneli - CV Doldurulmamış

**Sayfa türü:** Dashboard sayfası
**Kullanıcı:** Aday (henüz CV formunu doldurmamış)
**Erişim:** Aday giriş yaptığında, CV doldurulmamışsa bu durumu görür

### Prompt

Dashboard düzeninde bir aday paneli sayfası tasarla.

Sol tarafta sabit sidebar (genişlik: 256px, arka plan: koyu lacivert #1E3A5F, tam yükseklik):
- Üst kısım: Yapay zeka ikonu + "HireMind AI" metni (beyaz, 18px bold). Altında ince bir ayırıcı çizgi (rgba(255,255,255,0.1)).
- Menü öğeleri (her biri sol tarafta ikon + metin, beyaz renk):
  1. "Panelim" - Ev ikonu ile. Bu aktif durumdadır: sol kenarlık 3px beyaz, arka plan rgba(255,255,255,0.15), opaklık 1.0.
  2. "Özgeçmişim" - Dosya ikonu ile. Normal durumdadır: opaklık 0.7.
- Sidebar alt kısmı: Kullanıcı adı (beyaz, 14px), altında "Aday" etiketi (beyaz, opaklık 0.6, 12px). Yanında veya altında "Çıkış Yap" butonu/ikonu.

Üst header (yükseklik: 64px, beyaz arka plan, alt kenarlık 1px solid #E5E7EB):
- Sol tarafta sayfa başlığı: "Panelim" (20px, semibold, #111827)
- Sağ tarafta kullanıcı avatar dairesi (40px, #1D4ED8 arka plan, beyaz baş harfler)

İçerik alanı (sidebar sağında, header altında, #F3F4F6 arka plan, padding 24px):

Sayfanın üst kısmında sarı/amber uyarı kutusu (alert):
- Sol kenarlık: 4px solid #D97706
- Arka plan: #FEF3C7
- Sol tarafta uyarı üçgen ikonu (#D97706)
- Metin: "Özgeçmiş bilgilerinizi henüz doldurmadınız. İş ilanları ile eşleşebilmeniz için lütfen özgeçmiş formunuzu tamamlayın." (#92400E renk, 14px)
- Sağ tarafta "Özgeçmişimi Doldur" butonu (birincil buton stili, küçük boyut)

Uyarı kutusunun altında (24px boşluk) bir bilgi kartı (beyaz kart):
- Kart başlığı: "Durum Özeti" (16px, semibold)
- İçinde iki bilgi satırı:
  - "Özgeçmiş:" yanında kırmızı "Tamamlanmadı" rozeti
  - "Mülakat:" yanında gri "Bekleyen mülakat yok" metni
- Kart iç boşluğu: 24px

---

## PROMPT 4: Aday Paneli - Mülakat Yok

**Sayfa türü:** Dashboard sayfası
**Kullanıcı:** Aday (CV doldurulmuş ama henüz bir ilanla eşleştirilmemiş)
**Erişim:** Aday giriş yaptığında, CV doluysa ve eşleşme yoksa bu durumu görür

### Prompt

Dashboard düzeninde bir aday paneli sayfası tasarla. Sidebar ve header yapısı Prompt 3 ile tamamen aynı.

İçerik alanı (#F3F4F6 arka plan, padding 24px):

Sayfanın üst kısmında yeşil başarı kutusu (alert):
- Sol kenarlık: 4px solid #059669
- Arka plan: #D1FAE5
- Sol tarafta tik (checkmark) ikonu (#059669)
- Metin: "Özgeçmiş bilgileriniz tamamlandı. Uygun bir iş ilanı ile eşleştirildiğinizde burada bildirim göreceksiniz." (#065F46 renk, 14px)

Altında (24px boşluk) beyaz durum özeti kartı:
- Kart başlığı: "Durum Özeti" (16px, semibold)
- İçinde iki bilgi satırı:
  - "Özgeçmiş:" yanında yeşil "Tamamlandı" rozeti
  - "Mülakat:" yanında gri "Bekleyen mülakat yok" metni

Kartın altında (32px boşluk) boş durum gösterimi (empty state):
- Ortalanmış büyük gri saat/bekleme ikonu (48px, #9CA3AF)
- Altında: "Henüz bir iş ilanı ile eşleşmediniz" (16px, semibold, #374151)
- Altında: "Uygun bir pozisyon açıldığında size otomatik olarak mülakat gönderilecektir." (14px, regular, #6B7280)

---

## PROMPT 5: Aday Paneli - Bekleyen Mülakat Var

**Sayfa türü:** Dashboard sayfası
**Kullanıcı:** Aday (bir ilanla eşleştirilmiş, mülakat bekliyor)
**Erişim:** Aday giriş yaptığında eşleştirilmiş bir mülakatı varsa bu durumu görür

### Prompt

Dashboard düzeninde bir aday paneli sayfası tasarla. Sidebar ve header yapısı Prompt 3 ile tamamen aynı. Tek fark: sidebar'daki "Panelim" menü öğesinin yanında küçük bir kırmızı bildirim noktası (8px daire, #DC2626) bulunur.

İçerik alanı (#F3F4F6 arka plan, padding 24px):

Sayfanın üst kısmında mavi bilgi kutusu (alert):
- Sol kenarlık: 4px solid #2563EB
- Arka plan: #DBEAFE
- Sol tarafta bilgi (info) ikonu (#2563EB)
- Metin: "Size bir mülakat gönderildi! Aşağıdaki detayları inceleyip mülakata başlayabilirsiniz." (#1E40AF renk, 14px)

Altında (24px boşluk) beyaz durum özeti kartı:
- Kart başlığı: "Durum Özeti"
- İki bilgi satırı:
  - "Özgeçmiş:" yanında yeşil "Tamamlandı" rozeti
  - "Mülakat:" yanında sarı "Bekliyor" rozeti

Altında (24px boşluk) öne çıkan mülakat kartı (beyaz kart, üst kenarlık 3px solid #1D4ED8):
- Kart başlığı: "Bekleyen Mülakatınız" (18px, semibold, #111827)
- Başlığın altında ince ayırıcı çizgi

- Kart içinde bilgi satırları (her satırda sol tarafta gri ikon + etiket, sağ tarafta değer):
  - "Pozisyon:" — "Frontend Geliştirici" (örnek veri, bold)
  - "Soru Sayısı:" — "10"
  - "Yanıt Türü:" — "Yazılı"
  - "Süre:" — "Tek oturumda tamamlanmalıdır"

- Bilgi satırlarının altında amber uyarı kutusu (küçük, kart içinde):
  - Uyarı ikonu + "Mülakatı başlattıktan sonra tek seferde tamamlamanız gerekmektedir. Çıkış yaparsanız ilerlemeniz silinir ve baştan başlarsınız." metni (#92400E, 13px)

- Kartın alt kısmında, sağa hizalı "Mülakata Başla" birincil butonu (büyük boyut: padding 12px 32px)

---

## PROMPT 6: Aday Paneli - Mülakat Tamamlandı

**Sayfa türü:** Dashboard sayfası
**Kullanıcı:** Aday (mülakatı tamamlamış)
**Erişim:** Aday giriş yaptığında mülakatı tamamlanmışsa bu durumu görür

### Prompt

Dashboard düzeninde bir aday paneli sayfası tasarla. Sidebar ve header yapısı Prompt 3 ile tamamen aynı.

İçerik alanı (#F3F4F6 arka plan, padding 24px):

Sayfanın üst kısmında yeşil başarı kutusu (alert):
- Sol kenarlık: 4px solid #059669
- Arka plan: #D1FAE5
- Sol tarafta büyük tik ikonu (#059669)
- Metin: "Mülakatınız başarıyla tamamlandı. Değerlendirme sonuçlarınız İK ekibine iletildi." (#065F46 renk, 14px)

Altında (24px boşluk) beyaz durum özeti kartı:
- Kart başlığı: "Durum Özeti"
- İki bilgi satırı:
  - "Özgeçmiş:" yanında yeşil "Tamamlandı" rozeti
  - "Mülakat:" yanında yeşil "Tamamlandı" rozeti

Altında (32px boşluk) beyaz özet kartı:
- Kart üst kenarlık: 3px solid #059669
- Kart başlığı: "Mülakat Bilgileri" (16px, semibold)
- Bilgi satırları:
  - "Pozisyon:" — "Frontend Geliştirici" (örnek)
  - "Tamamlanma Tarihi:" — "31 Mart 2026"
  - "Durum:" — Yeşil "Değerlendirmeye gönderildi" rozeti

Kartın altında (32px boşluk) ortalanmış bilgilendirme metni:
- "Teşekkür ederiz! Süreç hakkında İK ekibi sizinle iletişime geçecektir." (14px, #6B7280)

---

## PROMPT 7: Özgeçmiş Formu

**Sayfa türü:** Dashboard sayfası
**Kullanıcı:** Aday
**Erişim:** Sidebar'daki "Özgeçmişim" menüsünden veya Panel'deki "Özgeçmişimi Doldur" butonundan

### Prompt

Dashboard düzeninde bir özgeçmiş form sayfası tasarla. Sidebar yapısı Prompt 3 ile aynı, ancak bu sefer "Özgeçmişim" menü öğesi aktif durumdadır (sol kenarlık 3px beyaz, arka plan rgba(255,255,255,0.15)).

Header'da sayfa başlığı: "Özgeçmişim"

İçerik alanı (#F3F4F6 arka plan, padding 24px):

Tek bir büyük beyaz kart (maks genişlik: 720px, ortalanmış):
- Kart başlığı: "Özgeçmiş Bilgileri" (20px, semibold, #111827)
- Başlık altında açıklama: "Aşağıdaki bilgileri eksiksiz doldurunuz. Bu bilgiler iş ilanları ile eşleştirme için kullanılacaktır." (14px, #6B7280)
- Başlık altında ince ayırıcı çizgi

Form alanları dikey sırayla (her alan arasında 20px boşluk):

**Kişisel Bilgiler bölüm başlığı** (14px, semibold, #374151, üst tarafta 8px boşluk):

1. "Ad Soyad" * — Tam genişlik metin girişi (placeholder: "Adınız ve soyadınız")
2. "E-posta" * — Tam genişlik metin girişi (placeholder: "ornek@email.com")
3. "Telefon" * — Tam genişlik metin girişi (placeholder: "05XX XXX XX XX")

**Eğitim Bilgileri bölüm başlığı:**

4. "Eğitim Seviyesi" * — Tam genişlik açılır menü.
   Seçenekler: "Seçiniz..." (placeholder), "Lise", "Ön Lisans", "Lisans", "Yüksek Lisans", "Doktora"
5. "Okul / Bölüm" * — Tam genişlik metin girişi (placeholder: "Üniversite adı ve bölümünüz")

**Deneyim Bilgileri bölüm başlığı:**

6. "Toplam İş Deneyimi" * — Tam genişlik açılır menü.
   Seçenekler: "Seçiniz..." (placeholder), "Deneyimsiz", "0-1 yıl", "1-3 yıl", "3-5 yıl", "5-10 yıl", "10+ yıl"
7. "Son Çalıştığı Pozisyon" — Tam genişlik metin girişi (placeholder: "Örn: Yazılım Geliştirici"). Zorunlu alan değil, yıldız yok.

**Beceriler ve Tanıtım bölüm başlığı:**

8. "Beceriler" * — Tam genişlik metin girişi (placeholder: "Örn: JavaScript, React, Proje Yönetimi"). Alanın altında yardım metni: "Becerilerinizi virgülle ayırarak yazınız." (12px, #6B7280)
9. "Hakkımda" — Tam genişlik uzun metin alanı (textarea, yükseklik: 120px, placeholder: "Kendinizi kısaca tanıtın..."). Zorunlu değil. Sağ alt köşede karakter sayacı: "0/500" (12px, #9CA3AF)

Yıldızlı (*) alanlar zorunludur. Her etiketin yanında kırmızı * karakteri bulunur.

Formun altında (24px boşluk), sağa hizalı butonlar:
- "İptal" ikincil butonu (sol tarafta)
- "Kaydet" birincil butonu (sağ tarafta)
- Butonlar arasında 12px boşluk

---

## PROMPT 8: Mülakat Sayfası

**Sayfa türü:** Dashboard sayfası (özel düzen)
**Kullanıcı:** Aday
**Erişim:** Aday panelindeki "Mülakata Başla" butonundan, onay modalı sonrası

### Prompt

Dashboard düzeninde bir mülakat sayfası tasarla. Sidebar ve header yapısı mevcut, ancak sidebar'daki menü öğeleri tıklanamaz (devre dışı, opaklık 0.4). Bu, kullanıcının mülakat sırasında sayfadan ayrılmasını engellemek içindir.

Header'da sayfa başlığı: "Mülakat" ve yanında pozisyon bilgisi rozeti: "Frontend Geliştirici" (örnek, primary-100 arka plan, primary-700 metin, küçük rozet)

İçerik alanı (#F3F4F6 arka plan, padding 24px):

Üst kısımda bilgi çubuğu (beyaz kart, yatay düzen):
- Sol tarafta: "Pozisyon: Frontend Geliştirici" (bold)
- Orta: İlerleme göstergesi — "Soru 3/10" metni + yatay ilerleme çubuğu (genişlik: 200px, yükseklik: 6px, #1D4ED8 dolu kısım, #E5E7EB arka plan, %30 dolu)
- Sağ tarafta: "Yanıtlanan: 2/10" (yeşil metin)

Altında (24px boşluk) ana soru kartı (beyaz, büyük kart, maks genişlik: 800px, ortalanmış):

Kartın üst kısmında:
- Sol tarafta soru numarası rozeti: Daire içinde "3" (40px daire, #1D4ED8 arka plan, beyaz metin, 18px bold)
- Yanında "Soru 3" metni (18px, semibold, #111827)
- Sağ tarafta küçük rozet: "Teknik" veya "Davranışsal" (12px, ilgili renkte)

Kartın ortasında soru metni:
- "React'te state yönetimi için hangi yaklaşımları kullanırsınız? Context API ve Redux arasındaki farkları açıklayınız." (16px, regular, #374151, satır yüksekliği: 1.6)

Kartın alt kısmında yanıt alanı:
- "Yanıtınız" etiketli büyük textarea (yükseklik: 180px, tam genişlik, placeholder: "Yanıtınızı buraya yazınız...")
- Textarea altında sağda karakter sayacı

Kartın en alt kısmında navigasyon butonları:
- Sol tarafta: "Önceki" ikincil butonu (sol ok ikonu ile, ilk soruda devre dışı)
- Sağ tarafta: "Sonraki" birincil butonu (sağ ok ikonu ile). Son soruda bu buton "Mülakatı Tamamla" olarak değişir (yeşil arka plan #059669).

Ana kartın altında (16px boşluk) soru navigasyon göstergesi:
- Yatay sırayla 10 adet küçük daire (32px). Her daire bir soruyu temsil eder.
- Yanıtlanmış soru dairesi: #1D4ED8 arka plan, beyaz soru numarası
- Aktif (şu anki) soru dairesi: #1D4ED8 kenarlık (2px), beyaz arka plan, #1D4ED8 numara
- Yanıtlanmamış soru dairesi: #E5E7EB arka plan, #6B7280 numara
- Daireler arasında ince bağlantı çizgisi (#E5E7EB)
- Tıklanabilir: Herhangi bir soruya tıklayarak o soruya gidilebilir

---

## PROMPT 9: İK Paneli - Boş Durum

**Sayfa türü:** Dashboard sayfası
**Kullanıcı:** İK Uzmanı (henüz ilan oluşturmamış)
**Erişim:** İK uzmanı giriş yaptığında, ilan yoksa bu durumu görür

### Prompt

Dashboard düzeninde bir İK paneli sayfası tasarla.

Sol tarafta sabit sidebar (genişlik: 256px, arka plan: koyu lacivert #1E3A5F, tam yükseklik):
- Üst kısım: Yapay zeka ikonu + "HireMind AI" metni (beyaz, 18px bold). Altında ince ayırıcı çizgi.
- Menü öğeleri:
  1. "Panelim" - Ev ikonu ile. Aktif durumda: sol kenarlık 3px beyaz, arka plan rgba(255,255,255,0.15), opaklık 1.0.
  2. "Yeni İlan Oluştur" - Artı (+) ikonu ile. Normal durumda: opaklık 0.7.
- Sidebar alt kısmı: Kullanıcı adı (beyaz), "İK Uzmanı" etiketi, Çıkış Yap butonu.

Header'da sayfa başlığı: "Panelim"

İçerik alanı (#F3F4F6 arka plan, padding 24px):

Üst kısımda özet istatistik kartları, yatay olarak yan yana 3 adet (eşit genişlik, aralarında 16px boşluk):
1. Beyaz kart: Sol tarafta mavi daire içinde belge ikonu. Sağında: "Toplam İlan" etiketi (12px, #6B7280), altında büyük "0" rakamı (28px, bold, #111827)
2. Beyaz kart: Sol tarafta sarı daire içinde saat ikonu. Sağında: "Bekleyen Mülakat" etiketi, altında "0"
3. Beyaz kart: Sol tarafta yeşil daire içinde tik ikonu. Sağında: "Tamamlanan Mülakat" etiketi, altında "0"

İstatistik kartlarının altında (24px boşluk) "İlanlarım" başlıklı beyaz kart (tam genişlik):
- Kart başlığı: "İlanlarım" (18px, semibold)
- Kart içinde boş durum gösterimi (dikey ortalanmış):
  - Büyük gri belge ikonu (48px, #9CA3AF)
  - "Henüz iş ilanı oluşturmadınız" (16px, semibold, #374151)
  - "İlk ilanınızı oluşturarak aday eşleştirme sürecini başlatın." (14px, #6B7280)
  - "Yeni İlan Oluştur" birincil butonu (artı ikonu ile)

---

## PROMPT 10: İK Paneli - İlanlar Mevcut

**Sayfa türü:** Dashboard sayfası
**Kullanıcı:** İK Uzmanı (en az bir ilan oluşturmuş)
**Erişim:** İK uzmanı giriş yaptığında ilanlar varsa bu durumu görür

### Prompt

Dashboard düzeninde bir İK paneli sayfası tasarla. Sidebar ve header yapısı Prompt 9 ile tamamen aynı.

İçerik alanı (#F3F4F6 arka plan, padding 24px):

Üst kısımda özet istatistik kartları (Prompt 9 ile aynı yapı, ancak bu sefer verili):
1. "Toplam İlan" — "3"
2. "Bekleyen Mülakat" — "5"
3. "Tamamlanan Mülakat" — "8"

Altında (24px boşluk) "İlanlarım" başlıklı beyaz kart (tam genişlik):
- Kart başlığı sol tarafta: "İlanlarım" (18px, semibold)
- Kart başlığı sağ tarafta: "Yeni İlan Oluştur" birincil butonu (küçük boyut, artı ikonu ile)

Kart içinde tablo:
- Tablo başlık satırı (#F9FAFB arka plan): "Pozisyon" | "Oluşturma Tarihi" | "Eşleşen Aday" | "Tamamlanan" | "Durum"
- Başlık metinleri: 12px, semibold, #6B7280, büyük harf

Tablo satırları (her satır tıklanabilir, hover'da #F9FAFB arka plan + pointer imleç):

Satır 1:
- Pozisyon: "Frontend Geliştirici" (#111827, 14px, medium)
- Tarih: "28 Mar 2026" (#6B7280)
- Eşleşen Aday: "4" (ortalanmış)
- Tamamlanan: "3/4" (ortalanmış)
- Durum: Sarı "Devam Ediyor" rozeti

Satır 2:
- Pozisyon: "Backend Geliştirici"
- Tarih: "25 Mar 2026"
- Eşleşen Aday: "6"
- Tamamlanan: "6/6"
- Durum: Yeşil "Tamamlandı" rozeti

Satır 3:
- Pozisyon: "UI/UX Tasarımcı"
- Tarih: "30 Mar 2026"
- Eşleşen Aday: "3"
- Tamamlanan: "0/3"
- Durum: Sarı "Devam Ediyor" rozeti

Satırlar arasında 1px solid #E5E7EB ayırıcı. Her satır tıklandığında ilan detay sayfasına yönlendirir.

---

## PROMPT 11: Yeni İlan Oluştur

**Sayfa türü:** Dashboard sayfası
**Kullanıcı:** İK Uzmanı
**Erişim:** Sidebar'daki "Yeni İlan Oluştur" menüsünden veya panel sayfasındaki "Yeni İlan Oluştur" butonundan

### Prompt

Dashboard düzeninde bir ilan oluşturma sayfası tasarla. Sidebar yapısı Prompt 9 ile aynı, ancak "Yeni İlan Oluştur" menü öğesi aktif durumda.

Header'da sayfa başlığı: "Yeni İlan Oluştur"

İçerik alanı (#F3F4F6 arka plan, padding 24px):

Tek bir büyük beyaz kart (maks genişlik: 720px, ortalanmış):
- Kart başlığı: "İş İlanı Bilgileri" (20px, semibold, #111827)
- Başlık altında açıklama: "Aşağıdaki bilgileri girin. İlan oluşturulduğunda sistem otomatik olarak uygun adayları eşleştirecek ve mülakat sorularını hazırlayacaktır." (14px, #6B7280)
- Ayırıcı çizgi

Form alanları dikey sırayla (20px boşluk):

1. "Pozisyon Adı" * — Tam genişlik metin girişi (placeholder: "Örn: Frontend Geliştirici")
2. "Pozisyon Açıklaması" * — Tam genişlik uzun metin alanı (textarea, yükseklik: 150px, placeholder: "Pozisyonun görev tanımı, sorumlulukları ve beklentileri...")
3. "Aranan Beceriler" * — Tam genişlik metin girişi (placeholder: "Örn: React, TypeScript, REST API"). Alanın altında yardım metni: "Becerilerileri virgülle ayırarak yazınız." (12px, #6B7280)

Tüm alanlar zorunlu, etiketlerin yanında kırmızı yıldız (*).

Formun altında mavi bilgi kutusu (alert):
- Bilgi ikonu + "İlan oluşturulduğunda sistem, CV bilgileri tamamlanmış ve daha önce eşleştirilmemiş adaylar arasından uygun olanları otomatik olarak eşleştirecektir." metni (#1E40AF, 13px, #DBEAFE arka plan)

Bilgi kutusunun altında (24px boşluk), sağa hizalı butonlar:
- "İptal" ikincil butonu
- "İlanı Oluştur" birincil butonu
- Aralarında 12px boşluk

---

## PROMPT 12: İlan Detay Sayfası

**Sayfa türü:** Dashboard sayfası
**Kullanıcı:** İK Uzmanı
**Erişim:** İK panelindeki ilan tablosunda bir satıra tıklanarak

### Prompt

Dashboard düzeninde bir ilan detay sayfası tasarla. Sidebar yapısı Prompt 9 ile aynı, "Panelim" aktif durumda.

Header'da: Sol tarafta geri ok ikonu + "İlanlarım" geri bağlantısı (#2563EB, tıklanabilir) ve ardından " / Frontend Geliştirici" metni (breadcrumb yapısı). Bu sayede kullanıcı hangi ilanın detayında olduğunu bilir.

İçerik alanı (#F3F4F6 arka plan, padding 24px):

Üst kısımda ilan bilgi kartı (beyaz kart):
- Kart başlığı: "Frontend Geliştirici" (20px, semibold, #111827)
- Başlığın sağında ilan durumu rozeti: "Devam Ediyor" (sarı) veya "Tamamlandı" (yeşil)
- Ayırıcı çizgi
- Kart içinde yatay olarak 3 bilgi bloğu (eşit genişlik):
  - Blok 1: "Oluşturma Tarihi" etiketi (12px, #6B7280) + "28 Mar 2026" değeri (14px, bold)
  - Blok 2: "Eşleşen Aday" etiketi + "4" değeri
  - Blok 3: "Tamamlanan Mülakat" etiketi + "3/4" değeri

Orta kısımda ilan detayları (beyaz kart, 16px boşluk sonra):
- "Pozisyon Açıklaması" başlığı (16px, semibold) + açıklama metni (14px, #374151)
- "Aranan Beceriler" başlığı (16px, semibold) + beceriler, her biri ayrı bir rozet/etiket olarak gösterilir (küçük yuvarlak rozetler: #EFF6FF arka plan, #1D4ED8 metin, 12px)

Altında (24px boşluk) "Eşleşen Adaylar" başlıklı beyaz kart:
- Kart başlığı: "Eşleşen Adaylar" (18px, semibold)

Kart içinde tablo:
- Başlık satırı: "Ad Soyad" | "Eğitim" | "Deneyim" | "Beceriler" | "Mülakat Durumu" | "İşlem"
- Başlık metinleri: 12px, semibold, #6B7280

Tablo satırları:

Satır 1:
- Ad Soyad: Sol tarafta avatar dairesi (32px, #1D4ED8, beyaz baş harfler "AY") + "Ahmet Yılmaz" (14px, medium)
- Eğitim: "Lisans"
- Deneyim: "3-5 yıl"
- Beceriler: "React, JavaScript, CSS" (küçük gri rozetler, max 3 göster, fazlası "+2" şeklinde)
- Mülakat Durumu: Yeşil "Tamamlandı" rozeti
- İşlem: "Raporu Gör" mavi bağlantı metni (#2563EB, tıklanabilir)

Satır 2:
- "Elif Demir", "Yüksek Lisans", "5-10 yıl", "React, TypeScript, Node.js"
- Mülakat Durumu: Yeşil "Tamamlandı" rozeti
- İşlem: "Raporu Gör" bağlantısı

Satır 3:
- "Mehmet Kaya", "Lisans", "1-3 yıl", "JavaScript, HTML, CSS"
- Mülakat Durumu: Yeşil "Tamamlandı" rozeti
- İşlem: "Raporu Gör" bağlantısı

Satır 4:
- "Zeynep Arslan", "Lisans", "0-1 yıl", "React, JavaScript"
- Mülakat Durumu: Sarı "Bekliyor" rozeti
- İşlem: Yok (boş veya "Bekleniyor" gri metin)

---

## PROMPT 13: Bireysel Rapor Sayfası

**Sayfa türü:** Dashboard sayfası
**Kullanıcı:** İK Uzmanı
**Erişim:** İlan detay sayfasındaki "Raporu Gör" bağlantısından

### Prompt

Dashboard düzeninde bir bireysel aday rapor sayfası tasarla. Sidebar yapısı Prompt 9 ile aynı.

Header'da breadcrumb: "İlanlarım" bağlantısı (#2563EB) + " / " + "Frontend Geliştirici" bağlantısı (#2563EB) + " / " + "Ahmet Yılmaz" (aktif, #111827)

İçerik alanı (#F3F4F6 arka plan, padding 24px):

**Üst bölüm — Aday Bilgi Kartı (beyaz kart):**
- Sol tarafta büyük avatar dairesi (56px, #1D4ED8, beyaz "AY" harfleri)
- Avatarın sağında:
  - "Ahmet Yılmaz" (20px, semibold, #111827)
  - "Frontend Geliştirici Pozisyonu" (14px, #6B7280)
  - Altında yatay bilgi rozetleri: "Lisans" | "3-5 yıl" | "React, JavaScript, CSS" (küçük gri rozetler)

**Ana skor bölümü (üst bilgi kartının altında 24px boşluk, beyaz kart):**
- Yatay düzende 3 ana metrik, yan yana, eşit genişlikte:

Metrik 1 — Genel Uyum Skoru:
- Dairesel ilerleme göstergesi (çap: 120px)
- Dairenin ortasında "78" rakamı (32px, bold)
- Altında "/100" (14px, #6B7280)
- Daire rengi: Yeşil (#059669, çünkü 78 > 70)
- Arka plan halkası: #E5E7EB
- Altında etiket: "Genel Uyum Skoru" (14px, semibold)

Metrik 2 — CV-İlan Uyum Oranı:
- Dairesel ilerleme göstergesi (çap: 120px)
- Ortasında "%72" (32px, bold)
- Daire rengi: Yeşil
- Altında etiket: "CV-İlan Uyumu"

Metrik 3 — Mülakat Puanı:
- Dairesel ilerleme göstergesi (çap: 120px)
- Ortasında "81" (32px, bold)
- Daire rengi: Yeşil
- Altında etiket: "Mülakat Puanı"

**Soru bazlı puanlar bölümü (24px boşluk sonra, beyaz kart):**
- Kart başlığı: "Soru Bazlı Puanlar" (18px, semibold)
- 10 satır, her satırda:
  - Sol: "Soru 1" etiketi (14px, #374151, genişlik: 80px)
  - Sol yanında soru türü rozeti: "Teknik" (mavi küçük rozet) veya "Davranışsal" (mor küçük rozet)
  - Orta: Yatay ilerleme çubuğu (yükseklik: 8px, köşe yuvarlama: 4px, arka plan #E5E7EB)
  - Sağ: Puan değeri, örneğin "85" (14px, semibold)
  - Çubuğun dolu kısmının rengi puan aralığına göre: yeşil/amber/kırmızı

Örnek veriler:
- Soru 1 (Teknik): 85
- Soru 2 (Teknik): 70
- Soru 3 (Davranışsal): 90
- Soru 4 (Teknik): 65
- Soru 5 (Davranışsal): 88
- Soru 6 (Teknik): 45
- Soru 7 (Davranışsal): 92
- Soru 8 (Teknik): 78
- Soru 9 (Teknik): 55
- Soru 10 (Davranışsal): 80

**Güçlü ve Zayıf Yönler bölümü (24px boşluk sonra, iki kart yan yana, eşit genişlik, 16px boşluk):**

Sol kart — Güçlü Yönler:
- Başlık: Yeşil tik ikonu + "Güçlü Yönler" (16px, semibold, #059669)
- Ayırıcı çizgi
- Liste öğeleri (her birinin başında küçük yeşil daire):
  - "React ve modern frontend teknolojilerine hakimiyet"
  - "Problem çözme ve analitik düşünme becerisi yüksek"
  - "Takım çalışmasına yatkın, iletişim becerileri güçlü"
  - "Kod kalitesi ve best practice konularında farkındalık"

Sağ kart — Zayıf Yönler:
- Başlık: Kırmızı uyarı ikonu + "Gelişime Açık Alanlar" (16px, semibold, #DC2626)
- Ayırıcı çizgi
- Liste öğeleri (her birinin başında küçük kırmızı daire):
  - "Backend teknolojileri konusunda deneyim sınırlı"
  - "Performans optimizasyonu konusunda derinlik eksik"

**AI Genel Değerlendirmesi bölümü (24px boşluk sonra, beyaz kart):**
- Sol üstte mor/mavi yapay zeka ikonu
- Kart başlığı: "AI Değerlendirmesi" (18px, semibold, #111827)
- Arka plan: #EFF6FF (çok açık mavi)
- Sol kenarlık: 4px solid #2563EB
- İçerik metni (14px, #374151, satır yüksekliği: 1.7):
  "Ahmet Yılmaz, Frontend Geliştirici pozisyonu için güçlü bir aday profili sergilemektedir. React ekosistemindeki teknik bilgisi ve deneyimi pozisyon gereksinimleriyle büyük ölçüde örtüşmektedir. Davranışsal sorulardaki yanıtları, takım çalışması ve iletişim konularında olgun bir yaklaşıma sahip olduğunu göstermektedir. Backend bilgisinin sınırlı olması pozisyon için kritik bir eksiklik oluşturmamaktadır. Genel olarak pozisyon için uygun bir aday olarak değerlendirilmektedir."

Sayfanın en altında (32px boşluk), sola hizalı:
- "İlan Detayına Dön" ikincil butonu (sol ok ikonu ile)

---

## PROMPT 14: Mülakat Başlama Onay Modalı

**Bileşen türü:** Modal
**Kullanıcı:** Aday
**Tetiklenme:** Aday panelindeki "Mülakata Başla" butonuna tıklandığında

### Prompt

Koyu yarı saydam overlay (#000000, %50 opaklık) üzerinde, ekranın ortasında beyaz bir onay modalı tasarla.

Modal kutusu (genişlik: 480px, köşe yuvarlama: 12px, gölge: lg):

Üst bölüm (header):
- Sol tarafta mavi bilgi ikonu (24px, #2563EB)
- Yanında "Mülakata Başla" başlığı (16px, semibold, #111827)
- Sağ üstte X kapatma butonu (gray-400, hover'da gray-600)
- Alt kenarlık: 1px solid #E5E7EB

Orta bölüm (body, padding: 24px):
- Açıklama metni (14px, #374151):
  "Mülakatı başlatmak üzeresiniz. Lütfen aşağıdaki kuralları dikkatlice okuyunuz:"
- Kurallar listesi (16px üst boşluk, her madde başında sayı dairesi):
  1. "Mülakat 10 sorudan oluşmaktadır."
  2. "Tüm soruları yazılı olarak yanıtlamanız gerekmektedir."
  3. "Mülakat tek seferde tamamlanmalıdır."
  4. "Çıkış yaparsanız tüm yanıtlarınız silinir ve baştan başlarsınız."
- Liste öğeleri: 14px, #374151, satırlar arası 8px boşluk
- Listenin altında (16px boşluk) amber uyarı kutusu:
  Uyarı ikonu + "Bu işlem geri alınamaz." metni (13px, bold, #92400E, #FEF3C7 arka plan)

Alt bölüm (footer, üst kenarlık, padding: 16px 24px):
- Sol tarafta: "İptal" ikincil butonu
- Sağ tarafta: "Mülakatı Başlat" birincil butonu
- Butonlar arasında boşluk (justify-between düzeni)

---

## PROMPT 15: Mülakat Gönderme Onay Modalı

**Bileşen türü:** Modal
**Kullanıcı:** Aday
**Tetiklenme:** Mülakat sayfasında son soruda "Mülakatı Tamamla" butonuna tıklandığında

### Prompt

Koyu yarı saydam overlay üzerinde, ekranın ortasında beyaz bir onay modalı tasarla.

Modal kutusu (genişlik: 480px, köşe yuvarlama: 12px, gölge: lg):

Üst bölüm (header):
- Sol tarafta yeşil tik ikonu (24px, #059669)
- Yanında "Mülakatı Tamamla" başlığı (16px, semibold, #111827)
- Sağ üstte X kapatma butonu
- Alt kenarlık

Orta bölüm (body, padding: 24px):
- Büyük yeşil tik ikonu ortalanmış (48px, #059669)
- Altında ortalanmış metin (16px, semibold, #111827): "Mülakatınızı göndermek istediğinize emin misiniz?"
- Altında ortalanmış açıklama (14px, #6B7280): "Gönderdikten sonra yanıtlarınızı değiştiremezsiniz."
- Altında bilgi satırı: "Yanıtlanan soru: 10/10" (14px, #059669, bold)

Alt bölüm (footer):
- Sol: "Geri Dön" ikincil butonu
- Sağ: "Gönder ve Tamamla" birincil butonu (yeşil arka plan #059669)

---

## PROMPT 16: Mülakat Terk Uyarı Modalı

**Bileşen türü:** Modal
**Kullanıcı:** Aday
**Tetiklenme:** Mülakat sırasında sidebar menüsüne, çıkış butonuna veya tarayıcı geri butonuna basıldığında

### Prompt

Koyu yarı saydam overlay üzerinde, ekranın ortasında beyaz bir uyarı modalı tasarla.

Modal kutusu (genişlik: 480px, köşe yuvarlama: 12px, gölge: lg):

Üst bölüm (header):
- Sol tarafta kırmızı uyarı üçgen ikonu (24px, #DC2626)
- Yanında "Mülakatı Terk Et" başlığı (16px, semibold, #DC2626)
- Sağ üstte X kapatma butonu
- Alt kenarlık

Orta bölüm (body, padding: 24px):
- Büyük kırmızı uyarı ikonu ortalanmış (48px, #DC2626)
- Altında ortalanmış metin (16px, semibold, #111827): "Mülakatı terk etmek istediğinize emin misiniz?"
- Altında ortalanmış uyarı açıklaması (14px, #DC2626, bold): "Tüm yanıtlarınız silinecek ve mülakata baştan başlamanız gerekecektir."
- Altında bilgi satırı (14px, #6B7280): "Şu ana kadar yanıtlanan: 3/10 soru"

Alt bölüm (footer):
- Sol: "Mülakata Devam Et" birincil butonu (mülakatta kalması teşvik edilir, bu yüzden birincil)
- Sağ: "Terk Et" tehlike butonu (kırmızı arka plan #DC2626, beyaz metin)

---

## PROMPT 17: İlan Oluşturma Sonuç Modalı

**Bileşen türü:** Modal
**Kullanıcı:** İK Uzmanı
**Tetiklenme:** "İlanı Oluştur" butonuna tıklayıp sistem eşleştirme işlemini tamamladığında

### Prompt

Koyu yarı saydam overlay üzerinde, ekranın ortasında beyaz bir sonuç modalı tasarla.

Modal kutusu (genişlik: 480px, köşe yuvarlama: 12px, gölge: lg):

Üst bölüm (header):
- Sol tarafta yeşil tik ikonu (24px, #059669)
- Yanında "İlan Oluşturuldu" başlığı (16px, semibold, #111827)
- X kapatma butonu yok (kullanıcı butonlardan yönlendirilmeli)
- Alt kenarlık

Orta bölüm (body, padding: 24px):
- Üstte ortalanmış büyük yeşil daire içinde beyaz tik ikonu (64px daire, #059669 arka plan)
- Altında ortalanmış başlık (18px, semibold, #111827): "Frontend Geliştirici" (örnek pozisyon adı)
- Altında ortalanmış alt metin (14px, #6B7280): "İlanınız başarıyla oluşturuldu"

- Altında (20px boşluk) beyaz arka planlı bilgi kutusu (hafif gri kenarlık):
  - Yatay olarak 3 bilgi bloğu (ortalanmış, eşit genişlik):
    - "Taranan CV" — "7" (büyük rakam, bold)
    - "Eşleşen Aday" — "4" (büyük rakam, bold, #059669)
    - "Gönderilen Mülakat" — "4" (büyük rakam, bold, #2563EB)

- Altında (16px boşluk) açıklama (14px, #6B7280, ortalanmış):
  "Eşleşen adaylara mülakat soruları otomatik olarak gönderildi."

Alt bölüm (footer):
- Sol: "Panele Dön" ikincil butonu
- Sağ: "İlan Detayını Gör" birincil butonu

---

## PROMPT 18: Çıkış Onay Modalı

**Bileşen türü:** Modal
**Kullanıcı:** Tüm kullanıcılar
**Tetiklenme:** Sidebar alt kısmındaki "Çıkış Yap" butonuna tıklandığında

### Prompt

Koyu yarı saydam overlay üzerinde, ekranın ortasında beyaz bir onay modalı tasarla.

Modal kutusu (genişlik: 400px, köşe yuvarlama: 12px, gölge: lg):

Üst bölüm (header):
- "Çıkış Yap" başlığı (16px, semibold, #111827)
- Sağ üstte X kapatma butonu
- Alt kenarlık

Orta bölüm (body, padding: 24px):
- Ortalanmış büyük çıkış/kapı ikonu (48px, #6B7280)
- Altında ortalanmış metin (16px, regular, #374151): "Hesabınızdan çıkış yapmak istediğinize emin misiniz?"

Alt bölüm (footer):
- Sol: "İptal" ikincil butonu
- Sağ: "Çıkış Yap" tehlike butonu (kırmızı arka plan #DC2626)
