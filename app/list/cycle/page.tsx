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

const AcademicCyclePage = () => {
    const [session, setSession] = useState(currentAcademicCycle.session);
    const [term, setTerm] = useState(currentAcademicCycle.term);
    const [students, setStudents] = useState(initialStudentsData);
    const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSaveCycle = () => {
        // In a real app, this would hit an API
        console.log("Saving Academic Cycle:", { session, term });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handlePromoteStudents = () => {
        // Promotion Logic: Increment grade by 1
        // If grade is already 12 (SS3), they graduate (handled as a status change here)
        const promotedStudents = students.map((student) => {
            if (student.grade < 12) {
                return {
                    ...student,
                    grade: student.grade + 1,
                    // Update class label too if it starts with the grade number (e.g., 1B -> 2B)
                    // Simplified for this mock: just incrementing the grade number
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
        <div className="bg-white p-6 rounded-2xl flex-1 m-4 mt-0 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-lamaPurpleLight p-3 rounded-xl">
                    <Calendar className="text-lamaPurple w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Academic Cycle</h1>
                    <p className="text-gray-500 text-sm">Manage school terms and student promotions</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* CYCLE SETTINGS */}
                <div className="space-y-6">
                    <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                        <RefreshCcw className="w-5 h-5 text-lamaSky" />
                        Current Session & Term
                    </h2>

                    <div className="bg-gray-50 p-6 rounded-2xl space-y-4 border border-gray-100">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Academic Session</label>
                            <select
                                value={session}
                                onChange={(e) => setSession(e.target.value)}
                                className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-lamaSky/20 transition-all font-medium"
                            >
                                <option>2024/2025</option>
                                <option>2025/2026</option>
                                <option>2026/2027</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Active Term</label>
                            <div className="grid grid-cols-3 gap-2">
                                {["First Term", "Second Term", "Third Term"].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTerm(t)}
                                        className={`p-3 rounded-xl text-xs font-bold transition-all border ${term === t
                                                ? "bg-lamaSky text-white border-lamaSky shadow-md shadow-sky-100"
                                                : "bg-white text-gray-600 border-gray-100 hover:border-lamaSky/30"
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleSaveCycle}
                            className="w-full bg-lamaPurple text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-purple-100"
                        >
                            <Save size={18} />
                            {showSuccess ? "Settings Saved!" : "Save Cycle Settings"}
                        </button>
                    </div>
                </div>

                {/* PROMOTION CENTER */}
                <div className="space-y-6">
                    <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-lamaYellow" />
                        Promotion Center
                    </h2>

                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100 space-y-4">
                        <div className="flex gap-4 items-start">
                            <div className="bg-red-100 p-2 rounded-lg">
                                <AlertTriangle className="text-red-600 w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-red-800">End of Year Promotion</h3>
                                <p className="text-red-700/70 text-sm mt-1">
                                    This action will increment the grade level of ALL active students by one. Students in SS 3 will be marked as Graduated.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsPromoteModalOpen(true)}
                            className="w-full bg-white border-2 border-red-200 text-red-600 py-3 rounded-xl font-bold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all flex items-center justify-center gap-2"
                        >
                            <GraduationCap size={18} />
                            Promote All Students
                        </button>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <h3 className="font-bold text-blue-800 mb-2">Cycle Stats</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded-xl border border-blue-100">
                                <p className="text-xs text-blue-600 font-bold uppercase">Total Students</p>
                                <p className="text-xl font-black text-blue-900">{students.length}</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-blue-100">
                                <p className="text-xs text-blue-600 font-bold uppercase">Current Session</p>
                                <p className="text-xl font-black text-blue-900">{session}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PROMOTION MODAL */}
            <AlertDialog open={isPromoteModalOpen} onOpenChange={setIsPromoteModalOpen}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold flex items-center gap-2">
                            <AlertTriangle className="text-red-500" />
                            Confirm Mass Promotion?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600">
                            You are about to promote <span className="font-bold text-gray-900">{students.length} students</span> to their next grade level.
                            <br /><br />
                            <ul className="list-disc ml-4 space-y-1 text-sm">
                                <li>JSS 1 students will become JSS 2</li>
                                <li>SS 2 students will become SS 3</li>
                                <li>SS 3 students will be marked as <span className="text-green-600 font-bold">Graduated</span></li>
                            </ul>
                            <br />
                            This action is <span className="text-red-600 font-bold">irreversible</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl border-gray-200 font-bold">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handlePromoteStudents}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-100"
                        >
                            Yes, Promote All
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default AcademicCyclePage;
