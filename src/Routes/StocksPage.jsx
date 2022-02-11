import { useState } from "react";
import StockList from "../Components/Stocks/StockList";
import AddStockForms from "../Components/Stocks/AddStockForms";
import StockPageNavbar from "../Components/Stocks/StockPageNavBar";

export default function StocksPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [isAddStockPage, setToggleToAddStockPage] = useState(false);

  return (
    <div className="flex bg-oyesterbay">
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
