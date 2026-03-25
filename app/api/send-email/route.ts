import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, subject, message } = body;

    const { data, error } = await resend.emails.send({
      from: "Hafizu Portfolio <onboarding@resend.dev>",
      to: ["piz230601@gmail.com"],

      subject: subject || "New Message from Portfolio",

      replyTo: email,

      html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,

      text: `
        New message from portfolio:

        Name: ${name}
        Email: ${email}

        Message:
        ${message}
      `,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Server crash" },
      { status: 500 },
    );
  }
}
