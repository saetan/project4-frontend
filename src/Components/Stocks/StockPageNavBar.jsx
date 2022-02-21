export default function StockPageNavbar(props) {
  const { setToggleToAddStockPage } = props;
  const toggleAddStockPage = (event) => {
    setToggleToAddStockPage("addStock");
  };
  const toggleStockListPage = (event) => {
    setToggleToAddStockPage("stockList");
  };
  const toggleUploadCSV = (event) => {
    setToggleToAddStockPage("uploadCSV");
  };
  return (
    <nav className="flex flex-col  bg-atoll w-full items-center h-full min-h-screen">
      <div>
        <span className="font-semibold text-2xl text-center text-azure">
          Stocks Page
        </span>
      </div>
      <div className="grid grid-cols-1 text-xl mt-5">
        <button
          onClick={toggleAddStockPage}
          className="block mt-4 lg:inline-block lg:mt-0 text-blackpearl hover:text-lightseagreen"
        >
          Add Stocks
        </button>
        <button
          onClick={toggleStockListPage}
          className="block mt-4 lg:inline-block lg:mt-0 text-blackpearl hover:text-lightseagreen"
        >
          Stock List
        </button>
        <button
          onClick={toggleUploadCSV}
          className="block mt-4 lg:inline-block lg:mt-0 text-blackpearl hover:text-lightseagreen"
        >
          UploadCSVFile
        </button>
      </div>
    </nav>
  );
}
