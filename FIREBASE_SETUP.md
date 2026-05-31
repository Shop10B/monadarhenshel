# Monadar Henshel Firebase Setup

1. Create a Firebase project.
2. Enable Authentication with Email/Password.
3. Create the admin user in Firebase Authentication. Keep that email and password only in Firebase/your password manager.
4. Create Firestore Database.
5. Paste your web app config into `firebase-config.js`.

Collections used:

- `products`
- `productClicks`

Suggested Firestore rule shape:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /productClicks/{productId} {
      allow read: if request.auth != null;
      allow create, update: if true;
      allow delete: if request.auth != null;
    }
  }
}
```

Until Firebase config is added, the public menu can use local browser storage, but admin login is disabled. This keeps admin credentials out of the public GitHub Pages code.

Security notes:

- Never commit the admin password to this repository.
- Use a strong Firebase Authentication password and rotate it if it was ever shared.
- Keep Firestore write/delete rules restricted to authenticated users.
