---
name: NPM lockfile portability
description: Keep external deployments independent from Replit's private npm package proxy.
---

For deployments outside Replit, package names in `package.json` are not enough to prove portability. npm follows the tarball URLs recorded in `package-lock.json`; a registry override does not reliably make existing private `resolved` URLs portable. Regenerate the lockfile from the manifest using the public registry, inspect all resolved URL origins, then validate a clean install.

**Why:** Replit's package proxy hostname is not resolvable from Render, so a lockfile that points there fails even when every package itself is publicly available.

**How to apply:** After dependency changes, check that every `resolved` URL uses the intended public registry and run `npm ci` plus the production build in a clean environment.
