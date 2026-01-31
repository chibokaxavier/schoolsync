
"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import EmptyState from "@/components/EmptyState";

// Mock data for messages
const messagesData = [
    {
        id: 1,
        sender: "John Doe",
        receiver: "Admin",
        subject: "Leave Application",
        date: "2025-01-01",
        preview: "I would like to request leave for...",
    },
    {
        id: 2,
        sender: "Jane Smith",
        receiver: "Class Teacher",
        subject: "Homework Query",
        date: "2025-01-02",
        preview: "Can you please clarify the homework...",
    },
    {
        id: 3,
        sender: "Mike Geller",
        receiver: "Principal",
        subject: "Event Participation",
        date: "2025-01-03",
        preview: "I am interested in participating...",
    },
];

type Message = {
    id: number;
    sender: string;
    receiver: string;
    subject: string;
    date: string;
    preview: string;
};


const columns = [
    {
        header: "Sender",
        accessor: "sender",
    },
    {
        header: "Subject",
        accessor: "subject",
        className: "hidden md:table-cell",
    },
    {
        header: "Date",
        accessor: "date",
        className: "hidden md:table-cell",
    },
    {
        header: "Preview",
        accessor: "preview",
        className: "hidden lg:table-cell",
    },
    {
        header: "Actions",
        accessor: "actions",
    },
];

const MessagesListPage = () => {
    const { user } = useAuth();
    const { role } = user;
    const searchParams = useSearchParams();
    const query = searchParams.get("search")?.toLowerCase();

    const filteredData = useMemo(() => {
        let data = [...messagesData];

        if (query) {
            data = data.filter(
                (m) =>
                    m.sender.toLowerCase().includes(query) ||
                    m.subject.toLowerCase().includes(query) ||
                    m.preview.toLowerCase().includes(query)
            );
        }

        return data;
    }, [query]);

    const renderRow = (item: Message) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="p-4 font-medium text-gray-700">{item.sender}</td>
            <td className="hidden md:table-cell text-gray-600">{item.subject}</td>
            <td className="hidden md:table-cell text-gray-500 text-xs">{item.date}</td>
            <td className="hidden lg:table-cell text-gray-500 italic truncate max-w-xs">
                {item.preview}
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                        <Image src="/view.png" width={16} height={16} alt="" />
                    </button>
                    {role === "admin" && (
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
                            <Image src="/delete.png" width={16} height={16} alt="" />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold hidden md:block">Messages</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/filter.png" width={14} height={14} alt="" />
                        </button>
                        {role === "admin" && (
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
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


export default MessagesListPage;
