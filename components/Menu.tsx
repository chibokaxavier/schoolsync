"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { RoutePermissions } from "@/lib/permissions";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
      },
      {
        icon: "/staff.png",
        label: "Moderators",
        href: "/list/moderators",
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
      },

      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
      },
      {
        icon: "/calendar.png",
        label: "Cycle Management",
        href: "/admin/cycle",
      },

      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
      },
    ],
  },
];

const Menu = () => {
  const { user } = useAuth();
  const { role } = user;

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((item) => (
        <div className="flex flex-col gap-2" key={item.title}>
          <span className="hidden lg:block text-gray-400 font-bold text-xs uppercase tracking-wider my-4">
            {item.title}
          </span>
          {item.items.map((i) => {
            const href = i.href === "/" ? `/${role}` : i.href;
            const isVisible = RoutePermissions[href]?.includes(role);
            if (isVisible) {
              return (
                <Link
                  href={href}
                  key={i.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-3 md:px-2 rounded-xl hover:bg-lamaSkyLight hover:text-primary transition-all duration-200"
                >
                  <Image src={i.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block font-medium">{i.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
