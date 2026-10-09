# AeroPulse Logistics

A responsive, interactive logistics company landing page built with Astro, Tailwind CSS, and local JSON data.

## Run locally

Requirements: Node.js 22.12 or newer and npm 9.6.5 or newer.

```bash
npm ci
npm run dev
```

Create a production build:

```bash
npm run build
```

Astro writes the static site to `dist/`. To preview the production build locally:

```bash
npm run preview
```

## Deploy to Render

Create a **New Static Site** in Render and connect the Git repository containing this project. Use these settings:

| Render setting | Value |
| --- | --- |
| Name | `mossiac-logistics` (the name shown in your form, if available; any unique Render service name works) |
| Project / Environment | Optional; leave unselected if you do not use a Render project |
| Branch | `main` |
| Root Directory | Leave blank |
| Build Command | `npm ci --registry=https://registry.npmjs.org && npm run build` |
| Publish Directory | `dist` |

### Runtime and environment

- Use Node.js **22.12.0 or newer** and npm **9.6.5 or newer**. If Render's build environment uses an older Node version, set the `NODE_VERSION` environment variable to `22.12.0`.
- Dependencies are standard npm packages, and the committed lockfile must use public `https://registry.npmjs.org/` URLs. Do not commit lockfile URLs pointing to Replit's private package proxy.
- No application environment variables or secrets are required for this static site.
- No start command is required. Render serves the files generated in `dist/`.
- No rewrite rules are required for the current single-page site.

After creating the site, Render builds and publishes it. With automatic deploys enabled, new commits pushed to the selected branch trigger another deployment.

## Data and feature scope

Service details, sample shipment tracking results, and rate-estimate data are stored locally in `src/content/`. The tracking lookup and estimator are interactive demos; they do not connect to carrier systems or submit real quote requests. A backend and live logistics integrations would be needed for those capabilities.
