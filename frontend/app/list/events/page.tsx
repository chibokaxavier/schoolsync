'use client'
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { eventsData } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import React, { useState, useMemo } from "react";
import { Filter, SortAsc, CalendarDays } from "lucide-react";
import EmptyState from "@/components/EmptyState";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Event = {
    id: number;
    title: string;
    class: string;
    date: string;
    startTime: string;
    endTime: string;
    visibleTo: string[];
    description: string;
};

const columns = [
    {
        header: "Title",
        accessor: "title",
    },
    {
        header: "Class",
        accessor: "class",
        className: "hidden md:table-cell",
    },
    {
        header: "Date",
        accessor: "date",
        className: "hidden md:table-cell",
    },
    {
        header: "Time",
        accessor: "time",
        className: "hidden lg:table-cell",
    },
    {
        header: "Actions",
        accessor: "actions",
    },
];

const EventListPage = () => {
    const { user } = useAuth();
    const { role } = user;
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
    const searchParams = useSearchParams();
    const query = searchParams.get("search")?.toLowerCase();

    const handleDelete = (id: number) => {
        // Logic for deleting if admin
        console.log("Delete event", id);
    };

    // Filter Logic: Role-based + Search
    const filteredData = useMemo(() => {
        // 1. Role-based filtering
        let processed = eventsData.filter(event =>
            event.visibleTo.includes(role as any)
        );

        // 2. Filter by Search Query
        if (query) {
            processed = processed.filter(
                (e) =>
                    e.title.toLowerCase().includes(query) ||
                    e.description.toLowerCase().includes(query) ||
                    e.class.toLowerCase().includes(query)
            );
        }

        // 3. Sort
        if (sortOrder) {
            processed.sort((a, b) => {
                if (sortOrder === "asc") {
                    return a.title.localeCompare(b.title);
                } else {
                    return b.title.localeCompare(a.title);
                }
            });
        }

        return processed;
    }, [role, sortOrder, query]);


    const renderRow = (item: Event) => (
        <tr
            key={item.id}
            className="border-b border-border even:bg-muted/30 text-sm hover:bg-accent transition-colors"
        >
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                </div>
            </td>
            <td className="hidden md:table-cell text-muted-foreground">{item.class}</td>
            <td className="hidden md:table-cell text-muted-foreground">{item.date}</td>
            <td className="hidden lg:table-cell text-muted-foreground">
                {item.startTime} - {item.endTime}
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky/20 text-primary">
                        <CalendarDays className="w-4 h-4" />
                    </button>
                    {role === "admin" && (
                        <FormModal table="event" type="delete" id={item.id} action={() => handleDelete(item.id)} />
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="bg-card p-4 rounded-xl flex-1 m-4 mt-0 border border-border">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold text-foreground">School Events</h1>
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
                                <DropdownMenuLabel className="text-foreground">Sort by Title</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuItem className="hover:bg-accent focus:bg-accent cursor-pointer" onClick={() => setSortOrder("asc")}>
                                    Title (A-Z)
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-accent focus:bg-accent cursor-pointer" onClick={() => setSortOrder("desc")}>
                                    Title (Z-A)
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {role === "admin" && (
                            <FormModal table="event" type="create" />
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


export default EventListPage;
