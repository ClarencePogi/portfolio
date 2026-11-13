'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Moon } from '@primeicons/react/moon';
import { Sun } from '@primeicons/react/sun';
import { Button } from "@primereact/ui/button";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null // avoid hydration mismatch

    return (
        <Button severity="contrast" rounded onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            { theme !== "dark" ? <Moon size={20}/> : <Sun size={20}/>}
        </Button>
    )
}