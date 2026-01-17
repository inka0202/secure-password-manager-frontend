# 🔐 Secure Password Manager — Frontend

A modern **React.js frontend** for a secure password management system, designed with **security, usability, and clarity** in mind.

This project is part of a **full‑stack MERN application** that demonstrates best practices in authentication, encryption, and web security — built to be **easy to understand for recruiters** and **practical for real-world usage**.

---

## 🌐 Live Demo

> ⚠️ **Important note about deployment**
> The frontend is deployed on **Vercel** and communicates with a backend hosted on **Render**.

⏳ **First request may take 30–60 seconds** if the backend is in sleep mode (Render free tier). This is expected behavior.

🔗 Frontend (Vercel): [https://password-manager-secure.vercel.app/](https://password-manager-secure.vercel.app/)

---

## 🧠 Project Overview

Secure Password Manager is a web application that allows users to:

- store passwords securely using **AES‑256 encryption** (handled by backend)
- generate strong passwords
- manage credentials in a protected environment
- authenticate using **email-based Two-Factor Authentication (2FA)**

The frontend focuses on **UX clarity**, **secure flows**, and **clean separation of concerns**.

---

## ✨ Key Features (Frontend)

- 🔑 Secure authentication flow (JWT-based)
- 📧 Email-based Two-Factor Authentication UI
- 🔐 Encrypted password vault interface
- 🧠 Password strength indicator
- ⚙️ Profile & session management
- 🛡️ Protected routes
- 📱 Responsive design

---

## 🧩 Tech Stack

- **React.js** (Create React App)
- **JavaScript (ES6+)**
- **RESTful API** (native Fetch API for backend communication)
- **React Router** for routing
- **zxcvbn** for password strength estimation
- **CSS / modern layout practices**

---

## 🚀 Running Locally

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Running backend API

### Installation

```bash
npm install
```

### Start development server

```bash
npm start
```

The app will be available at:

```
http://localhost:3000
```

> ⚠️ Make sure the backend base URL is correctly set in the API configuration.

---

## 🔐 Security Notes

- All sensitive data is encrypted on the **backend**
- Frontend never stores raw passwords
- JWT tokens are handled securely
- 2FA is required for sensitive actions

This project follows **OWASP recommendations** for frontend security where applicable.

---

## 📦 Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

> ⏳ Cold start delays are expected on free hosting tiers.

---

## 🎯 Why This Project Matters

This frontend demonstrates:

- real-world authentication flows
- security-aware UI decisions
- integration with encrypted backend APIs
- clean project structure
- production-style deployment

This frontend is structured and implemented in a production-ready style for portfolio demonstration purposes.

---

## 📌 Future Improvements

- UI tests (Cypress / Playwright)
- Improved error handling & notifications
- Accessibility improvements (a11y)
- Dark mode

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
