import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OverviewChart({ generatedData, generatedLabels }) {
  const generateData = (chartLabels, chartData) => {
    let data = {
      labels: chartLabels, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Categories", //"# of Votes",
          data: chartData, //[12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)", //red
            "rgba(54, 162, 235, 0.2)", //blue
            "rgba(255, 206, 86, 0.2)", // yellow
            "rgba(75, 192, 192, 0.2)", // green
            "rgba(153, 102, 255, 0.2)", // purple
            "rgba(255, 159, 64, 0.2)", // orange
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return data;
  };

  let chartData = generateData(generatedLabels, generatedData);
  return (
    <div className="w-3/4">
      {chartData ? <Pie data={chartData} /> : "No Data"}
    </div>
  );
}
