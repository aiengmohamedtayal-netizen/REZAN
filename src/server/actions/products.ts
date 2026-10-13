"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/server/auth/session";
import {
  createProduct,
  updateProduct,
  archiveProduct,
  deleteProduct,
} from "@/server/domain/products";

export async function createProductAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  const nameAr = (formData.get("nameAr") as string)?.trim();
  const nameEn = (formData.get("nameEn") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const taglineAr = (formData.get("taglineAr") as string)?.trim();
  const taglineEn = (formData.get("taglineEn") as string)?.trim();
  const descriptionAr = (formData.get("descriptionAr") as string)?.trim();
  const descriptionEn = (formData.get("descriptionEn") as string)?.trim();
  const gender = (formData.get("gender") as "unisex" | "male" | "female") || "unisex";
  const olfactiveFamily = (formData.get("olfactiveFamily") as
    | "Warm"
    | "Woody"
    | "Floral"
    | "Oriental"
    | "Fresh"
    | "Musky") || "Oriental";
  const badge = (formData.get("badge") as "new" | "bestseller" | "sale" | "limited") || null;
  const collectionId = (formData.get("collectionId") as string) || null;
  const imageUrl = (formData.get("imageUrl") as string)?.trim();

  // Olfactory notes
  const notesTop = (formData.get("notesTop") as string)
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const notesHeart = (formData.get("notesHeart") as string)
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const notesBase = (formData.get("notesBase") as string)
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Variant 1: 100ml
  const price100 = Number(formData.get("price100") || 0);
  const stock100 = Number(formData.get("stock100") || 0);
  // Variant 2: 50ml (optional)
  const price50 = Number(formData.get("price50") || 0);
  const stock50 = Number(formData.get("stock50") || 0);

  const variants = [];
  if (price100 > 0) {
    variants.push({
      sizeMl: 100,
      price: price100,
      stock: stock100,
      sku: `RZN-${slug.toUpperCase()}-100ML`,
    });
  }
  if (price50 > 0) {
    variants.push({
      sizeMl: 50,
      price: price50,
      stock: stock50,
      sku: `RZN-${slug.toUpperCase()}-50ML`,
    });
  }

  if (variants.length === 0) {
    variants.push({
      sizeMl: 100,
      price: 1500,
      stock: 50,
      sku: `RZN-${slug.toUpperCase()}-100ML`,
    });
  }

  createProduct(
    {
      nameAr,
      nameEn,
      slug,
      taglineAr,
      taglineEn,
      descriptionAr,
      descriptionEn,
      gender,
      olfactiveFamily,
      badge,
      collectionId,
      imageUrl,
      notesTop,
      notesHeart,
      notesBase,
      isAvailable: formData.get("isAvailable") !== "off",
      isNew: formData.get("isNew") === "on",
      isBestSeller: formData.get("isBestSeller") === "on",
      variants,
    },
    admin.id,
    admin.email
  );

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/collection");
  revalidatePath("/collections");
  revalidatePath("/search");
  revalidatePath("/gifts");
  redirect("/admin/products");
}

export async function updateProductAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  const id = formData.get("productId") as string;
  if (!id) throw new Error("Missing product ID");

  const nameAr = (formData.get("nameAr") as string)?.trim();
  const nameEn = (formData.get("nameEn") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const taglineAr = (formData.get("taglineAr") as string)?.trim();
  const taglineEn = (formData.get("taglineEn") as string)?.trim();
  const descriptionAr = (formData.get("descriptionAr") as string)?.trim();
  const descriptionEn = (formData.get("descriptionEn") as string)?.trim();
  const gender = (formData.get("gender") as "unisex" | "male" | "female") || "unisex";
  const olfactiveFamily = (formData.get("olfactiveFamily") as
    | "Warm"
    | "Woody"
    | "Floral"
    | "Oriental"
    | "Fresh"
    | "Musky") || "Oriental";
  const badge = (formData.get("badge") as "new" | "bestseller" | "sale" | "limited" | "") || null;
  const collectionId = (formData.get("collectionId") as string) || null;
  const imageUrl = (formData.get("imageUrl") as string)?.trim();

  // Olfactory notes
  const notesTop = (formData.get("notesTop") as string)
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const notesHeart = (formData.get("notesHeart") as string)
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const notesBase = (formData.get("notesBase") as string)
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  updateProduct(
    id,
    {
      nameAr,
      nameEn,
      slug,
      taglineAr,
      taglineEn,
      descriptionAr,
      descriptionEn,
      gender,
      olfactiveFamily,
      badge: badge || null,
      collectionId,
      imageUrl,
      notesTop,
      notesHeart,
      notesBase,
      isAvailable: formData.get("isAvailable") === "on",
      isNew: formData.get("isNew") === "on",
      isBestSeller: formData.get("isBestSeller") === "on",
    },
    admin.id,
    admin.email
  );

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/collection");
  if (slug) revalidatePath(`/collection/${slug}`);
  revalidatePath("/collections");
  revalidatePath("/search");
  revalidatePath("/gifts");
  redirect("/admin/products");
}

export async function archiveProductAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  const id = formData.get("productId") as string;
  const isArchived = formData.get("isArchived") === "1";
  if (!id) throw new Error("Missing product ID");

  archiveProduct(id, isArchived, admin.id, admin.email);

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/collection");
  revalidatePath("/collections");
  revalidatePath("/search");
}

export async function deleteProductAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  const id = formData.get("productId") as string;
  if (!id) throw new Error("Missing product ID");

  deleteProduct(id, admin.id, admin.email);

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/collection");
  revalidatePath("/collections");
  revalidatePath("/search");
}
