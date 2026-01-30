"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const TableSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 bg-white"
    >
      <Search className="w-4 h-4 text-gray-500" />
      <Input
        name="search"
        type="text"
        placeholder="Search..."
        defaultValue={searchParams.get("search") || ""}
        className="w-[200px] p-2 bg-transparent outline-none border-none focus-visible:ring-0 shadow-none"
      />
    </form>
  );
};

export default TableSearch;

