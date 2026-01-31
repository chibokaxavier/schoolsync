"use client";

import Table from "@/components/Table";
import { feeStructureData } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const columns = [
    {
        header: "Grade",
        accessor: "label",
    },
    {
        header: "Tuition ($)",
        accessor: "tuition",
    },
    {
        header: "Bus Fee ($)",
        accessor: "bus",
    },
    {
        header: "Uniform ($)",
        accessor: "uniform",
    },
    {
        header: "Other ($)",
        accessor: "other",
    },
    {
        header: "Total ($)",
        accessor: "total",
    },
];

type FeeStructure = {
    grade: number;
    label: string;
    tuition: number;
    bus: number;
    uniform: number;
    other: number;
};

const FeeStructurePage = () => {
    const { user } = useAuth();
    const { role } = user;
    const renderRow = (item: FeeStructure) => {
        const total = item.tuition + item.bus + item.uniform + item.other;
        return (
            <tr
                key={item.grade}
                className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-100"
            >
                <td className="p-4 font-semibold">{item.label}</td>
                <td className="p-4">{item.tuition}</td>
                <td className="p-4">{item.bus}</td>
                <td className="p-4">{item.uniform}</td>
                <td className="p-4">{item.other}</td>
                <td className="p-4 font-bold text-blue-600">{total}</td>
            </tr>
        );
    };

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-lg font-semibold">Fee Structure</h1>
                {role === "admin" && (
                    <button className="bg-lamaPurple text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity">
                        Edit Structure
                    </button>
                )}
            </div>
            <div>
                <Table columns={columns} renderRow={renderRow} data={feeStructureData} />
            </div>
        </div>
    );
};

export default FeeStructurePage;
