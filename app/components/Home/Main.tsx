"use client"

import { motion } from 'framer-motion';

import { Card } from "@primereact/ui/card";
import { Fieldset } from '@primereact/ui/fieldset';

import { Experience, Project, Skill, Stack } from "@/app/types/global";
import StackCard from "./StackCard";
import { useMemo } from "react";
import TechItem from "./skills/TechItem";
import Image from "next/image";
import netlifyImage from "@/public/images/netlify.png";
import { Badge } from "@primereact/ui/badge";
import { Button } from "@primereact/ui/button";

const stacks: Stack[] = [
    {
        title: 'Interface',
        description: 'Vue components wired through Inertia, so the frontend talks to Laravel without a separate API to maintain. Currently adding React and Next.js for projects that call for them.',
        technologies: ['Vue.js', 'Inertia.js', 'React', 'Next.js']
    },
    {
        title: 'Application',
        description: 'Laravel handles auth, business rules, and persistence against MySQL. This is the layer I know best, and where most of the last two years has happened.',
        technologies: ['Laravel', 'MySQL', 'PHP']
    },
    {
        title: 'ML & data',
        description: 'A separate service for the model-facing work: image classification, time-series forecasting, and chatbot development, served over FastAPI.',
        technologies: ['TensorFlow', 'FastAPI', 'Python']
    },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Main({ skills, experiences, projects }: { skills: Skill[], experiences: Experience[], projects: Project[]}) {
    const grouped_skills = useMemo(() => {
        return skills.reduce((acc: any, item: Skill) => {
            const formatted_category = groupNameFormatter(item.category);
            (acc[formatted_category] ??= []).push(item)
            return acc;
        }, {} as Record<string, Skill[]>);
    }, [skills]);

    function groupNameFormatter(groupName: string) {
        const splitted = groupName.split(' ');
        const upperCaseFormat = splitted.map(c => c.toUpperCase()).join(' ');
        return upperCaseFormat;
    }

    function date_format(date: Date) {
        return date.toLocaleDateString("en-PH", {
            month: "short",
            year: "numeric",
        })
    }

    return <>
        <main className="flex flex-col gap-6 px-30 py-10 bg-white">
            <section className="flex flex-col gap-4">
                <div>
                    <h1 className="dark:text-black">How the stack fits together</h1>
                    <p className="text-gray-600">A request moves down through three layers before anything comes back to the <br />
                        browser. Each one below is a place I actually work.</p>
                </div>
                <motion.div
                    className="grid grid-cols-3 gap-6 h-auto justify-items-center"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {stacks.map(stack => (
                        <motion.div key={stack.title} variants={card}>
                            <StackCard key={stack.title} item={stack} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>
            <section className="grid grid-cols-2 gap-6 h-auto">
                <div className="bg-white dark:bg-[#18181B] flex flex-col gap-6 rounded-2xl 
                    shadow-md dark:shadow-black/30 
                    p-6 border border-gray-100 dark:border-gray-800 
                    hover:shadow-lg dark:hover:shadow-black/50 
                    transition-shadow duration-300">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">My Skills</h3>
                    </div>

                    {Object.entries(grouped_skills as Record<string, Skill[]>).map(([cat, techs]) => (
                        <div key={cat} className="flex flex-col gap-3">
                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                {cat}
                            </p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                {techs.map((tech: Skill) => (
                                    <TechItem key={tech.slug} tech={tech} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white dark:bg-[#18181B] rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Work Experience</h3>
                    </div>

                    <div className="flex flex-col gap-6">
                        {experiences.map((exp) => (
                            <div
                                key={`${exp.company}-${exp.title}`}
                                className="relative pl-6 border-l-2 border-emerald-100 last:pb-0"
                            >
                                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>

                                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                                    <span className="text-xs font-medium text-gray-400">
                                        {date_format(exp.startDate)} - { exp.endDate == null ? 'Present' : date_format(exp.endDate) }
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-emerald-600">
                                    {exp.company} · {exp.country}
                                </p>

                                <p className="text-sm text-gray-500 mt-2">{exp.description}</p>

                                <ul className="mt-3 flex flex-col gap-1.5">
                                    {exp.responsibilities.map((point, i) => (
                                        <li key={i} className="text-sm text-gray-600 flex gap-2">
                                            <span className="text-emerald-500 mt-1">•</span>
                                            <span>{point.responsibility}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {exp.skills.map((tech) => (
                                        <span
                                            key={tech.id}
                                            className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                                        >
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id='projects'>
                <Fieldset.Root>
                    <Fieldset.Legend>
                        <Fieldset.Title>Projects</Fieldset.Title>
                    </Fieldset.Legend>
                    <Fieldset.Content>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <article
                                    key={project.title}
                                    className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                                >
                                    <div className="relative aspect-[5/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                                        <Image
                                            src={`/api/image/${project.imagePath}`}
                                            alt={project.title}
                                            fill
                                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                            className="object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col gap-2 p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                                            {project.description}
                                        </p>

                                        <div className="grid grid-cols-5 gap-3 mt-2">
                                            {project.skills.map((item, i) => (
                                                <Badge key={i} severity="secondary">{item.name}</Badge>
                                            ))}
                                        </div>

                                        <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-xs text-gray-500 dark:text-gray-400">
                                            <div className="flex gap-2">
                                                <span className="font-medium">Created</span>
                                                <time dateTime={project.createdDate.toLocaleDateString()}>
                                                    {project.createdDate.toLocaleDateString(undefined, {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </time>
                                            </div>
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                <Button size="small" severity="contrast">View project</Button>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Fieldset.Content>
                </Fieldset.Root>
            </section>
        </main>
    </>;
}