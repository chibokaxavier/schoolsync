"use client";

import Image from "next/image";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Use this to trigger any Client Side action (like local delete)
// OR eventually Server Actions
interface FormModalProps {
    table: string;
    type: "create" | "update" | "delete";
    data?: any;
    id?: number | string;
    action?: () => void; // Optional callback for local state handling
}

const FormModal = ({ table, type, data, id, action }: FormModalProps) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor =
        type === "create"
            ? "bg-lamaYellow"
            : type === "update"
                ? "bg-lamaSky"
                : "bg-lamaPurple";

    const [open, setOpen] = useState(false);

    // Generic delete handler (could be a server action later)
    const handleDelete = () => {
        if (action) {
            action();
            setOpen(false);
        } else {
            // Placeholder for server action
            console.log(`Deleting ${table} with id ${id}`);
            setOpen(false);
        }
    };

    const Form = () => {
        return (
            <div className="p-4">
                {/* PLACEHOLDER FOR CREATE/UPDATE FORMS */}
                <span className="text-center font-medium block mb-4">
                    {type === "create" ? `Create a new ${table}` : `Update ${table}`}
                </span>
                <p className="text-gray-500 text-sm mb-4">Form inputs will go here...</p>
                <button
                    type="button"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md border-none w-full"
                    onClick={() => setOpen(false)}
                >
                    Simulate Submit
                </button>
            </div>
        );
    };

    if (type === "delete" && id) {
        return (
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <button className={`${size} flex items-center justify-center rounded-full ${bgColor} cursor-pointer`}>
                        <Image src={`/${type}.png`} alt="" width={16} height={16} />
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this {table} and remove the data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    }

    return (
        <>
            <button
                className={`${size} flex items-center justify-center rounded-full ${bgColor} cursor-pointer`}
                onClick={() => setOpen(true)}
            >
                <Image src={`/${type}.png`} alt="" width={16} height={16} />
            </button>
            {open && (
                <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                        <Form />
                        <div
                            className="absolute top-4 right-4 cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <Image src="/close.png" alt="" width={14} height={14} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormModal;
