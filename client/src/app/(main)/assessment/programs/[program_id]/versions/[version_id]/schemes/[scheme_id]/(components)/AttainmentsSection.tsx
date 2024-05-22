import { Group, Button } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const AttainmentsSection = ({ schemeObject }: { schemeObject: any }) => {
  const fetchedData = [
    { label: "A", quantity: 2, percentage: 13.3333 },
    { label: "B", quantity: 3, percentage: 20.0000 },
    { label: "C", quantity: 4, percentage: 26.6667 },
    { label: "D", quantity: 5, percentage: 33.3333 },
    { label: "N/A", quantity: 1, percentage: 6.6667 },
  ];

  const [displayingData, setdisplayingData] = useState([
    ...fetchedData,
    {
      label: "Total",
      quantity: fetchedData.reduce(
        (total, { quantity }) => total + quantity,
        0,
      ),
      percentage: 100,
    },
  ]);

  if (!displayingData) return <div>Fetching data...</div>;
  return (
    <div className="mt-4">
      <DataTable
        withTableBorder
        borderRadius="md"
        striped
        highlightOnHover
        records={displayingData}
        columns={[
          {
            accessor: "label",
            title: "Level",
            width: "10%",
          },
          {
            accessor: "quantity",
            title: "Quantity",
          },
          {
            accessor: "percentage",
            title: "Percentage",
          },
        ]}
        rowClassName={({ label }) =>
          label === "Total" ? "font-bold" : undefined
        }
      />
    </div>
  );
};

export default AttainmentsSection;
