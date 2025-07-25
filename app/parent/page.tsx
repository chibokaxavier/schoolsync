import Announcement from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
import EventCalendar from "@/components/EventCalendar";
import React from "react";

const page = () => {
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white  p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (John doe) </h1>
          <BigCalendar />
        </div>
      </div>
      <div className="w-full xl:w-1/3 lg:h-[120vh] flex flex-col gap-8">
         {/* <EventCalendar /> */}
        <Announcement />
      </div>
    </div>
  );
};

export default page;
