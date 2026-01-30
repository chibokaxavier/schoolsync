import Image from "next/image";
import React from "react";

const UserCard = ({ type, count, subtitle }: { type: string, count?: string, subtitle?: string }) => {
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex flex-col justify-between hover:shadow-lg transition-transform hover:-translate-y-1 duration-200 h-full min-h-[140px]">
      <div className="flex justify-between items-center whitespace-nowrap overflow-hidden">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600 truncate">
          {subtitle || "2024/2025"}
        </span>
        <Image src="/more.png" width={20} height={20} alt="" className="shrink-0" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold my-2 truncate">{count || "1,234"}</h1>
        <h2 className="text-sm capitalize font-medium text-gray-500 line-clamp-1">{type}</h2>
      </div>
    </div>

  );
};

export default UserCard;
