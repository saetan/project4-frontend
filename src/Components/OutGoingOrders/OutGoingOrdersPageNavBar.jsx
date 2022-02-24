import { useSelector } from "react-redux";

export default function OutGoingOrdersPageNavBar({
  setToggleOutGoingOrdersForm,
}) {
  let currentRole = useSelector((state) => state.states.role);

  const toggleOutGoingOrdersPage = (event) => {
    setToggleOutGoingOrdersForm(true);
  };
  const toggleOrderListPage = (event) => {
    setToggleOutGoingOrdersForm(false);
  };

  return (
    <nav className="flex flex-col  bg-atoll w-full items-center h-screen">
      <div>
        <span className="font-semibold text-2xl text-center text-azure">
          Outgoing Orders Page
        </span>
      </div>
      <div className="grid grid-cols-1 text-xl mt-5">
        <button
          onClick={toggleOutGoingOrdersPage}
          className="block mt-4 lg:inline-block lg:mt-0 text-blackpearl hover:text-lightseagreen"
        >
          Create Outgoing Order
        </button>
        {currentRole === "customer" ? (
          ""
        ) : (
          <button
            onClick={toggleOrderListPage}
            className="block mt-4 lg:inline-block lg:mt-0 text-blackpearl hover:text-lightseagreen"
          >
            Outgoing Orders List
          </button>
        )}
      </div>
    </nav>
  );
}
