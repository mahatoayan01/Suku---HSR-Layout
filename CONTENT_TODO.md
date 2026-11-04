# CONTENT_TODO.md: Suku - HSR Layout Action Items for Restaurant Owner

This document lists all content items, placeholders, credentials, and image assets that require verification or replacement by the restaurant owner/manager. All restaurant metadata is centrally driven by **`client/src/config/restaurant.js`**, so you can update these values directly in that file without modifying React components.

---

## 1. Credentials & Environment Setup
| Item | Location | Current State | What Owner Must Supply |
| :--- | :--- | :--- | :--- |
| **Admin Email** | `.env` (`ADMIN_EMAIL`) | `owner@sukuhsr.com` (default) | Real email address of the restaurant manager / owner. |
| **Admin Password** | `.env` (`ADMIN_PASSWORD`) | `ChangeMeSuku2026!` (seeded) | A strong, secret password for logging into `/owner`. Run `npm run seed` in `/server` to re-seed. |
| **JWT Secret** | `.env` (`JWT_SECRET`) | Auto-generated sample secret | Secure 64-character random string for signing admin session cookies. |
| **Razorpay Key ID** | `.env` (`RAZORPAY_KEY_ID`) | Empty (Test mode / mock) | Live or Test Key ID from your Razorpay Dashboard if accepting online prepaid payments. |
| **Razorpay Key Secret** | `.env` (`RAZORPAY_KEY_SECRET`) | Empty | Razorpay Secret corresponding to your Key ID. |
| **Client URL** | `.env` (`CLIENT_URL`) | `http://localhost:5173` | Production domain when deployed (e.g. `https://sukuhsr.com`). |

---

## 2. Business Information Verification
| Item | Config Key in `restaurant.js` | Current Verified Value | Owner Action Needed |
| :--- | :--- | :--- | :--- |
| **Official Email** | `contact.email` | `contact@sukuhsr.com` | Confirm if there is a dedicated customer enquiry email (e.g., info@ or reservations@). |
| **WhatsApp Direct** | `contact.whatsapp` | `+919945144616` | Verify if this is the active number linked to WhatsApp Business. |
| **Phone 2** | `contact.secondaryPhone` | `+919972162777` | Confirm if secondary line is available for reservations. |
| **GST / FSSAI Number** | `business.fssai` | `[To be added by owner]` | Supply official 14-digit FSSAI license number and GSTIN for invoice footer. |
| **Parking Details** | `location.parking` | Verified: Street parking available on 24th Main Road, but can be crowded during peak hours. | Confirm whether valet parking or designated basement parking is available. |
| **Landmarks** | `location.landmarks` | Near 24th Main BDA complex junction, opposite Sony World Signal road. | Provide any specific visual landmarks or building floor cues (3rd floor lift access). |

---

## 3. Online Delivery Links
| Platform | Config Key in `restaurant.js` | Current Value | Owner Action Needed |
| :--- | :--- | :--- | :--- |
| **Swiggy** | `orderLinks.swiggy` | `https://www.swiggy.com/restaurants/suku-japanese-and-thai-restaurant-24th-main-road-hsr-layout-bangalore-555546` | Confirm exact restaurant outlet ID and URL slug. |
| **Zomato** | `orderLinks.zomato` | `https://www.zomato.com/bangalore/suku-hsr-bangalore` | Confirm exact Zomato live profile link. |

---

## 4. Instagram Feed Posts
The Instagram section renders curated post cards linking to `@sukuhsr` (https://www.instagram.com/sukuhsr).
| Post Card | Config Array `instagramPosts` | Placeholder Asset | Owner Action Needed |
| :--- | :--- | :--- | :--- |
| Post 1 | `instagramPosts[0]` | `/images/instagram/post-1.jpg` | Replace with actual high-res photo from `@sukuhsr` showcasing sushi rolls. |
| Post 2 | `instagramPosts[1]` | `/images/instagram/post-2.jpg` | Replace with photo of steaming Khao Soi / Ramen bowl. |
| Post 3 | `instagramPosts[2]` | `/images/instagram/post-3.jpg` | Replace with photo of the cozy restaurant interior & lighting. |
| Post 4 | `instagramPosts[3]` | `/images/instagram/post-4.jpg` | Replace with signature mocktails / dessert photo. |

---

## 5. Media & Photography Assets (`client/public/images/`)
Please replace these clean SVG / placeholder assets with your professional food & venue photos:
| File Path | Used In | Recommended Dimensions | Description |
| :--- | :--- | :--- | :--- |
| `/images/brand/logo.svg` | Navbar, Footer, Favicon | 240x80 px SVG / PNG | Official Suku Japanese & Thai logo with transparent background. |
| `/images/hero/hero-bg.jpg` | Home Hero Section | 1920x1080 px WebP | High-impact shot of signature sushi platter and warm dining interior. |
| `/images/about/interior.jpg` | About / Story Section | 1000x800 px WebP | Atmospheric interior photo showing Japanese minimal wood accents. |
| `/images/dishes/dynamite-roll.jpg` | Signature Dishes & Menu | 800x600 px WebP | Close-up of Dynamite Maki with fiery chili mayo and garnish. |
| `/images/dishes/khao-soi.jpg` | Signature Dishes & Menu | 800x600 px WebP | Vibrant bowl of Khao Soi curry noodles with lime, crisps, and chili oil. |
| `/images/dishes/katsu-ramen.jpg` | Signature Dishes & Menu | 800x600 px WebP | Chicken Katsu Ramen bowl with seasoned egg and bamboo shoots. |
| `/images/dishes/thai-green-curry.jpg` | Signature Dishes & Menu | 800x600 px WebP | Aromatic Thai green curry with jasmine rice. |
| `/images/dishes/geisha-lips-roll.jpg` | Signature Dishes & Menu | 800x600 px WebP | Artfully plated Geisha Red Lips signature sushi roll. |
| `/images/dishes/pad-kra-pow.jpg` | Signature Dishes & Menu | 800x600 px WebP | Thai basil chicken with fragrant jasmine rice and crispy fried egg. |
| `/images/dishes/bento-box.jpg` | Menu (Bento) | 800x600 px WebP | Japanese / Thai bento meal set with compartments. |
| `/images/dishes/pork-kakuni.jpg` | Menu (Mains) | 800x600 px WebP | Melt-in-mouth braised pork belly with mustard and bok choy. |
| `/images/dishes/mango-sticky-rice.jpg`| Menu (Desserts) | 800x600 px WebP | Sweet coconut sticky rice with ripe Alphonso mango slices. |
| `/images/dishes/matcha-latte.jpg` | Menu (Beverages) | 800x600 px WebP | Iced Kyoto matcha latte with foam layer. |

---

## 6. Menu Prices Check
| Dish Name | Listed Price in DB | Status | Owner Verification |
| :--- | :--- | :--- | :--- |
| Chicken Dynamite Roll | ₹410 | Verified from Swiggy | Confirm dine-in vs delivery price parity. |
| Geisha Red Lips Roll | ₹450 | Estimated placeholder | Confirm exact dine-in menu price. |
| Veg Katsu Sushi | ₹340 | Verified from Magicpin | Confirm exact dine-in menu price. |
| Khao Soi (Chicken) | ₹380 | Verified from Swiggy | Confirm exact dine-in menu price. |
| Chicken Katsu Ramen | ₹420 | Verified from Swiggy | Confirm exact dine-in menu price. |
| Thai Green Curry (Veg/Chicken) | ₹360 / ₹390 | Estimated placeholder | Confirm exact dine-in menu price. |
| Pad Kra Pow Gai | ₹360 | Estimated placeholder | Confirm exact dine-in menu price. |
| Pork Kakuni | ₹480 | Estimated placeholder | Confirm exact dine-in menu price. |
| Thai Style Bento Box | ₹450 | Estimated placeholder | Confirm exact dine-in menu price. |
| Mango Sticky Rice | ₹240 | Estimated placeholder | Seasonal item; confirm year-round availability. |
| Iced Matcha Latte | ₹180 | Estimated placeholder | Confirm beverage menu pricing. |

*To update menu items and prices in bulk, edit `/server/src/db/seedData.js` or manage directly from the Owner Dashboard.*
