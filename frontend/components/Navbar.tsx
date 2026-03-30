"use client";

import Image from "next/image";
import React from "react";
import { currentAcademicCycle } from "@/lib/data";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, logout } from "@/lib/redux/slices/authSlice";
import { ChevronDown, User, Shield, Users, GraduationCap, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { getAvatarUrl, resolveAvatar } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout());
  };

  const capitalize = (text: string) => {
    if (!text) return "";
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const displayName = user.name || user.email.split("@")[0];
  const firstName = displayName.split(" ")[0];

  return (
    <div className="flex items-center justify-between p-4 md:p-6 lg:px-8 w-full border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-30">
      {/* GREETING */}
      <div className="hidden md:flex flex-col">
        <span className="text-xl font-bold text-foreground">Hi, {capitalize(firstName)} 👋</span>
        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
          {currentAcademicCycle.session} - {currentAcademicCycle.term}
        </span>
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full md:w-auto">
        <div className="flex items-center gap-3">
          <div className="bg-muted dark:bg-slate-800 rounded-full size-9 flex items-center justify-center shadow-sm cursor-pointer hover:bg-muted-hover dark:hover:bg-slate-700 transition-all border border-transparent dark:border-slate-700 hover:scale-105 active:scale-95">
            <Image src="/message.png" alt="" width={18} height={18} />
          </div>
          <div className="bg-muted dark:bg-slate-800 relative rounded-full size-9 flex items-center justify-center shadow-sm cursor-pointer hover:bg-muted-hover dark:hover:bg-slate-700 transition-all border border-transparent dark:border-slate-700 hover:scale-105 active:scale-95">
            <Image src="/announcement.png" alt="" width={18} height={18} />
            <div className="absolute -top-1 -right-1 size-3.5 flex items-center justify-center bg-destructive text-destructive-foreground text-[8px] font-bold rounded-full border-2 border-background">
              1
            </div>
          </div>

          <ThemeToggle />

          <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block" />

          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <div 
                className="flex items-center gap-3 group px-2 py-1 rounded-full hover:bg-muted/50 transition-colors cursor-pointer outline-none"
                onMouseEnter={() => setIsOpen(true)}
              >
                <div className="flex flex-col text-right hidden sm:flex">
                  <span className="text-sm font-semibold leading-tight text-foreground">{capitalize(displayName)}</span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-1 justify-end">
                    {user.role === "admin" && <Shield size={10} className="text-destructive font-bold" />}
                    {user.role === "teacher" && <Users size={10} className="text-blue-500" />}
                    {user.role === "student" && <GraduationCap size={10} className="text-green-500" />}
                    {user.role}
                  </span>
                </div>
                <div className="relative group/navbar-avatar">
                   <Avatar className="size-10 ring-2 ring-primary/20 shadow-lg transition-all group-hover:scale-110 group-hover:ring-primary/40">
                      <AvatarImage 
                        src={resolveAvatar(user.avatar, displayName)} 
                        alt={displayName} 
                        className="object-cover"
                      />
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary uppercase font-black">
                        {displayName.charAt(0)}
                      </AvatarFallback>
                   </Avatar>
                   <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-background rounded-full shadow-sm z-10" />
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 mt-2 rounded-2xl border-border/40 bg-card/80 backdrop-blur-xl shadow-2xl p-2"
              onMouseLeave={() => setIsOpen(false)}
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold leading-none">{capitalize(displayName)}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/40" />
              <Link href="/profile">
                <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5 focus:bg-primary/10 focus:text-primary transition-colors">
                  <User className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard">
                <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5 focus:bg-primary/10 focus:text-primary transition-colors">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/settings">
                <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5 focus:bg-primary/10 focus:text-primary transition-colors">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-border/40" />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="rounded-lg cursor-pointer py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive transition-colors"
                onMouseEnter={() => setIsOpen(true)}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
