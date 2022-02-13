import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import OverviewChart from "../Components/Overview/OverviewChart";
import OverviewTable from "../Components/Overview/OverviewTable";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OverviewPage() {
  return (
    <div className="grid grid-cols-2 bg-oyesterbay w-screen h-screen">
      <div className="flex items-center justify-center">
        <OverviewChart />
      </div>
      <div className="flex items-center justify-center">
        <OverviewTable />
      </div>
    </div>
  );
}
