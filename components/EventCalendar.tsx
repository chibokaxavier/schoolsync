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
    time: "12:00 PM - 2:00 PM",
    description:
      "     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis blanditiis architecto, voluptas dolores dignissimos eum odio minus voluptate. !",
  },
  {
    id: 1,
    title: "Lorem ipsom delorr",
    time: "12:00 PM - 2:00 PM",
    description:
      "     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis blanditiis architecto, voluptas dolores dignissimos eum odio minus voluptate. !",
  },
  {
    id: 1,
    title: "Lorem ipsom delorr",
    time: "12:00 PM - 2:00 PM",
    description:
      "     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis blanditiis architecto, voluptas dolores dignissimos eum odio minus voluptate. !",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar className="react-calendar" onChange={onChange} value={value} />
      <div className="flex justify-between items-center">
        <h1 className="text-xl my-4 font-semibold">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4 ">
        {events.map((event, i) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-[#CFCEFF] even:border-t-[#FAE27C]"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300  text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
