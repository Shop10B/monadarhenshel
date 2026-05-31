# Monadar Henshel Website

Static website for Monadar Henshel with:

- Customer home page: `index.html`
- Customer menu page: `menu.html`
- English admin page: `admin.html`
- Firebase-ready product storage and click tracking
- Public menu fallback when Firebase config is empty
- Admin image upload with browser crop to `900 x 620 px`

Admin login uses Firebase Authentication. Do not commit admin emails,
passwords, or private credentials to this public repository.

Run locally:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/index.html
```

For Firebase setup, see `FIREBASE_SETUP.md`.

Product images uploaded in admin are cropped in the browser and saved with the product record, so the same flow works on local static hosting and deployed static hosting.
