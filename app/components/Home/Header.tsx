'use client'

import { ArrowUpRight } from "@primeicons/react";
import { Button } from "@primereact/ui/button";
import Image from "next/image";
import ThemeToggle from "../ThemeToggle";
import { Dialog } from '@primereact/ui/dialog';
import { useState } from "react"

import { motion } from 'framer-motion';
import { handleGetInTouch, scrollToProjects } from "@/app/lib/utilities";

const profileCard = {
  hidden: { opacity: 0, x: -50 },            // starts 50px to the LEFT
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } }, // ends in place
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const otherCard = {
  hidden: { opacity: 0, x: 30 },            // starts 50px to the LEFT
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } }, // ends in place
};

export default function Header() {
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
        // TODO: replace with your real login (Auth.js signIn, or your own API route)
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            })

        if (!res.ok) {
            setError("Invalid email or password")
            return
        }

        setOpen(false)
        setEmail("")
        setPassword("")
    } catch {
        setError("Something went wrong. Please try again.")
    } finally {
        setLoading(false)
    }
    }

    return (
        <header className="grid grid-cols-1 grid-rows-[5rem_1fr]">
            {/* Top bar */}
            <div className="
                fixed top-0 left-0 right-0 z-50
                flex justify-between items-center px-6 md:px-40 py-4 
                border-b border-gray-200 dark:border-gray-700
                bg-white/80 dark:bg-[#0D1628]/90 backdrop-blur-sm">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Clarence G.</h3>
                    <p className="text-sm text-gray-500 dark:text-[#8892A6]">Fullstack Developer</p>
                </div>
                <div className="flex items-center gap-10 ">
                    <div className="flex items-center gap-4">
                        <Button severity="info">
                            Download CV
                        </Button>
                        <ThemeToggle/>
                    </div>
                    <div>
                        <Button severity="secondary" onClick={() => setOpen(true)}>Login</Button>    
                    </div>
                </div>
            </div>
            {/* Spacer for fixed navbar */}
            <div className="h-20" />
            {/* Hero */}
            <div 
                className="relative grid grid-cols-1 md:grid-cols-2 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/bg.jpg')" }}
            >
                <div className="relative flex flex-col justify-center gap-5 px-6 md:px-16 py-12">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-200 dark:text-white">
                            I build the pipes <br /> 
                            between what users <br /> 
                            touch and what data decides.
                        </h1>
                        
                        <p className="text-gray-300 dark:text-gray-300 leading-relaxed">
                            Two years into a fullstack role at Acaciasoft Corp, splitting 
                            time between Laravel/Vue product work and the machine 
                            learning systems that sit behind it — forecasting, image 
                            classification, and a chatbot or two.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button 
                            className="w-40" 
                            severity="info" 
                            onClick={() => scrollToProjects('projects')}
                            rounded>View my projects</Button>
                        <Button 
                            className="w-40 text-white! border-gray-400 dark:border-gray-500" 
                            variant="outlined" 
                            severity="contrast" 
                            rounded
                            onClick={handleGetInTouch}
                        >
                            Get in touch
                        </Button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Based in the Philippines · Nueva Ecija University of Science and Technology
                    </p>
                </div>

                <motion.div
                    className="relative flex justify-center items-end"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div variants={profileCard}>
                        <Image 
                            src={'/api/image/profile/AI_Profile.png'} 
                            alt="Profile"
                            width={400}
                            height={300}
                            className="drop-shadow-xl"
                            unoptimized
                        />
                    </motion.div>
                    
                    <motion.div variants={otherCard} className="absolute flex items-end gap-2 bottom-5 right-6 md:right-15 h-26 max-w-[10rem]
                        bg-white/90 dark:bg-[#121D42]/95 
                        dark:text-gray-100
                        py-2 px-5 rounded-2xl border border-gray-200 dark:border-[#1E2A52]
                        shadow-lg backdrop-blur-sm">
                        <p className="text-sm leading-snug dark:text-gray-200 ">
                            Building <br />
                            web solutions <br />
                            for a better <br />
                            tomorrow
                        </p>
                        <ArrowUpRight size={15} className="text-gray-500 dark:text-gray-400 shrink-0" />
                    </motion.div>
                    <motion.div variants={otherCard} className="absolute top-5 flex items-center gap-3 right-6 md:right-15
                        bg-white/90 dark:bg-[#121D42]/95 py-2 px-4 rounded-2xl 
                        border border-gray-200 dark:border-[#1E2A52] shadow-lg backdrop-blur-sm">
                        <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse shrink-0"></div>
                        <p className="text-sm leading-tight dark:text-gray-200 text-gray-700">
                            Available for <br />
                            New opportunities
                        </p>
                    </motion.div>
                </motion.div>
            </div>
            <Dialog.Root open={open} onOpenChange={(e: any) => setOpen(e.open)}>
                <Dialog.Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                    <Dialog.Popup className="w-full max-w-sm">
                        <Dialog.Header>
                        <div className="flex flex-col gap-1">
                            <Dialog.Title className="text-xl font-semibold">
                            Sign in to your account
                            </Dialog.Title>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter your email and password to continue.
                            </p>
                        </div>
                        <Dialog.HeaderActions>
                            <Dialog.Close />
                        </Dialog.HeaderActions>
                        </Dialog.Header>

                        <Dialog.Content>
                        <form id="login-form" onSubmit={handleLogin} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-blue-500 dark:border-gray-600"
                            />
                            </div>

                            <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-blue-500 dark:border-gray-600"
                            />
                            </div>

                            {error && <p className="text-sm text-red-500">{error}</p>}
                        </form>
                        </Dialog.Content>

                        <Dialog.Footer>
                        <Button
                            type="button"
                            variant="outlined"
                            severity="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="login-form"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                        </Dialog.Footer>
                    </Dialog.Popup>
                    </Dialog.Positioner>
                </Dialog.Portal>
                </Dialog.Root>
        </header>
    );
}