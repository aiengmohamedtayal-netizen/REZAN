"use server";

import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/server/auth/session";
import { updateOrderStatus } from "@/server/domain/orders";

export async function updateOrderStatusAction(formData: FormData) {
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
  revalidatePath("/admin");
}
