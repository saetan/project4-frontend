import { useEffect, useState } from "react";

export default function StocksPage({ triggerRefresh }) {
  const [stockList, setStockList] = useState([]);
  let mapStock;
  useEffect(() => {
    retrieveStockList();
    console.log(stockList);
  }, [triggerRefresh]);

  if (stockList) {
    mapStock = stockList.map((stock) => {
      return (
        <tr key={stock.name}>
          <td className="border border-blackpearl">{stock.name}</td>
          <td className="border border-blackpearl">{stock.price}</td>
          <td className="border border-blackpearl">{stock.quantity}</td>
        </tr>
      );
    });
  }

  const retrieveStockList = async () => {
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
      if (stocksData) {
        setStockList(stocksData);
      }

      console.log(stocksData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center font-bold text-2xl">
      {stockList.length ? (
        <table className="bg-azure border-collapse border border-blackpearl table-fixed  min-w-full min-h-screen">
          <thead className="bg-lightseagreen">
            <tr className="text-azure">
              <th className="border border-blackpearl">Name</th>
              <th className="border border-blackpearl">Price</th>
              <th className="border border-blackpearl">Quantity</th>
            </tr>
          </thead>
          <tbody>{mapStock}</tbody>
        </table>
      ) : (
        "No stocks"
      )}
    </div>
  );
}
