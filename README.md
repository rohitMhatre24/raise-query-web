# 🎯 Raise Query Web (Frontend)

A modern React-based dashboard for managing user queries with role-based UI.

---

## 🧠 Features

* 🔐 Login with JWT
* 📊 User Dashboard (KPI + Applications)
* 🧑‍💼 Admin Dashboard (All Applications)
* 🔄 Status Management (Approve/Reject)
* 👥 User Management (Admin)
* ⚡ Real-time filtering (KPI-based)
* 🎨 Clean UI with Tailwind CSS

---

## 🛠️ Tech Stack

* React.js (Vite)
* Tailwind CSS
* Axios
* React Router
* React Hot Toast

---

## 📁 Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── services/
 ├── App.jsx
 ├── main.jsx
```

---

## ⚙️ Setup Instructions

### 1. Clone Repo

```bash
git clone <your-frontend-repo-url>
cd raise-query-web
```

### 2. Install Dependencies

```bash
npm install
```
### 3. Setup Environment Variables

Create `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```
### 4. Setup Production Environment Variables

Create `.env.production` file:

```
VITE_API_URL=https://your-backend.onrender.com/api
```

### 5. Run App

```bash
npm run dev
```

---

## 🌐 API Configuration

Update base URL in:

📁 `src/services/api.js`

```js
baseURL: "http://localhost:5000/api"
```

---

## 🔐 Authentication Flow

1. User logs in
2. Token stored in localStorage
3. Axios attaches token automatically
4. Protected routes enforced

---

## 🧑‍💼 Roles

### 👤 USER

* View own applications
* Create application
* Dashboard KPIs

---

### 👨‍💼 ADMIN

* View all applications
* Approve / Reject
* Manage users
* View analytics

---

## 🎨 UI Highlights

* Responsive layout
* Sidebar navigation
* KPI cards (clickable filters)
* Status badges
* Modal forms

---

## 🚀 Future Improvements

* Better UI animations
* Dark mode
* Pagination optimization
* Notifications system

---

## 👨‍💻 Author

Rohit Mhatre
