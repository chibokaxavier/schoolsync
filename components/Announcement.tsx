"use client";
import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Lorem ipsom delorr",
    time: "2025-10-9",
    description:
      "     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis blanditiis architecto, voluptas dolores dignissimos eum odio minus voluptate. !",
  },
  {
    id: 2,
    title: "Lorem ipsom delorr",
    time: "2025-10-9",
    description:
      "     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis blanditiis architecto, voluptas dolores dignissimos eum odio minus voluptate. !",
  },
  {
    id: 3,
    title: "Lorem ipsom delorr",
    time: "2025-10-9",
    description:
      "     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis blanditiis architecto, voluptas dolores dignissimos eum odio minus voluptate. !",
  },
];

const Announcement = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl my-4 font-semibold">Announcements</h1>
        <p className="text-sm my-4 font-semibold">View more</p>
      </div>
      <div className="flex flex-col gap-4 ">
        {events.map((event, i) => (
          <div
            className="p-5 rounded-md  odd:bg-[#CFCEFF] even:bg-[#FAE27C]"
            key={i}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className=" p-1 bg-white text-gray-300  text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
