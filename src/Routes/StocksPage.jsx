import { Link, Outlet } from "react-router-dom"
import { useEffect, useState } from "react";
import StockList from "../Components/StockList"
import AddStockForms from "../Components/AddStockForms";

export default function StocksPage() {
    const [triggerRefresh, setTriggerRefresh] = useState(false);

  return (
    <>
          <h1 className="text-green-500">Welcome Stocks Page</h1>
          <StockList triggerRefresh={triggerRefresh}/>
          <AddStockForms setTriggerRefresh={setTriggerRefresh} triggerRefresh={triggerRefresh}/>
    </>
  );
}
