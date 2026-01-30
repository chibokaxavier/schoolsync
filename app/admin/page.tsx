"use client";

import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";
import Image from "next/image";
import Link from "next/link";
import Announcement from "@/components/Announcement";
import BroadcastForm from "@/components/BroadcastForm";
import { useState } from "react";

const AdminPage = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  const handleBroadcast = (message: string, target: string, title?: string) => {
    const newAnnouncement = {
      id: Date.now(),
      title: title || "New Broadcast",
      time: new Date().toISOString().split('T')[0],
      description: message,
      target: target,
    };
    // Prepend to list
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  };

  return (
    <div className="p-4 md:p-6 lg:px-8 flex gap-4 flex-col md:flex-row h-full">
      {/* LEFT COLUMN - HERO & STATS */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* WELCOME BANNER */}
        <div className="bg-gradient-to-r from-lamaSky to-lamaPurple rounded-2xl p-8 flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Admin!</h1>
            <p className="text-gray-600 max-w-[500px]">
              Manage your school efficiently with our modern tools. Check your schedule, messages and alerts below.
            </p>
            <div className="flex gap-4 mt-2">
              <button className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity">
                View Reports
              </button>
              <button className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                Settings
              </button>
            </div>
          </div>
          <Image
            src="/student.png"
            alt=""
            width={140}
            height={140}
            className="hidden md:block object-contain opacity-80"
          />
        </div>

        {/* QUICK STATS CARDS */}
        <h2 className="text-xl font-bold text-gray-800 mt-2">Overview</h2>
        <div className="flex gap-4 justify-between flex-wrap">
          <Link href="/list/students" className="flex-1 min-w-[130px] hover:no-underline">
            <UserCard type="Total Students" count="3,450" />
          </Link>
          <Link href="/list/teachers" className="flex-1 min-w-[130px] hover:no-underline">
            <UserCard type="Total Teachers" count="120" />
          </Link>
          <Link href="/list/parents" className="flex-1 min-w-[130px] hover:no-underline">
            <UserCard type="Total Parents" count="2,800" />
          </Link>
          <Link href="/list/payments" className="flex-1 min-w-[130px] hover:no-underline">
            <UserCard type="Total Fees Collected" count="$150,000" subtitle="This Term" />
          </Link>
        </div>

        {/* SHORTCUTS GRID */}
        <h2 className="text-xl font-bold text-gray-800 mt-2">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Add Student", icon: "/student.png", color: "bg-lamaSkyLight" },
            { label: "Payment Tracking", icon: "/finance.png", color: "bg-pink-50", href: "/list/payments" },
            { label: "Fee Structure", icon: "/finance.png", color: "bg-lamaSkyLight", href: "/list/fees" },
            { label: "Cycle Management", icon: "/calendar.png", color: "bg-purple-50", href: "/list/cycle" },
            { label: "Add Class", icon: "/student.png", color: "bg-lamaYellowLight", href: "/list/classes" },
            { label: "Add Subject", icon: "/teacher.png", color: "bg-lamaPurpleLight", href: "/list/subjects" },
            { label: "Create Event", icon: "/calendar.png", color: "bg-lamaYellowLight" },
            { label: "Send Message", icon: "/message.png", color: "bg-pink-50" },
          ].map((shortcut) => (
            <Link href={shortcut.href || "#"} key={shortcut.label} className={`${shortcut.color} p-4 rounded-xl flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow cursor-pointer h-32`}>
              <div className="bg-white p-2 rounded-full">
                <Image src={shortcut.icon} width={24} height={24} alt="" />
              </div>
              <span className="font-semibold text-sm text-gray-600 text-center">{shortcut.label}</span>
            </Link>
          ))}
        </div>

        {/* RECENT ACTIVITY */}
        <h2 className="text-xl font-bold text-gray-800 mt-2">Recent Activity</h2>
        <div className="flex flex-col gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-lamaPurpleLight flex items-center justify-center text-lamaPurple">
                <Image src="/student.png" width={20} height={20} alt="" className="opacity-60" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Student Added</h3>
                <p className="text-xs text-gray-500">Student 'John Doe' was just added</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">2 mins ago</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-lamaYellowLight flex items-center justify-center text-lamaYellow">
                <Image src="/teacher.png" width={20} height={20} alt="" className="opacity-60" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Result Uploaded</h3>
                <p className="text-xs text-gray-500">Teacher 'Mrs. Smith' uploaded a result</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">10 mins ago</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-lamaSkyLight flex items-center justify-center text-lamaSky">
                <Image src="/finance.png" width={20} height={20} alt="" className="opacity-60" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Fees Received</h3>
                <p className="text-xs text-gray-500">Parent 'Mr. Johnson' paid school fees</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">1 hour ago</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - CALENDAR & NOTICES */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <BroadcastForm onBroadcast={handleBroadcast} />
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <EventCalendar />
        </div>
        <Announcement data={announcements} />
      </div>
    </div>
  );
};

export default AdminPage;
