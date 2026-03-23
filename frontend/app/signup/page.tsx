"use client";

import Image from "next/image";
import { useSignupMutation } from "@/lib/redux/api/apiSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import {
    Lock,
    Mail,
    Loader2,
    User,
    UserCircle,
    Phone,
    MapPin,
    BookOpen,
    Hash,
} from "lucide-react";

const SignupPage = () => {
    const [signup, { isLoading }] = useSignupMutation();
    const router = useRouter();
    const [role, setRole] = useState<string>("student");
    
    // Form state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        staffId: "",
        subject: "",
        regNumber: "",
        grade: "",
        phoneNumber: "",
        address: "",
        secretKey: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signup({ ...formData, role }).unwrap();
            toast.success("Account created successfully! Please login.");
            router.push("/login");
        } catch (err: any) {
            console.error("Signup failed:", err);
            toast.error(err?.data?.error || "Signup failed. Please check your details.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/20 via-background to-background p-4 sm:p-8">
            <div className="absolute inset-0 overflow-hidden -z-10 bg-grid-slate-900/[0.04] dark:bg-grid-white/[0.02]" />
            
            <Card className="w-full max-w-2xl border-border/40 bg-card/60 backdrop-blur-xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
                
                <CardHeader className="space-y-2 text-center pb-6 border-b border-border/10">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 ring-4 ring-primary/5">
                            <Image src="/logo.png" alt="logo" width={40} height={40} className="drop-shadow-sm" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight text-foreground">Join SchoolSync</CardTitle>
                    <CardDescription className="text-muted-foreground/80 text-base">
                        Create your account to join our academic community.
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-8">
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Role Selection */}
                            <div className="md:col-span-2 space-y-2">
                                <Label className="text-sm font-semibold tracking-wide ml-0.5">I am a...</Label>
                                <Select onValueChange={setRole} defaultValue={role}>
                                    <SelectTrigger className="h-12 bg-muted/20 border-border/60 rounded-xl focus:ring-primary/20">
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-border/40 backdrop-blur-xl">
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="teacher">Teacher</SelectItem>
                                        <SelectItem value="parent">Parent</SelectItem>
                                        <SelectItem value="admin">Moderator/Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Base Credentials */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold tracking-wide ml-0.5">Email Address</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <Input id="email" type="email" value={formData.email} onChange={handleChange} className="pl-10 h-12 bg-muted/20 border-border/60 rounded-xl" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <Input id="password" type="password" value={formData.password} onChange={handleChange} className="pl-10 h-12 bg-muted/20 border-border/60 rounded-xl" required />
                                </div>
                            </div>

                            {/* Shared Profile Fields */}
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <Input id="firstName" value={formData.firstName} onChange={handleChange} className="pl-10 h-12 bg-muted/20 border-border/60 rounded-xl" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <UserCircle className="w-4 h-4" />
                                    </div>
                                    <Input id="lastName" value={formData.lastName} onChange={handleChange} className="pl-10 h-12 bg-muted/20 border-border/60 rounded-xl" required />
                                </div>
                            </div>

                            {/* Role Specific Fields */}
                            {role === "student" && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="regNumber">Registration Number</Label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                                <Hash className="w-4 h-4" />
                                            </div>
                                            <Input id="regNumber" value={formData.regNumber} onChange={handleChange} className="pl-10 h-12 bg-muted/20 border-border/60 rounded-xl" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="grade">Grade/Level</Label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                                <BookOpen className="w-4 h-4" />
                                            </div>
                                            <Input id="grade" type="number" value={formData.grade} onChange={handleChange} className="pl-10 h-12 bg-muted/20 border-border/60 rounded-xl" required />
                                        </div>
                                    </div>
                                </>
                            )}

                            {role === "teacher" && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="staffId">Staff ID</Label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                                <Hash className="w-4 h-4" />
                                            </div>
                                            <Input id="staffId" value={formData.staffId} onChange={handleChange} className="pl-10 h-12 bg-muted/20 border-border/60 rounded-xl" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject Specialty</Label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                                <BookOpen className="w-4 h-4" />
                                            </div>
                                            <Input id="subject" value={formData.subject} onChange={handleChange} className="pl-10 h-12 bg-muted/20 border-border/60 rounded-xl" required />
                                        </div>
                                    </div>
                                </>
                            )}

                            {role === "parent" && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="phoneNumber">Phone Number</Label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <Input id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="pl-10 h-12 bg-muted/20 border-border/60 rounded-xl" required />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="address">Residential Address</Label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <Input id="address" value={formData.address} onChange={handleChange} className="pl-10 h-12 bg-muted/20 border-border/60 rounded-xl" required />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Secret Key Field for Restricted Roles */}
                            {(role === "teacher" || role === "admin") && (
                                <div className="md:col-span-2 space-y-2 animate-in slide-in-from-top-4 duration-500">
                                    <Label htmlFor="secretKey" className="text-sm font-bold text-primary flex items-center gap-2">
                                        <Lock className="w-3.5 h-3.5" />
                                        School Verification Key
                                    </Label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <Input 
                                            id="secretKey" 
                                            placeholder="Enter key provided by Administrator"
                                            value={formData.secretKey} 
                                            onChange={handleChange} 
                                            className="pl-10 h-12 bg-primary/5 border-primary/30 rounded-xl focus-visible:ring-primary/20" 
                                            required 
                                        />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground px-1 italic">
                                        * This key is required to register as a staff member or moderator.
                                    </p>
                                </div>
                            )}
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isLoading} 
                            className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 active:scale-[0.98] mt-4"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pt-2 pb-8 border-t border-border/10">
                    <p className="text-sm text-center text-muted-foreground mt-4">
                        Already have an account?{" "}
                        <Link 
                            href="/login" 
                            className="text-primary font-bold hover:underline underline-offset-4 decoration-2 transition-all"
                        >
                            Sign In Instead
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignupPage;
