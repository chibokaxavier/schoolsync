"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/lib/redux/api/apiSlice";
import { setCredentials } from "@/lib/redux/slices/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    Loader2,
} from "lucide-react";

const LoginPage = () => {
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await login({ email, password }).unwrap();
            dispatch(setCredentials({
                user: result.user,
                token: result.token
            }));
            toast.success("Welcome back! Login successful.");
            router.push(`/${result.user.role.toLowerCase()}`);
        } catch (err: any) {
            console.error("Login failed:", err);
            toast.error(err?.data?.error || "Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/20 via-background to-background p-4 sm:p-8">
            <div className="absolute inset-0 overflow-hidden -z-10 bg-grid-slate-900/[0.04] dark:bg-grid-white/[0.02]" />
            
            <Card className="w-full max-w-md border-border/40 bg-card/60 backdrop-blur-xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
                
                <CardHeader className="space-y-2 text-center pb-8 border-b border-border/10">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 ring-4 ring-primary/5">
                            <Image src="/logo.png" alt="logo" width={40} height={40} className="drop-shadow-sm" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight text-foreground">SchoolSync</CardTitle>
                    <CardDescription className="text-muted-foreground/80 text-base">
                        Your academic journey starts here. Sign in to continue.
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-8 space-y-4">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold tracking-wide ml-0.5">
                                Email Address
                            </Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@school.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-12 bg-muted/20 border-border/60 rounded-xl focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-0.5">
                                <Label htmlFor="password" className="text-sm font-semibold tracking-wide">
                                    Password
                                </Label>
                                <Link 
                                    href="/forgot-password" 
                                    className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter secure password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-12 h-12 bg-muted/20 border-border/60 rounded-xl focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-300"
                                    minLength={8}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isLoading} 
                            className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pt-2 pb-8">
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-3 text-muted-foreground font-medium">New students & staff</span>
                        </div>
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                        Don&apos;t have an account yet?{" "}
                        <Link 
                            href="/signup" 
                            className="text-primary font-bold hover:underline underline-offset-4 decoration-2 transition-all"
                        >
                            Create an Account
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
