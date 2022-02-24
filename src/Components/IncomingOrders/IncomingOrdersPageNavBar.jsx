import { useSelector } from "react-redux";

export default function IncomingOrdersPageNavBar({
  setToggleIncomingOrdersForm,
}) {
  let currentRole = useSelector((state) => state.states.role);

  const toggleIncomingOrdersPage = (event) => {
    setToggleIncomingOrdersForm(true);
  };
  const toggleOrderListPage = (event) => {
    setToggleIncomingOrdersForm(false);
  };

  return (
    <nav className="flex flex-col  bg-atoll w-full items-center h-screen">
      <div>
        <span className="font-semibold text-2xl text-center text-azure">
          Incoming Orders Page
        </span>
      </div>
      <div className="grid grid-cols-1 text-xl mt-5">
        <button
          onClick={toggleIncomingOrdersPage}
          className="block mt-4 lg:inline-block lg:mt-0 text-blackpearl hover:text-lightseagreen"
        >
          Create Incoming Order
        </button>
        {currentRole === "supplier" ? (
          ""
        ) : (
          <button
            onClick={toggleOrderListPage}
            className="block mt-4 lg:inline-block lg:mt-0 text-blackpearl hover:text-lightseagreen"
          >
            Incoming Orders List
          </button>
        )}
      </div>
    </nav>
  );
}
