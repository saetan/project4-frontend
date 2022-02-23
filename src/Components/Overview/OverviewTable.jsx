export default function OverviewTable({ generatedData, generatedLabels }) {
  let tableHeader;
  let tableData;

  if (generatedLabels !== []) {
    let count = 0; // for making unique key to make react happy
    tableHeader = generatedLabels.map((label) => {
      count += 1;
      return (
        <th
          key={`${label}${count}`}
          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
        >
          {label}
        </th>
      );
    });
  }

  if (generatedData !== []) {
    tableData = generatedData.map((data) => {
      return (
        <td
          key={data._id}
          className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {data}
        </td>
      );
    });
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            {tableHeader === [] ? (
              "noData"
            ) : (
              <table className="bg-azure min-w-full">
                <thead className="bg-lightseagreen">
                  <tr>{tableHeader}</tr>
                </thead>
                <tbody>
                  <tr className="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
                    {tableData}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
