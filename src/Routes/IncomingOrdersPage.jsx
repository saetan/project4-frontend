import { useState } from "react";
import IncomingOrdersPageNavBar from "../Components/IncomingOrders/IncomingOrdersPageNavBar";

export default function IncomingOrdersPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  return (
    <div className="flex bg-oyesterbay">
      <div className="w-64">
        <IncomingOrdersPageNavBar />
      </div>
    </div>
  );
}
