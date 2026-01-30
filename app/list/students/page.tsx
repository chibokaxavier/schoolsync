"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

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

const grades = [
  { label: "All", value: 0 },
  { label: "JSS 1", value: 7 },
  { label: "JSS 2", value: 8 },
  { label: "JSS 3", value: 9 },
  { label: "SS 1", value: 10 },
  { label: "SS 2", value: 11 },
  { label: "SS 3", value: 12 },
];

const StudentListPage = () => {
  const [selectedGrade, setSelectedGrade] = useState(0);

  const filteredData =
    selectedGrade === 0
      ? studentsData
      : studentsData.filter((s) => s.grade === selectedGrade);

  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-100 "
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
          <p className="text-xs text-gray-500">{item.email}</p>
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
      <td>
        <div className="flex items-center gap-2 ">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100">
              <Image src="/view.png" width={16} height={16} alt="" />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold hidden md:block">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 ">
              <Image src="/filter.png" width={14} height={14} alt="" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 ">
              <Image src="/sort.png" width={14} height={14} alt="" />
            </button>{" "}
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>

      {/* GRADE TABS */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {grades.map((grade) => (
          <button
            key={grade.value}
            onClick={() => setSelectedGrade(grade.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedGrade === grade.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {grade.label}
          </button>
        ))}
      </div>

      <div>
        <Table columns={columns} renderRow={renderRow} data={filteredData} />
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default StudentListPage;
