"use client";

import ConfirmPaymentModal from "@/components/ConfirmPaymentModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { studentPaymentsData } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import React, { useState, useMemo } from "react";
import EmptyState from "@/components/EmptyState";

const columns = [
    {
        header: "Student Name",
        accessor: "name",
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
        header: "Total Due",
        accessor: "totalDue",
    },
    {
        header: "Paid",
        accessor: "amountPaid",
    },
    {
        header: "Balance",
        accessor: "balance",
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

const PaymentTrackingPage = () => {
    const { user } = useAuth();
    const { role } = user;
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const searchParams = useSearchParams();
    const query = searchParams.get("search")?.toLowerCase();

    const filteredData = useMemo(() => {
        let data = [...studentPaymentsData];

        if (query) {
            data = data.filter(
                (s) =>
                    s.name.toLowerCase().includes(query) ||
                    s.studentId.toLowerCase().includes(query) ||
                    s.class.toLowerCase().includes(query)
            );
        }

        return data;
    }, [query]);
    const renderRow = (item: any) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-100"
        >
            <td className="p-4 font-semibold">{item.name}</td>
            <td className="p-4 hidden md:table-cell text-gray-600">{item.studentId}</td>
            <td className="p-4 hidden md:table-cell">{item.class}</td>
            <td className="p-4">${item.totalDue}</td>
            <td className="p-4 text-green-600 font-medium">${item.amountPaid}</td>
            <td className="p-4">
                <span className={`font-bold ${item.balance > 0 ? "text-red-500" : "text-gray-400"}`}>
                    ${item.balance}
                </span>
            </td>
            <td className="p-4 hidden lg:table-cell">
                <span
                    className={`py-1 px-3 rounded-full text-xs font-semibold ${item.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Partial"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {item.status}
                </span>
            </td>
            <td className="p-4">
                {role === "admin" && item.balance > 0 && (
                    <button
                        onClick={() => setSelectedStudent(item)}
                        className="bg-lamaSky text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-80 transition-opacity"
                    >
                        Confirm Payment
                    </button>
                )}
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-semibold">Student Payments</h1>
                <div className="bg-lamaSkyLight p-2 rounded-lg text-xs font-bold text-lamaSky">
                    Total Owed: $2,280
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

            {selectedStudent && (
                <ConfirmPaymentModal
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                    onConfirm={(amount) => {
                        console.log(`Payment confirmed: ${amount} for ${selectedStudent.name}`);
                        // In a real app, update state/db here
                    }}
                />
            )}
        </div>
    );
};

export default PaymentTrackingPage;
