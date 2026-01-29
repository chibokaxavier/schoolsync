import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Search className="w-4 h-4 text-gray-500" />
      <Input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none border-none focus-visible:ring-0 shadow-none"
      />
    </div>
  );
};

export default TableSearch;
