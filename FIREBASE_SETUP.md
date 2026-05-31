# Monadar Henshel Firebase Setup

1. Create a Firebase project.
2. Enable Authentication with Email/Password.
3. Create the admin user in Firebase Authentication.
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

Until Firebase config is added, the app uses local browser storage with demo admin login:

- Email: `admin@monadarhenshel.com`
- Password: `ChangeMe123!`
