import { useState, useEffect } from "react";
import IncomingOrdersPageNavBar from "../Components/IncomingOrders/IncomingOrdersPageNavBar";
import IncomingOrdersList from "../Components/IncomingOrders/IncomingOrdersList";
import IncomingOrdersForm from "../Components/IncomingOrders/IncomingOrdersForm";
import { useSelector } from "react-redux";

export default function IncomingOrdersPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [isIncomingOrdersForm, setToggleIncomingOrdersForm] = useState(false);
  let currentRole = useSelector((state) => state.states.role);

  useEffect(() => {
    if (currentRole === "supplier") {
      setToggleIncomingOrdersForm(true);
    }
  }, [currentRole]);
  return (
    <div className="flex bg-oyesterbay">
      <div className="w-64">
        <IncomingOrdersPageNavBar
          setToggleIncomingOrdersForm={setToggleIncomingOrdersForm}
        />
      </div>
      <div className="w-full">
        {isIncomingOrdersForm ? (
          <IncomingOrdersForm
            setTriggerRefresh={setTriggerRefresh}
            triggerRefresh={triggerRefresh}
          />
        ) : (
          <IncomingOrdersList
            triggerRefresh={triggerRefresh}
            setTriggerRefresh={setTriggerRefresh}
          />
        )}
      </div>
    </div>
  );
}
