import prisma from "../prisma"

export async function updateSubscritpion(userId: string,  priceId: string, customerId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId
    }
  })

  if (subscription) {
    await prisma.subscription.update({
      where: {
        id: subscription.id
      },
      data: {
        userId,
        priceId,
        hasAccess: true,
        customerId: customerId  
      }
    })
  } else {
    await prisma.subscription.create({
      data: {
        userId,
        priceId,
        hasAccess: true,
        customerId: customerId
      }
    })
  }
}

export async function cancelSubscription(customerId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      customerId
    }
  })

  if (subscription) {
    await prisma.subscription.update({
      where: {
        id: subscription.id
      },
      data: {
        hasAccess: false
      }
    })
  }
}