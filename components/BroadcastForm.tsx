"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface BroadcastFormProps {
    onBroadcast: (message: string, target: string, title?: string) => void;
}

const BroadcastForm = ({ onBroadcast }: BroadcastFormProps) => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [target, setTarget] = useState("Everyone");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onBroadcast(message, target, title);
            setMessage("");
            setTitle("");
            setTarget("Everyone");
        }
    };

    return (
        <div className="bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold mb-4">Send Broadcast</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-500">Title (Optional)</label>
                    <Input
                        type="text"
                        placeholder="e.g. Important Notice"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-500">Message</label>
                    <textarea
                        className="p-2 border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md text-sm w-full h-24 resize-none"
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-500">Target Audience</label>
                    <Select value={target} onValueChange={setTarget}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Target" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Everyone">Everyone</SelectItem>
                            <SelectItem value="Teachers">Teachers Only</SelectItem>
                            <SelectItem value="Parents">Parents Only</SelectItem>
                            <SelectItem value="Students">Students Only</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    type="submit"
                    className="bg-lamaSky text-white hover:bg-lamaSky/90 cursor-pointer"
                >
                    <Send size={16} className="mr-2" />
                    Send Message
                </Button>
            </form>
        </div>
    );
};

export default BroadcastForm;
