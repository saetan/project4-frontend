import { Link } from "react-router-dom";

export default function UsersPageNavbar(props) {
  const { setToggleToAddStockPage } = props;
  const toggleAddStockPage = (event) => {
    setToggleToAddStockPage(true);
  };
  const toggleStockListPage = (event) => {
    setToggleToAddStockPage(false);
  };
  return (
    <nav className="flex flex-col  bg-atoll w-full items-center h-full">
      <div>
        <span className="font-semibold text-2xl text-center text-azure">
          Users Page
        </span>
      </div>
      <div className="grid grid-cols-1 text-xl mt-5">
        <button
          onClick={toggleAddStockPage}
          className="block mt-4 lg:inline-block lg:mt-0 text-blackpearl hover:text-lightseagreen"
        >
          Add User
        </button>
        <button
          onClick={toggleStockListPage}
          className="block mt-4 lg:inline-block lg:mt-0 text-blackpearl hover:text-lightseagreen"
        >
          Users List
        </button>
      </div>
    </nav>
  );
}
