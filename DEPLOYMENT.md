# CC Koçluk Website - Vercel Deployment Guide

## 🚀 Vercel'e Deploy Etme Adımları

### 1. Vercel Hesabı Oluşturun
- [vercel.com](https://vercel.com) adresine gidin
- GitHub, GitLab veya email ile kayıt olun

### 2. GitHub Repository Oluşturun
```bash
# Proje klasöründe git başlatın
git init

# Dosyaları ekleyin
git add .

# İlk commit
git commit -m "Initial commit: CC Koçluk website"

# GitHub'da yeni repository oluşturun ve push edin
git remote add origin https://github.com/USERNAME/cc-kocluk-website.git
git branch -M main
git push -u origin main
```

### 3. Vercel'de Deploy Edin

#### Option A: GitHub Entegrasyonu (Önerilen)
1. Vercel dashboard'da "New Project" tıklayın
2. GitHub repository'nizi seçin
3. "Deploy" butonuna tıklayın
4. Otomatik olarak deploy edilecek

#### Option B: Vercel CLI
```bash
# Vercel CLI kurulumu
npm i -g vercel

# Projeyi deploy edin
vercel

# Production deploy
vercel --prod
```

### 4. Domain Ayarları
1. Vercel dashboard'da projenizi açın
2. "Settings" > "Domains" bölümüne gidin
3. Custom domain ekleyin (örn: cckocluk.com)
4. DNS ayarlarını güncelleyin

### 5. Environment Variables (Opsiyonel)
- Google Analytics ID
- Contact form API keys
- Social media links

## 📁 Deployment Dosyaları

- `vercel.json` - Vercel konfigürasyonu
- `package.json` - Proje metadata
- `.gitignore` - Git ignore kuralları

## 🔧 Build Ayarları

- **Framework Preset:** Other
- **Build Command:** (boş bırakın)
- **Output Directory:** (boş bırakın)
- **Install Command:** (boş bırakın)

## 🌐 Custom Domain DNS Ayarları

### A Records
```
Type: A
Name: @
Value: 76.76.19.19
```

### CNAME Records
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 📊 Performance Optimizasyonu

Website zaten optimize edilmiş:
- ✅ Minified CSS/JS
- ✅ Optimized images
- ✅ CDN (Font Awesome, Google Fonts)
- ✅ Responsive design
- ✅ SEO meta tags

## 🔍 Post-Deployment Checklist

- [ ] Tüm sayfalar çalışıyor
- [ ] Mobile responsive test
- [ ] Contact form test
- [ ] WhatsApp button test
- [ ] Social media links test
- [ ] SEO meta tags kontrol
- [ ] Google Analytics kurulumu
- [ ] SSL sertifikası aktif

## 📞 Destek

Deploy sırasında sorun yaşarsanız:
1. Vercel documentation kontrol edin
2. GitHub repository'de issue açın
3. Vercel support ile iletişime geçin

## 🎉 Tamamlandı!

Website başarıyla deploy edildikten sonra:
- Performans testleri yapın
- SEO optimizasyonu kontrol edin
- Social media paylaşımları için OG tags test edin
- Google Search Console'a ekleyin