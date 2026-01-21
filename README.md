# 🏨 Wanderlust

Wanderlust is a hotel listing website built with **Node.js** and **Express.js**.  
It allows users to **sign up, log in, add, edit, delete, and view hotel listings**, with an integrated **map interface** for location-based entries.

---

## ✨ Features

- 📋 **Hotel Listings** – View hotels with details (name, location, price, rating).
- ➕ **Add Listings with Map** – Add new hotels by selecting their location on an interactive map (Leaflet.js / Google Maps API).
- ✏️ **Edit Listings** – Update hotel details directly from the UI.
- 🗑️ **Delete Listings** – Remove hotels from the database.
- 🔍 **Search & Filter** – Find hotels by location, price range, or rating.
- 👤 **User Authentication** – Secure signup and login system with password hashing.
- 🔒 **Authorization** – Only logged-in users can add, edit, or delete listings.
- 📱 **Responsive Design** – Works seamlessly across desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Map Integration:** Leaflet.js / Google Maps API
- **Database:** MongoDB (via Mongoose)
- **Authentication:** Passport.js / JWT + bcrypt for password hashing
- **Deployment:** Heroku, Render, or any Node.js hosting provider

---

## 📂 Project Structure
wanderlust/
│
├── app.js                  # Main Express application entry point
├── cloudConfig.js          # Cloud service configuration (e.g., image uploads)
├── middleware.js           # Custom middleware (e.g., authentication, error handling)
├── schema.js               # Joi or Mongoose schema validation
├── .env                    # Environment variables
├── .gitignore              # Git configuration
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Dependency lock file
│
├── controllers/            # Route logic and handlers
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── models/                 # Mongoose models
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/                 # Express route definitions
│   ├── (listing routes)
│   ├── (review routes)
│   └── (user/auth routes)
│
├── views/                  # EJS templates
│   ├── includes/           # Partials (e.g., navbar, footer)
│   ├── layouts/            # Base layouts
│   ├── listings/           # Hotel listing templates
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── searchResults.ejs
│   │   └── show.ejs
│   └── users/              # User-related templates
│       └── error.ejs
│
├── public/                 # Static assets (CSS, JS, images)
├── util/                   # Utility functions/helpers
├── init/                   # Initialization scripts or seed data
└── README.md               # Project documentation
