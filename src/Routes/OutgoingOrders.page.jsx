import { useState } from "react";
import OutGoingOrdersPageNavBar from "../Components/OutGoingOrders/OutGoingOrdersPageNavBar";
import OutGoingOrdersList from "../Components/OutGoingOrders/OutGoingOrdersList";
import OutGoingOrdersForm from "../Components/OutGoingOrders/OutGoingOrdersForm";

export default function OutGoingOrdersPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [isOutGoingOrdersForm, setToggleOutGoingOrdersForm] = useState(false);
  return (
    <div className="flex bg-oyesterbay">
      <div className="w-64">
        <OutGoingOrdersPageNavBar
          setToggleOutGoingOrdersForm={setToggleOutGoingOrdersForm}
        />
      </div>
      <div className="w-full">
        {isOutGoingOrdersForm ? (
          <OutGoingOrdersForm
            setTriggerRefresh={setTriggerRefresh}
            triggerRefresh={triggerRefresh}
          />
        ) : (
          <OutGoingOrdersList
            triggerRefresh={triggerRefresh}
            setTriggerRefresh={setTriggerRefresh}
          />
        )}
      </div>
    </div>
  );
}
