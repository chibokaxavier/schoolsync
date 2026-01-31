"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-8 h-8" />;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-yellow-400 hover:opacity-80 transition-all border border-transparent dark:border-slate-700"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun size={20} className="fill-yellow-400" />
            ) : (
                <Moon size={20} className="fill-gray-700" />
            )}
        </button>
    );
}
