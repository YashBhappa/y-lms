import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
	const body = await req.text();
	const signature = headers().get("Stripe-Signature") as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
		console.log("event", JSON.stringify(event));
	} catch (error: any) {
		console.log("error", error);
		return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
	}

	console.log("reached session creation");

	const session = event.data.object as Stripe.Checkout.Session;
	const userId = session?.metadata?.userId;
	const courseId = session?.metadata?.courseId;

	if (event.type === "checkout.session.completed") {
		console.log("reached session completed events");

		if (!userId || !courseId) {
			return new NextResponse(`Webhook Error: Missing metadata`, {
				status: 400,
			});
		}

		await db.purchase.create({
			data: {
				courseId: courseId,
				userId: userId,
			},
		});
	} else {
		return new NextResponse(
			`Webhook Error: Unhandled event type ${event.type}`,
			{ status: 200 }
		);
	}

	console.log("reached endpoint");

	return new NextResponse(null, { status: 200 });
}
