import Image from "next/image";
import React from "react";

const ProfilePage = () => {
    return (
        <div className="bg-white p-6 rounded-md m-4 flex-1">
            <div className="flex flex-col md:flex-row gap-6 ">
                {/* LEFT */}
                <div className="flex flex-col items-center justify-center md:items-start w-full md:w-1/3 p-4 bg-lamaPurpleLight rounded-lg">
                    <div className="relative w-32 h-32 mb-4">
                        <Image
                            src="/avatar.png"
                            alt="Profile"
                            fill
                            className="rounded-full object-cover ring-4 ring-white"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
                    <p className="text-gray-500 font-medium bg-white px-3 py-1 rounded-full text-xs mt-2 uppercase">Admin</p>

                    <div className="mt-8 w-full flex flex-col gap-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Email:</span>
                            <span className="font-medium">john@doe.com</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Phone:</span>
                            <span className="font-medium">+1 234 567 8900</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Joined:</span>
                            <span className="font-medium">January 2024</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="w-full md:w-2/3 flex flex-col gap-4">
                    <div className="p-4 border rounded-md shadow-sm">
                        <h2 className="text-lg font-semibold mb-3">Activity Log</h2>
                        <div className="flex flex-col gap-3">
                            <div className="p-3 bg-gray-50 rounded text-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                                <span className="font-medium text-black">Updated Schedule</span> - 2 hours ago
                            </div>
                            <div className="p-3 bg-gray-50 rounded text-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                                <span className="font-medium text-black">Posted Announcement</span> - 5 hours ago
                            </div>
                            <div className="p-3 bg-gray-50 rounded text-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                                <span className="font-medium text-black">Approved Attendance</span> - 1 day ago
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border rounded-md shadow-sm">
                        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
                        <div className="flex gap-4 flex-wrap">
                            <button className="px-4 py-2 bg-lamaSky rounded-md text-sm font-medium hover:opacity-80">Edit Profile</button>
                            <button className="px-4 py-2 bg-lamaYellow rounded-md text-sm font-medium hover:opacity-80">Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
