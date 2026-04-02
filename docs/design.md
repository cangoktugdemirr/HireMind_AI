# HireMind AI - Tasarım Sistemi (Design System)

**Proje:** HireMind AI
**Platform:** Web Uygulaması
**Tema:** Yalnızca Açık Tema
**Dil:** Türkçe
**Tasarım Tarzı:** Kurumsal dashboard, ciddi ve profesyonel

Bu doküman, HireMind AI projesinin tüm sayfalarında tutarlılık sağlamak için uyulması gereken tasarım kurallarını tanımlar. Her sayfa promptu bu dosyadaki kurallarla birlikte değerlendirilmelidir.

---

## 1. Renk Sistemi

### 1.1 Ana Renk Paleti (Primary - Kurumsal Mavi)

| Token | Hex Kodu | Kullanım Alanı |
|-------|----------|----------------|
| primary-900 | #1E3A5F | Sidebar arka planı, koyu başlıklar |
| primary-700 | #1D4ED8 | Birincil butonlar, aktif menü öğeleri |
| primary-600 | #2563EB | Bağlantılar, vurgular |
| primary-500 | #3B82F6 | Buton hover durumları |
| primary-100 | #DBEAFE | Seçili satır arka planı, bilgi kutusu arka planı |
| primary-50 | #EFF6FF | Hafif vurgu alanları |

### 1.2 Nötr Renkler (Neutral)

| Token | Hex Kodu | Kullanım Alanı |
|-------|----------|----------------|
| gray-900 | #111827 | Ana başlıklar, birincil metin |
| gray-700 | #374151 | Gövde metni |
| gray-500 | #6B7280 | İkincil metin, etiketler |
| gray-400 | #9CA3AF | Placeholder metinler, devre dışı metin |
| gray-300 | #D1D5DB | Kenarlıklar, ayırıcı çizgiler |
| gray-200 | #E5E7EB | Hafif kenarlıklar |
| gray-100 | #F3F4F6 | Sayfa arka planı |
| gray-50 | #F9FAFB | Alternatif satır arka planı |
| white | #FFFFFF | Kart, input, modal arka planı |

### 1.3 Anlamsal Renkler (Semantic)

| Durum | Renk | Hex | Açık Arka Plan | Hex |
|-------|------|-----|-----------------|-----|
| Başarı (Success) | Yeşil | #059669 | Açık Yeşil | #D1FAE5 |
| Uyarı (Warning) | Amber | #D97706 | Açık Amber | #FEF3C7 |
| Hata (Error) | Kırmızı | #DC2626 | Açık Kırmızı | #FEE2E2 |
| Bilgi (Info) | Mavi | #2563EB | Açık Mavi | #DBEAFE |

### 1.4 Skor Renkleri

Sistem genelinde 0-100 arası puanlar aşağıdaki renklerle gösterilir:

| Aralık | Etiket | Renk | Hex |
|--------|--------|------|-----|
| 70 - 100 | Yüksek | Yeşil | #059669 |
| 40 - 69 | Orta | Amber | #D97706 |
| 0 - 39 | Düşük | Kırmızı | #DC2626 |

---

## 2. Tipografi

| Öğe | Boyut | Ağırlık | Renk |
|-----|-------|---------|------|
| Sayfa Başlığı (H1) | 24px | Bold (700) | gray-900 |
| Bölüm Başlığı (H2) | 20px | Semibold (600) | gray-900 |
| Alt Başlık (H3) | 16px | Semibold (600) | gray-900 |
| Gövde Metni | 14px | Regular (400) | gray-700 |
| Küçük Metin | 12px | Regular (400) | gray-500 |
| Buton Metni | 14px | Medium (500) | white veya gray-700 |
| Etiket (Label) | 14px | Medium (500) | gray-700 |
| Placeholder | 14px | Regular (400) | gray-400 |

Font ailesi: Inter. Yedek: system-ui, -apple-system, sans-serif.

---

## 3. Boşluk ve Düzen

### 3.1 Boşluk Skalası

Temel birim: 4px. Tüm boşluklar bu birimin katlarıdır.

| Token | Değer | Kullanım |
|-------|-------|----------|
| xs | 4px | İkon ile metin arası |
| sm | 8px | İç öğeler arası |
| md | 12px | Form öğeleri arası |
| base | 16px | Kart iç boşluğu (padding) |
| lg | 24px | Bölümler arası, kart iç boşluğu |
| xl | 32px | Ana bölümler arası |
| 2xl | 48px | Sayfa üst/alt boşlukları |

### 3.2 Sayfa Düzeni Ölçüleri

| Öğe | Değer |
|-----|-------|
| Sidebar genişliği | 256px |
| Üst header yüksekliği | 64px |
| İçerik alanı maks. genişliği | 1200px |
| İçerik alanı padding | 24px |
| Auth sayfa kart genişliği | 420px |

---

## 4. Köşe Yuvarlama ve Gölge

### 4.1 Köşe Yuvarlama (Border Radius)

| Öğe | Değer |
|-----|-------|
| Inputlar, butonlar | 6px |
| Kartlar | 8px |
| Modallar | 12px |
| Avatarlar, rozetler | 9999px (tam yuvarlak) |

### 4.2 Gölge (Box Shadow)

| Seviye | Değer | Kullanım |
|--------|-------|----------|
| sm | 0 1px 2px rgba(0,0,0,0.05) | Inputlar |
| md | 0 4px 6px rgba(0,0,0,0.07) | Kartlar |
| lg | 0 10px 15px rgba(0,0,0,0.1) | Modallar, dropdown menüler |

---

## 5. Bileşenler (Components)

### 5.1 Butonlar

**Birincil Buton (Primary)**
- Arka plan: primary-700 (#1D4ED8)
- Metin: white
- Hover: primary-500 (#3B82F6)
- Padding: 10px 20px
- Köşe yuvarlama: 6px
- Kullanım: Ana eylemler (Giriş Yap, Kayıt Ol, İlan Oluştur, Gönder)

**İkincil Buton (Secondary)**
- Arka plan: white
- Kenarlık: 1px solid gray-300
- Metin: gray-700
- Hover arka plan: gray-50
- Padding: 10px 20px
- Köşe yuvarlama: 6px
- Kullanım: İptal, geri, ikincil işlemler

**Tehlike Butonu (Danger)**
- Arka plan: #DC2626
- Metin: white
- Hover: #B91C1C
- Kullanım: Silme, çıkış onayı gibi geri dönüşü zor işlemler

**Devre Dışı Durum (Disabled)**
- Arka plan: gray-200
- Metin: gray-400
- İmleç: not-allowed
- Tüm buton türleri için geçerlidir

### 5.2 Form Elemanları

**Metin Girişi (Text Input)**
- Yükseklik: 40px
- Kenarlık: 1px solid gray-300
- Köşe yuvarlama: 6px
- Padding: 0 12px
- Placeholder rengi: gray-400
- Odaklanma (focus): Kenarlık primary-600, dış halka (ring) 2px primary-100
- Hata durumu: Kenarlık #DC2626, altında kırmızı hata mesajı

**Uzun Metin Alanı (Textarea)**
- Minimum yükseklik: 100px
- Diğer kurallar text input ile aynı
- Resize: vertical

**Açılır Menü (Select/Dropdown)**
- Görünüm text input ile aynı
- Sağ tarafta aşağı ok ikonu

**Etiket (Label)**
- Font: 14px Medium, gray-700
- Input'un üstünde, 6px boşluk ile
- Zorunlu alanlar: etiketin yanında kırmızı yıldız karakteri (*)

**Hata Mesajı**
- Font: 12px Regular
- Renk: #DC2626
- Input'un altında, 4px boşluk ile

### 5.3 Kartlar (Cards)

- Arka plan: white
- Kenarlık: 1px solid gray-200
- Köşe yuvarlama: 8px
- Gölge: md
- İç boşluk (padding): 24px
- Kartlar arası boşluk: 16px

### 5.4 Tablolar (Tables)

- Başlık satırı arka planı: gray-50
- Başlık metni: 12px Semibold, gray-500, uppercase
- Satır kenarlığı: alt kenarlık 1px solid gray-200
- Satır hover: gray-50 arka plan
- Hücre padding: 12px 16px
- Gövde metni: 14px Regular, gray-700

### 5.5 Durum Rozetleri (Status Badges)

Rozetler tablo ve kartlarda kullanıcı/öğe durumunu gösterir.

| Durum | Metin | Arka Plan | Metin Rengi | Kenarlık |
|-------|-------|-----------|-------------|----------|
| Bekliyor | Bekliyor | #FEF3C7 | #92400E | 1px solid #FDE68A |
| Tamamlandı | Tamamlandı | #D1FAE5 | #065F46 | 1px solid #A7F3D0 |
| Müsait | Müsait | #DBEAFE | #1E40AF | 1px solid #BFDBFE |
| Eşleştirildi | Eşleştirildi | #E0E7FF | #3730A3 | 1px solid #C7D2FE |

- Padding: 4px 10px
- Köşe yuvarlama: 9999px
- Font: 12px Medium

### 5.6 Modallar (Modals)

- Overlay arka planı: rgba(0,0,0,0.5)
- Modal kutusu arka planı: white
- Köşe yuvarlama: 12px
- Gölge: lg
- Genişlik: 480px (varsayılan)
- Modal yapısı:
  - Üst bölüm (header): Başlık metni (H3) + sağ üstte X kapatma butonu. Alt kenarlık 1px solid gray-200.
  - Orta bölüm (body): İçerik metni ve ikonlar. Padding: 24px.
  - Alt bölüm (footer): Butonlar sağa hizalı. Butonlar arası 12px boşluk. Üst kenarlık 1px solid gray-200. Padding: 16px 24px.
- Onay modallarında sol tarafta uyarı ikonu bulunur.

### 5.7 Bildirim Kutuları (Alerts)

- Genişlik: Bulunduğu alanın %100'ü
- Padding: 16px
- Köşe yuvarlama: 8px
- Sol kenarlık: 4px kalın, duruma uygun renk
- Arka plan: Durumun açık rengi
- İkon: Sol tarafta duruma uygun ikon
- Metin: 14px, duruma uygun koyu renk

---

## 6. Sayfa Düzeni Şablonları

### 6.1 Auth Sayfaları (Login / Kayıt)

- Sidebar ve header YOKTUR
- Sayfa arka planı: gray-100
- Sayfa ortasında dikey ve yatay olarak ortalanmış tek bir kart
- Kart genişliği: 420px
- Kartın üstünde (kart dışında) logo ve "HireMind AI" yazısı
- Logo altında kısa bir slogan
- Kart içinde form alanları ve butonlar

### 6.2 Dashboard Sayfaları (Aday ve İK Panelleri)

Tüm dashboard sayfaları aynı ana düzeni paylaşır:

**Sol Sidebar:**
- Genişlik: 256px
- Arka plan: primary-900 (#1E3A5F)
- Sabit konum (fixed), ekranın sol tarafı, tam yükseklik
- Üst kısım: Logo ve "HireMind AI" metni (white, 18px Bold)
- Orta kısım: Navigasyon menü öğeleri
  - Her öğe: Sol tarafta ikon + metin
  - Normal durum: Metin white, opaklık 0.7
  - Hover: Opaklık 1.0, arka plan rgba(255,255,255,0.1)
  - Aktif (bulunulan sayfa): Sol kenarlık 3px solid white, arka plan rgba(255,255,255,0.15), opaklık 1.0
  - Öğe padding: 12px 20px
- Alt kısım: Kullanıcı bilgisi ve çıkış butonu
  - Kullanıcı adı (white, 14px)
  - Rol etiketi (white, opaklık 0.6, 12px)
  - Çıkış Yap butonu veya ikonu

**Aday sidebar menü öğeleri:**
1. Panelim (varsayılan aktif)
2. Özgeçmişim

**İK sidebar menü öğeleri:**
1. Panelim (varsayılan aktif)
2. Yeni İlan Oluştur

**Üst Header:**
- Yükseklik: 64px
- Arka plan: white
- Alt kenarlık: 1px solid gray-200
- Sol taraf: Bulunulan sayfanın başlığı (H2)
- Sağ taraf: Kullanıcı adı kısaltması (avatar dairesi, primary-700 arka plan, white metin)
- Header sidebar'ın sağ tarafından başlar (sol margin: 256px)

**İçerik Alanı:**
- Sol margin: 256px (sidebar genişliği kadar)
- Üst margin: 64px (header yüksekliği kadar)
- Padding: 24px
- Arka plan: gray-100
- Minimum yükseklik: Ekranın tamamını kaplar
- İçerik maks. genişliği: 1200px

---

## 7. Boş ve Özel Durum Kalıpları

### 7.1 Boş Durum (Empty State)

Herhangi bir listede veya alanda gösterilecek veri olmadığında:
- İçerik alanının ortasında dikey olarak ortalanmış
- Üstte büyük gri ikon (48px)
- Altında başlık metni (H3, gray-700)
- Altında açıklama metni (14px, gray-500)
- Gerekli ise altta CTA (Call to Action) butonu

### 7.2 Yükleniyor (Loading)

- İçerik alanının ortasında dönen spinner animasyonu
- Spinner rengi: primary-600
- Altında "Yükleniyor..." metni (14px, gray-500)

### 7.3 Bilgi Kartı (Info Banner)

Kullanıcıya durum bildiren yatay kart:
- Tam genişlik
- Sol tarafta ikon
- Ortada başlık ve açıklama
- Sağ tarafta (opsiyonel) eylem butonu
- Arka plan ve kenarlık bildirim türüne göre değişir (bkz. 5.7)

---

## 8. Skor ve Rapor Gösterimi

### 8.1 Genel Uyum Skoru

- Dairesel ilerleme göstergesi (circular progress)
- Çap: 120px
- Dairenin ortasında büyük puan rakamı (32px Bold)
- Altında "/100" metni (14px, gray-500)
- Dairenin rengi puan aralığına göre belirlenir (bkz. 1.4)
- Dairenin arka plan halkası: gray-200

### 8.2 Soru Bazlı Puanlar

- Yatay çubuk grafik (horizontal bar)
- Her soru için bir satır
- Sol tarafta soru numarası ("Soru 1", "Soru 2"...)
- Ortada ilerleme çubuğu (yükseklik: 8px, köşe yuvarlama: 4px)
- Sağ tarafta puan değeri
- Çubuğun rengi puan aralığına göre belirlenir

### 8.3 Güçlü/Zayıf Yönler

- İki sütunlu düzen
- Sol sütun: Güçlü yönler (başlık yanında yeşil ikon)
- Sağ sütun: Zayıf yönler (başlık yanında kırmızı ikon)
- Her madde bir liste öğesi olarak gösterilir
- Liste öğesi başında küçük daire ikon (yeşil veya kırmızı)

### 8.4 CV-İlan Uyum Oranı

- Yatay çubuk, tam genişlik
- Yükseklik: 12px
- Köşe yuvarlama: 6px
- Çubuğun solunda etiket, sağında yüzde değeri
- Renk: Skor renklerine göre

### 8.5 AI Genel Değerlendirmesi

- Ayrı bir kart içinde
- Üst kısımda başlık: "AI Değerlendirmesi"
- Sol üstte AI ikonu
- İçerik: 14px Regular, gray-700
- Arka plan: primary-50
- Sol kenarlık: 4px solid primary-600

---

## 9. Genel Kurallar

1. **Tutarlılık:** Tüm sayfalarda aynı renk, boşluk ve bileşen kuralları uygulanır.
2. **Hiyerarşi:** Her sayfada tek bir ana eylem butonu (primary) bulunur. Diğerleri secondary olur.
3. **Boşluk:** Öğeler arasında yeterli boşluk bırakılır. Sıkışık tasarımdan kaçınılır.
4. **İkonlar:** Lucide veya benzeri çizgi stil (outline/line) ikon seti kullanılır. Dolu (filled) ikonlar kullanılmaz.
5. **Metin hizalama:** Metin daima sola hizalıdır. Sayısal değerler (puanlar, yüzdeler) sağa veya ortaya hizalanabilir.
6. **Tıklanabilir satırlar:** Tablolarda tıklanabilir satırlar hover durumunda pointer imleci ve arka plan değişimi gösterir.
7. **Form doğrulama:** Hata mesajları ilgili alanın hemen altında gösterilir. Hatalı alan kırmızı kenarlık alır.
8. **Dil:** Arayüzdeki tüm metinler Türkçe olacaktır.
9. **Logo:** "HireMind AI" metni logo olarak kullanılır. Sol tarafta küçük bir beyin veya yapay zeka temalı ikon ile birlikte.
