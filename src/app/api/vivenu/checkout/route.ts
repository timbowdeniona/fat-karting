import { NextResponse } from "next/server";
import { createVivenuCheckout } from "@/lib/vivenu";

export async function POST(request: Request) {
  try {
    const { eventId } = await request.json();
    
    if (!eventId) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    const checkout = await createVivenuCheckout(eventId);
    return NextResponse.json(checkout);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
