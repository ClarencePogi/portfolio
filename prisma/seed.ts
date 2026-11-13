import "dotenv/config";
import { prisma } from "@/app/lib/prisma";
import { skills } from "./data/skills";
import { Skill } from "@/app/types/global";
import bcrypt from "bcryptjs";

const selected_skills: Skill[] = [
    { name: "Vue", slug: "vuejs", category: "frontend" },
    { name: "TypeScript", slug: "ts", category: "frontend" },
    { name: "JavaScript", slug: "js", category: "frontend" },
    { name: "Next js", slug: "nextjs", category: "frontend" },
    { name: "React js", slug: "react", category: "frontend" },
    { name: "Tailwind", slug: "tailwind", category: "frontend" },
    { name: "Laravel", slug: "laravel", category: "backend" },
    { name: "Prisma", slug: "prisma", category: "backend" },
    { name: "Python", slug: "py", category: "backend" },
    { name: "FastAPI", slug: "fastapi", category: "backend" },
    { name: "TensorFlow", slug: "tensorflow", category: "backend" },
    { name: "MySQL", slug: "mysql", category: "database & cloud" },
    { name: "PostgreSQL", slug: "postgres", category: "database & cloud" },
    { name: "GCP", slug: "gcp", category: "database & cloud" },
    { name: "Postman", slug: "postman", category: "tools & others" },
    { name: "Ubuntu", slug: "ubuntu", category: "tools & others" },
    { name: "Git", slug: "git", category: "tools & others" },
];

const experience_selected_skill: Skill[] = [
    { name: "Laravel", slug: "laravel", category: "backend" },
    { name: "Vue", slug: "vuejs", category: "frontend" },
    { name: "MySQL", slug: "mysql", category: "database & cloud" },
    { name: "TensorFlow", slug: "tensorflow", category: "backend" },
    { name: "FastAPI", slug: "fastapi", category: "backend" },
];

const project_selected_skill: Skill[] = [
    { name: "Node.js", slug: "nodejs", category: "backend" },
    { name: "JavaScript", slug: "js", category: "frontend" },
    { name: "HTML", slug: "html", category: "frontend" },
    { name: "CSS", slug: "css", category: "frontend" },
    { name: "Express", slug: "express", category: "backend" },
];

async function main() {
    await prisma.user.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.project.deleteMany();

    const hashedPassword = await bcrypt.hash(process.env.DEFAULT_USER_PASSWORD ?? "password123!", 12)

    // Seed User
    const user = await prisma.user.create({
        data: {
            name: "Clarence S. Golez",
            email: "golezchristine31@gmail.com",
            password: hashedPassword,
            userInformation: {
                create: {
                    address: 'General Tinio, Nueva Ecija',
                    country: "Philippines",
                    school: "Nueva Ecija University of Science and Technology",
                    phoneNumber: "09306550222"
                }
            } 
        }
    })
    console.log("User seeded successfully");

    // Seed Skills
    for(const skill of skills) {
        await prisma.skill.upsert({
            where: { slug: skill.slug },
            update: {},
            create: skill
        });
    }
    console.log(`Seeded ${skills.length} skills.`);

    //Set user skill set
    await setUserSkillSet(user.id);
    console.log("User skills linked successfully");

    await seUserExperience(user.id);
    console.log("User experience linked successfully.");

    await setUserProjects(user.id);
    console.log("User projects linked successfully.");
}

async function seUserExperience(user_id: string) {
    const match_skills = await getSkillId(experience_selected_skill)

    await prisma.experience.create({
        data: {
            userId: user_id,
            title: "Junior Fullstack Developer",
            company: "Acaciasoft Corp.",
            country: "Philippines",
            description: "Building and maintaining web applications while contributing to ML-driven features across the product line.",
            startDate: new Date(2024, 6, 12),
            endDate: null,
            responsibilities: {
                createMany: {
                    data: [
                        {responsibility: "Developed full-stack features using Laravel, Vue.js, and Inertia.js"},
                        {responsibility: "Built ML pipelines for image classification and time-series forecasting"},
                        {responsibility: "Developed chatbot services using TensorFlow and FastAPI"},
                        {responsibility: "Collaborated with cross-functional teams to ship production features"}
                    ]
                }
            },
            skills: {
                createMany: {
                    data: match_skills.map((skill) => ({
                        skillId: skill.id
                    }))
                }
            }
        }
    })
}

async function setUserProjects(user_id: string) {
    const match_skills = await getSkillId(project_selected_skill)

    await prisma.project.create({
        data: {
            userId: user_id,
            title: 'Recipefy',
            description: 'Recipefy is a responsive recipe discovery and management web application that allows users to search for recipes, view detailed cooking instructions and ingredients, bookmark their favorite recipes, and organize ingredients through a shopping list. The application provides an intuitive interface for discovering and managing recipes in one place.',
            link: 'https://recipefy-v2.netlify.app/',
            imagePath: 'test',
            createdDate: new Date(2023, 6, 12),
            skills: {
                createMany: {
                    data: match_skills.map((skill) => ({
                        skillId: skill.id
                    }))
                }
            }
        }
    })
}

async function setUserSkillSet(user_id: string) {
    const match_skills = await getSkillId(selected_skills)

    await prisma.userSkill.createMany({
        data: match_skills.map((skill) => ({
            userId: user_id,
            skillId: skill.id
        })),
    })
    
}

async function getSkillId(skills: Skill[]) {
    const selected_slugs = skills.map(s => s.slug);
    return await prisma.skill.findMany({
        where: { slug: { in: selected_slugs } }
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });