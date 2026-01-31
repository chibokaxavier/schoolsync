"use client";

import Announcement from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
import EventCalendar from "@/components/EventCalendar";
import Performance from "@/components/Performance";
import UserCard from "@/components/UserCard";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import React from "react";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 md:p-6 lg:px-8 flex gap-4 flex-col lg:flex-row h-full">
      {/* LEFT COLUMN - HERO & STATS */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* WELCOME BANNER */}
        <div className="bg-gradient-to-r from-lamaSky to-lamaPurple rounded-2xl p-8 flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-foreground">Welcome Back, {user.name}!</h1>
            <p className="text-muted-foreground max-w-[500px]">
              You're doing great this year. You've completed 85% of your assignments. Keep it up!
            </p>
            <div className="flex gap-4 mt-2">
              <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity">
                View My Results
              </button>
              <button className="bg-card text-foreground px-6 py-2.5 rounded-xl text-sm font-medium border border-border hover:bg-muted transition-colors">
                My Profile
              </button>
            </div>
          </div>
          <Image
            src="/student.png"
            alt=""
            width={120}
            height={120}
            className="hidden md:block object-contain opacity-90"
          />
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UserCard type="Attendance" count="95%" subtitle="This Term" />
          <UserCard type="Current CGPA" count="3.82" subtitle="2024/2025" />
          <UserCard type="Current Grade" count={user.grade?.toString() || "JSS 1"} subtitle="Grade Level" />
          <UserCard type="Assignments" count="12/15" subtitle="Pending: 3" />
        </div>

        {/* PERFORMANCE & SCHEDULE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Performance />
          <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold text-foreground">Daily Progress</h1>
              <span className="text-xs text-muted-foreground font-medium">Goal: 9.5</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-2">
              <div className="text-4xl font-bold text-primary">A+</div>
              <p className="text-sm text-muted-foreground text-center px-4">Excellent progress in Mathematics and Science.</p>
            </div>
            <button className="w-full py-2 bg-lamaSkyLight text-primary rounded-lg text-xs font-bold hover:bg-lamaSky/20 transition-colors">
              View Detailed Reports
            </button>
          </div>
        </div>

        {/* SCHEDULE SECTION (MOVED DOWN) */}
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-foreground">My Schedule ({user.class || "4A"})</h1>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-lamaSky"></span>
              <span className="text-xs text-muted-foreground">Theory</span>
              <span className="w-3 h-3 rounded-full bg-lamaPurple ml-2"></span>
              <span className="text-xs text-muted-foreground">Practical</span>
            </div>
          </div>
          <div className="h-[600px]">
            <BigCalendar />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - CALENDAR & NOTICES */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <div className="bg-card p-4 rounded-2xl shadow-sm border border-border">
          <EventCalendar />
        </div>
        <Announcement />
      </div>
    </div>
  );
};

export default StudentDashboard;
