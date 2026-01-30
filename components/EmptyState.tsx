"use client";

import { SearchX, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
    title?: string;
    message?: string;
    query?: string;
}

const EmptyState = ({
    title = "No results found",
    message = "We couldn't find what you're looking for. Try a different search term or clear the filter.",
    query
}: EmptyStateProps) => {
    const router = useRouter();

    const handleClear = () => {
        router.push(window.location.pathname);
    };

    return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border-2 border-dashed border-gray-100 my-8 animate-in fade-in zoom-in duration-300">
            <div className="bg-lamaSkyLight p-6 rounded-full mb-6">
                <SearchX className="w-12 h-12 text-lamaSky" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {query ? `No results for "${query}"` : title}
            </h2>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                {message}
            </p>
            <Button
                onClick={handleClear}
                variant="outline"
                className="rounded-xl px-6 h-12 font-bold border-lamaSky text-lamaSky hover:bg-lamaSky hover:text-white transition-all shadow-lg shadow-sky-100 flex items-center gap-2"
            >
                <RefreshCcw size={18} />
                Clear Search
            </Button>
        </div>
    );
};

export default EmptyState;
