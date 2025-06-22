import Stripe from "stripe";
import stripe from "@/lib/stripe";
import prisma from "../prisma";
import { cancelSubscription, updateSubscritpion } from "./subscription-service";
import { auth } from "@/auth";

export async function handleCheckoutSessionCompleted(event: Stripe.CheckoutSessionCompletedEvent) {
  const session = await stripe.checkout.sessions.retrieve(
    event.data.object.id,
    {
        expand: ['line_items']
    }
  );

  if (!session) {
    throw new Error('Session not found');
  } else {
    const user = await prisma.user.findUnique({
      where: {
        email: session.customer_email!
      }
    });

    if (!user) {
      throw new Error('User not found');
    }
    
    const price = session?.line_items?.data[0]?.price; 

    if (price == null) {
      throw new Error('Price not found');
    } 
    
    await updateSubscritpion(user.id, price!.id, session.customer as string);
  }
}

export async function handleCustomerSubscriptionDeleted(event: Stripe.CustomerSubscriptionDeletedEvent) {
  if (!event.data.object.customer) {
    throw new Error('No customer id in event');
  }

  await cancelSubscription(event.data.object.customer as string);
}

export async function handleCustomerSubscriptionUpdated(event: Stripe.CustomerSubscriptionUpdatedEvent) {
  if (!event.data.object.customer) {
    throw new Error('No customer id in event');
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      customerId: event.data.object.customer as string
    }
  })

  if (!subscription) {
    throw new Error('Subscription not found');
  }

  await updateSubscritpion(subscription.userId, event.data.object.items.data[0].price.id, event.data.object.customer as string);
}

export function getStripeEvent(body: string, sig: string) {
  try {
    return stripe.webhooks.constructEvent(body, sig, process.env.WEBHOOK_SECRET || '')
  } catch (err: unknown) {
    if (err instanceof Stripe.errors.StripeSignatureVerificationError) {
      throw new Error(err.message)
    } else {
      throw new Error('Unknown error')
    }
  }
}

export async function createCheckoutSession(customerEmail: string, priceId: string) {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    customer_email: customerEmail || undefined,
    success_url: process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/app', 
  });

  return session.url;
}

export async function getPrices() {
  const session = await auth();  
  const prodId = process.env.STRIPE_PRODUCT_ID;
  const userEmail = session?.user.email;

  if (!prodId) {
    throw new Error('No product id');
  }

  const prices = await stripe.prices.list({
    product: prodId,
    active: true
  });

  return Promise.all(prices.data.map(async (price) => {
    return await buildPrice(price, userEmail);
  }));
}

const buildPrice = async (price: Stripe.Price, userEmail: string | null | undefined) => {
  return {
    id: price.id,
    type: price.recurring?.interval == 'month' ? 'Monthly' : 'Yearly',
    price: price.unit_amount! / 100.0,
    selected: price.metadata?.selected === 'true',
    discount: price.metadata?.discount,
    link: userEmail ? await createCheckoutSession(userEmail, price.id) : '/auth/signin?callbackUrl=/app/pricing'
  }
}

export async function createCustomerPortal(customerId: string) {
  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/app',
  });

  return portal.url;
}