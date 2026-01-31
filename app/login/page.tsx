"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Role } from "@/lib/permissions";
import { Eye, EyeOff, Lock, User, GraduationCap, Users, UserCog } from "lucide-react";

const LoginPage = () => {
    const { setRole } = useAuth();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role>("student");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setRole(selectedRole);
        router.push(`/${selectedRole}`);
    };

    const roles: { id: Role; label: string; icon: any; color: string }[] = [
        { id: "admin", label: "Admin", icon: UserCog, color: "bg-lamaPurple" },
        { id: "teacher", label: "Teacher", icon: Users, color: "bg-lamaSky" },
        { id: "student", label: "Student", icon: GraduationCap, color: "bg-lamaYellow" },
        { id: "parent", label: "Parent", icon: User, color: "bg-lamaPurpleLight" },
    ];

    return (
        <div className="h-screen flex items-center justify-center bg-muted/30 dark:bg-background overflow-hidden relative">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-lamaYellow/20 blur-[120px] rounded-full" />
            </div>

            <div className="bg-card w-full max-w-md p-8 rounded-2xl shadow-2xl border border-border/50 relative overflow-hidden">
                {/* Logo and Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Image src="/logo.png" alt="logo" width={32} height={32} />
                        <span className="text-2xl font-bold tracking-tight text-foreground">SchoolSync</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Welcome back! Please login to your account.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Role Selection */}
                    <div className="space-y-3">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Default Role (Simulator)</label>
                        <div className="grid grid-cols-2 gap-2">
                            {roles.map((role) => {
                                const Icon = role.icon;
                                const isSelected = selectedRole === role.id;
                                return (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => setSelectedRole(role.id)}
                                        className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${isSelected
                                                ? "border-primary bg-primary/5 text-primary shadow-sm"
                                                : "border-border bg-muted/20 text-muted-foreground hover:border-border-hover hover:bg-muted/50"
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-xs font-medium">{role.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <User className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    className="w-full pl-10 pr-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/60"
                                    defaultValue="admin-demo"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-12 py-2.5 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/60"
                                    defaultValue="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs px-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20" />
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
                        </label>
                        <a href="#" className="text-primary font-medium hover:underline">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-muted-foreground">
                        Don't have an account? <a href="#" className="text-primary font-medium hover:underline">Contact Administrator</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
