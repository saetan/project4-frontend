import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import StockList from "../Components/StockList";
import AddStockForms from "../Components/AddStockForms";
import StockPageNavbar from "../Components/StockPageNavBar";

export default function StocksPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [isAddStockPage, setToggleToAddStockPage] = useState(false);

  return (
    <div className="flex">
      <div className="w-64">
        <StockPageNavbar setToggleToAddStockPage={setToggleToAddStockPage} />
      </div>
      <div className="w-full">
        {isAddStockPage ? (
          <AddStockForms
            setTriggerRefresh={setTriggerRefresh}
            triggerRefresh={triggerRefresh}
            setToggleToAddStockPage={setToggleToAddStockPage}
          />
        ) : (
          <StockList
            triggerRefresh={triggerRefresh}
            setToggleToAddStockPage={setToggleToAddStockPage}
          />
        )}
      </div>
    </div>
  );
}
