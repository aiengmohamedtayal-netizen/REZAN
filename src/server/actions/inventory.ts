"use server";

import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/server/auth/session";
import { updateProductStock } from "@/server/domain/products";

export async function adjustStockAction(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  const variantId = formData.get("variantId") as string;
  const newStock = parseInt(formData.get("newStock") as string, 10);
  const notes = (formData.get("notes") as string) || undefined;

  if (!variantId || isNaN(newStock)) {
    throw new Error("Invalid parameters");
  }

  updateProductStock(variantId, newStock, admin.id, notes);
  revalidatePath("/admin/inventory");
  revalidatePath("/admin/products");
  revalidatePath("/admin");
}
