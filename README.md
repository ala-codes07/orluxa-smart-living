# ORLUXA — نمونه‌کار وب‌سایت شرکتی

سایت چندصفحه‌ای دو زبانهٔ عربی و انگلیسی با React، Vite، JavaScript و CSS. فرم تماس صرفاً نمایشی است؛ نه ایمیلی باز می‌کند، نه داده‌ای می‌فرستد یا ذخیره می‌کند.

## اجرای محلی

```bash
pnpm install
pnpm dev
```

برای ساخت نسخهٔ نهایی:

```bash
pnpm build
```

## انتشار روی GitHub Pages

1. در GitHub یک مخزن با نام `orluxa-smart-living` بساز. اگر حساب GitHub Free داری، مخزن را Public بگذار تا GitHub Pages در دسترس باشد.
2. GitHub Pages مخزن را روی **Settings → Pages → Build and deployment → Source → GitHub Actions** تنظیم کن.
3. فایل‌های این پروژه را در شاخهٔ `main` قرار بده و push کن. فایل `.github/workflows/deploy.yml` به‌طور خودکار سایت را build و منتشر می‌کند.
4. وضعیت انتشار را در زبانهٔ **Actions** ببین. پس از موفقیت، نشانی سایت در **Settings → Pages** نمایش داده می‌شود.

آدرس پروژه معمولاً به شکل `https://ala-codes07.github.io/orluxa-smart-living/` خواهد بود.

برای نمونه‌کار، `node_modules` و `dist` را به مخزن اضافه نکن؛ GitHub Actions آن‌ها را خودش می‌سازد.
