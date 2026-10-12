"use server";

import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/server/auth/session";
import {
  updateOrderStatus,
  updateOrderPaymentStatus,
  updateOrderFullDetails,
} from "@/server/domain/orders";

export async function updateOrderStatusAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  const orderId = formData.get("orderId") as string;
  const newStatus = formData.get("status") as string;
  const notes = (formData.get("notes") as string) || undefined;

  if (!orderId || !newStatus) {
    throw new Error("Missing required parameters");
  }

  updateOrderStatus(orderId, newStatus, admin.id, notes);
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin");
}

export async function updateOrderPaymentStatusAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  const orderId = formData.get("orderId") as string;
  const paymentStatus = formData.get("paymentStatus") as "pending" | "paid" | "failed" | "refunded";

  if (!orderId || !paymentStatus) {
    throw new Error("Missing required parameters");
  }

  updateOrderPaymentStatus(orderId, paymentStatus, admin.id, admin.email);
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin");
}

export async function updateOrderDetailsAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  const orderId = formData.get("orderId") as string;
  if (!orderId) throw new Error("Missing order ID");

  const customerName = (formData.get("customerName") as string)?.trim();
  const customerPhone = (formData.get("customerPhone") as string)?.trim();
  const customerEmail = (formData.get("customerEmail") as string)?.trim();
  const governorate = (formData.get("governorate") as string)?.trim();
  const city = (formData.get("city") as string)?.trim();
  const address = (formData.get("address") as string)?.trim();
  const orderStatus = (formData.get("orderStatus") as string) || undefined;
  const paymentStatus = (formData.get("paymentStatus") as string) || undefined;
  const internalNotes = (formData.get("internalNotes") as string)?.trim();

  updateOrderFullDetails(
    orderId,
    {
      customerName,
      customerPhone,
      customerEmail,
      governorate,
      city,
      address,
      orderStatus,
      paymentStatus,
      internalNotes,
    },
    admin.id,
    admin.email
  );

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin");
}
