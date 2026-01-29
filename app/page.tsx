import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";
import Image from "next/image";
import Link from "next/link";

const Homepage = () => {
    return (
        <div className="p-4 md:p-6 lg:px-8 flex gap-4 flex-col md:flex-row h-full">
            {/* LEFT COLUMN - HERO & STATS */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                {/* WELCOME BANNER */}
                <div className="bg-gradient-to-r from-lamaSky to-lamaPurple rounded-2xl p-8 flex items-center justify-between shadow-sm">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold text-gray-800">Welcome Back, SchoolSync!</h1>
                        <p className="text-gray-600 max-w-[500px]">
                            Manage your school efficiently with our modern tools. Check your schedule, messages and alerts below.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <button className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity">
                                View Dashboard
                            </button>
                            <button className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                                Messages
                            </button>
                        </div>
                    </div>
                    <Image src="/student.png" alt="" width={140} height={140} className="hidden md:block object-contain opacity-80" />
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
                    <div className="flex-1 min-w-[130px]">
                        <UserCard type="Total Fees Collected" count="$150,000" subtitle="This Term" />
                    </div>
                </div>

                {/* SHORTCUTS GRID */}
                <h2 className="text-xl font-bold text-gray-800 mt-2">Quick Access</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Add Student", icon: "/student.png", color: "bg-lamaSkyLight" },
                        { label: "Add Teacher", icon: "/teacher.png", color: "bg-lamaPurpleLight" },
                        { label: "Create Event", icon: "/calendar.png", color: "bg-lamaYellowLight" },
                        { label: "Send Message", icon: "/message.png", color: "bg-pink-50" },
                    ].map((shortcut) => (
                        <div key={shortcut.label} className={`${shortcut.color} p-4 rounded-xl flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow cursor-pointer h-32`}>
                            <div className="bg-white p-2 rounded-full">
                                <Image src={shortcut.icon} width={24} height={24} alt="" />
                            </div>
                            <span className="font-semibold text-sm text-gray-600">{shortcut.label}</span>
                        </div>
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
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <EventCalendar />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Announcements</h2>
                        <span className="text-xs text-gray-400 font-medium cursor-pointer hover:text-gray-600">View All</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="bg-lamaSkyLight rounded-md p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-700">New Exam Schedule</h3>
                                <span className="text-[10px] text-gray-400 bg-white px-1 py-1 rounded-sm">2025-01-01</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">The final exam schedule has been released. Please check your portals.</p>
                        </div>
                        <div className="bg-lamaPurpleLight rounded-md p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-700">Parent Meeting</h3>
                                <span className="text-[10px] text-gray-400 bg-white px-1 py-1 rounded-sm">2025-01-05</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">Mandatory meeting for all 10th-grade parents regarding upcoming trips.</p>
                        </div>
                        <div className="bg-lamaYellowLight rounded-md p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-700">Maintenance Day</h3>
                                <span className="text-[10px] text-gray-400 bg-white px-1 py-1 rounded-sm">2025-01-10</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">Server maintenance scheduled. Portal will be down for 2 hours.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
