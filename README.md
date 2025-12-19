# Webbrand — Website + Custom CRM

This repository contains:

- Marketing website (public routes)
- A fully custom first-party CRM under `/crm/*`

The CRM is **built in-app** (backend + UI + database + admin panel).

## Principles

- No external CRM
- No third-party automation tools
- No email/WhatsApp sending
- No AI calls (placeholder only)

Automation is implemented as: **events + logs + admin-configurable rules**.

## Routes

- `/` (Home)
- `/solutions` (includes Quick Quote form)
- `/crm-system` (marketing page explaining CRM logic)
- `/ai-systems` (explains AI systems, no AI inside)
- `/integrations`
- `/oracolo` (multi-step smart brief)
- `/contact` (book a call / contact)
- `/privacy`, `/terms`, `/thank-you`

### CRM routes

- `/crm/login`
- `/crm` (home)
- `/crm/leads`
- `/crm/deals`
- `/crm/tasks`
- `/crm/dashboard`
- `/crm/admin` (admin-only)

## Setup (CRITICAL)

### 1) Set your integration config

Edit:

`config/integrations.js`

```js
export const CONFIG = {
  WEBHOOK_URL: "",
  GA4_ID: "",
  META_PIXEL_ID: "",
  CONSENT_REQUIRED: true,
  DEBUG_MODE: false
};
```

- `WEBHOOK_URL`: Your Make/Zapier/n8n webhook URL.
- `GA4_ID` and `META_PIXEL_ID`: placeholders. The site includes an event layer even if these are empty.
- `CONSENT_REQUIRED`: If `true`, tracking is blocked until consent is given.
- `DEBUG_MODE`: If `true`, logs events and webhook behavior to console.

### 2) Webhook payload format

All forms submit the same payload shape:

```json
{
  "form_name": "",
  "timestamp": "",
  "page_url": "",
  "utm": {},
  "fields": {},
  "consent": true
}
```

If `CONFIG.WEBHOOK_URL` is empty or the request fails, the payload is stored in `localStorage` (key: `failed_form_queue`).

### 3) Tracking events

Tracked events:

- `page_view`
- `scroll_25`, `scroll_50`, `scroll_75`, `scroll_90`
- `cta_click`
- `form_start`, `form_submit`, `form_error`
- `outbound_click`

Enable debug logs per session with:

`?debug=1`

## Running locally

```bash
npm install
npx prisma generate
npx prisma db push
npm run crm:seed
npm run dev
```

## CRM setup

### Environment variables

Copy `.env.example` to `.env` and set:

- `DATABASE_URL` (SQLite by default)
- `SESSION_SECRET` (min 16 chars)

### Seeded admin user

Default seed credentials:

- Email: `admin@local`
- Password: `admin1234`

Override via:

- `CRM_SEED_ADMIN_EMAIL`
- `CRM_SEED_ADMIN_PASSWORD`

## Notes

- The CRM does **not** send emails, WhatsApp messages, or call GPT.
- All automation is stored as `AutomationEvent` + `ActivityLog` and visible via UI.

## Hosting

Because CRM uses a database and server-side routes, this is a **dynamic Next.js app**.
Deploy on a VPS or a Node hosting environment.
