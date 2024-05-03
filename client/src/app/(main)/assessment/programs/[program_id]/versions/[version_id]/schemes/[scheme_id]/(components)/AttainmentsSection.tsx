import { Group, Button } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const AttainmentsSection = ({ schemeObject }: { schemeObject: any }) => {
  const fetchedData = [
    { label: "A", quantity: 16, percentage: 2.1948 },
    { label: "B", quantity: 44, percentage: 6.0357 },
    { label: "C", quantity: 231, percentage: 31.6872 },
    { label: "D", quantity: 435, percentage: 59.6708 },
    { label: "N/A", quantity: 3, percentage: 0.4115 },
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
