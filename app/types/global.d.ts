export type Stack = {
    title: string
    description: string
    technologies: string[]
}

export type Skill = {
    id?: string
    name: string
    slug: string
    category: string
    createdAt?: Date
    updatedAt?: Date
}

export type Responsibility = {
    id: string
    experienceId: string
    responsibility: string
    createdAt: Date
    updatedAt: Date
}

export interface Experience {
    id?: string
    userId: string
    company: string
    title: string
    country: string
    description: string
    responsibilities: Responsibility[]
    skills: Skill[]
    startDate: Date
    endDate: Date | null
    createdAt?: Date
    updatedAt?: Date
}

export interface Project {
    id?: string
    title: string
    description: string
    imagePath: string
    skills: Skill[]
    link: string
    createdDate: Date
    createdAt?: Date
    updatedAt?: Date
}