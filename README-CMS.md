# Decap CMS (Netlify CMS) + Git Gateway Starter

This folder adds a simple CMS to your static site when hosted on Netlify. You can edit site text (in `data/site.json`) and create News posts (in `content/news/`) via `/admin/`.

## How it works
- **/admin/** serves the Decap CMS app.
- The CMS authenticates via **Netlify Identity** + **Git Gateway**, and commits changes back to your GitHub repo.
- Media uploads go to `static/uploads/`.
- Homepage text and other strings are stored in `data/site.json`. Use `scripts/cms-loader.js` to inject them into your HTML.

## Wiring your HTML to the CMS data
Add IDs where you want content to appear, then load the loader script:
```html
<h1 id="hero_title"></h1>
<p id="hero_subtitle"></p>
<a id="contact_email" href="mailto:info@example.com"></a>
<script src="/scripts/cms-loader.js" defer></script>
```
Edit field names in `data/site.json` and `admin/config.yml` as needed.
