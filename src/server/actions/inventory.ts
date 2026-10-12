"use server";

import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/server/auth/session";
import { updateProductStock } from "@/server/domain/products";

export async function adjustStockAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  const variantId = formData.get("variantId") as string;
  const newStock = parseInt(formData.get("newStock") as string, 10);
  const notes = (formData.get("notes") as string)?.trim() || undefined;
  const reason = (formData.get("reason") as
    | "order"
    | "return"
    | "manual_adjustment"
    | "damaged"
    | "restock"
    | "initial") || "manual_adjustment";
  const sku = (formData.get("sku") as string)?.trim() || undefined;
  const priceRaw = formData.get("price") as string;
  const price = priceRaw ? parseFloat(priceRaw) : undefined;

  if (!variantId || isNaN(newStock)) {
    throw new Error("Invalid parameters");
  }

  updateProductStock(variantId, newStock, admin.id, notes, reason, sku, price);
  revalidatePath("/admin/inventory");
  revalidatePath("/admin/products");
  revalidatePath("/admin");
}
