import type { Transporter } from "nodemailer";
import axios from "axios";
import { createTransport } from "nodemailer";

interface ISMTPData {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

interface IWeb3formData {
  name: string;
  email: string;
  message: string;
}

class Mail {
  private transporter: Transporter;

  public constructor() {
    const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 0;
    const smtpConfig = {
      host: process.env.SMTP_HOST ?? "",
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER ?? "",
        pass: process.env.SMTP_PASS ?? "",
      },
    };
    this.transporter = createTransport(smtpConfig);
  }

  public async sendMail(body: ISMTPData | IWeb3formData): Promise<void> {
    const mailType = (process.env.APP_MAIL_SYSTEM ?? "smtp").toLowerCase();

    switch (mailType) {
      case "smtp":
        await this.sendSMTPMail(body as ISMTPData);
        break;
      case "web3form":
        await this.sendWeb3formMail(body as IWeb3formData);
        break;
      default:
        console.warn(`Unknown mail type "${mailType}", defaulting to SMTP.`);
        await this.sendSMTPMail(body as ISMTPData);
        break;
    }
  }

  private async sendSMTPMail(body: ISMTPData): Promise<void> {
    try {
      const userMail = process.env.SMTP_USER ?? "";
      const mailOptions: ISMTPData = {
        from: body.from ?? userMail,
        subject: body.subject,
        to: body.to,
      };

      if (body.text) {
        mailOptions.text = body.text;
      }

      if (body.html) {
        mailOptions.html = body.html;
      }

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  private async sendWeb3formMail(body: IWeb3formData): Promise<void> {
    try {
      const formUrl = process.env.WEB3FORMS_FORM_URL ?? "https://api.web3forms.com/submit";
      const accessKey = process.env.WEB3FORMS_ACCESS_KEY ?? "";
      await axios.post(
        formUrl,
        {
          access_key: accessKey,
          email: body.email,
          message: body.message,
          name: body.name,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error: unknown) {
      console.error("Error sending message to Discord webhook:", error);
    }
  }
}

export default Mail;
