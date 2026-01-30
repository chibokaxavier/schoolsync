"use client";

import Image from "next/image";
import React from "react";
import { currentAcademicCycle } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown, User, Shield, Users, GraduationCap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const { user, setRole } = useAuth();

  return (
    <div className="flex items-center justify-between p-4 md:p-6 lg:px-8 w-full">
      {/* GREETING */}
      <div className="hidden md:flex flex-col">
        <span className="text-xl font-bold text-foreground">Hi, 👋</span>
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
          {currentAcademicCycle.session} - {currentAcademicCycle.term}
        </span>
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full md:w-auto">
        {/* Role Switcher (Dev Mode UI) */}
        <div className="hidden lg:flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl border border-gray-200">
          {(["admin", "teacher", "student", "parent"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${user.role === r
                ? "bg-white text-primary shadow-sm ring-1 ring-gray-200"
                : "text-gray-400 hover:text-gray-600"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="bg-card dark:bg-slate-800 rounded-full size-9 flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors border border-transparent dark:border-slate-700">
          <Image src="/message.png" alt="" width={20} height={20} />
        </div>
        <div className="bg-card dark:bg-slate-800 relative rounded-full size-9 flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors border border-transparent dark:border-slate-700">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-1.5 -right-1.5 size-4 flex items-center justify-center bg-purple-500 text-white text-[10px] font-bold rounded-full">
            1
          </div>
        </div>

        <ThemeToggle />
        <div className="flex flex-col text-right">
          <span className="text-sm font-semibold leading-tight text-foreground">{user.name}</span>
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest flex items-center gap-1 justify-end">
            {user.role === "admin" && <Shield size={10} className="text-red-500" />}
            {user.role === "teacher" && <Users size={10} className="text-blue-500" />}
            {user.role === "student" && <GraduationCap size={10} className="text-green-500" />}
            {user.role}
          </span>
        </div>
        <div className="size-9 relative rounded-full ring-2 ring-white shadow-sm overflow-hidden bg-gray-200">
          <Image
            src={user.avatar}
            alt=""
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
