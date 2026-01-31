'use client'
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { moderatorsData } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState, useMemo } from "react";
import { SortAsc, ShieldCheck } from "lucide-react";
import EmptyState from "@/components/EmptyState";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Moderator = {
    id: number;
    name: string;
    email: string;
    photo: string;
    phone: string;
    status?: string;
};

const columns = [
    {
        header: "Name",
        accessor: "info",
    },
    {
        header: "Contact",
        accessor: "contact",
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

const ModeratorListPage = () => {
    const { user } = useAuth();
    const { role } = user;
    const [data, setData] = useState(moderatorsData);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
    const searchParams = useSearchParams();
    const query = searchParams.get("search")?.toLowerCase();

    const handleDelete = (id: number) => {
        setData(data.filter((item) => item.id !== id));
    };

    // Filter and Sort Logic
    const filteredData = useMemo(() => {
        let processed = [...data];

        // 1. Filter by Search Query
        if (query) {
            processed = processed.filter(
                (m) =>
                    m.name.toLowerCase().includes(query) ||
                    m.email.toLowerCase().includes(query) ||
                    m.phone.toLowerCase().includes(query)
            );
        }

        // 2. Sort
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
    }, [data, sortOrder, query]);


    const renderRow = (item: Moderator) => (
        <tr
            key={item.id}
            className="border-b border-border even:bg-muted/30 text-sm hover:bg-accent transition-colors"
        >
            <td className="flex items-center gap-4 p-4">
                <Image
                    src={item.photo}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                />
                <div className="flex flex-col">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.email}</p>
                </div>
            </td>
            <td className="hidden md:table-cell text-muted-foreground">{item.phone}</td>
            <td className="hidden lg:table-cell">
                <div className={`w-3 h-3 rounded-full ${item.status === "Active" ? "bg-green-500" : "bg-red-500"}`} title={item.status || "Active"} />
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky/20 text-primary">
                        <ShieldCheck className="w-4 h-4" />
                    </button>
                    {role === "admin" && (
                        <FormModal table="moderator" type="delete" id={item.id} action={() => handleDelete(item.id)} />
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="bg-card p-4 rounded-xl flex-1 m-4 mt-0 border border-border">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold text-foreground">System Moderators</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">

                        {/* SORT BUTTON */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow cursor-pointer">
                                    <SortAsc className="w-4 h-4 text-gray-700" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-card border border-border shadow-md">
                                <DropdownMenuLabel className="text-foreground">Sort by Name</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuItem className="hover:bg-accent focus:bg-accent cursor-pointer" onClick={() => setSortOrder("asc")}>
                                    Name (A-Z)
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-accent focus:bg-accent cursor-pointer" onClick={() => setSortOrder("desc")}>
                                    Name (Z-A)
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {role === "admin" && (
                            <FormModal table="moderator" type="create" />
                        )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            {filteredData.length > 0 ? (
                <div className="mt-4">
                    <Table columns={columns} renderRow={renderRow} data={filteredData} />
                    {/* PAGINATION */}
                    <Pagination />
                </div>
            ) : (
                <EmptyState query={query || undefined} />
            )}
        </div>
    );
};


export default ModeratorListPage;
