import { useState } from "react";
import IncomingOrderNavBar from "../Components/IncomingOrder/IncomingOrderNavBar";
import IncomingOrderEditPage from "../Components/IncomingOrder/IncomingOrderEditPage";

export default function IncomingOrderPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  return (
    <div className="flex bg-oyesterbay">
      <div className="w-64">
        <IncomingOrderNavBar />
      </div>
      <IncomingOrderEditPage
        setTriggerRefresh={setTriggerRefresh}
        triggerRefresh={triggerRefresh}
      />
    </div>
  );
}
