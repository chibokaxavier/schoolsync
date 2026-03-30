"use client";

import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/redux/slices/authSlice";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  BookOpen, 
  Hash, 
  ChevronRight,
  Shield,
  GraduationCap,
  Users,
  Briefcase
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAvatarUrl, resolveAvatar } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = () => {
    const user = useSelector(selectCurrentUser);

    if (!user) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-muted-foreground animate-pulse">Loading profile data...</p>
        </div>
    );

    const capitalize = (text: string) => {
        if (!text) return "";
        return text
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    const displayName = user.name || user.email.split("@")[0];

    return (
        <div className="p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto">
            {/* HERO SECTION */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000" />
                <Card className="relative border-none bg-card/60 backdrop-blur-xl shadow-2xl overflow-hidden rounded-3xl">
                    <CardContent className="p-0">
                        <div className="h-32 bg-gradient-to-r from-primary/10 via-primary to-primary/10 opacity-20" />
                        <div className="px-8 pb-8 -mt-12 flex flex-col md:flex-row items-center md:items-end gap-6">
                            <div className="relative group/avatar">
                                <Avatar className="size-32 md:size-40 rounded-3xl ring-8 ring-primary/5 shadow-2xl transition-all hover:scale-105 duration-500 overflow-hidden">
                                    <AvatarImage 
                                        src={resolveAvatar(user.avatar, displayName)} 
                                        alt={displayName} 
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-primary/10 text-primary text-4xl font-black rounded-3xl">
                                        {displayName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-3xl" />
                            </div>
                            <div className="flex-1 text-center md:text-left space-y-2 mb-2">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">{capitalize(displayName)}</h1>
                                    <Badge variant="outline" className="px-3 py-1 bg-primary/5 border-primary/20 text-primary font-bold uppercase tracking-widest text-[10px]">
                                        {user.role}
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 text-sm font-medium">
                                    <Mail className="size-4" />
                                    {user.email}
                                </p>
                            </div>
                            <div className="flex gap-3 mb-2">
                                <Button className="rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT: PERSONAL INFORMATION */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-border/40 bg-card/40 backdrop-blur-md rounded-2xl shadow-xl">
                        <CardHeader className="border-b border-border/10 pb-4">
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <UserIcon className="size-5 text-primary" />
                                Personal Information
                            </CardTitle>
                            <CardDescription>Detailed overview of your account credentials and role info.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InfoItem label="Full Name" value={capitalize(user.name || "N/A")} icon={<UserIcon className="size-4" />} />
                                <InfoItem label="Email Address" value={user.email} icon={<Mail className="size-4" />} />
                                <InfoItem label="Account Role" value={capitalize(user.role)} icon={<Shield className="size-4" />} />
                                <InfoItem label="User Identification" value={`ID-#${user.id}`} icon={<Hash className="size-4" />} />
                                
                                {/* ROLE SPECIFIC EXTRA INFO */}
                                {user.role === "student" && (
                                    <>
                                        <InfoItem label="Registration Number" value={(user as any).regNumber || "Pending"} icon={<CreditCard className="size-4" />} />
                                        <InfoItem label="Current Grade" value={`Grade ${(user as any).grade || "N/A"}`} icon={<GraduationCap className="size-4" />} />
                                    </>
                                )}
                                {user.role === "teacher" && (
                                    <>
                                        <InfoItem label="Staff ID" value={(user as any).staffId || "N/A"} icon={<CreditCard className="size-4" />} />
                                        <InfoItem label="Subject Specialty" value={(user as any).subject || "General"} icon={<BookOpen className="size-4" />} />
                                    </>
                                )}
                                {user.role === "parent" && (
                                    <>
                                        <InfoItem label="Phone Number" value={(user as any).phoneNumber || "N/A"} icon={<Phone className="size-4" />} />
                                        <InfoItem label="Residential Address" value={(user as any).address || "N/A"} icon={<MapPin className="size-4" />} />
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/40 backdrop-blur-md rounded-2xl shadow-xl">
                        <CardHeader className="border-b border-border/10 pb-4">
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Calendar className="size-5 text-primary" />
                                Account Statistics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                                <p className="text-2xl font-black text-primary">85%</p>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Attendance</p>
                            </div>
                            <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10 text-center">
                                <p className="text-2xl font-black text-green-500">12</p>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Events Won</p>
                            </div>
                            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 text-center">
                                <p className="text-2xl font-black text-orange-500">4.8</p>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">GPA/Rating</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT: QUICK ACTIONS & LOGS */}
                <div className="space-y-8">
                    <Card className="border-border/40 bg-card/40 backdrop-blur-md rounded-2xl shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Quick Shortcuts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <QuickAction label="Academic Calendar" icon={<Calendar className="size-4" />} />
                            <QuickAction label="Course Material" icon={<BookOpen className="size-4" />} />
                            {user.role === "student" && <QuickAction label="Submit Assignment" icon={<GraduationCap className="size-4" />} />}
                            {user.role === "teacher" && <QuickAction label="Class Management" icon={<Users className="size-4" />} />}
                            {user.role === "admin" && <QuickAction label="System Logs" icon={<Briefcase className="size-4" />} />}
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/40 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
                        <CardHeader className="bg-primary/5 border-b border-primary/10">
                            <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-border/20">
                                <ActivityItem title="Profile Updated" time="2 hours ago" />
                                <ActivityItem title="Logged in from New Device" time="5 hours ago" />
                                <ActivityItem title="Account Verification Successful" time="1 day ago" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
    <div className="group p-4 rounded-xl hover:bg-muted/30 transition-all duration-300 border border-transparent hover:border-border/40">
        <div className="flex items-center gap-3 mb-1.5 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                {icon}
            </span>
            {label}
        </div>
        <p className="text-sm font-semibold text-foreground truncate pl-1">{value}</p>
    </div>
);

const QuickAction = ({ label, icon }: { label: string; icon: React.ReactNode }) => (
    <button className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-primary/10 transition-all group text-sm font-semibold border border-transparent hover:border-primary/20">
        <div className="flex items-center gap-3">
            <span className="text-muted-foreground group-hover:text-primary transition-colors">{icon}</span>
            <span className="group-hover:translate-x-1 transition-transform">{label}</span>
        </div>
        <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </button>
);

const ActivityItem = ({ title, time }: { title: string; time: string }) => (
    <div className="p-4 hover:bg-muted/20 transition-colors cursor-default">
        <p className="text-xs font-bold text-foreground mb-0.5">{title}</p>
        <p className="text-[10px] text-muted-foreground font-medium">{time}</p>
    </div>
);

export default ProfilePage;
