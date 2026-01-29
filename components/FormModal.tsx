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
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setOpen(false); }}>
                {table === "student" && type === "create" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name Fields */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-500">First Name</label>
                            <input type="text" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" placeholder="John" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-500">Last Name</label>
                            <input type="text" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" placeholder="Doe" />
                        </div>

                        {/* Admission Number */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-500">Admission Number (Username)</label>
                            <input type="text" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" placeholder="2025001" />
                        </div>

                        {/* Class */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-500">Class</label>
                            <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
                                <option value="">Select Class</option>
                                <option value="JSS1">JSS1</option>
                                <option value="JSS2">JSS2</option>
                                <option value="JSS3">JSS3</option>
                                <option value="SS1">SS1</option>
                                <option value="SS2">SS2</option>
                                <option value="SS3">SS3</option>
                            </select>
                        </div>

                        {/* Gender */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-500">Gender</label>
                            <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        {/* Parent Link */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-500">Parent Phone/Email</label>
                            <input type="text" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" placeholder="+1234567890" />
                        </div>
                    </div>
                ) : (
                    // Default/Fallback or other forms
                    <div className="flex flex-col gap-4">
                        <p className="text-gray-500 text-sm">Form inputs for {table} ({type}) will go here...</p>
                    </div>
                )}

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/* Using a normal button styled as Action because it is a submit button */}
                    <button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 rounded-md inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        {type === "create" ? "Create" : "Update"}
                    </button>
                </AlertDialogFooter>
            </form>
        );
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <button
                    className={`${size} flex items-center justify-center rounded-full ${bgColor} cursor-pointer`}
                >
                    <Image src={`/${type}.png`} alt="" width={16} height={16} />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {type === "delete"
                            ? "Are you absolutely sure?"
                            : type === "create"
                                ? `Create a new ${table}`
                                : `Update ${table}`}
                    </AlertDialogTitle>
                    {type === "delete" && (
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this {table} and remove the data from our servers.
                        </AlertDialogDescription>
                    )}
                </AlertDialogHeader>

                {type === "delete" ? (
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Continue</AlertDialogAction>
                    </AlertDialogFooter>
                ) : (
                    <Form />
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default FormModal;
