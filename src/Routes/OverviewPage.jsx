import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import OverviewChart from "../Components/Overview/OverviewChart";
import OverviewTable from "../Components/Overview/OverviewTable";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OverviewPage() {
  const [stockList, setStockList] = useState();
  let generatedLabels = [];
  let generatedData = [];

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

  const sortByCategory = (labels, data) => {
    if (stockList) {
      for (let stock of stockList) {
        if (stock) {
          labels.push(stock.category);
          data.push(1);
        }
      }
    }
  };

  useEffect(() => {
    retrieveStockList();
  }, []);

  sortByCategory(generatedLabels, generatedData);

  return (
    <div className="grid grid-cols-2 bg-oyesterbay w-screen h-screen">
      <div className="flex items-center justify-center">
        <OverviewChart
          generatedData={generatedData}
          generatedLabels={generatedLabels}
        />
      </div>
      <div className="flex items-center justify-center">
        <OverviewTable
          generatedData={generatedData}
          generatedLabels={generatedLabels}
        />
      </div>
    </div>
  );
}
