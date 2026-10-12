"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/server/db";

export async function submitCustomerReviewAction(formData: FormData): Promise<void> {
  const productId = (formData.get("productId") as string)?.trim();
  const customerName = (formData.get("customerName") as string)?.trim();
  const customerEmail = (formData.get("customerEmail") as string)?.trim() || null;
  const rating = parseInt((formData.get("rating") as string) || "5", 10);
  const commentAr = (formData.get("commentAr") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();

  if (!productId || !customerName || !commentAr || isNaN(rating) || rating < 1 || rating > 5) {
    throw new Error("Missing or invalid review fields");
  }

  const id = `rev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  execute(
    `INSERT INTO reviews (id, product_id, customer_name, customer_email, rating, comment_ar, is_verified, status)
     VALUES (?, ?, ?, ?, ?, ?, 1, 'pending')`,
    [id, productId, customerName, customerEmail, rating, commentAr]
  );

  if (slug) {
    revalidatePath(`/collection/${slug}`);
  }
  revalidatePath("/admin/reviews");
  revalidatePath("/admin");
}
