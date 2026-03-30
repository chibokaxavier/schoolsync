"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { studentsData } from "@/lib/data";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/redux/slices/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useMemo } from "react";
import EmptyState from "@/components/EmptyState";
import { RoleGate } from "@/components/RoleGate";
import { resolveAvatar } from "@/lib/utils";

type Student = {
  id: number;
  studentId: string;
  name: string;
  email: string;
  photo: string;
  phone?: string;
  grade: number;
  class: string;
  address: string;
  status?: string;
};

const columns = [
  {
    header: "Name",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const StudentListPage = () => {
  const user = useSelector(selectCurrentUser);

  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase();

  const filteredData = useMemo(() => {
    if (!user) return [];

    let data = [...studentsData];
    const { role } = user;

    // Automatic Role-Based Filtering
    if (role === "teacher") {
      // Filter students in the classes this teacher teaches
      if (user.classes) {
        data = data.filter((s) => user.classes?.includes(s.class));
      }
    } else if (role === "student") {
      // Filter students in the same class as this student
      data = data.filter((s) => s.class === user.class);
    }

    if (query) {
      data = data.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.studentId.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query)
      );
    }

    return data;
  }, [user, query]);

  if (!user) return null;

    const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b border-border even:bg-muted/30 text-sm hover:bg-accent transition-colors duration-200"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="relative w-10 h-10 md:hidden xl:block">
            <Image
            src={resolveAvatar(item.photo, item.name)}
            fill
            alt=""
            className="rounded-full object-cover border-2 border-primary/10 shadow-sm"
            />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-foreground tracking-tight">{item.name}</h3>
          <p className="text-xs text-muted-foreground">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell text-muted-foreground font-medium">{item.studentId}</td>
      <td className="hidden md:table-cell">
        <span className="px-2 py-1 rounded-md bg-primary/5 text-primary text-xs font-bold border border-primary/10">
            {item.class}
        </span>
      </td>
      <td className="hidden lg:table-cell">
        <span
          className={`py-1 px-3 rounded-full text-[10px] uppercase tracking-wider font-bold shadow-sm ${item.status === "Active"
            ? "bg-green-500/10 text-green-600 border border-green-500/20"
            : "bg-red-500/10 text-red-600 border border-red-500/20"
            }`}
        >
          {item.status}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaSky/10 text-primary hover:bg-lamaSky/20 transition-all border border-lamaSky/20">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {user.role === "admin" && (
            <FormModal table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-card p-4 rounded-xl flex-1 m-4 mt-0 border border-border transition-all animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-foreground">
          {user.role === "admin" ? "All Students" : "My Students"}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellowLight ">
              <Image src="/filter.png" width={14} height={14} alt="" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellowLight ">
              <Image src="/sort.png" width={14} height={14} alt="" />
            </button>{" "}
            <RoleGate allowedRoles={["admin"]}>
              <FormModal table="student" type="create" />
            </RoleGate>
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

export default StudentListPage;
