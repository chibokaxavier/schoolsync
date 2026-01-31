import Announcement from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleTeacherPage = () => {
  return (
    <div className="flex-1 p-4 md:p-6 lg:px-8 flex flex-col gap-6 text-gray-800">

      {/* 1. HERO PROFILE SECTION WITH EMBEDDED STATS */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-stretch">
        {/* Profile Image & Basic Info */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4 text-center md:border-r border-gray-100 pr-0 md:pr-8">
          <div className="relative w-32 h-32">
            <Image
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
              alt=""
              fill
              className="rounded-full object-cover ring-4 ring-lamaSkyLight"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Leornado Da Vinci</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Math & Physics Teacher</p>
            <div className="flex gap-2 justify-center mt-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-lamaSkyLight transition-colors cursor-pointer">
                <Image src="/mail.png" width={14} height={14} alt="" />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-lamaPurpleLight transition-colors cursor-pointer">
                <Image src="/phone.png" width={14} height={14} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Integrated Stats */}
        <div className="w-full md:w-2/3 flex flex-col justify-between gap-6">
          {/* Bio */}
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Biography</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              A dedicated and experienced educator specializing in Mathematics and Physics. Committed to fostering a positive learning environment and encouraging creative problem solving among students. Awarded "Teacher of the Year" in 2023.
            </p>
          </div>

          {/* Integrated Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3 hover:bg-lamaSkyLight transition-colors group">
              <Image src="/singleAttendance.png" width={24} height={24} alt="" className="opacity-50 group-hover:opacity-100" />
              <div>
                <h1 className="text-lg font-bold text-gray-800">90%</h1>
                <p className="text-[10px] text-gray-500 font-medium uppercase">Attendance</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3 hover:bg-lamaPurpleLight transition-colors group">
              <Image src="/singleBranch.png" width={24} height={24} alt="" className="opacity-50 group-hover:opacity-100" />
              <div>
                <h1 className="text-lg font-bold text-gray-800">2</h1>
                <p className="text-[10px] text-gray-500 font-medium uppercase">Branches</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3 hover:bg-lamaYellowLight transition-colors group">
              <Image src="/singleLesson.png" width={24} height={24} alt="" className="opacity-50 group-hover:opacity-100" />
              <div>
                <h1 className="text-lg font-bold text-gray-800">18</h1>
                <p className="text-[10px] text-gray-500 font-medium uppercase">Lessons</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3 hover:bg-pink-50 transition-colors group">
              <Image src="/singleClass.png" width={24} height={24} alt="" className="opacity-50 group-hover:opacity-100" />
              <div>
                <h1 className="text-lg font-bold text-gray-800">6</h1>
                <p className="text-[10px] text-gray-500 font-medium uppercase">Classes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. GRID CONTENT */}
      <div className="flex flex-col xl:flex-row gap-6">

        {/* MAIN SCHEDULE COLUMN (Left - 2/3) */}
        <div className="w-full xl:w-2/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[700px]">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold text-gray-800">Class Schedule</h1>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-lamaSky"></span>
                <span className="text-xs text-gray-500">Classes</span>
                <span className="w-3 h-3 rounded-full bg-lamaPurple ml-2"></span>
                <span className="text-xs text-gray-500">Exams</span>
              </div>
            </div>
            <BigCalendar />
          </div>
        </div>

        {/* SIDEBAR COLUMN (Right - 1/3) */}
        <div className="w-full xl:w-1/3 flex flex-col gap-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h1 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h1>
            <div className="flex flex-col gap-3">
              <Link href="#" className="flex items-center justify-between p-3 bg-lamaSkyLight rounded-xl text-sm font-semibold text-gray-700 hover:opacity-80 transition-opacity">
                <span>View Enrolled Students</span>
                <Image src="/arrowRight.png" width={14} height={14} alt="" className="opacity-50" />
              </Link>
              <Link href="#" className="flex items-center justify-between p-3 bg-lamaPurpleLight rounded-xl text-sm font-semibold text-gray-700 hover:opacity-80 transition-opacity">
                <span>Assign Homework</span>
                <Image src="/arrowRight.png" width={14} height={14} alt="" className="opacity-50" />
              </Link>
              <Link href="#" className="flex items-center justify-between p-3 bg-lamaYellowLight rounded-xl text-sm font-semibold text-gray-700 hover:opacity-80 transition-opacity">
                <span>View Exam Results</span>
                <Image src="/arrowRight.png" width={14} height={14} alt="" className="opacity-50" />
              </Link>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h1 className="text-xl font-bold text-gray-800 mb-4">Performance</h1>
            <Performance />
          </div>

          <Announcement />
        </div>
      </div>

    </div>
  );
};

export default SingleTeacherPage;
