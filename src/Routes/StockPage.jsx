import { useState } from "react";
import StockPageNavBar from "../Components/Stock/StockPageNavBar";
import StockEditPage from "../Components/Stock/StockEditPage";

export default function StockPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  return (
    <div className="flex bg-oyesterbay">
      <div className="w-64">
        <StockPageNavBar />
      </div>
      <StockEditPage
        setTriggerRefresh={setTriggerRefresh}
        triggerRefresh={triggerRefresh}
      />
    </div>
  );
}
