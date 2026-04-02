# HireMind AI - Ürün Gereksinim Dokümanı (PRD)

**Proje Adı:** HireMind AI
**Doküman Versiyonu:** 1.0
**Tarih:** 31 Mart 2026
**Proje Türü:** Okul Projesi
**Dil:** Türkçe (tek dil)

---

## İçindekiler

1. [Problem Tanımı](#1-problem-tanımı)
2. [Hedef Kullanıcı Profili](#2-hedef-kullanıcı-profili)
3. [Kullanıcı Yolculuğu](#3-kullanıcı-yolculuğu)
4. [MVP Özellikleri](#4-mvp-özellikleri)
5. [CV Form Formatı](#5-cv-form-formatı)
6. [Teknoloji Seti](#6-teknoloji-seti)
7. [Kullanıcı Akış Diyagramı](#7-kullanıcı-akış-diyagramı)
8. [Temel Özellik Listesi](#8-temel-özellik-listesi)
9. [Kısa Ürün Konsepti](#9-kısa-ürün-konsepti)

---

## 1. Problem Tanımı

### 1.1 Mevcut Durum

Geleneksel işe alım süreçlerinde aşağıdaki sorunlar yaşanmaktadır:

- **Subjektif ve tutarsız değerlendirme:** Farklı mülakatçılar aynı adayı farklı şekilde değerlendirebiliyor. Bir adayın aldığı puan, karşısındaki kişiye göre değişiyor.
- **Manuel CV-ilan analizi:** CV'lerin iş ilanı gereksinimleriyle ne kadar örtüştüğü İK uzmanı tarafından tek tek incelenerek belirleniyor. Bu süreç hem yavaş hem de hataya açık.
- **Standart soru metodolojisi eksikliği:** Pozisyona özel hazırlanmış, tutarlı bir soru seti bulunmuyor. Her mülakat farklı sorularla yapılıyor ve bu durum adaylar arası adil karşılaştırmayı zorlaştırıyor.
- **Zaman ve verimlilik kaybı:** Yukarıdaki süreçlerin tamamı manuel yürütüldüğü için İK uzmanlarının zamanı verimsiz kullanılıyor.

### 1.2 Çözüm Yaklaşımı

HireMind AI bu sorunları tek bir platformda çözer:

- CV bilgileri ile iş ilanı gereksinimlerini yapay zeka ile otomatik eşleştirir.
- Pozisyona özel mülakat soruları otomatik üretir.
- Aday yanıtlarını yapay zeka ile analiz ederek tutarlı, veri odaklı bireysel raporlar oluşturur.
- İK uzmanının karar sürecini hızlandırır ve objektifleştirir.

### 1.3 Objektiflik Tanımı

Bu projede "objektiflik" kavramı şu şekilde tanımlanmıştır: Her aday için aynı kriterler uygulanarak tutarlı değerlendirme yapılması. Amaç insan faktörünü tamamen ortadan kaldırmak değil; değerlendirme sürecindeki tutarsızlığı minimize etmektir.

---

## 2. Hedef Kullanıcı Profili

Sistemde iki farklı kullanıcı rolü bulunmaktadır. Tek yetki seviyesi vardır (admin, moderatör gibi ara roller yoktur). Firma ölçeği kısıtlaması yoktur.

### 2.1 İK Uzmanı (Ana Kullanıcı)

| Özellik | Detay |
|---------|-------|
| Rolü | İş ilanı oluşturur, aday raporlarını inceler |
| Teknik seviyesi | Düşük-orta (sistem basit ve sezgisel olmalı) |
| Temel beklentisi | Hızlı sonuç, anlaşılır raporlar, kolay kullanım |
| Sistem üzerindeki yetkileri | İlan oluşturma, eşleşen adayları görme, bireysel raporları görüntüleme |

### 2.2 Aday (İkincil Kullanıcı)

| Özellik | Detay |
|---------|-------|
| Rolü | Özgeçmiş bilgilerini girer, eşleştirildiği mülakatı tamamlar |
| Teknik seviyesi | Düşük-orta |
| Temel beklentisi | Anlaşılır sorular, kolay arayüz |
| Sistem üzerindeki yetkileri | CV formu doldurma, bekleyen mülakatı görme ve tamamlama |

---

## 3. Kullanıcı Yolculuğu

### 3.1 Aday Yolculuğu

1. **Kayıt:** Aday sisteme "Aday" rolüyle kayıt olur.
2. **Giriş:** E-posta ve şifre ile giriş yapar.
3. **CV formu doldurma:** Bölüm 5'te tanımlanan formata uygun olarak özgeçmiş bilgilerini girer.
4. **Bekleme:** Aday panelinde bekler. Henüz bir ilanla eşleştirilmemişse herhangi bir mülakat görünmez.
5. **Mülakat bildirimi:** Bir İK uzmanı ilan oluşturup sistem bu adayı eşleştirdiğinde, aday panelinde "Bekleyen mülakatınız var" bildirimi görünür. Bildirimde eşleştiği pozisyon adı yer alır.
6. **Mülakata başlama:** Aday mülakata başlar. 10 soru ekranda yazılı olarak sunulur.
7. **Yanıtlama:** Aday her soruyu yazılı olarak yanıtlar. Mülakat tek seferde tamamlanmalıdır. Aday mülakatı yarıda bırakıp çıkış yaparsa tüm ilerleme silinir ve mülakata baştan başlaması gerekir.
8. **Tamamlama:** Tüm soruları yanıtlayıp gönderdiğinde "Mülakat tamamlandı" mesajı görüntülenir.

### 3.2 İK Uzmanı Yolculuğu

1. **Kayıt:** İK uzmanı sisteme "İK" rolüyle kayıt olur.
2. **Giriş:** E-posta ve şifre ile giriş yapar.
3. **İK paneli:** Panelde iki ana işlev görür: yeni ilan oluşturma ve mevcut ilanların raporlarını inceleme.
4. **İlan oluşturma:** Pozisyon adı, açıklama ve aranan beceriler bilgilerini girerek yeni iş ilanı oluşturur.
5. **Otomatik eşleştirme (arka plan):** İlan oluşturulduğu anda sistem şunları otomatik yapar:
   - Sistemdeki müsait adayları (daha önce herhangi bir ilanla eşleştirilmemiş) tarar.
   - Yapay zeka ile CV bilgilerini ilanın gereksinimleriyle karşılaştırır.
   - Uygun bulunan adayları bu ilanla eşleştirir.
   - Her eşleşen aday için 10 mülakat sorusu üretir.
   - Eşleşen adaylara mülakatı gönderir.
6. **Sonuç bildirimi:** İK uzmanına "İlan oluşturuldu, X aday eşleşti" mesajı gösterilir.
7. **Rapor inceleme:** İK uzmanı ilan listesinden bir ilana tıklayarak eşleşen adayları görür. Mülakatını tamamlamış adayların bireysel raporlarını görüntüler.

### 3.3 Kritik İş Kuralları

- **Tek eşleşme kuralı:** Bir aday ömür boyu yalnızca bir ilanla eşleştirilir. Eşleşen aday artık "müsait" havuzundan çıkar ve sonraki ilanlar için değerlendirilmez.
- **Anlık eşleştirme:** İlan "açık kalma" süresi yoktur. Eşleştirme yalnızca ilanın oluşturulduğu anda yapılır. İlan oluşturulduktan sonra sisteme kayıt olan veya CV dolduran adaylar bu ilana dahil edilmez.
- **Otomatik soru gönderimi:** Yapay zekanın ürettiği sorular İK uzmanı tarafından görülmez, düzenlenmez veya onaylanmaz. Sorular doğrudan adaya gönderilir.
- **Mülakat bütünlüğü:** Mülakat yarıda bırakılamaz. Çıkış yapılırsa ilerleme sıfırlanır.
- **Raporlama zamanlaması:** Raporlar kişi bazlıdır. Bir adayın mülakatı tamamlandığı anda o adayın raporu İK uzmanına görünür olur. Diğer adayların tamamlaması beklenmez.

---

## 4. MVP Özellikleri

### 4.1 Kapsama Dahil

| # | Özellik | Açıklama |
|---|---------|----------|
| 1 | Kullanıcı sistemi | Kayıt ve giriş (İK uzmanı ve Aday olarak ayrı roller) |
| 2 | CV formu | Aday, özgeçmiş bilgilerini Bölüm 5'teki formata uygun olarak doldurur |
| 3 | İş ilanı oluşturma | İK uzmanı pozisyon adı, açıklama ve aranan beceriler girerek ilan oluşturur |
| 4 | CV-ilan eşleştirme | İlan oluşturulduğu anda yapay zeka müsait adayların CV bilgilerini tarar ve uygun olanları eşleştirir |
| 5 | Soru üretimi | Yapay zeka pozisyona özel 10 mülakat sorusu üretir. Teknik sorular pozisyona göre özelleştirilir, davranışsal sorular adaylar arası tutarlılık için standart tutulur. Dengeleme yapay zeka tarafından otomatik yapılır |
| 6 | Mülakat arayüzü | Aday, 10 soruyu yazılı olarak tek oturumda yanıtlar |
| 7 | Cevap analizi ve puanlama | Yapay zeka her yanıtı alaka düzeyi, ciddiyet ve kalite açısından analiz edip puanlar. Puanlama kriterleri yapay zekaya baştan tanımlanır ve pozisyonlar arası büyük farklılık göstermez |
| 8 | Bireysel raporlama | Her aday için ayrı rapor üretilir |

### 4.2 Rapor İçeriği

Her bireysel rapor aşağıdaki bilgileri içerir:

- **Genel uyum skoru:** 0-100 arası sayısal puan
- **Soru bazlı puanlar:** Her soruya verilen yanıtın ayrı puanı
- **Güçlü yönler özeti:** Adayın öne çıkan yetkinlikleri
- **Zayıf yönler özeti:** Adayın gelişime açık alanları
- **CV-ilan uyum oranı:** Özgeçmiş bilgileri ile ilan gereksinimleri arasındaki örtüşme yüzdesi
- **AI genel değerlendirmesi:** Yapay zekanın aday hakkındaki kısa özet yorumu

### 4.3 Kapsam Dışı (Yapılmayacak)

Aşağıdaki özellikler bu proje kapsamında geliştirilmeyecektir:

- Adaylar arası karşılaştırmalı raporlama
- E-posta veya anlık bildirim sistemi
- PDF / Word formatında CV yükleme
- İK uzmanının soruları incelemesi, düzenlemesi veya onaylaması
- Raporlara not veya yorum eklenmesi
- Harici sistemlerle entegrasyon (LinkedIn, Kariyer.net, ATS yazılımları vb.)
- Çoklu dil desteği (yalnızca Türkçe desteklenir)
- Ses veya video tabanlı mülakat

---

## 5. CV Form Formatı

Adaylar özgeçmiş bilgilerini aşağıdaki form alanlarını doldurarak sisteme girer. Dosya yükleme (PDF, Word vb.) desteklenmez.

| # | Alan Adı | Giriş Tipi | Zorunlu | Açıklama |
|---|----------|-----------|---------|----------|
| 1 | Ad Soyad | Serbest metin | Evet | Adayın tam adı |
| 2 | E-posta | E-posta formatı | Evet | İletişim adresi |
| 3 | Telefon | Serbest metin | Evet | İletişim numarası |
| 4 | Eğitim Seviyesi | Açılır menü | Evet | Seçenekler: Lise, Ön Lisans, Lisans, Yüksek Lisans, Doktora |
| 5 | Okul / Bölüm | Serbest metin | Evet | Mezun olunan veya devam edilen okul ve bölüm |
| 6 | Toplam İş Deneyimi | Açılır menü | Evet | Seçenekler: Deneyimsiz, 0-1 yıl, 1-3 yıl, 3-5 yıl, 5-10 yıl, 10+ yıl |
| 7 | Son Çalıştığı Pozisyon | Serbest metin | Hayır | En son veya halen çalıştığı pozisyon |
| 8 | Beceriler | Virgülle ayrılmış metin veya etiket | Evet | Adayın sahip olduğu teknik ve kişisel beceriler |
| 9 | Hakkımda | Uzun metin alanı (maks. 500 karakter) | Hayır | Adayın kendini kısaca tanıtması |

---

## 6. Teknoloji Seti

| Katman | Teknoloji | Seçim Gerekçesi |
|--------|-----------|-----------------|
| Frontend | React | Yaygın kullanım, geniş kaynak, bileşen tabanlı yapı |
| Backend | Node.js + Express | JavaScript ile full-stack geliştirme, hızlı API oluşturma |
| Veritabanı | MongoDB | Esnek şema yapısı, CV gibi değişken verileri saklamaya uygun |
| Yapay Zeka | Google Gemini API | Ücretsiz kullanım kotası okul projesi için yeterli, Türkçe dil desteği mevcut |
| Platform | Web uygulaması | Tarayıcı üzerinden erişim, kurulum gerektirmez |
| Dil | Türkçe | Tek dil desteği |

---

## 7. Kullanıcı Akış Diyagramı

### 7.1 Aday Akışı

**Adım 1 - Kayıt ve Giriş:**
Aday sisteme "Aday" rolüyle kayıt olur. Kayıt sonrası e-posta ve şifre ile giriş yapar.

**Adım 2 - CV Formu Doldurma:**
Giriş yaptıktan sonra aday, Bölüm 5'te tanımlanan 9 alanlı CV formunu doldurur ve kaydeder. Bu adım tamamlanmadan aday mülakat alamaz.

**Adım 3 - Aday Paneli (Bekleme):**
Aday paneline yönlendirilir. Burada bekleyen bir mülakatı olup olmadığı gösterilir. Henüz bir ilanla eşleştirilmemişse ekranda "Bekleyen mülakatınız yok" mesajı görünür.

**Adım 4 - Mülakat Bildirimi:**
Bir İK uzmanı ilan oluşturup sistem bu adayı eşleştirdiğinde, aday panelinde "Bekleyen mülakatınız var" bildirimi görünür. Bildirimde pozisyon adı yer alır. Bu bildirim ancak aday tekrar giriş yaptığında veya paneli açtığında görünür (anlık bildirim gönderilmez).

**Adım 5 - Mülakata Başlama:**
Aday mülakata başlar. Pozisyon bilgisi ekranın üst kısmında gösterilir. 10 mülakat sorusu sırayla sunulur.

**Adım 6 - Yanıtlama:**
Aday her soruyu metin kutusuna yazılı olarak yanıtlar. Mülakat tek oturumda tamamlanmalıdır.
- Eğer aday tarayıcıyı kapatır veya oturumdan çıkarsa: tüm yanıtlar silinir ve mülakat baştan başlar.

**Adım 7 - Tamamlama:**
Tüm soruları yanıtlayıp "Gönder" butonuna bastığında mülakat tamamlanmış olur. Aday ekranında "Mülakatınız başarıyla tamamlandı" mesajı gösterilir. Bu noktadan sonra aday artık başka mülakatlarla eşleştirilemez.

---

### 7.2 İK Uzmanı Akışı

**Adım 1 - Kayıt ve Giriş:**
İK uzmanı sisteme "İK" rolüyle kayıt olur. Kayıt sonrası e-posta ve şifre ile giriş yapar.

**Adım 2 - İK Paneli:**
Giriş sonrası İK paneline yönlendirilir. Panelde iki ana bölüm bulunur:
- Yeni iş ilanı oluşturma alanı
- Daha önce oluşturulmuş ilanların listesi

**Adım 3 - İlan Oluşturma:**
İK uzmanı aşağıdaki bilgileri girerek yeni bir iş ilanı oluşturur:
- Pozisyon adı
- Pozisyon açıklaması
- Aranan beceriler / yetkinlikler

**Adım 4 - Otomatik Eşleştirme (Sistem Tarafından):**
İlan kaydedildiği anda sistem arka planda şu işlemleri otomatik gerçekleştirir:
1. Sistemdeki tüm müsait adayları tespit eder (daha önce hiçbir ilanla eşleştirilmemiş ve CV formunu doldurmuş adaylar).
2. Yapay zeka, bu adayların CV bilgilerini ilanın gereksinimleriyle karşılaştırır.
3. Uygun bulunan adaylar bu ilanla eşleştirilir ve müsait havuzundan çıkarılır.
4. Her eşleşen aday için pozisyona özel 10 mülakat sorusu üretilir.
5. Mülakatlar adayların panellerine gönderilir.

**Adım 5 - Sonuç Bildirimi:**
İşlem tamamlandığında İK uzmanına "İlan oluşturuldu. X aday eşleştirildi." mesajı gösterilir.

**Adım 6 - İlan Takibi:**
İK uzmanı ilan listesinden herhangi bir ilana tıklayarak detayına gider. Detay sayfasında:
- Eşleşen adayların listesi
- Her adayın mülakat durumu (bekliyor / tamamladı)

**Adım 7 - Rapor Görüntüleme:**
Mülakatını tamamlamış bir adaya tıklanarak bireysel rapor açılır. Rapor içeriği Bölüm 4.2'de tanımlanmıştır. Raporlar salt okunurdur, not veya yorum eklenemez.

---

## 8. Temel Özellik Listesi

### 8.1 Kimlik ve Yetkilendirme

| # | Özellik | Açıklama |
|---|---------|----------|
| 1 | Kayıt | Kullanıcı "Aday" veya "İK Uzmanı" rolünü seçerek kayıt olur |
| 2 | Giriş / Çıkış | E-posta ve şifre ile giriş yapılır |
| 3 | Rol tabanlı arayüz | Aday ve İK uzmanı tamamen farklı paneller görür. Rollerarası geçiş yoktur |

### 8.2 Aday Modülü

| # | Özellik | Açıklama |
|---|---------|----------|
| 4 | CV formu | 9 alanlı form (Bölüm 5'teki format). Dosya yükleme desteklenmez |
| 5 | Aday paneli | Bekleyen mülakat varsa pozisyon adıyla birlikte bildirim gösterilir |
| 6 | Mülakat ekranı | 10 soru yazılı olarak sunulur, yazılı yanıtlanır, tek oturumda tamamlanır |

### 8.3 İK Modülü

| # | Özellik | Açıklama |
|---|---------|----------|
| 7 | İş ilanı oluşturma | Pozisyon adı, açıklama ve aranan beceriler girilerek ilan oluşturulur |
| 8 | İlan listesi | Oluşturulan tüm ilanlar listelenir, her ilanda eşleşen adaylar ve durumları görünür |
| 9 | Bireysel rapor görüntüleme | Mülakatını tamamlayan adayların raporları görüntülenir (salt okunur) |

### 8.4 Yapay Zeka Modülü (Arka Plan)

| # | Özellik | Açıklama |
|---|---------|----------|
| 10 | CV-ilan eşleştirme | İlan oluşturulunca müsait adayların CV bilgileri ile ilan gereksinimleri yapay zeka tarafından karşılaştırılır ve uygun adaylar tespit edilir |
| 11 | Soru üretimi | Pozisyona özel 10 soru üretilir. Teknik sorular pozisyona göre özelleştirilir, davranışsal sorular standart tutulur. Denge yapay zeka tarafından otomatik sağlanır |
| 12 | Cevap analizi ve puanlama | Aday yanıtları alaka düzeyi, ciddiyet ve kalite açısından analiz edilerek puanlanır |
| 13 | Rapor üretimi | Bölüm 4.2'de tanımlanan içerikte bireysel rapor oluşturulur |

---

## 9. Kısa Ürün Konsepti

**HireMind AI**, insan kaynakları uzmanlarının işe alım sürecini hızlandıran ve tutarlı hale getiren, yapay zeka destekli bir mülakat asistanıdır.

Sistem iki kullanıcı rolüne hizmet eder: adaylar ve İK uzmanları. Adaylar sisteme kayıt olarak özgeçmiş bilgilerini form aracılığıyla girer. İK uzmanları ise pozisyona özel iş ilanları oluşturur.

Bir iş ilanı oluşturulduğu anda sistem devreye girer: mevcut ve henüz eşleştirilmemiş adaylar arasından uygun olanları yapay zeka ile tespit eder, pozisyona özel 10 mülakat sorusu üretir ve bu adaylara mülakatı otomatik olarak gönderir. Adaylar soruları yazılı olarak tek oturumda yanıtlar.

Mülakat tamamlandığında yapay zeka yanıtları analiz ederek her aday için bireysel rapor oluşturur. Rapor; genel uyum skoru, soru bazlı puanlar, güçlü ve zayıf yönler özeti, CV-ilan uyum oranı ve yapay zekanın genel değerlendirmesini içerir.

Sonuç olarak İK uzmanı, subjektif yargılar yerine tutarlı ve veri odaklı raporlara dayalı kararlar verir.
