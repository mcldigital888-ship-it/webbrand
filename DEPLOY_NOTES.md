# Deploy Notes (Safe Deploy)

## Critical warning: avoid deleting docroot

Do **NOT** deploy by removing the entire web root / docroot folder.
If your server hosts other assets (e.g. PHP admin panel, uploads, shared config), a `rm -rf` on the target directory can break production.

## Safer patterns

- Deploy to a **staging folder** (e.g. `/var/www/webbrand/releases/<timestamp>`), build there, then do an **atomic swap** (symlink switch).
- If you use `rsync`, prefer syncing only the build output into a dedicated target folder and avoid `--delete` unless the target is exclusively owned by the app.
- Keep **uploads / user-generated content** outside the app folder.

## Current workflow

`.github/workflows/deploy.yml` currently uses `git pull` + `npm install` + `npm run build` + service restart.
There is **no explicit clean/delete step** in the workflow script.
