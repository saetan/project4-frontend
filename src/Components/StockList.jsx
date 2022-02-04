import { useEffect, useState} from "react";

export default function StocksPage({triggerRefresh}) {
    const [stockList, setStockList] = useState([]);
    let mapStock;
    useEffect(() => {
        retrieveStockList();
        console.log(stockList);
    }, [triggerRefresh]);

    if (stockList) {
        mapStock = stockList.map((stock) => {
            return (
                <>
                    <p>{stock.name}</p>
                    <p>{stock.price}</p>
                    <p>{stock.quantity}</p>
                </>
            )
        })
    }


    const retrieveStockList = async () => {
        try {
            const stocksResponse = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/stocks`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const stocksData = await stocksResponse.json();

            //Set Stocklist if stock is not empty
            if (stocksData) {
                setStockList(stocksData);
            }

            console.log(stocksData);
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <>
          <h1 className="text-green-500">Welcome Stocks List</h1>
          {stockList.length? mapStock : "No stocks"}
    </>
  );
}
