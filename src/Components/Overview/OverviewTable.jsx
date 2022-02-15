export default function OverviewTable({ generatedData, generatedLabels }) {
  let tableHeader;
  let tableData;

  if (generatedLabels !== []) {
    tableHeader = generatedLabels.map((label) => {
      return <th className="border broder-blackpearl">{label}</th>;
    });
  }

  if (generatedData !== []) {
    tableData = generatedData.map((data) => {
      return (
        <td key={data._id} className="border border-blackpearl">
          {data}
        </td>
      );
    });
  }

  return (
    <div className="flex justify-center items-center font-bold text-xl w-full">
      {tableHeader === [] ? (
        "noData"
      ) : (
        <table className="bg-azure border-collapse border border-blackpearl table-fixed  min-w-full min-h-screen">
          <thead className="bg-lightseagreen">
            <tr className="text-azure">{tableHeader}</tr>
          </thead>
          <tbody>
            <tr>{tableData}</tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
