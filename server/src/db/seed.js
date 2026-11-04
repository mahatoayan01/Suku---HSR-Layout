import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import db, { initSchema } from './db.js';
import { initialMenuItems } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server root or project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export async function seedDatabase() {
  console.log('🔄 Initializing database schema...');
  initSchema();

  // 1. Seed Menu Items
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM menu_items');
  const { count } = countStmt.get();

  if (count === 0) {
    console.log(`🌱 Seeding ${initialMenuItems.length} menu items...`);
    const insertMenu = db.prepare(`
      INSERT INTO menu_items (
        name, category, description, price, is_veg, is_signature, is_available, spice_level, image_url, is_price_estimated
      ) VALUES (
        @name, @category, @description, @price, @is_veg, @is_signature, 1, @spice_level, @image_url, @is_price_estimated
      )
    `);

    const insertMany = db.transaction((items) => {
      for (const item of items) {
        insertMenu.run(item);
      }
    });

    insertMany(initialMenuItems);
    console.log('✅ Menu items seeded successfully.');
  } else {
    console.log(`ℹ️  Menu items already exist (${count} items). Skipping menu seed.`);
  }

  // 2. Seed Owner User
  const adminEmail = process.env.ADMIN_EMAIL || 'owner@sukuhsr.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMeSuku2026!';

  console.log(`🔐 Seeding owner user account: ${adminEmail}...`);
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(adminPassword, salt);

  const existingUser = db.prepare('SELECT id FROM owner_users WHERE email = ?').get(adminEmail);
  if (existingUser) {
    db.prepare('UPDATE owner_users SET password_hash = ? WHERE email = ?').run(passwordHash, adminEmail);
    console.log('✅ Owner password updated in database.');
  } else {
    db.prepare('INSERT INTO owner_users (email, password_hash) VALUES (?, ?)').run(adminEmail, passwordHash);
    console.log('✅ Owner account created in database.');
  }

  // 3. Seed Sample Orders if empty (so dashboard has real test data right away)
  const ordersCount = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
  if (ordersCount === 0) {
    console.log('🌱 Seeding initial sample orders & payment history...');
    const sampleOrder1Id = 'ORD-20261104-1001';
    const sampleOrder2Id = 'ORD-20261104-1002';
    const sampleOrder3Id = 'ORD-20261104-1003';

    const insertOrder = db.prepare(`
      INSERT INTO orders (id, customer_name, customer_phone, order_type, delivery_address, special_instructions, subtotal, delivery_fee, tax, total_amount, status, payment_method, payment_status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertOrderItem = db.prepare(`
      INSERT INTO order_items (order_id, menu_item_id, item_name, price, quantity, is_veg, subtotal)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertPayment = db.prepare(`
      INSERT INTO payments (id, order_id, method, amount, status, transaction_ref, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    // Order 1: Delivered
    insertOrder.run(
      sampleOrder1Id,
      'Aarav Sharma',
      '+919845012345',
      'delivery',
      'Flat 402, Green Glen Layout, Bellandur, Bengaluru',
      'Please leave at door, do not ring bell',
      830,
      40,
      41.5,
      911.5,
      'Delivered',
      'Pay on delivery',
      'Paid',
      new Date(Date.now() - 3600000 * 5).toISOString()
    );
    insertOrderItem.run(sampleOrder1Id, 1, 'Chicken Dynamite Roll', 410, 1, 0, 410);
    insertOrderItem.run(sampleOrder1Id, 6, 'Chicken Katsu Ramen', 420, 1, 0, 420);
    insertPayment.run('PAY-SAMPLE-1001', sampleOrder1Id, 'Cash on Delivery', 911.5, 'Success', 'REF-CASH-001', new Date(Date.now() - 3600000 * 4).toISOString());

    // Order 2: Preparing
    insertOrder.run(
      sampleOrder2Id,
      'Tanvi Hegde',
      '+919886098765',
      'pickup',
      null,
      'Extra chili oil with Khao Soi please',
      620,
      0,
      31,
      651,
      'Preparing',
      'Pay at restaurant',
      'Pending',
      new Date(Date.now() - 3600000 * 1).toISOString()
    );
    insertOrderItem.run(sampleOrder2Id, 10, 'Chiang Mai Khao Soi (Chicken)', 380, 1, 0, 380);
    insertOrderItem.run(sampleOrder2Id, 18, 'Mango Sticky Rice', 240, 1, 1, 240);
    insertPayment.run('PAY-SAMPLE-1002', sampleOrder2Id, 'Pay at restaurant', 651, 'Pending', 'REF-COUNTER-002', new Date(Date.now() - 3600000 * 1).toISOString());

    // Order 3: New
    insertOrder.run(
      sampleOrder3Id,
      'Rahul Verma',
      '+919741234567',
      'delivery',
      'Tower 3, Apt 1104, Salarpuria Serenity, 5th Main, HSR Layout',
      'Make it less spicy if possible',
      740,
      40,
      37,
      817,
      'New',
      'Pay on delivery',
      'Pending',
      new Date().toISOString()
    );
    insertOrderItem.run(sampleOrder3Id, 3, 'Veg Katsu Sushi', 340, 1, 1, 340);
    insertOrderItem.run(sampleOrder3Id, 13, 'Thai Green Curry with Jasmine Rice', 390, 1, 0, 390);
    insertPayment.run('PAY-SAMPLE-1003', sampleOrder3Id, 'Pay on delivery', 817, 'Pending', 'REF-COD-003', new Date().toISOString());

    // Add sample contact message
    db.prepare(`
      INSERT INTO contact_messages (name, phone, email, message, is_read, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('Vikram Rao', '+919812345678', 'vikram.rao@example.com', 'Hi Suku team! Would like to book a table for 6 people this Saturday evening around 8 PM. Please let me know if available.', 0, new Date().toISOString());

    console.log('✅ Sample orders, payments, and inquiry seeded.');
  }

  console.log('🎉 Database setup complete!');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedDatabase().catch(err => {
    console.error('Seed error:', err);
    process.exit(1);
  });
}
