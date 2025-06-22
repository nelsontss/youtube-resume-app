import { auth } from "@/auth";
import { createCustomerPortal } from "@/lib/services/stripe-service";
import { getUser } from "@/lib/services/user-service";
import { redirect } from "next/navigation";

export default async function SubscriptionPage() {
  const session = await auth()

  if (!session || !session.user) redirect("/api/auth/signin?callbackUrl=/app/subscription")
  
  const user = await getUser(session.user.id)
  const userSubscription = user?.subscription

  if (!userSubscription || !userSubscription.hasAccess) redirect("/app/pricing")

  redirect(await createCustomerPortal(userSubscription.customerId))
}