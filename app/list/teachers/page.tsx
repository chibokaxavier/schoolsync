'use client'
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useMemo } from "react";
import { Eye, Filter, SortAsc, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
  status?: string;
};

const columns = [
  {
    header: "Name",
    accessor: "info",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
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

const TeacherListPage = () => {
  const [data, setData] = useState(teachersData);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase();

  // Extract unique subjects for the filter
  const allSubjects = Array.from(new Set(teachersData.flatMap(t => t.subjects)));

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  // Filter and Sort Logic
  const filteredData = useMemo(() => {
    let processed = [...data];

    // 1. Filter by Subject
    if (selectedSubject) {
      processed = processed.filter(item => item.subjects.includes(selectedSubject));
    }

    // 2. Filter by Search Query
    if (query) {
      processed = processed.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.teacherId.toLowerCase().includes(query) ||
          t.email.toLowerCase().includes(query) ||
          t.subjects.some((s) => s.toLowerCase().includes(query)) ||
          t.classes.some((c) => c.toLowerCase().includes(query))
      );
    }

    // 3. Sort
    if (sortOrder) {
      processed.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }

    return processed;
  }, [data, selectedSubject, sortOrder, query]);


  const renderRow = (item: Teacher) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.subjects.join(",")}</td>
      <td className="hidden md:table-cell">{item.classes.join(",")}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">
        <div className={`w-3 h-3 rounded-full ${item.status === "Active" ? "bg-green-500" : "bg-red-500"}`} title={item.status || "Active"} />
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky text-white">
              <Eye className="w-4 h-4" />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="teacher" type="delete" id={item.id} action={() => handleDelete(item.id)} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">

            {/* FILTER BUTTON */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow cursor-pointer">
                  <Filter className="w-4 h-4 text-gray-700" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuLabel>Filter by Subject</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedSubject(null)}>
                  All Subjects
                </DropdownMenuItem>
                {allSubjects.map(subject => (
                  <DropdownMenuItem key={subject} onClick={() => setSelectedSubject(subject)}>
                    {subject}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* SORT BUTTON */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow cursor-pointer">
                  <SortAsc className="w-4 h-4 text-gray-700" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuLabel>Sort by Name</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortOrder("asc")}>
                  Name (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("desc")}>
                  Name (Z-A)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {role === "admin" && (
              <FormModal table="teacher" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={filteredData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default TeacherListPage;
