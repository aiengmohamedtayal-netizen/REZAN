"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/server/db";
import { getCurrentAdmin } from "@/server/auth/session";
import { assertPermission } from "@/server/auth/rbac";
import { logAuditAction } from "@/server/audit";

export async function updateHomepageContentAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "content.write");

  const announcementTextAr = (formData.get("announcement_text_ar") as string)?.trim();
  const announcementTextEn = (formData.get("announcement_text_en") as string)?.trim();
  const announcementActive = formData.get("announcement_active") === "on";

  const announcementPayload = JSON.stringify({
    textAr: announcementTextAr,
    textEn: announcementTextEn,
    active: announcementActive,
  });

  execute(
    `INSERT INTO store_settings (key, value, updated_at) VALUES ('announcement', ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
    [announcementPayload]
  );

  const heroHeadlineAr = (formData.get("hero_headline_ar") as string)?.trim();
  const heroSubheadlineAr = (formData.get("hero_subheadline_ar") as string)?.trim();
  const heroCtaTextAr = (formData.get("hero_cta_ar") as string)?.trim();

  if (heroHeadlineAr) {
    const heroPayload = JSON.stringify({
      headlineAr: heroHeadlineAr,
      subheadlineAr: heroSubheadlineAr,
      ctaTextAr: heroCtaTextAr,
    });

    execute(
      `INSERT INTO store_settings (key, value, updated_at) VALUES ('hero', ?, CURRENT_TIMESTAMP)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
      [heroPayload]
    );
  }

  logAuditAction(admin.id, admin.email, "content.homepage_updated", "store_settings", "homepage", {
    announcementActive,
  });

  revalidatePath("/");
  revalidatePath("/admin/content/home");
}

export async function updateStoreSettingsAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "settings.write");

  const storeNameAr = (formData.get("store_name_ar") as string)?.trim() || "ريزان";
  const storeNameEn = (formData.get("store_name_en") as string)?.trim() || "REZAN";
  const contactEmail = (formData.get("contact_email") as string)?.trim() || "concierge@rezan.com";
  const contactPhone = (formData.get("contact_phone") as string)?.trim() || "+20 100 000 0000";
  const currency = (formData.get("currency") as string)?.trim() || "EGP";

  const storeInfoPayload = JSON.stringify({
    nameAr: storeNameAr,
    nameEn: storeNameEn,
    email: contactEmail,
    phone: contactPhone,
    currency,
  });

  execute(
    `INSERT INTO store_settings (key, value, updated_at) VALUES ('store_info', ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
    [storeInfoPayload]
  );

  const freeShippingThreshold = parseFloat((formData.get("free_shipping_threshold") as string) || "2500");
  const standardFee = parseFloat((formData.get("standard_shipping_fee") as string) || "150");
  const estimatedDays = (formData.get("estimated_days") as string)?.trim() || "٢-٤ أيام عمل";

  const shippingPayload = JSON.stringify({
    freeShippingThreshold,
    standardFee,
    estimatedDays,
  });

  execute(
    `INSERT INTO store_settings (key, value, updated_at) VALUES ('shipping', ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
    [shippingPayload]
  );

  const seoTitle = (formData.get("seo_title") as string)?.trim();
  const seoDesc = (formData.get("seo_description") as string)?.trim();

  if (seoTitle) {
    const seoPayload = JSON.stringify({
      title: seoTitle,
      description: seoDesc,
    });

    execute(
      `INSERT INTO store_settings (key, value, updated_at) VALUES ('seo', ?, CURRENT_TIMESTAMP)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
      [seoPayload]
    );
  }

  logAuditAction(admin.id, admin.email, "settings.updated", "store_settings", "general", {});

  revalidatePath("/admin/settings");
}
