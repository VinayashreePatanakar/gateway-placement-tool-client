# Gateway Placement Tool – Client (Frontend)

This is the frontend application for the **Gateway Placement Tool**, an interactive site map feature used in the Signal page.  
It allows users and DAZOQ admins to upload floor plans, calibrate scale, and visually place sensors, gateways, and repeaters.

---

## Tech Stack

- React (Vite)
- JavaScript (ES6+)
- Context API
- Custom state store
- HTML5 / CSS3

---

## Project Structure
src/
├── assets/ # Static assets
├── components/ # Shared & admin components
│ ├── AuthContext.jsx
│ ├── ProtectedRoute.jsx
│ ├── SiteMap.jsx # Core interactive map logic
│ ├── Login.jsx
│ ├── Register.jsx
│ └── ...
│
├── componentsForUsers/ # Customer-facing UI
│ ├── Signal.jsx
│ ├── MapPage.jsx
│ ├── Equipment.jsx
│ └── ...
│
├── layouts/ # Layout wrappers
│ ├── RootLayout.jsx
│ └── UserLayout.jsx
│
├── pages/ # Page-level views
│ ├── admin/
│ ├── FloorSelection/
│ ├── History/
│ └── Home/
│
├── router/
│ └── router.jsx # App routing
│
├── store/
│ └── mapStore.js # Central map & element state
│
├── App.jsx
└── main.jsx


---

## User Roles

- **Admin (DAZOQ)**  
  - Access all customers and floors  
  - Troubleshooting and support  

- **User (Customer)**  
  - Upload floor plans  
  - Place sensors, gateways, repeaters  

Access control is enforced via `AuthContext` and `ProtectedRoute`.

---

## Core Features

- Upload and manage floor plans
- Scale calibration and locking
- Drag & drop placement of:
  - Sensors
  - Gateways
  - Repeaters
- Rename and remove elements
- Multi-floor support
- Persistent state synced with backend

---

## Backend Integration

The frontend communicates with a PHP backend via REST-style endpoints:
- Authentication (login/logout/session)
- Floor CRUD operations
- Element placement persistence
- File uploads

API base URLs may need adjustment per environment.

---

## Running the Project

### Install dependencies
```bash
npm install

npm run dev

