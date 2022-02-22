import { useState, useEffect } from "react";
import StockList from "../Components/Stocks/StockList";
import AddStockForms from "../Components/Stocks/AddStockForms";
import StockPageNavbar from "../Components/Stocks/StockPageNavBar";
import CSVUploadPage from "../Components/Stocks/CSVUploadPage";

export default function StocksPage() {
  const [isAddStockPage, setToggleToAddStockPage] = useState("stockList");
  const [currentSelection, setCurrentSelection] = useState(
    <StockList setToggleToAddStockPage={setToggleToAddStockPage} />
  );

  useEffect(() => {
    renderSelected();
  }, [isAddStockPage]);

  const renderSelected = () => {
    if (isAddStockPage === "stockList") {
      setCurrentSelection(
        <StockList setToggleToAddStockPage={setToggleToAddStockPage} />
      );
    } else if (isAddStockPage === "addStock") {
      setCurrentSelection(
        <AddStockForms setToggleToAddStockPage={setToggleToAddStockPage} />
      );
    } else if (isAddStockPage === "uploadCSV") {
      setCurrentSelection(
        <CSVUploadPage setToggleToAddStockPage={setToggleToAddStockPage} />
      );
    }
  };

  return (
    <div className="flex bg-oyesterbay">
      <div className="w-64">
        <StockPageNavbar setToggleToAddStockPage={setToggleToAddStockPage} />
      </div>
      <div className="w-full">{currentSelection}</div>
    </div>
  );
}
