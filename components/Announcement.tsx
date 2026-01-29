"use client";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

// Default/Initial events data
const initialEvents = [
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
    target: "Everyone",
  },
];

interface AnnouncementProps {
  data?: {
    id: number | string;
    title: string;
    time: string;
    description: string;
    target?: string;
  }[];
}

const Announcement = ({ data }: AnnouncementProps) => {
  // Use provided data or fallback to initialEvents
  const displayEvents = data && data.length > 0 ? data : initialEvents;

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl my-4 font-semibold">Announcements</h1>
        <p className="text-sm my-4 font-semibold">View more</p>
      </div>
      <div className="flex flex-col gap-4">
        {displayEvents.map((event, i) => (
          <div
            className="p-5 rounded-md odd:bg-lamaPurpleLight even:bg-lamaYellowLight"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <div className="flex gap-2">
                {event.target && (
                  <span className="p-1 rounded-md bg-white text-xs text-gray-400 border border-gray-100">
                    {event.target}
                  </span>
                )}
                <span className="p-1 bg-white text-gray-300 text-xs rounded-md">{event.time}</span>
              </div>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
