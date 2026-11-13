import "server-only"

import { cache } from "react"
import { Prisma } from "@/app/generated/prisma/client"
import { prisma } from "../prisma"

const userSelect = {
	userInformation: true,
    skills: { include: { skill: true } },
    experience: { 
        include: { 
            skills: { include: { skill: true } },
            responsibilities: true
        } 
    },
    projects: { 
        include: { 
            skills: { 
                include: { skill: true } 
            }
        } 
    },
} satisfies Prisma.UserSelect

export type UserPorfolio = Prisma.UserGetPayload<{ select: typeof userSelect }>

export const getUserPorfolio = cache(async (user_name: string): Promise<UserPorfolio | null> => {
    return prisma.user.findFirst({
        where: { name: user_name },
        select: userSelect,
    })
})