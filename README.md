# ORLUXA — Smart Living Website

A modern, animated corporate website concept for a smart living company. The site is available in English and Arabic and is built with React, Vite, JavaScript, and CSS. The contact form is for demonstration only; it does not open an email app, send messages, or store submitted data.

## Run locally

```bash
pnpm install
pnpm dev
```

To create a production build:

```bash
pnpm build
```

## Deploy to GitHub Pages

1. Create a GitHub repository named `orluxa-smart-living`. If you use GitHub Free, make the repository public to use GitHub Pages.
2. In the repository, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
3. Push the project to the `main` branch. The workflow in `.github/workflows/deploy.yml` will build and deploy the site automatically.
4. Check the **Actions** tab for the deployment status. Once it succeeds, GitHub Pages will show the site URL under **Settings → Pages**.

The expected URL is `https://ala-codes07.github.io/orluxa-smart-living/`.

Do not commit `node_modules` or `dist`; GitHub Actions creates them during deployment.

