import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between ">
        <h1 className="text-lg font-semibold hidden md:block">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 ">
              <Image src="/filter.png" width={14} height={14} alt="" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 ">
              <Image src="/sort.png" width={14} height={14} alt="" />
            </button>{" "}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 ">
              <Image src="/plus.png" width={14} height={14} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div></div>
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default page;
