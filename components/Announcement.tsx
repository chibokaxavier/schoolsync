"use client";

import { announcementsData } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface AnnouncementProps {
  data?: {
    id: number | string;
    title: string;
    date: string;
    description: string;
    visibleTo?: string[];
  }[];
}

const Announcement = ({ data }: AnnouncementProps) => {
  const { user } = useAuth();
  const { role } = user;

  // Use provided data or filter from announcementsData
  const filteredAnnouncements = (data && data.length > 0 ? data : announcementsData)
    .filter(a => !a.visibleTo || a.visibleTo.includes(role as any))
    .slice(0, 3);

  return (
    <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-foreground">Announcements</h1>
        <Link href="/list/announcements">
          <span className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer">View All</span>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {filteredAnnouncements.map((announcement) => (
          <div
            className="p-5 rounded-md odd:bg-lamaPurpleLight/30 even:bg-lamaYellowLight/30 border border-border/50"
            key={announcement.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-foreground/80">{announcement.title}</h1>
              <span className="p-1 px-2 bg-background/50 text-muted-foreground text-[10px] rounded-md border border-border tabular-nums">
                {announcement.date}
              </span>
            </div>
            <p className="mt-2 text-muted-foreground text-xs leading-relaxed line-clamp-2">
              {announcement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
