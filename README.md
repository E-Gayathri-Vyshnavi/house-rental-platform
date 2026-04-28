# Rently – Full-Stack House Rental Platform 🏠

A modern, high-performance house rental application built with the **MERN Stack** (MongoDB, Express, React, Node.js) and **Next.js 14**. This platform allows users to browse properties, post advertisements with images, and connect with landlords in real-time.

## 🚀 Live Demo
**Frontend:** [https://house-rental-platform-pi.vercel.app/login]  
**Backend:** [https://house-rental-platform-1.onrender.com]

---

## ✨ Features
* **Property Discovery:** Advanced filtering by location, category (Apartment, Villa, PG, Hotel), and price.
* **User Authentication:** Secure Login and Registration system for Tenants and Landlords.
* **Cloud Image Hosting:** Integrated with **Cloudinary** for permanent, high-quality image storage.
* **Real-time Interaction:** Socket.io powered chat system (In Development).
* **Responsive UI:** Fully mobile-friendly design built with **Tailwind CSS** and **Framer Motion**.

---

## 🛠️ Tech Stack
* **Frontend:** Next.js 14 (App Router), Tailwind CSS, Lucide React.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB Atlas (Mumbai Cluster).
* **Deployment:** Vercel (Frontend), Render (Backend).
* **Media:** Cloudinary API.



## ⚙️ Environment Variables
To run this project locally, create a `.env` file in the `client` and `server` folders:

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
