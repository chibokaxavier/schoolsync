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
    title: "Science Fair Registration",
    time: "2025-02-15",
    description: "Registration for the annual Science Fair is now open! Submit your project proposals by the end of the month to participate.",
  },
  {
    id: 2,
    title: "Parent-Teacher Conference",
    time: "2025-03-10",
    description: "Join us for the semester's parent-teacher conferences. Please book your slots in advance through the portal.",
  },
  {
    id: 3,
    title: "Spring Break Holiday",
    time: "2025-04-01",
    description: "School will be closed for Spring Break from April 1st to April 7th. Enjoy your holiday!",
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
