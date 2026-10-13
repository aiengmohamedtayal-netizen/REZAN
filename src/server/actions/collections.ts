"use server";

import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/server/auth/session";
import {
  createCollection,
  updateCollection,
  deleteCollection,
} from "@/server/domain/collections";

export async function createCollectionAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  const nameAr = (formData.get("nameAr") as string)?.trim();
  const nameEn = (formData.get("nameEn") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const descriptionAr = (formData.get("descriptionAr") as string)?.trim();
  const descriptionEn = (formData.get("descriptionEn") as string)?.trim();
  const imageUrl = (formData.get("imageUrl") as string)?.trim();
  const isFeatured = formData.get("isFeatured") === "on";

  if (!nameAr || !nameEn || !slug) {
    throw new Error("Missing required collection parameters");
  }

  createCollection(
    {
      nameAr,
      nameEn,
      slug,
      descriptionAr,
      descriptionEn,
      imageUrl,
      isFeatured,
    },
    admin.id,
    admin.email
  );

  revalidatePath("/admin/collections");
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/collections");
  revalidatePath("/collection");
}

export async function updateCollectionAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  const id = formData.get("collectionId") as string;
  const nameAr = (formData.get("nameAr") as string)?.trim();
  const nameEn = (formData.get("nameEn") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const descriptionAr = (formData.get("descriptionAr") as string)?.trim();
  const descriptionEn = (formData.get("descriptionEn") as string)?.trim();
  const imageUrl = (formData.get("imageUrl") as string)?.trim();
  const isFeatured = formData.get("isFeatured") === "on";

  if (!id || !nameAr || !nameEn || !slug) {
    throw new Error("Missing required collection parameters");
  }

  updateCollection(
    id,
    {
      nameAr,
      nameEn,
      slug,
      descriptionAr,
      descriptionEn,
      imageUrl,
      isFeatured,
    },
    admin.id,
    admin.email
  );

  revalidatePath("/admin/collections");
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/collections");
  if (slug) revalidatePath(`/collections/${slug}`);
  revalidatePath("/collection");
}

export async function deleteCollectionAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  const id = formData.get("collectionId") as string;
  if (!id) throw new Error("Missing collection ID");

  deleteCollection(id, admin.id, admin.email);

  revalidatePath("/admin/collections");
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/collections");
  revalidatePath("/collection");
}
