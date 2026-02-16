export async function POST(req: Request) {
	try {
		const body = await req.json();

		const res = await fetch("https://dev-send-api.vercel.app/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.DEVSEND_API_KEY}`,
			},
			body: JSON.stringify({
				to: "piz230601@gmail.com",
				subject: body.subject,
				text: `
New message from portfolio:

Name: ${body.name}
Email: ${body.email}

Message:
${body.message}
        `,
				fromName: body.name,
				replyTo: body.email,
			}),
		});

		const text = await res.text();
		console.log("DevSend response:", text);

		if (!res.ok) {
			return Response.json({ error: text }, { status: 500 });
		}

		return Response.json({ success: true });
	} catch (err) {
		console.error(err);
		return Response.json({ error: "Server crash" }, { status: 500 });
	}
}
