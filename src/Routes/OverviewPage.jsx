import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";
import OverviewChart from "../Components/Overview/OverviewChart";
import OverviewTable from "../Components/Overview/OverviewTable";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OverviewPage() {
  const [stockList, setStockList] = useState();
  const [currentSortSelection, setCurrentSortSelection] = useState("category");
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

  const checkStockLevel = () => {
    if (stockList) {
      for (let stock of stockList) {
        console.log(stock);
        if (stock.quantity <= 5) {
          toast.warn(`${stock.name} is low in quantity, please order more`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  };

  const sortByCategory = (labels, data) => {
    let categoryCount = {};
    if (stockList) {
      for (let stock of stockList) {
        if (stock) {
          labels.push(stock.category);
          if (categoryCount[stock.category]) {
            categoryCount[stock.category] += 1;
          } else {
            categoryCount[stock.category] = 1;
          }
        }
        data.push(categoryCount[stock.category]);
      }
    }
  };

  const sortByItemNames = (labels, data) => {
    if (stockList) {
      for (let stock of stockList) {
        if (stock) {
          labels.push(stock.name);
          data.push(stock.quantity);
        }
      }
    }
  };

  const sortByPrice = (labels, data) => {
    if (stockList) {
      for (let stock of stockList) {
        if (stock) {
          labels.push(stock.name);
          data.push(stock.price);
        }
      }
    }
  };

  const handleCategorySort = () => {
    setCurrentSortSelection("category");
  };

  const handleItemNameSort = () => {
    setCurrentSortSelection("itemName");
  };

  const handlePriceSort = () => {
    setCurrentSortSelection("price");
  };

  useEffect(() => {
    retrieveStockList();
  }, []);

  useEffect(() => {
    checkStockLevel();
  }, [stockList]);

  if (currentSortSelection === "category") {
    sortByCategory(generatedLabels, generatedData);
  } else if (currentSortSelection === "itemName") {
    sortByItemNames(generatedLabels, generatedData);
  } else if (currentSortSelection === "price") {
    sortByPrice(generatedLabels, generatedData);
  }
  return (
    <>
      <div className="grid grid-cols-2 bg-oyesterbay w-screen h-screen">
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1">
            <button
              className="inline-block bg-atoll text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              onClick={handleItemNameSort}
            >
              Sort By Item Names
            </button>
            <button
              className="inline-block bg-toll text-sm px-4 py-2 bg-atoll leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              onClick={handleCategorySort}
            >
              Sort By Category
            </button>
            <button
              className="inline-block bg-toll text-sm px-4 py-2 bg-atoll leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              onClick={handlePriceSort}
            >
              Sort By Price
            </button>
          </div>
          <OverviewChart
            generatedData={generatedData}
            generatedLabels={generatedLabels}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <OverviewTable
            generatedData={generatedData}
            generatedLabels={generatedLabels}
          />
        </div>
      </div>
    </>
  );
}
