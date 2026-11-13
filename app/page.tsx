"use server"

import Footer from "./components/Home/Footer";
import Header from "./components/Home/Header"
import Main from "./components/Home/Main";

import { Experience, Project, Skill } from "./types/global";
import { getUserPorfolio, UserPorfolio } from "./lib/queries/user";

export default async function Home() {
	const user = await getUserPorfolio('Clarence S. Golez');

	if(!user) return <div>
		<h1>User Not Found!</h1>
	</div>

	const skills: Skill[] = user.skills.map(skill => skill.skill);
	const experiences: Experience[] = user.experience.map(exp => {
		return {
			...exp,
			skills: exp.skills.map(skill => skill.skill)
		}
	})

	const projects: Project[] = user.projects.map(proj=> {
		return {
			...proj,
			skills: proj.skills.map(s => s.skill)
		};
	});

	return (
		<div className="min-h-screen grid grid-cols-1 grid-rows-[30rem_auto_auto] bg-white text-gray-900 dark:bg-[#0A0F1E] dark:text-gray-100 transition-colors duration-300">
			<Header/>
			<Main skills={skills} experiences={experiences} projects={projects}/>
			<Footer/>
		</div>
  	);
} 
