"use client";

import { useState } from "react";
import { currentAcademicCycle, studentsData as initialStudentsData } from "@/lib/data";
import { Calendar, GraduationCap, RefreshCcw, Save, AlertTriangle } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const AcademicCyclePage = () => {
    const [session, setSession] = useState(currentAcademicCycle.session);
    const [term, setTerm] = useState(currentAcademicCycle.term);
    const [students, setStudents] = useState(initialStudentsData);
    const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSaveCycle = () => {
        console.log("Saving Academic Cycle:", { session, term });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handlePromoteStudents = () => {
        const promotedStudents = students.map((student) => {
            if (student.grade < 12) {
                return {
                    ...student,
                    grade: student.grade + 1,
                };
            } else {
                return {
                    ...student,
                    status: "Graduated",
                };
            }
        });

        setStudents(promotedStudents);
        setIsPromoteModalOpen(false);
        alert("Success! All students have been promoted to the next grade.");
    };

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl">
                    <Calendar className="text-primary w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Academic Cycle</h1>
                    <p className="text-muted-foreground">Manage school terms and automate student promotions</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* CYCLE SETTINGS */}
                <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <RefreshCcw className="w-5 h-5 text-blue-500" />
                            Cycle Configuration
                        </CardTitle>
                        <CardDescription>Update the current academic session and active term</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Academic Session</label>
                            <Select value={session} onValueChange={setSession}>
                                <SelectTrigger className="h-12 rounded-xl">
                                    <SelectValue placeholder="Select Session" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2024/2025">2024/2025</SelectItem>
                                    <SelectItem value="2025/2026">2025/2026</SelectItem>
                                    <SelectItem value="2026/2027">2026/2027</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Active Term</label>
                            <div className="grid grid-cols-3 gap-2">
                                {["First Term", "Second Term", "Third Term"].map((t) => (
                                    <Button
                                        key={t}
                                        variant={term === t ? "default" : "outline"}
                                        onClick={() => setTerm(t)}
                                        className="h-10 rounded-xl font-bold transition-all"
                                    >
                                        {t}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Button
                            onClick={handleSaveCycle}
                            className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20"
                            variant={showSuccess ? "outline" : "default"}
                        >
                            <Save className="mr-2 w-4 h-4" />
                            {showSuccess ? "Changes Saved!" : "Save Configuration"}
                        </Button>
                    </CardContent>
                </Card>

                {/* PROMOTION CENTER */}
                <div className="space-y-8">
                    <Card className="border-none shadow-sm bg-red-50/30 border border-red-100 italic">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl text-red-700">
                                <GraduationCap className="w-5 h-5 text-red-500" />
                                Promotion Center
                            </CardTitle>
                            <CardDescription className="text-red-600/70">End-of-year mass student progression</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Alert variant="destructive" className="bg-white border-red-200">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Critical Information</AlertTitle>
                                <AlertDescription className="text-xs">
                                    This action will increment the grade level of ALL active students. Students in SS 3 will be marked as Graduated.
                                </AlertDescription>
                            </Alert>

                            <Button
                                variant="destructive"
                                onClick={() => setIsPromoteModalOpen(true)}
                                className="w-full h-12 rounded-xl font-bold shadow-lg shadow-red-100"
                            >
                                <GraduationCap className="mr-2 w-4 h-4" />
                                Run Mass Promotion
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-2">
                                <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Total Students</CardDescription>
                                <CardTitle className="text-2xl font-black text-primary">{students.length}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-2">
                                <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Active Session</CardDescription>
                                <CardTitle className="text-2xl font-black text-primary">{session}</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>

            <AlertDialog open={isPromoteModalOpen} onOpenChange={setIsPromoteModalOpen}>
                <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-bold flex items-center gap-2 text-red-600">
                            <AlertTriangle className="w-6 h-6" />
                            Confirm Mass Promotion?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-4 pt-2">
                            <p>You are about to promote <Badge variant="outline" className="text-red-600 border-red-200">{students.length}</Badge> students to their next grade level.</p>

                            <div className="bg-muted p-4 rounded-xl text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span>JSS 1 students</span>
                                    <span className="font-bold">→ JSS 2</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>SS 2 students</span>
                                    <span className="font-bold">→ SS 3</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span>SS 3 students</span>
                                    <span className="font-bold uppercase tracking-tighter">Graduated</span>
                                </div>
                            </div>

                            <p className="text-xs text-muted-foreground font-medium italic">
                                * This action is irreversible and should only be performed once per academic year.
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="pt-4">
                        <AlertDialogCancel className="rounded-xl border-gray-200 font-bold h-12">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handlePromoteStudents}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold h-12 shadow-lg shadow-red-100"
                        >
                            Confirm & Execute
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default AcademicCyclePage;
