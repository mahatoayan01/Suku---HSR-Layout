/**
 * Central configuration and single source of truth for Suku - HSR Layout.
 * Verified against Google Maps Place ID: ChIJWbFN05YVrjsRC3xqZhjpjfo
 * 
 * Edit this file to update restaurant hours, contact numbers, order links,
 * social channels, and branding without modifying any React components.
 */

export const RESTAURANT = {
  // Brand & Identity
  name: "Suku - HSR Layout",
  shortName: "Suku",
  legalName: "Suku Japanese and Thai Restaurant",
  tagline: "Artisanal Sushi, Soulful Ramen & Authentic Thai Flavours",
  description: "A cozy neighborhood dining destination in HSR Layout, Bengaluru, known for expertly crafted sushi maki, rich steaming ramen bowls, vibrant Chiang Mai Khao Soi, and aromatic Thai curries.",
  
  // Contact Info (Verified from Google Maps / Justdial / Directory listings)
  contact: {
    primaryPhone: "+91 9945144616",
    primaryPhoneRaw: "+919945144616",
    secondaryPhone: "+91 9972162777",
    secondaryPhoneRaw: "+919972162777",
    whatsapp: "+919945144616",
    whatsappMessage: "Hi Suku team, I would like to inquire about table reservations / menu ordering.",
    email: "contact@sukuhsr.com", // Owner to verify dedicated email
    ownerPortalUrl: "/owner/login"
  },

  // Location & Physical Details
  location: {
    building: "Building No. 1329, 3rd Floor",
    street: "24th Main Road, 2nd Sector, BDA Layout (Sector 1)",
    locality: "HSR Layout",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560102",
    country: "India",
    fullAddress: "3rd Floor, Building No. 1329, 24th Main Road, 2nd Sector, BDA Layout, HSR Layout, Bengaluru, Karnataka 560102",
    floorNote: "Located on the 3rd Floor with elevator and staircase access",
    parkingNote: "Street parking is available on 24th Main Road and adjacent cross roads. Finding parking can be challenging during peak weekend dinner hours.",
    landmarks: "Near the 24th Main BDA complex junction, opposite major retail & food hubs in HSR Sector 1.",
    placeId: "ChIJWbFN05YVrjsRC3xqZhjpjfo",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Suku%20-%20HSR%20Layout&query_place_id=ChIJWbFN05YVrjsRC3xqZhjpjfo",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Suku+-+HSR+Layout&destination_place_id=ChIJWbFN05YVrjsRC3xqZhjpjfo",
    // Keyless Google Maps Embed iframe URL
    embedMapUrl: "https://maps.google.com/maps?q=Suku%20-%20HSR%20Layout%2C%2024th%20Main%20Road%2C%20HSR%20Layout%2C%20Bengaluru&t=&z=16&ie=UTF8&iwloc=&output=embed"
  },

  // Operating Hours (12:00 PM to 11:00 PM All Days)
  hours: {
    display: "12:00 PM – 11:00 PM Daily",
    days: [
      { day: "Monday", open: "12:00 PM", close: "11:00 PM" },
      { day: "Tuesday", open: "12:00 PM", close: "11:00 PM" },
      { day: "Wednesday", open: "12:00 PM", close: "11:00 PM" },
      { day: "Thursday", open: "12:00 PM", close: "11:00 PM" },
      { day: "Friday", open: "12:00 PM", close: "11:00 PM" },
      { day: "Saturday", open: "12:00 PM", close: "11:00 PM" },
      { day: "Sunday", open: "12:00 PM", close: "11:00 PM" }
    ]
  },

  // Social & Online Profiles
  social: {
    instagram: "https://www.instagram.com/sukuhsr",
    instagramHandle: "@sukuhsr",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Suku%20-%20HSR%20Layout&query_place_id=ChIJWbFN05YVrjsRC3xqZhjpjfo"
  },

  // Online Food Delivery Aggregators
  orderLinks: {
    swiggy: "https://www.swiggy.com/restaurants/suku-japanese-and-thai-restaurant-24th-main-road-hsr-layout-bangalore-555546",
    zomato: "https://www.zomato.com/bangalore/suku-hsr-bangalore"
  },

  // Dining Profile & Stats (Verified from Maps & Swiggy/Justdial listings)
  profile: {
    rating: 4.4,
    reviewCount: 1340,
    costForTwo: "₹800 – ₹1,200",
    costForTwoEstimated: 1000,
    cuisines: ["Japanese", "Thai", "Sushi", "Ramen", "Curries", "Bento", "Desserts", "Beverages"],
    hasAlcohol: false,
    hasBuffet: false,
    isVegFriendly: true,
    dineIn: true,
    takeaway: true,
    delivery: true
  },

  // Curated Instagram Posts from @sukuhsr
  instagramPosts: [
    {
      id: 1,
      caption: "Our signature Chicken Dynamite Roll topped with fiery Naga chili mayo & avocado crunch 🍣🔥",
      url: "https://www.instagram.com/sukuhsr",
      image: "/images/instagram/post-1.jpg"
    },
    {
      id: 2,
      caption: "Rich, fragrant Chiang Mai Khao Soi coconut noodles to warm your soul 🍜✨",
      url: "https://www.instagram.com/sukuhsr",
      image: "/images/instagram/post-2.jpg"
    },
    {
      id: 3,
      caption: "Warm amber lighting & cozy aesthetic vibes on the 3rd floor. Perfect for date night 🏮",
      url: "https://www.instagram.com/sukuhsr",
      image: "/images/instagram/post-3.jpg"
    },
    {
      id: 4,
      caption: "Sweet Mango Sticky Rice with salted coconut cream & ripe golden mangoes 🥭",
      url: "https://www.instagram.com/sukuhsr",
      image: "/images/instagram/post-4.jpg"
    }
  ]
};

export default RESTAURANT;
