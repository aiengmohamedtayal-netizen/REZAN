import { queryAll, queryOne, execute, transaction } from "../db";
import { logAuditAction } from "../audit";

export interface OrderListItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  governorate: string;
  city: string;
  total: number;
  currency: string;
  orderStatus: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  paymentMethod: string;
  itemsCount: number;
  createdAt: string;
}

export function listAdminOrders(params?: {
  search?: string;
  status?: string;
  paymentStatus?: string;
  fulfillmentStatus?: string;
  limit?: number;
  offset?: number;
}): { orders: OrderListItem[]; total: number } {
  const whereClauses: string[] = [];
  const queryParams: unknown[] = [];

  if (params?.search) {
    whereClauses.push("(order_number LIKE ? OR customer_name LIKE ? OR customer_email LIKE ? OR customer_phone LIKE ?)");
    const s = `%${params.search}%`;
    queryParams.push(s, s, s, s);
  }

  if (params?.status && params.status !== "all") {
    whereClauses.push("order_status = ?");
    queryParams.push(params.status);
  }

  if (params?.paymentStatus && params.paymentStatus !== "all") {
    whereClauses.push("payment_status = ?");
    queryParams.push(params.paymentStatus);
  }

  if (params?.fulfillmentStatus && params.fulfillmentStatus !== "all") {
    whereClauses.push("fulfillment_status = ?");
    queryParams.push(params.fulfillmentStatus);
  }

  const whereSql = whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

  const countRow = queryOne<{ count: number }>(
    `SELECT COUNT(*) as count FROM orders ${whereSql}`,
    queryParams
  );
  const total = countRow?.count || 0;

  const limit = params?.limit || 50;
  const offset = params?.offset || 0;

  const rows = queryAll<{
    id: string;
    order_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    governorate: string;
    city: string;
    total: number;
    currency: string;
    order_status: string;
    payment_status: string;
    fulfillment_status: string;
    payment_method: string;
    created_at: string;
    items_count: number;
  }>(
    `SELECT 
      o.id, o.order_number, o.customer_name, o.customer_email, o.customer_phone,
      o.governorate, o.city, o.total, o.currency, o.order_status, o.payment_status,
      o.fulfillment_status, o.payment_method, o.created_at,
      (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as items_count
    FROM orders o
    ${whereSql}
    ORDER BY o.created_at DESC
    LIMIT ? OFFSET ?`,
    [...queryParams, limit, offset]
  );

  const mapped: OrderListItem[] = rows.map((r) => ({
    id: r.id,
    orderNumber: r.order_number,
    customerName: r.customer_name,
    customerEmail: r.customer_email,
    customerPhone: r.customer_phone,
    governorate: r.governorate,
    city: r.city,
    total: Number(r.total),
    currency: r.currency,
    orderStatus: r.order_status,
    paymentStatus: r.payment_status,
    fulfillmentStatus: r.fulfillment_status,
    paymentMethod: r.payment_method,
    itemsCount: Number(r.items_count || 0),
    createdAt: r.created_at,
  }));

  return { orders: mapped, total };
}

export function getOrderDetail(idOrNumber: string) {
  const order = queryOne<Record<string, unknown>>(
    `SELECT * FROM orders WHERE id = ? OR order_number = ?`,
    [idOrNumber, idOrNumber]
  );

  if (!order) return null;

  const items = queryAll<Record<string, unknown>>(
    `SELECT oi.*, p.slug as product_slug,
      (SELECT url FROM product_images WHERE product_id = oi.product_id AND is_primary = 1 LIMIT 1) as product_image
     FROM order_items oi
     LEFT JOIN products p ON p.id = oi.product_id
     WHERE oi.order_id = ?`,
    [order.id]
  );

  return {
    ...order,
    items,
  };
}

export function updateOrderStatus(
  orderId: string,
  newStatus: string,
  adminId?: string,
  notes?: string
) {
  return transaction(() => {
    const current = queryOne<{ id: string; order_number: string; order_status: string }>(
      `SELECT id, order_number, order_status FROM orders WHERE id = ?`,
      [orderId]
    );

    if (!current) throw new Error("Order not found");

    execute(
      `UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [newStatus, orderId]
    );

    // If marked delivered, automatically set fulfillment to fulfilled
    if (newStatus === "delivered") {
      execute(`UPDATE orders SET fulfillment_status = 'fulfilled' WHERE id = ?`, [orderId]);
    }

    logAuditAction({
      adminId,
      action: "order.status_update",
      entityType: "order",
      entityId: orderId,
      details: {
        orderNumber: current.order_number,
        previousStatus: current.order_status,
        newStatus,
        notes,
      },
    });

    return { orderId, previousStatus: current.order_status, newStatus };
  });
}
