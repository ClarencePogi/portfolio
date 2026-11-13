import { Skill } from "@/app/types/global";

export default function TechItem({tech} : {tech: Skill}) {
    return <>
        <div
            className="group flex flex-col gap-2 items-center p-3 rounded-xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50/50 transition-colors duration-200"
        >
            <img
                src={`https://skillicons.dev/icons?i=${tech.slug}`}
                alt={tech.name}
                className="w-10 h-10 transition-transform duration-200 group-hover:scale-110"
            />
            <p className="text-xs font-medium text-gray-600 dark:text-gray-200 text-center">
                {tech.name}
            </p>
        </div>
    </>;
}