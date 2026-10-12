-- ============================================================================
-- REZAN Maison de Parfum — Relational Database Schema (Cloudflare D1 / SQLite)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Admins & Authentication
CREATE TABLE IF NOT EXISTS admins (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'inactive')),
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    last_login_at TEXT
);

CREATE TABLE IF NOT EXISTS roles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    is_system INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS permissions (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    module TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id TEXT NOT NULL,
    permission_id TEXT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admin_role_assignments (
    admin_id TEXT NOT NULL,
    role_id TEXT NOT NULL,
    assigned_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    PRIMARY KEY (admin_id, role_id),
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admin_sessions (
    id TEXT PRIMARY KEY,
    admin_id TEXT NOT NULL,
    token_hash TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

-- 2. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    admin_id TEXT,
    admin_email TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details TEXT, -- JSON payload of previous/new state
    ip_address TEXT,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL
);

-- 3. Collections
CREATE TABLE IF NOT EXISTS collections (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    image_url TEXT,
    banner_url TEXT,
    is_featured INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- 4. Products & Variants
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    brand TEXT NOT NULL DEFAULT 'REZAN',
    tagline_ar TEXT,
    tagline_en TEXT,
    description_ar TEXT,
    description_en TEXT,
    gender TEXT NOT NULL DEFAULT 'unisex' CHECK (gender IN ('unisex', 'male', 'female')),
    olfactive_family TEXT NOT NULL CHECK (olfactive_family IN ('Warm', 'Woody', 'Floral', 'Oriental', 'Fresh', 'Musky')),
    notes_top TEXT,   -- JSON array of strings
    notes_heart TEXT, -- JSON array of strings
    notes_base TEXT,  -- JSON array of strings
    currency TEXT NOT NULL DEFAULT 'EGP',
    badge TEXT CHECK (badge IN ('new', 'bestseller', 'sale', 'limited') OR badge IS NULL),
    rating REAL NOT NULL DEFAULT 5.0,
    review_count INTEGER NOT NULL DEFAULT 0,
    is_available INTEGER NOT NULL DEFAULT 1,
    is_new INTEGER NOT NULL DEFAULT 0,
    is_bestseller INTEGER NOT NULL DEFAULT 0,
    is_archived INTEGER NOT NULL DEFAULT 0,
    collection_id TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS product_variants (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    size_ml INTEGER NOT NULL,
    price REAL NOT NULL,
    original_price REAL,
    sku TEXT UNIQUE,
    stock INTEGER NOT NULL DEFAULT 0,
    barcode TEXT,
    is_available INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS product_images (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    url TEXT NOT NULL,
    alt_ar TEXT,
    alt_en TEXT,
    is_primary INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 5. Inventory & Movements
CREATE TABLE IF NOT EXISTS inventory_movements (
    id TEXT PRIMARY KEY,
    variant_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity_change INTEGER NOT NULL,
    previous_stock INTEGER NOT NULL,
    new_stock INTEGER NOT NULL,
    reason TEXT NOT NULL CHECK (reason IN ('order', 'return', 'manual_adjustment', 'damaged', 'restock', 'initial')),
    reference_id TEXT,
    admin_id TEXT,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL
);

-- 6. Customers
CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    total_orders INTEGER NOT NULL DEFAULT 0,
    total_spent REAL NOT NULL DEFAULT 0.0,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'blocked')),
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS customer_addresses (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    governorate TEXT NOT NULL,
    city TEXT NOT NULL,
    street_address TEXT NOT NULL,
    building TEXT,
    is_default INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- 7. Orders & Items
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    customer_id TEXT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    governorate TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    subtotal REAL NOT NULL,
    shipping_fee REAL NOT NULL DEFAULT 0.0,
    discount_amount REAL NOT NULL DEFAULT 0.0,
    coupon_code TEXT,
    total REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'EGP',
    order_status TEXT NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    fulfillment_status TEXT NOT NULL DEFAULT 'unfulfilled' CHECK (fulfillment_status IN ('unfulfilled', 'fulfilled', 'partially_fulfilled')),
    payment_method TEXT NOT NULL DEFAULT 'cod' CHECK (payment_method IN ('cod', 'card')),
    internal_notes TEXT,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    variant_id TEXT NOT NULL,
    product_name_ar TEXT NOT NULL,
    product_name_en TEXT NOT NULL,
    size_ml INTEGER NOT NULL,
    unit_price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE
);

-- 8. Coupons / Discounts
CREATE TABLE IF NOT EXISTS coupons (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value REAL NOT NULL,
    min_order_value REAL NOT NULL DEFAULT 0.0,
    max_uses INTEGER,
    used_count INTEGER NOT NULL DEFAULT 0,
    per_customer_limit INTEGER NOT NULL DEFAULT 1,
    starts_at TEXT,
    expires_at TEXT,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS coupon_redemptions (
    id TEXT PRIMARY KEY,
    coupon_id TEXT NOT NULL,
    order_id TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    discount_amount REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- 9. Gift Sets
CREATE TABLE IF NOT EXISTS gift_sets (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    price REAL NOT NULL,
    original_price REAL,
    image_url TEXT,
    is_available INTEGER NOT NULL DEFAULT 1,
    is_featured INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS gift_set_items (
    id TEXT PRIMARY KEY,
    gift_set_id TEXT NOT NULL,
    item_title_ar TEXT NOT NULL,
    item_title_en TEXT NOT NULL,
    FOREIGN KEY (gift_set_id) REFERENCES gift_sets(id) ON DELETE CASCADE
);

-- 10. Journal / Editorial Content
CREATE TABLE IF NOT EXISTS journal_posts (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    excerpt_ar TEXT,
    excerpt_en TEXT,
    content_ar TEXT,
    content_en TEXT,
    cover_image TEXT,
    category TEXT NOT NULL DEFAULT 'ثقافة العطور',
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    reading_time TEXT,
    published_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- 11. Media Library
CREATE TABLE IF NOT EXISTS media_assets (
    id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,
    dimensions TEXT,
    alt_text TEXT,
    uploaded_by TEXT,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (uploaded_by) REFERENCES admins(id) ON DELETE SET NULL
);

-- 12. Reviews
CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment_ar TEXT NOT NULL,
    comment_en TEXT,
    is_verified INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 13. Messages / Contact
CREATE TABLE IF NOT EXISTS contact_messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
    admin_notes TEXT,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- 14. Store & System Settings
CREATE TABLE IF NOT EXISTS store_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL, -- JSON string
    updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- 15. Indexes for High Performance Querying
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_collection ON products(collection_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_variant ON inventory_movements(variant_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_admin ON audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token_hash);
