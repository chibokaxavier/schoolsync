"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const TableSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [val, setVal] = React.useState(searchParams.get("search") || "");

  // Sync val with URL param (e.g., when cleared from outside)
  React.useEffect(() => {
    setVal(searchParams.get("search") || "");
  }, [searchParams]);

  // Real-time update with debounce logic
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const currentQuery = searchParams.get("search") || "";

      // Only push if the value has actually changed to avoid unnecessary history entries
      if (val !== currentQuery) {
        if (val) {
          params.set("search", val);
        } else {
          params.delete("search");
        }
        router.push(`${window.location.pathname}?${params.toString()}`);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [val, router, searchParams]);


  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 bg-white">
      <Search className="w-4 h-4 text-gray-500" />
      <Input
        type="text"
        placeholder="Search..."
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-[200px] p-2 bg-transparent outline-none border-none focus-visible:ring-0 shadow-none"
      />
    </div>
  );
};


export default TableSearch;

