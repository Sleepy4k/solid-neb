"use server";

import { redirect } from "@solidjs/router";
import Mail from "@server/email/mail.js";

export const submitContactAction = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !name.trim()) {
    return { error: "Name is required." };
  }
  if (!email || !email.trim()) {
    return { error: "Email is required." };
  }
  if (!message || !message.trim()) {
    return { error: "Message is required." };
  }
  if (message.trim().length < 10) {
    return { error: "Message must be at least 10 characters." };
  }

  try {
    const isDevMode = process.env.APP_ENV === "development" || process.env.APP_ENV === "local" || process.env.APP_ENV === "test";

    if (!isDevMode) {
      const mailType = (process.env.APP_MAIL_SYSTEM || "smtp").toLowerCase();
      const mailer = new Mail();

      if (mailType === "web3form") {
        await mailer.sendMail({
          name,
          email,
          message: `${name} mengirimkan sebuah pesan "${message}"`,
        });
      } else {
        const userMail = process.env.SMTP_USER ?? "";
        await mailer.sendMail({
          from: `NEB Contact Form <${userMail}>`,
          to: "happytime6318@gmail.com",
          subject: `NEB - New Contact Form Submission`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #4CAF50;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #1E90FF;">${email}</a></p>
              <p><strong>Message:</strong></p>
              <blockquote style="border-left: 4px solid #4CAF50; padding-left: 10px; color: #555;">${message}</blockquote>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 0.9em; color: #777;">This email was sent from the NEB Contact Form.</p>
            </div>
          `,
        });
      }
    }

    return redirect("/contact?success=true");
  } catch (error: any) {
    console.error("Error sending email:", error);
    return { error: "An error occurred while sending your message. Please try again later." };
  }
};
