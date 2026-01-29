import Image from "next/image";
import React from "react";

const UserCard = ({ type, count, subtitle }: { type: string, count?: string, subtitle?: string }) => {
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 min-w-[130px] flex-1 hover:shadow-lg transition-transform hover:-translate-y-1 duration-200">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          {subtitle || "2024/2025"}
        </span>
        <Image src="/more.png" width={20} height={20} alt="" />
      </div>
      <h1 className="text-2xl font-semibold my-4">{count || "1,234"}</h1>
      <h2 className="text-sm capitalize font-medium text-gray-500">{type}</h2>
    </div>
  );
};

export default UserCard;
