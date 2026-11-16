import "server-only";
import { logError } from "@/lib/log";

export type InquiryMail = {
  fullName: string;
  businessName: string;
  email: string;
  whatsapp: string;
  service: string;
  budget: string;
  description: string;
};

export function emailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const from = process.env.RESEND_FROM_EMAIL?.trim() ?? "";
  const to = process.env.INQUIRY_NOTIFY_EMAIL?.trim() ?? "";
  return {
    ready: apiKey !== "" && from !== "" && to !== "",
    apiKey,
    from,
    to,
  };
}

export async function sendInquiryEmail(inquiry: InquiryMail): Promise<"sent" | "not_configured" | "failed"> {
  const config = emailConfig();
  if (!config.ready) return "not_configured";
  const text = [
    "New One10 inquiry",
    "",
    `Name: ${inquiry.fullName}`,
    `Business: ${inquiry.businessName}`,
    `Email: ${inquiry.email}`,
    `WhatsApp: ${inquiry.whatsapp}`,
    `Service: ${inquiry.service}`,
    `Budget: ${inquiry.budget || "Not specified"}`,
    "",
    inquiry.description,
  ].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: inquiry.email,
        subject: `Inquiry from ${inquiry.fullName} — ${inquiry.businessName}`.slice(0, 180),
        text,
      }),
    });
    if (!response.ok) {
      const detail = (await response.text()).slice(0, 300);
      logError("resend", new Error(`status ${response.status} ${detail}`));
      return "failed";
    }
    return "sent";
  } catch (error) {
    logError("resend", error);
    return "failed";
  }
}
