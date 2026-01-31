"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { subjectsData } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { SortAsc, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import EmptyState from "@/components/EmptyState";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const SubjectListPage = () => {
  const { user } = useAuth();
  const { role } = user;
  const [data, setData] = useState<Subject[]>(subjectsData);
  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase();

  const filteredData = useMemo(() => {
    let processed = [...data];

    if (query) {
      processed = processed.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.teachers.some((t) => t.toLowerCase().includes(query))
      );
    }

    return processed;
  }, [data, query]);

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleCreate = (formData: any) => {
    const newSubject: Subject = {
      id: data.length + 1, // Simple ID generation
      name: formData.name,
      teachers: [formData.teachers || "John Doe"], // Default or map ID to name
    };
    setData([...data, newSubject]);
  };

  const handleUpdate = (formData: any, id: number) => {
    setData(
      data.map((item) =>
        item.id === id
          ? {
            ...item,
            name: formData.name,
            teachers: [formData.teachers || item.teachers[0]],
          }
          : item
      )
    );
  };

  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.teachers.join(", ")}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal
                table="subject"
                type="update"
                data={item}
                onSubmit={(formData) => handleUpdate(formData, item.id)}
              />
              <FormModal
                table="subject"
                type="delete"
                id={item.id}
                action={() => handleDelete(item.id)}
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Filter className="w-4 h-4 text-gray-700" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <SortAsc className="w-4 h-4 text-gray-700" />
            </button>{" "}
            {role === "admin" && (
              <FormModal table="subject" type="create" onSubmit={handleCreate} />
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

export default SubjectListPage;
