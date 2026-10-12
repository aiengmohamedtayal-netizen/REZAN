"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/server/db";

export async function submitContactMessageAction(formData: FormData): Promise<void> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || null;
  const subject = (formData.get("subject") as string)?.trim() || "استفسار من المتجر";
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    throw new Error("Missing required contact fields");
  }

  const id = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  execute(
    `INSERT INTO contact_messages (id, name, email, phone, subject, message, status)
     VALUES (?, ?, ?, ?, ?, ?, 'unread')`,
    [id, name, email, phone, subject, message]
  );

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
