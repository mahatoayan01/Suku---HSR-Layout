export const initialMenuItems = [
  // --- SUSHI ---
  {
    name: "Chicken Dynamite Roll",
    category: "Sushi",
    description: "Fiery maki with crispy chicken katsu, avocado, spring onion, topped with Naga chili mayo and dried chili julienne. A Suku favorite!",
    price: 410,
    is_veg: 0,
    is_signature: 1,
    spice_level: 3,
    image_url: "/images/dishes/dynamite-roll.jpg",
    is_price_estimated: 0
  },
  {
    name: "Geisha Red Lips Roll",
    category: "Sushi",
    description: "Artistic signature roll with fresh tuna, avocado, beetroot-infused sushi rice, spicy Japanese aioli, and microgreens.",
    price: 450,
    is_veg: 0,
    is_signature: 1,
    spice_level: 1,
    image_url: "/images/dishes/geisha-lips-roll.jpg",
    is_price_estimated: 1
  },
  {
    name: "Veg Katsu Sushi",
    category: "Sushi",
    description: "Panko-crusted asparagus, cucumber, creamy avocado, finished with Japanese veg mayo and toasted black sesame.",
    price: 340,
    is_veg: 1,
    is_signature: 0,
    spice_level: 0,
    image_url: "/images/dishes/veg-katsu-sushi.jpg",
    is_price_estimated: 0
  },
  {
    name: "Crunchy Salmon Maki",
    category: "Sushi",
    description: "Fresh Atlantic salmon, cucumber, crispy tempura crunch flakes, and a delicate sriracha-unagi glaze.",
    price: 460,
    is_veg: 0,
    is_signature: 0,
    spice_level: 1,
    image_url: "/images/dishes/crunchy-salmon.jpg",
    is_price_estimated: 1
  },
  {
    name: "Spider Crab Maki",
    category: "Sushi",
    description: "Crispy soft-shell crab, cucumber ribbons, avocado, flying fish roe, and savory sweet kabayaki sauce.",
    price: 490,
    is_veg: 0,
    is_signature: 0,
    spice_level: 1,
    image_url: "/images/dishes/spider-crab.jpg",
    is_price_estimated: 1
  },

  // --- RAMEN ---
  {
    name: "Chicken Katsu Ramen",
    category: "Ramen",
    description: "Rich, slow-simmered chicken broth served with a golden crispy chicken katsu cutlet, ramen noodles, seasoned soft-boiled egg, and nori.",
    price: 420,
    is_veg: 0,
    is_signature: 1,
    spice_level: 1,
    image_url: "/images/dishes/katsu-ramen.jpg",
    is_price_estimated: 0
  },
  {
    name: "Pork Kakuni Ramen",
    category: "Ramen",
    description: "Soul-soothing 12-hour simmered pork broth, melt-in-the-mouth braised pork belly, spring onions, menma bamboo, and ajitsuke tamago.",
    price: 480,
    is_veg: 0,
    is_signature: 1,
    spice_level: 1,
    image_url: "/images/dishes/pork-kakuni.jpg",
    is_price_estimated: 1
  },
  {
    name: "Prawns Tempura Ramen",
    category: "Ramen",
    description: "Crisp tiger prawn tempura perched over fragrant dashi-shoyu noodle soup with shiitake mushrooms and scallions.",
    price: 460,
    is_veg: 0,
    is_signature: 0,
    spice_level: 0,
    image_url: "/images/dishes/prawns-ramen.jpg",
    is_price_estimated: 1
  },
  {
    name: "Spicy Miso Veg Ramen",
    category: "Ramen",
    description: "Hearty vegetarian miso and shiitake mushroom broth with seared tofu, sweet corn, bok choy, spring onions, and roasted chili oil.",
    price: 360,
    is_veg: 1,
    is_signature: 0,
    spice_level: 2,
    image_url: "/images/dishes/spicy-miso-ramen.jpg",
    is_price_estimated: 1
  },

  // --- THAI ---
  {
    name: "Chiang Mai Khao Soi (Chicken)",
    category: "Thai",
    description: "Generous bowl of Northern Thai coconut curry broth with egg noodles, tender chicken, crispy noodle crown, shallots, and lime.",
    price: 380,
    is_veg: 0,
    is_signature: 1,
    spice_level: 2,
    image_url: "/images/dishes/khao-soi.jpg",
    is_price_estimated: 0
  },
  {
    name: "Chiang Mai Khao Soi (Veg & Tofu)",
    category: "Thai",
    description: "Aromatic golden coconut curry noodle soup with silken tofu, exotic vegetables, pickled mustard greens, and crunchy fried noodles.",
    price: 340,
    is_veg: 1,
    is_signature: 0,
    spice_level: 2,
    image_url: "/images/dishes/khao-soi-veg.jpg",
    is_price_estimated: 1
  },
  {
    name: "Thai Green Curry with Jasmine Rice",
    category: "Thai",
    description: "Fragrant lemongrass, galangal, kaffir lime, and sweet Thai basil in velvety coconut milk. Served with steamed jasmine rice.",
    price: 390,
    is_veg: 0,
    is_signature: 1,
    spice_level: 2,
    image_url: "/images/dishes/thai-green-curry.jpg",
    is_price_estimated: 1
  },
  {
    name: "Pad Kra Pow Gai (Thai Basil Chicken)",
    category: "Thai",
    description: "Spicy wok-tossed minced chicken with fresh Thai holy basil, garlic, and birds eye chili, served with jasmine rice and a crispy fried egg.",
    price: 360,
    is_veg: 0,
    is_signature: 1,
    spice_level: 3,
    image_url: "/images/dishes/pad-kra-pow.jpg",
    is_price_estimated: 1
  },
  {
    name: "Classic Pad Thai Noodles",
    category: "Thai",
    description: "Stir-fried ribbon rice noodles with tamarind sauce, bean sprouts, crushed roasted peanuts, lime, and scrambled egg.",
    price: 370,
    is_veg: 1,
    is_signature: 0,
    spice_level: 1,
    image_url: "/images/dishes/pad-thai.jpg",
    is_price_estimated: 1
  },

  // --- BENTO ---
  {
    name: "Thai Style Bento Box",
    category: "Bento",
    description: "A satisfying complete meal set: Basil Chicken main, crunchy vegetable spring roll, raw papaya som tum, fragrant jasmine rice, and dessert.",
    price: 450,
    is_veg: 0,
    is_signature: 1,
    spice_level: 2,
    image_url: "/images/dishes/bento-box.jpg",
    is_price_estimated: 1
  },
  {
    name: "Japanese Katsu Bento",
    category: "Bento",
    description: "Golden chicken katsu with tonkatsu dip, edamame salad, 3-piece veg maki roll, steamed Japanese rice, and miso soup.",
    price: 460,
    is_veg: 0,
    is_signature: 0,
    spice_level: 0,
    image_url: "/images/dishes/japanese-bento.jpg",
    is_price_estimated: 1
  },
  {
    name: "Zen Garden Veg Bento",
    category: "Bento",
    description: "Glazed teriyaki tofu, assorted vegetable tempura, cucumber maki, steamed jasmine rice, and house Asian pickle.",
    price: 410,
    is_veg: 1,
    is_signature: 0,
    spice_level: 0,
    image_url: "/images/dishes/zen-bento.jpg",
    is_price_estimated: 1
  },

  // --- DESSERTS ---
  {
    name: "Mango Sticky Rice",
    category: "Desserts",
    description: "Sweet glutinous sticky rice bathed in salted coconut cream, paired with fresh juicy mango slices and toasted sesame.",
    price: 240,
    is_veg: 1,
    is_signature: 1,
    spice_level: 0,
    image_url: "/images/dishes/mango-sticky-rice.jpg",
    is_price_estimated: 1
  },
  {
    name: "Japanese Mochi Trio",
    category: "Desserts",
    description: "Handcrafted soft chewy glutinous rice cakes filled with premium green tea matcha, strawberry, and dark chocolate ice cream.",
    price: 220,
    is_veg: 1,
    is_signature: 0,
    spice_level: 0,
    image_url: "/images/dishes/mochi-trio.jpg",
    is_price_estimated: 1
  },

  // --- BEVERAGES ---
  {
    name: "Iced Kyoto Matcha Latte",
    category: "Beverages",
    description: "Whisked Japanese ceremonial grade Uji matcha layered over velvety cold fresh milk and light sweetener.",
    price: 180,
    is_veg: 1,
    is_signature: 1,
    spice_level: 0,
    image_url: "/images/dishes/matcha-latte.jpg",
    is_price_estimated: 1
  },
  {
    name: "Authentic Thai Iced Tea",
    category: "Beverages",
    description: "Slow-brewed spiced black Thai tea sweetened with condensed milk and poured over crushed ice.",
    price: 160,
    is_veg: 1,
    is_signature: 0,
    spice_level: 0,
    image_url: "/images/dishes/thai-iced-tea.jpg",
    is_price_estimated: 1
  },
  {
    name: "Yuzu Sparkling Cooler",
    category: "Beverages",
    description: "Sparkling Japanese citrus spritzer with fresh mint leaves and floral elderflower touch.",
    price: 170,
    is_veg: 1,
    is_signature: 0,
    spice_level: 0,
    image_url: "/images/dishes/yuzu-cooler.jpg",
    is_price_estimated: 1
  }
];
