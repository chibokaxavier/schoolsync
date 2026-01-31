"use client";
import Image from "next/image";
import React from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#FAE27C" },
  //   { name: "Group C", value: 300 },
  //   { name: "Group D", value: 200 },
  //   { name: "Group E", value: 278 },
  //   { name: "Group F", value: 189 },
];

const Performance = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => {
  return (
    <div className="bg-card p-4 rounded-xl h-80 relative border border-border shadow-sm">
      <div className=" flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">Semester Performance</h1>
        <Image src="/moreDark.png" alt="" height={16} width={16} className="opacity-50" />
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <PieChart >
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8"
            label
            isAnimationActive={isAnimationActive}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
        <h1 className="text-3xl font-bold text-foreground">9.2</h1>
        <p className="text-xs text-muted-foreground">of 10 max LTS</p>
      </div>
      <h2 className="font-medium absolute bottom-8 left-0 right-0 m-auto text-center text-sm text-foreground">1st Semester progress</h2>
    </div>
  );
};

export default Performance;
