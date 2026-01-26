
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Mock data for attendance
const attendanceData = [
    {
        id: 1,
        studentId: "1234567890",
        name: "John Doe",
        email: "john@doe.com",
        photo:
            "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
        date: "2025-01-01",
        status: "Present",
        class: "1B",
    },
    {
        id: 2,
        studentId: "1234567890",
        name: "Jane Doe",
        email: "jane@doe.com",
        photo:
            "https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg?auto=compress&cs=tinysrgb&w=1200",
        date: "2025-01-01",
        status: "Absent",
        class: "5A",
    },
    {
        id: 3,
        studentId: "1234567890",
        name: "Mike Geller",
        email: "mike@geller.com",
        photo:
            "https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1200",
        date: "2025-01-01",
        status: "Late",
        class: "5A",
    },
];

type Attendance = {
    id: number;
    studentId: string;
    name: string;
    email: string;
    photo: string;
    date: string;
    status: "Present" | "Absent" | "Late";
    class: string;
};

const columns = [
    {
        header: "Student Info",
        accessor: "info",
    },
    {
        header: "Date",
        accessor: "date",
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

const AttendanceListPage = () => {
    const renderRow = (item: Attendance) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="flex items-center gap-4 p-4">
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
            <td className="hidden md:table-cell">{item.date}</td>
            <td className="hidden md:table-cell">{item.class}</td>
            <td className="hidden lg:table-cell">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Present"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Absent"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {item.status}
                </span>
            </td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                        <>
                            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                                <Image src="/edit.png" width={16} height={16} alt="" />
                            </button>
                            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
                                <Image src="/delete.png" width={16} height={16} alt="" />
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold hidden md:block">Attendance Records</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/filter.png" width={14} height={14} alt="" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/sort.png" width={14} height={14} alt="" />
                        </button>
                        {role === "admin" && (
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                                <Image src="/plus.png" width={14} height={14} alt="" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <Table columns={columns} renderRow={renderRow} data={attendanceData} />
            </div>
            <div>
                <Pagination />
            </div>
        </div>
    );
};

export default AttendanceListPage;
