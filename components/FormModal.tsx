"use client";

import { useState } from "react";
import { Plus, Trash, Pencil, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    const Icon = type === "create" ? Plus : type === "update" ? Pencil : Trash;
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
                            <Label className="text-sm text-gray-500">First Name</Label>
                            <Input type="text" className="p-2 rounded-md text-sm w-full" placeholder="John" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Last Name</Label>
                            <Input type="text" className="p-2 rounded-md text-sm w-full" placeholder="Doe" />
                        </div>

                        {/* Admission Number */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Admission Number (Username)</Label>
                            <Input type="text" className="p-2 rounded-md text-sm w-full" placeholder="2025001" />
                        </div>

                        {/* Class */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Class</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="JSS1">JSS1</SelectItem>
                                    <SelectItem value="JSS2">JSS2</SelectItem>
                                    <SelectItem value="JSS3">JSS3</SelectItem>
                                    <SelectItem value="SS1">SS1</SelectItem>
                                    <SelectItem value="SS2">SS2</SelectItem>
                                    <SelectItem value="SS3">SS3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Gender */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Gender</Label>
                            <Select name="gender">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Parent Link */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Parent Phone/Email</Label>
                            <Input type="text" className="p-2 rounded-md text-sm w-full" placeholder="+1234567890" name="parentContact"/>
                        </div>
                    </div>
                ) : table === "teacher" && type === "create" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name Fields */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">First Name</Label>
                            <Input type="text" className="p-2 rounded-md text-sm w-full" placeholder="Jane" name="firstName"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Last Name</Label>
                            <Input type="text" className="p-2 rounded-md text-sm w-full" placeholder="Smith" name="lastName"/>
                        </div>

                        {/* Employee ID */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Employee ID (Username)</Label>
                            <Input type="text" className="p-2 rounded-md text-sm w-full" placeholder="T2025001" name="username"/>
                        </div>

                        {/* Phone/Email */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Phone/Email</Label>
                            <Input type="text" className="p-2 rounded-md text-sm w-full" placeholder="+1234567890" name="phone"/>
                        </div>

                        {/* Subjects */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Subject(s)</Label>
                            <Select name="subjects">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Math">Math</SelectItem>
                                    <SelectItem value="English">English</SelectItem>
                                    <SelectItem value="Science">Science</SelectItem>
                                    <SelectItem value="History">History</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Classes */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Class(es)</Label>
                            <Select name="classes">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="JSS1">JSS1</SelectItem>
                                    <SelectItem value="SS3">SS3</SelectItem>
                                    <SelectItem value="All">All</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                ) : table === "class" && (type === "create" || type === "update") ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Grade Level */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Grade Level</Label>
                            <Select name="grade">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Grade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="JSS1">JSS 1</SelectItem>
                                    <SelectItem value="JSS2">JSS 2</SelectItem>
                                    <SelectItem value="JSS3">JSS 3</SelectItem>
                                    <SelectItem value="SS1">SS 1</SelectItem>
                                    <SelectItem value="SS2">SS 2</SelectItem>
                                    <SelectItem value="SS3">SS 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Stream */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Stream</Label>
                            <Select name="stream">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Stream" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="A">A</SelectItem>
                                    <SelectItem value="B">B</SelectItem>
                                    <SelectItem value="C">C</SelectItem>
                                    <SelectItem value="D">D</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Capacity */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Capacity</Label>
                            <Input type="number" className="p-2 rounded-md text-sm w-full" placeholder="e.g. 25" name="capacity"/>
                        </div>

                        {/* Supervisor */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Supervisor</Label>
                            <Input type="text" className="p-2 rounded-md text-sm w-full" placeholder="Teacher Name" name="supervisor"/>
                        </div>
                    </div>
                ) : table === "subject" && (type === "create" || type === "update") ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Subject Name */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Subject Name</Label>
                            <Input type="text" className="p-2 rounded-md text-sm w-full" placeholder="e.g. Mathematics" name="name" defaultValue={data?.name} />
                        </div>

                        {/* Teachers */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm text-gray-500">Teachers</Label>
                            <Select name="teachers">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Teacher" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* This is a simplified example. In a real app, you'd fetch teachers. */}
                                    <SelectItem value="1">John Doe</SelectItem>
                                    <SelectItem value="2">Jane Doe</SelectItem>
                                    <SelectItem value="3">Mike Geller</SelectItem>
                                    <SelectItem value="4">Jay French</SelectItem>
                                    <SelectItem value="5">Jane Smith</SelectItem>
                                    <SelectItem value="6">Anna Santiago</SelectItem>
                                    <SelectItem value="7">Allen Black</SelectItem>
                                    <SelectItem value="8">Ophelia Castro</SelectItem>
                                    <SelectItem value="9">Derek Briggs</SelectItem>
                                    <SelectItem value="10">John Glover</SelectItem>
                                </SelectContent>
                            </Select>
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
                    <Icon className="w-4 h-4 text-gray-700" />
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
