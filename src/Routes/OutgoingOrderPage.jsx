import { useState } from "react";
import OutgoingOrderNavBar from "../Components/OutgoingOrder/OutgoingOrderNavBar";
import OutgoingOrderEditPage from "../Components/OutgoingOrder/OutgoingOrderEditPage";

export default function OutgoingOrderPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  return (
    <div className="flex bg-oyesterbay">
      <div className="w-64">
        <OutgoingOrderNavBar />
      </div>
      <OutgoingOrderEditPage
        setTriggerRefresh={setTriggerRefresh}
        triggerRefresh={triggerRefresh}
      />
    </div>
  );
}
