import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import OverviewChart from "../Components/Overview/OverviewChart";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OverviewPage() {
  return (
    <div className="grid grid-cols-2 bg-oyesterbay w-screen h-screen">
      <div className="flex items-center justify-center">
        <OverviewChart />
      </div>
      <div className="">I am a table</div>
    </div>
  );
}
