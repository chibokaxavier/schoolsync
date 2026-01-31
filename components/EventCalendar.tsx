"use client";
import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

import { eventsData } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const EventCalendar = () => {
  const { user } = useAuth();
  const { role } = user;
  const [value, onChange] = useState<Value>(new Date());

  // Filter events for the 3 featured ones relevant to this role
  const featuredEvents = eventsData
    .filter(event => event.visibleTo.includes(role as any))
    .slice(0, 3);

  return (
    <div className="bg-card p-4 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-semibold text-foreground">School Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} className="opacity-40" />
      </div>
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between mt-6 mb-4">
        <h1 className="text-lg font-semibold text-foreground">Upcoming</h1>
        <Link href="/list/events">
          <span className="text-xs text-muted-foreground cursor-pointer hover:underline hover:text-primary transition-colors">View All</span>
        </Link>
      </div>
      <div className="flex flex-col gap-4 ">
        {featuredEvents.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-border border-t-4 odd:border-t-primary/40 even:border-t-lamaYellow/40 bg-muted/20"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-foreground/80">{event.title}</h1>
              <span className="text-muted-foreground text-[10px] tabular-nums">{event.startTime}</span>
            </div>
            <p className="mt-2 text-muted-foreground text-xs leading-relaxed">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
