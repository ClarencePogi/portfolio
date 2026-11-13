'use client'
import { handleGetInTouch } from "@/app/lib/utilities";

export default function Footer() {
    return <>
        <footer className="bg-gray-900 text-gray-300">
				<div className="max-w-5xl mx-auto px-6 py-12">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
						{/* Brand / intro */}
						<div className="flex flex-col gap-3">
							<h2 className="text-white text-lg font-semibold">Clarence</h2>
							<p className="text-sm text-gray-400">
								Junior Fullstack Developer building web apps and ML-powered features.
							</p>
						</div>

						{/* Socials / contact */}
						<div className="flex flex-col gap-3">
							<h3 className="text-white text-sm font-semibold uppercase tracking-wider">
								Connect
							</h3>
							<div className="flex flex-col gap-2 text-sm">
								<a
									onClick={handleGetInTouch}
									className="hover:text-indigo-400 transition-colors"
								>
									golezchristine31@email.com
								</a>
								<div className="flex gap-4 mt-1">
									<a
										href="https://github.com/ClarencePogi"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-white transition-colors"
									>
										GitHub
									</a>
									<a
									
										href="https://www.linkedin.com/in/clarence-golez-18b69a289/"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-white transition-colors"
									>
										LinkedIn
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
						<p className="text-xs text-gray-500">
							© {new Date().getFullYear()} Clarence. All rights reserved.
						</p>
						<p className="text-xs text-gray-500">
							Built with React & Tailwind CSS
						</p>
					</div>
				</div>
			</footer>
    </>;
}