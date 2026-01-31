"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { classesData } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import { Filter, SortAsc } from "lucide-react";

type Class = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ClassListPage = () => {
  const { user } = useAuth();
  const { role } = user;
  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase();

  const filteredData = useMemo(() => {
    let data = [...classesData];

    // Automatic Role-Based Filtering
    if (role === "teacher") {
      // Filter by classes supervised by this teacher
      data = data.filter((c) => c.supervisor === user.name);
    } else if (role === "student") {
      // Filter by student's specific class
      data = data.filter((c) => c.name === user.class);
    }

    if (query) {
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.supervisor.toLowerCase().includes(query)
      );
    }

    return data;
  }, [query, role, user.name, user.class]);

  const renderRow = (item: Class) => (
    <tr
      key={item.id}
      className="border-b border-border even:bg-muted/30 text-sm hover:bg-lamaPurpleLight transition-colors"
    >
      <td className="flex items-center gap-4 p-4 text-foreground">{item.name}</td>
      <td className="hidden md:table-cell text-muted-foreground">{item.capacity}</td>
      <td className="hidden md:table-cell text-muted-foreground">{item.grade}</td>
      <td className="hidden md:table-cell text-muted-foreground">{item.supervisor}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="class" type="update" data={item} />
              <FormModal table="class" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-card p-4 rounded-md flex-1 m-4 mt-0 border border-border shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-foreground">
          {role === "admin" ? "All Classes" : "My Classes"}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellowLight">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellowLight">
              <SortAsc className="w-4 h-4 text-muted-foreground" />
            </button>{" "}
            {role === "admin" && <FormModal table="class" type="create" />}
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


export default ClassListPage;
