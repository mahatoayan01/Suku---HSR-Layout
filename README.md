# Suku - HSR Layout | Official Restaurant Website & Management Portal

Production-ready, clean, modern, and high-performance restaurant website and owner management portal for **Suku - HSR Layout** (Bengaluru, Karnataka, India).

Verified against the official Google Maps Place ID: `ChIJWbFN05YVrjsRC3xqZhjpjfo`.

---

## 🌟 Key Features

### 🍽️ Customer Experience
- **Mobile-First Design**: Tested across 375px (mobile), 768px (tablet), 1024px, and 1440px+ (desktop) screens with zero horizontal overflow and 44px+ touch targets.
- **Single Source of Truth**: All restaurant metadata, phone numbers, operating hours, coordinates, and social media handles are driven from a single config file (`client/src/config/restaurant.js`).
- **Interactive Menu**: Filter by Category (Sushi, Ramen, Thai, Bento, Desserts, Beverages) and Diet (All, Veg Only, Non-Veg), with instant search.
- **Slide-Over Cart Drawer**: Seamless add to cart and instant quantity adjustments without leaving the page.
- **Frictionless Checkout**: Supports Home Delivery (with address & kitchen notes) or Takeaway Pickup. Customers can select Cash / UPI on Delivery, Counter payment, or Razorpay online payments.
- **Live Order Confirmation**: Dedicated `/order/:id` tracking page with full itemized breakdown and kitchen contact details.
- **SEO & Schema**: Includes JSON-LD `Restaurant` schema, Open Graph metadata, semantic HTML, `robots.txt`, and `sitemap.xml`.

### 🛡️ Owner & Kitchen Portal (`/owner`)
- **JWT & HTTP-Only Cookie Authentication**: Secure owner session with bcrypt-hashed passwords.
- **Live Operations Dashboard**: Executive summary cards (Today's Orders, Today's Revenue, Pending Kitchen Orders, Total Sales).
- **Order Pipeline Management**: Real-time status updater (`New` → `Preparing` → `Ready` → `Delivered` → `Cancelled`). Filter by status, search by order ID, customer name, or phone.
- **Payment Reconciliation**: Track collected and pending amounts, view transaction IDs, and filter by payment status.
- **Customer Messages & Reservations**: Centralized inbox for reservation requests and feedback submitted via the Contact page.
- **One-Click CSV Exports**: Instant download of Orders and Payments spreadsheets for bookkeeping.

---

## 🏗️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, React Router DOM, Lucide React |
| **Backend** | Node.js, Express, SQLite (`better-sqlite3`) |
| **Security** | Helmet, CORS allowlist, Express Rate Limit, Cookie Parser, bcryptjs, JWT |
| **Typography** | Cormorant Garamond / Noto Serif (Headings), Inter (Body) |
| **Palette** | Ink Black (`#121212`), Rice Paper (`#F7F3EC`), Vermilion (`#C8362B`), Muted Gold (`#B8923A`) |

---

## 📁 Project Structure

```
suku-restaurant/
├── client/                     # Frontend React + Vite application
│   ├── public/
│   │   ├── images/             # Tasteful image assets (brand, hero, dishes, instagram)
│   │   ├── robots.txt          # SEO crawler rules
│   │   └── sitemap.xml         # XML Sitemap
│   ├── src/
│   │   ├── components/
│   │   │   ├── cart/           # Slide-over cart drawer
│   │   │   ├── common/         # Navbar, Footer
│   │   │   └── home/           # Marketing sections (Hero, About, Dishes, Reviews, etc.)
│   │   ├── config/
│   │   │   └── restaurant.js   # ⭐ Single Source of Truth configuration
│   │   ├── context/            # CartContext and AuthContext
│   │   ├── data/
│   │   │   └── reviews.json    # Genuine Google reviews data
│   │   ├── pages/              # Home, Menu, Location, Contact, Checkout, Order, Owner, 404
│   │   ├── App.jsx             # Routes and layout
│   │   └── main.jsx            # Entry point
│   ├── index.html              # HTML shell with JSON-LD schema
│   ├── tailwind.config.js      # Color tokens & typography
│   └── vite.config.js          # Vite config with API proxy
├── server/                     # Backend Node.js + Express API
│   ├── data/                   # SQLite database directory (gitignored)
│   ├── src/
│   │   ├── db/
│   │   │   ├── db.js           # SQLite database connection & schema
│   │   │   ├── seed.js         # Seeder for owner user & menu items
│   │   │   └── seedData.js     # 22 authentic Japanese & Thai dishes
│   │   ├── middleware/
│   │   │   └── auth.js         # Owner JWT authentication middleware
│   │   ├── routes/             # Menu, Orders, Contact, and Owner API routes
│   │   └── index.js            # Express server initialization & security
│   └── package.json
├── .env.example                # Template for environment variables
├── .gitignore                  # Git ignore rules for node_modules, .env, *.sqlite
├── CONTENT_TODO.md             # ⭐ Checklist of owner action items and placeholders
└── package.json                # Root package with concurrently dev scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 2. Installation
Clone the repository and install all dependencies:

```bash
# In the project root
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Configuration
Copy `.env.example` to create your environment configuration:

```bash
cp .env.example .env
```

Edit `.env` to configure your environment variables:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Owner credentials for initial database setup
ADMIN_EMAIL=owner@sukuhsr.com
ADMIN_PASSWORD=YourSecureOwnerPasswordHere!
JWT_SECRET=your_secure_random_64_character_secret_string

# Razorpay (Optional - runs in cash/demo mode if empty)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### 4. Database Setup & Seeding
Run the database migration and seeding script:

```bash
cd server
npm run seed
```
This initializes the SQLite tables (`menu_items`, `orders`, `order_items`, `payments`, `contact_messages`, `owner_users`) and creates the admin account using the email and password specified in your `.env` file.

### 5. Running the Application
From the root directory, start both the Express backend and Vite frontend together:

```bash
npm run dev
```

- **Frontend Client**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:5000](http://localhost:5000)
- **Owner Login**: [http://localhost:5173/owner/login](http://localhost:5173/owner/login)

---

## ⚙️ How to Update Restaurant Details

All restaurant metadata is driven by **`client/src/config/restaurant.js`**. To update details, simply edit that file without modifying any React code:
- **Phone / WhatsApp**: Update `RESTAURANT.contact.primaryPhone` and `RESTAURANT.contact.whatsapp`.
- **Opening Hours**: Modify `RESTAURANT.hours.days`.
- **Swiggy / Zomato links**: Change `RESTAURANT.orderLinks.swiggy` or `RESTAURANT.orderLinks.zomato`.
- **Social Media**: Update `RESTAURANT.social.instagram`.
- **Address & Landmarks**: Edit `RESTAURANT.location.landmarks` and `RESTAURANT.location.parkingNote`.

Check **`CONTENT_TODO.md`** for all pending items and image placeholders you may wish to replace with professional photos.

---

## 🚢 Production Deployment

### Frontend (Vercel or Netlify)
1. Push your code to GitHub.
2. In Vercel or Netlify, select the root directory and set:
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add environment variable `VITE_API_BASE_URL` pointing to your deployed backend URL.

### Backend (Render or Railway)
1. Deploy the `server/` directory as a Node.js web service.
2. Set the build command to `npm install` and start command to `npm start`.
3. Configure the environment variables in your hosting dashboard (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`, `CLIENT_URL`).
4. Mount a persistent disk volume to `/server/data` so the SQLite database persists across redeploys.

---

## 🔒 Security Best Practices
- Owner passwords are never stored in plain text; they are hashed with bcrypt.
- Session tokens are stored in secure `httpOnly`, `SameSite=Lax` cookies to prevent XSS credential theft.
- Rate limiting is active on `/api/owner/login` to prevent brute force attacks.
- API inputs are validated and parameterized to eliminate SQL injection.
- Security headers are enforced using Helmet.
