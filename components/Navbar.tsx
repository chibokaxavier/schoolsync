import Image from "next/image";
import React from "react";
import { currentAcademicCycle } from "@/lib/data";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 md:p-6 lg:px-8 w-full">
      {/* GREETING */}
      <div className="hidden md:flex flex-col">
        <span className="text-xl font-bold text-gray-800">Hi, 👋</span>
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
          {currentAcademicCycle.session} - {currentAcademicCycle.term}
        </span>
      </div>




      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full md:w-auto">
        <div className="bg-white rounded-full size-9 flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
          <Image src="/message.png" alt="" width={20} height={20} />
        </div>
        <div className="bg-white relative rounded-full size-9 flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-1.5 -right-1.5 size-4 flex items-center justify-center bg-purple-500 text-white text-[10px] font-bold rounded-full">
            1
          </div>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm font-semibold leading-tight text-gray-700">John Doe</span>
          <span className="text-[10px] text-gray-400 font-medium uppercase">Admin</span>
        </div>
        <div className="size-9 relative rounded-full ring-2 ring-white shadow-sm">
          <Image
            src="/avatar.png"
            alt=""
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
