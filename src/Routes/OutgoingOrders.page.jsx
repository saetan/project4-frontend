import { useState } from "react";
import OutGoingOrdersPageNavBar from "../Components/OutGoingOrders/OutGoingOrdersPageNavBar";

export default function OutGoingOrdersPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  return (
    <div className="flex bg-oyesterbay">
      <div className="w-64">
        <OutGoingOrdersPageNavBar />
      </div>
    </div>
  );
}
