-- ============================================================================
-- REZAN Maison de Parfum — Database Seed (RBAC Foundation & Core Data)
-- ============================================================================

-- 1. Permissions
INSERT OR IGNORE INTO permissions (id, slug, module, description) VALUES
('p_prod_r', 'products.read', 'products', 'عرض قائمة وتفاصيل العطور'),
('p_prod_w', 'products.write', 'products', 'إضافة وتعديل العطور وتوليفاتها'),
('p_prod_d', 'products.delete', 'products', 'أرشفة وحذف المنتجات غير النشطة'),

('p_ord_r', 'orders.read', 'orders', 'عرض الطلبات ومتابعة حالتها'),
('p_ord_w', 'orders.write', 'orders', 'تحديث حالات الطلبات والملاحظات الداخلية'),
('p_ord_ref', 'orders.refund', 'orders', 'إدارة وإجراء استرداد المبالغ للطلبات'),

('p_inv_r', 'inventory.read', 'inventory', 'عرض المخزون وسجلات حركات المستودع'),
('p_inv_w', 'inventory.write', 'inventory', 'إجراء تسويات وتعديلات على أرصدة المخزون'),

('p_cust_r', 'customers.read', 'customers', 'عرض بيانات وسجل طلبات العملاء'),
('p_cust_w', 'customers.write', 'customers', 'إدارة وتحديث بيانات العملاء وحظرهم'),

('p_cnt_r', 'content.read', 'content', 'عرض مقالات الجورنال ومحتوى الواجهة'),
('p_cnt_w', 'content.write', 'content', 'تحرير ونشر المقالات والبانرات الترويجية'),

('p_med_r', 'media.read', 'media', 'استعراض مكتبة الوسائط والصور'),
('p_med_w', 'media.write', 'media', 'رفع وحذف واستبدال أصول الوسائط'),

('p_anl_r', 'analytics.read', 'analytics', 'عرض مؤشرات الأداء والتقارير المالية والبيعية'),

('p_stf_r', 'staff.read', 'staff', 'استعراض فريق العمل والأدوار الوظيفية'),
('p_stf_w', 'staff.write', 'staff', 'إنشاء وتعديل صلاحيات حسابات الموظفين'),

('p_set_r', 'settings.read', 'settings', 'عرض إعدادات المتجر والشحن والـ SEO'),
('p_set_w', 'settings.write', 'settings', 'تعديل الإعدادات العامة والمتغيرات التشغيلية'),

('p_aud_r', 'audit.read', 'audit', 'استعراض سجل العمليات والتدقيق الأمني');

-- 2. System Roles
INSERT OR IGNORE INTO roles (id, name, slug, description, is_system) VALUES
('r_owner', 'المالك (Owner)', 'owner', 'صلاحيات مطلقة لإدارة المنظومة بالكامل', 1),
('r_admin', 'مدير النظام (Administrator)', 'admin', 'إدارة كافة العمليات التشغيلية والموظفين', 1),
('r_manager', 'مدير المتجر (Store Manager)', 'manager', 'إشراف على المنتجات والطلبات والمخزون والعملاء', 1),
('r_editor', 'مدير المحتوى (Content Editor)', 'editor', 'إدارة الجورنال ومحتوى الواجهة ومكتبة الوسائط', 1),
('r_inv_mgr', 'أمين المستودع (Inventory Manager)', 'inventory_manager', 'متابعة وضبط حركات المخزون والمستودعات', 1),
('r_support', 'خدمة العملاء (Customer Support)', 'support', 'متابعة الطلبات والتواصل مع العملاء والرسائل', 1),
('r_analyst', 'محلل بيانات (Analyst)', 'analyst', 'الاطلاع على التقارير والتحليلات البيعية فقط', 1);

-- 3. Role Permissions Assignment (Owner gets everything)
INSERT OR IGNORE INTO role_permissions (role_id, permission_id)
SELECT 'r_owner', id FROM permissions;

-- Administrator gets all except audit deletion
INSERT OR IGNORE INTO role_permissions (role_id, permission_id)
SELECT 'r_admin', id FROM permissions;

-- Store Manager
INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES
('r_manager', 'p_prod_r'), ('r_manager', 'p_prod_w'),
('r_manager', 'p_ord_r'),  ('r_manager', 'p_ord_w'),
('r_manager', 'p_inv_r'),  ('r_manager', 'p_inv_w'),
('r_manager', 'p_cust_r'), ('r_manager', 'p_cust_w'),
('r_manager', 'p_cnt_r'),  ('r_manager', 'p_med_r'),
('r_manager', 'p_anl_r');

-- Content Editor
INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES
('r_editor', 'p_cnt_r'), ('r_editor', 'p_cnt_w'),
('r_editor', 'p_med_r'), ('r_editor', 'p_med_w'),
('r_editor', 'p_prod_r');

-- Inventory Manager
INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES
('r_inv_mgr', 'p_prod_r'),
('r_inv_mgr', 'p_inv_r'), ('r_inv_mgr', 'p_inv_w');

-- Customer Support
INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES
('r_support', 'p_ord_r'), ('r_support', 'p_ord_w'),
('r_support', 'p_cust_r'),
('r_support', 'p_prod_r');

-- Analyst
INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES
('r_analyst', 'p_anl_r'),
('r_analyst', 'p_ord_r'),
('r_analyst', 'p_prod_r'),
('r_analyst', 'p_inv_r');

-- 4. Initial System Administrator
-- Password hash for 'Rezan@2026!Admin' will be seeded securely via the database engine
INSERT OR IGNORE INTO admins (id, email, password_hash, name, status) VALUES
('admin_root', 'admin@rezan.com', 'pbkdf2:100000:7c5b6f332211aa88:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'إدارة ريزان', 'active');

INSERT OR IGNORE INTO admin_role_assignments (admin_id, role_id) VALUES
('admin_root', 'r_owner');

-- 5. Default Store Settings
INSERT OR IGNORE INTO store_settings (key, value) VALUES
('store_info', '{"nameAr":"ريزان","nameEn":"REZAN","tagline":"Maison de Parfum","email":"concierge@rezan.com","phone":"+20 100 000 0000","currency":"EGP","country":"EG"}'),
('shipping', '{"freeShippingThreshold":2500,"standardFee":150,"expressFee":250,"estimatedDays":"2-4 أيام عمل"}'),
('announcement', '{"textAr":"شحن مجاني لكافة طلبات النخبة بقيمة ٢٥٠٠ ج.م فأكثر","textEn":"Complimentary White-Glove Delivery on orders over 2,500 EGP","active":true}'),
('seo', '{"metaTitle":"ريزان | REZAN — Maison de Parfum","metaDescription":"دار عطور ريزان الفاخرة — حيث تلتقي الروح العربية بعراقة العطور الأوروبية النادرة.","ogImage":"/images/rezan/heritage/rezan-heritage-fragrance.webp"}');
