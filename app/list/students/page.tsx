"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { studentsData } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useMemo } from "react";
import EmptyState from "@/components/EmptyState";
import { RoleGate } from "@/components/RoleGate";

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
  const { user } = useAuth();
  const { role } = user;
  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase();

  const filteredData = useMemo(() => {
    let data = [...studentsData];

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
  }, [role, user.classes, user.class, query]);

  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b border-border even:bg-muted/30 text-sm hover:bg-lamaPurpleLight transition-colors"
    >
      <td className="flex items-center  gap-4 p-4">
        {" "}
        <Image
          src={item.photo}
          width={40}
          height={40}
          alt=""
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-muted-foreground">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.studentId}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden lg:table-cell">
        <span
          className={`py-1 px-3 rounded-full text-xs font-semibold ${item.status === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
            }`}
        >
          {item.status || "Active"}
        </span>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex items-center gap-2 ">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSkyLight">
              <Image src="/view.png" width={16} height={16} alt="" />
            </button>
          </Link>
          <RoleGate allowedRoles={["admin"]}>
            <FormModal table="student" type="delete" id={item.id} />
          </RoleGate>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-card p-4 rounded-md flex-1 m-4 mt-0 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold hidden md:block">
          {role === "admin" ? "All Students" : "My Students"}
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
