"use client";


import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useGetDashboardStatsQuery } from "@/redux/api/orderApi";
import { useState } from "react";

const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);
const LineChart = dynamic(() => import("recharts").then((mod) => mod.LineChart), {
  ssr: false,
});
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), { ssr: false });
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false }
);
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false });

// Months array for labels
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Transform API data to chart-friendly format
const mapChartData = (data: any[], type: "weekly" | "monthly" | "yearly") => {
  return data.map((item) => {
    switch (type) {
      case "monthly":
        return {
          month: `${MONTH_NAMES[item._id.month - 1]} ${item._id.year}`,
          amount: item.totalAmount,
        };
      case "weekly":
        return {
          month: `Week ${item._id.week}, ${item._id.year}`,
          amount: item.totalAmount,
        };
      case "yearly":
        return {
          month: `${item._id.year}`,
          amount: item.totalAmount,
        };
    }
  });
};

export default function DasboardGraph({className}:{className?:string}) {
  // const [stats, setStats] = useState<any>({});


const [period, setPeriod] = useState<"weekly" | "monthly" | "yearly">("monthly");

  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  const chartData = stats && stats[period] ? mapChartData(stats[period], period) : [];

  return (
    <div className={`${className}  rounded-[16px] bg-[#FAFAFA] py-6 px-4 flex flex-col gap-9 w-full`}>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex md:flex-row flex-col gap-8 justify-between items-center">
          <h4 className="font-semibold text-xl text-black">Sale Graph</h4>
          <div className="flex gap-[15px]">
            {["weekly", "monthly", "yearly"].map((p) => (
              <Button
                key={p}
                className={`rounded-xl border px-4 py-2 uppercase font-medium text-sm tracking-[0.25px] hover:text-white ${
                  period === p
                    ? "bg-[#003F62] text-white border-[#003F62]"
                    : "bg-[#fff] text-[#232321] border-[#232321]"
                }`}
                onClick={() => setPeriod(p as "weekly" | "monthly" | "yearly")}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="w-full border-[0.5px] border-[#232321]"></div>

        {/* Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis ticks={[0, 100, 200, 300, 400]} />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#003F62" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
