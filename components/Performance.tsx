"use client";
import Image from "next/image";
import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

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
    <div className="bg-white p-4 rounded-md h-80 ">
      <div className=" flex items-center justify-between">
        <h1 className="text-xl font-semibold">Performance</h1>
        <Image src="/moreDark.png" alt="" height={16} width={16} />
      </div>

      
      {/* <ResponsiveContainer width="100" height="100"> */}

      <PieChart width={400} height={400}>
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

      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default Performance;
