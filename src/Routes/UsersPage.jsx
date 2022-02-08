import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import StockList from "../Components/StockList";
import AddUserForm from "../Components/AddUserForm";
import UsersPageNavbar from "../Components/UsersPageNavBar";

export default function UsersPage() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [isAddUserPage, setToggleToAddStockPage] = useState(false);

  return (
    <div className="flex">
      <div className="w-64">
        <UsersPageNavbar setToggleToAddStockPage={setToggleToAddStockPage} />
      </div>
      <div className="w-full">
        {isAddUserPage ? (
          <AddUserForm
            setTriggerRefresh={setTriggerRefresh}
            triggerRefresh={triggerRefresh}
            setToggleToAddStockPage={setToggleToAddStockPage}
          />
        ) : (
          <StockList
            triggerRefresh={triggerRefresh}
            setToggleToAddStockPage={setToggleToAddStockPage}
          />
        )}
      </div>
    </div>
  );
}