import { useState, useEffect } from "react";
import OutGoingOrdersPageNavBar from "../Components/OutGoingOrders/OutGoingOrdersPageNavBar";
import OutGoingOrdersList from "../Components/OutGoingOrders/OutGoingOrdersList";
import OutGoingOrdersForm from "../Components/OutGoingOrders/OutGoingOrdersForm";
import { useSelector } from "react-redux";

export default function OutGoingOrdersPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [isOutGoingOrdersForm, setToggleOutGoingOrdersForm] = useState(false);
  let currentRole = useSelector((state) => state.states.role);

  useEffect(() => {
    if (currentRole === "customer") {
      setToggleOutGoingOrdersForm(true);
    }
  }, [currentRole]);

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
