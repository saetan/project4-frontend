import { useState, useEffect } from "react";
import StockList from "../Components/Stocks/StockList";
import AddStockForms from "../Components/Stocks/AddStockForms";
import StockPageNavbar from "../Components/Stocks/StockPageNavBar";
import CSVUploadPage from "../Components/Stocks/CSVUploadPage";

export default function StocksPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [isAddStockPage, setToggleToAddStockPage] = useState("stockList");
  const [currentSelection, setCurrentSelection] = useState(
    <StockList
      triggerRefresh={triggerRefresh}
      setTriggerRefresh={setTriggerRefresh}
      setToggleToAddStockPage={setToggleToAddStockPage}
    />
  );

  useEffect(() => {
    renderSelected();
  }, [isAddStockPage]);

  const renderSelected = () => {
    if (isAddStockPage === "stockList") {
      setCurrentSelection(
        <StockList
          triggerRefresh={triggerRefresh}
          setTriggerRefresh={setTriggerRefresh}
          setToggleToAddStockPage={setToggleToAddStockPage}
        />
      );
    } else if (isAddStockPage === "addStock") {
      setCurrentSelection(
        <AddStockForms
          setTriggerRefresh={setTriggerRefresh}
          triggerRefresh={triggerRefresh}
          setToggleToAddStockPage={setToggleToAddStockPage}
        />
      );
    } else if (isAddStockPage === "uploadCSV") {
      setCurrentSelection(<CSVUploadPage />);
    }
  };

  return (
    <div className="flex bg-oyesterbay">
      <div className="w-64">
        <StockPageNavbar setToggleToAddStockPage={setToggleToAddStockPage} />
      </div>
      <div className="w-full">
        {/* {isAddStockPage === "addStock" ? (
          <AddStockForms
            setTriggerRefresh={setTriggerRefresh}
            triggerRefresh={triggerRefresh}
            setToggleToAddStockPage={setToggleToAddStockPage}
          />
        ) : (
          <StockList
            triggerRefresh={triggerRefresh}
            setTriggerRefresh={setTriggerRefresh}
            setToggleToAddStockPage={setToggleToAddStockPage}
          />
        )} */}
        {currentSelection}
      </div>
    </div>
  );
}
