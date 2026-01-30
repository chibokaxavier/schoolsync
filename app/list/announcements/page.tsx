"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { announcementsData } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import EmptyState from "@/components/EmptyState";

type Announcement = {
  id: number;
  title: string;
  class: string;
  date: string;
};

const columns = [
  {
    header: "Title ",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },

  {
    header: "Actions ",
    accessor: "action",
  },
];

const Page = () => {
  const { user } = useAuth();
  const { role } = user;
  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase();

  const filteredData = useMemo(() => {
    let data = [...announcementsData];

    if (query) {
      data = data.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.class.toLowerCase().includes(query)
      );
    }

    return data;
  }, [query]);

  const renderRow = (item: Announcement) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-100 "
    >
      <td className="flex items-center  gap-4 p-4"> {item.title}</td>
      <td> {item.class}</td>
      <td className="hidden md:table-cell"> {item.date}</td>

      <td>
        <div className="flex items-center gap-2 ">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100">
              <Image src="/edit.png" width={16} height={16} alt="" />
            </button>
          </Link>
          {role === "admin" && (
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-100">
              <Image src="/delete.png" width={16} height={16} alt="" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between ">
        <h1 className="text-lg font-semibold hidden md:block">
          All Announcements{" "}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 ">
              <Image src="/filter.png" width={14} height={14} alt="" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 ">
              <Image src="/sort.png" width={14} height={14} alt="" />
            </button>{" "}
            {role === "admin" && (
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 ">
                <Image src="/plus.png" width={14} height={14} alt="" />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      {filteredData.length > 0 ? (
        <>
          <Table columns={columns} renderRow={renderRow} data={filteredData} />
          {/* PAGINATION */}
          <Pagination />
        </>
      ) : (
        <EmptyState query={query || undefined} />
      )}
    </div>
  );
};

export default Page;

