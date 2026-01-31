"use client";

import Image from "next/image";
import React from "react";
import { currentAcademicCycle } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown, User, Shield, Users, GraduationCap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const { user, setRole, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center justify-between p-4 md:p-6 lg:px-8 w-full border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-30">
      {/* GREETING */}
      <div className="hidden md:flex flex-col">
        <span className="text-xl font-bold text-foreground">Hi, {user.name.split(" ")[0]} 👋</span>
        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
          {currentAcademicCycle.session} - {currentAcademicCycle.term}
        </span>
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full md:w-auto">
        {/* Role Switcher (Dev Mode UI) */}
        <div className="hidden lg:flex items-center gap-2 bg-muted p-1.5 rounded-xl border border-border">
          {(["admin", "teacher", "moderator", "student", "parent"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${user.role === r
                ? "bg-background text-primary shadow-sm ring-1 ring-border"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-muted dark:bg-slate-800 rounded-full size-9 flex items-center justify-center shadow-sm cursor-pointer hover:bg-muted-hover dark:hover:bg-slate-700 transition-all border border-transparent dark:border-slate-700 hover:scale-105 active:scale-95">
            <Image src="/message.png" alt="" width={18} height={18} />
          </div>
          <div className="bg-muted dark:bg-slate-800 relative rounded-full size-9 flex items-center justify-center shadow-sm cursor-pointer hover:bg-muted-hover dark:hover:bg-slate-700 transition-all border border-transparent dark:border-slate-700 hover:scale-105 active:scale-95">
            <Image src="/announcement.png" alt="" width={18} height={18} />
            <div className="absolute -top-1 -right-1 size-3.5 flex items-center justify-center bg-destructive text-destructive-foreground text-[8px] font-bold rounded-full">
              1
            </div>
          </div>

          <ThemeToggle />

          <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block" />

          <div className="flex items-center gap-3 group px-2 py-1 rounded-full hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-sm font-semibold leading-tight text-foreground">{user.name}</span>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-1 justify-end">
                {user.role === "admin" && <Shield size={10} className="text-destructive font-bold" />}
                {user.role === "teacher" && <Users size={10} className="text-blue-500" />}
                {user.role === "student" && <GraduationCap size={10} className="text-green-500" />}
                {user.role}
              </span>
            </div>
            <div className="size-9 relative rounded-full ring-2 ring-primary/10 shadow-sm overflow-hidden bg-muted transition-transform group-hover:scale-105">
              <Image
                src={user.avatar}
                alt=""
                fill
                className="rounded-full object-cover"
              />
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors title='Logout'"
            >
              <Image src="/logout.png" alt="Logout" width={18} height={18} className="opacity-70 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
