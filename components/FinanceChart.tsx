"use client";
import Image from "next/image";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 3000,
  },
  {
    name: "Feb",
    income: 5000,
    expense: 1000,
  },
  {
    name: "Mar",
    income: 1000,
    expense: 5000,
  },
  {
    name: "April",
    income: 3000,
    expense: 500,
  },
  {
    name: "May",
    income: 8000,
    expense: 100,
  },
  {
    name: "June",
    income: 6000,
    expense: 6000,
  },
  {
    name: "July",
    income: 5600,
    expense: 9600,
  },
  {
    name: "Aug",
    income: 9000,
    expense: 7000,
  },
  {
    name: "Sept",
    income: 8000,
    expense: 3000,
  },
  {
    name: "Oct",
    income: 4700,
    expense: 5000,
  },
  {
    name: "Nov",
    income: 3000,
    expense: 1000,
  },
  {
    name: "Dec",
    income: 900,
    expense: 700,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="" />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#FAE27C"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#CFCEFF"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
