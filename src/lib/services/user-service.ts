import prisma from '@/lib/prisma'

export async function getUsers() {
  return prisma.user.findMany()
}

interface UserDTO {
  email: string
  name: string
  image: string
}

export function createUser(user: UserDTO) {
  prisma.user.create({
    data: user
  })
}

export function getUser(id: string) {
  return prisma.user.findUnique({
    where: {
      id: id
    },
    include: {
      subscription: true,
    }
  })
}