import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OverviewChart() {
  const [stockList, setStockList] = useState();
  const [chartLabels, setChartLabels] = useState();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    retrieveStockList();
    sortByCategory();
  }, [stockList]);

  const retrieveStockList = async () => {
    console.log("Retrieving");
    try {
      const stocksResponse = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/stocks`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const stocksData = await stocksResponse.json();

      //Set Stocklist if stock is not empty
      if (stocksData.status !== 200) {
        console.log(stocksData.result);
      } else if (stocksData.status === 200) {
        setStockList(stocksData.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const sortByCategory = () => {
    let generateLabels = [];
    let generateData = [];
    for (let stock of stockList) {
      if (stock) {
        generateLabels.push(stock.category);
        generateData.push(1);
      }
    }
    setChartData(generateData);
    setChartLabels(generateLabels);
  };
  const data = {
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

  return (
    <div className="w-3/4">{chartData ? <Pie data={data} /> : "No Data"}</div>
  );
}
