import { getStripeEvent, handleCheckoutSessionCompleted, handleCustomerSubscriptionDeleted, handleCustomerSubscriptionUpdated } from "@/lib/services/stripe-service";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return new Response('No signature', { status: 400 });
  }

  try {
    const event = getStripeEvent(body, signature);

    switch(event.type){
      case 'checkout.session.completed': {
        await handleCheckoutSessionCompleted(event);
        break
      }
      case 'customer.subscription.deleted': {
        await handleCustomerSubscriptionDeleted(event);
        break
      }
      case 'customer.subscription.updated': {
        await handleCustomerSubscriptionUpdated(event);
        break
      }
      default: {
        return new Response('Webhook ignored', { status: 200 }); 
      }
    }

    return new Response('Webhook processed', { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({
      error: 'Webhook processing failed'
    }), { status: 400 });
  }
}