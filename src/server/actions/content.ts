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

  // Tax Settings (ZATCA / VAT)
  const vatEnabled = formData.get("vat_enabled") === "on";
  const vatRatePercent = parseFloat((formData.get("vat_rate_percent") as string) || "14");
  const taxNumber = (formData.get("tax_number") as string)?.trim() || "";
  const pricesIncludeTax = formData.get("prices_include_tax") === "on";

  const taxPayload = JSON.stringify({
    vatEnabled,
    vatRatePercent,
    taxNumber,
    pricesIncludeTax,
  });

  execute(
    `INSERT INTO store_settings (key, value, updated_at) VALUES ('tax_settings', ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
    [taxPayload]
  );

  // Payment Methods
  const codEnabled = formData.get("cod_enabled") === "on";
  const cardEnabled = formData.get("card_enabled") === "on";
  const codExtraFee = parseFloat((formData.get("cod_extra_fee") as string) || "0");

  const paymentsPayload = JSON.stringify({
    codEnabled,
    cardEnabled,
    codExtraFee,
  });

  execute(
    `INSERT INTO store_settings (key, value, updated_at) VALUES ('payment_settings', ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
    [paymentsPayload]
  );

  // Return Policy
  const returnDays = parseInt((formData.get("return_days") as string) || "14", 10);
  const sealRequired = formData.get("seal_required") === "on";

  const policyPayload = JSON.stringify({
    returnDays,
    sealRequired,
  });

  execute(
    `INSERT INTO store_settings (key, value, updated_at) VALUES ('return_policy', ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
    [policyPayload]
  );

  logAuditAction(admin.id, admin.email, "settings.updated", "store_settings", "general", {
    vatEnabled,
    codEnabled,
    cardEnabled,
    returnDays,
  });

  revalidatePath("/admin/settings");
}

export async function updateTickerAnnouncementsAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "content.write");

  const rawJson = (formData.get("ticker_json") as string)?.trim();
  let tickerItems = [];

  if (rawJson) {
    try {
      tickerItems = JSON.parse(rawJson);
    } catch {
      // ignore
    }
  }

  // Fallback if individual fields are passed
  if (tickerItems.length === 0) {
    const textAr1 = (formData.get("textAr_1") as string)?.trim();
    const textEn1 = (formData.get("textEn_1") as string)?.trim();
    const active1 = formData.get("active_1") === "on";

    const textAr2 = (formData.get("textAr_2") as string)?.trim();
    const textEn2 = (formData.get("textEn_2") as string)?.trim();
    const active2 = formData.get("active_2") === "on";

    const textAr3 = (formData.get("textAr_3") as string)?.trim();
    const textEn3 = (formData.get("textEn_3") as string)?.trim();
    const active3 = formData.get("active_3") === "on";

    if (textAr1) tickerItems.push({ id: "t1", textAr: textAr1, textEn: textEn1 || "", active: active1 });
    if (textAr2) tickerItems.push({ id: "t2", textAr: textAr2, textEn: textEn2 || "", active: active2 });
    if (textAr3) tickerItems.push({ id: "t3", textAr: textAr3, textEn: textEn3 || "", active: active3 });
  }

  execute(
    `INSERT INTO store_settings (key, value, updated_at) VALUES ('ticker_announcements', ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
    [JSON.stringify(tickerItems)]
  );

  logAuditAction(admin.id, admin.email, "content.ticker_updated", "store_settings", "ticker", {
    count: tickerItems.length,
  });

  revalidatePath("/");
  revalidatePath("/admin/content/home");
}

