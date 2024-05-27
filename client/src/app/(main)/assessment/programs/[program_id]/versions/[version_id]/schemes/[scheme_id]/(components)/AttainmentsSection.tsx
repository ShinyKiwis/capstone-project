import { AssessSchemeDetail, FetchedCriterion, FetchedCriterionRecord } from "@/app/interfaces/Assessment.interface";
import { Group, Button } from "@mantine/core";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";

interface AttainmenRow {
  label: string;
  PI: string;
  A:number; pA:number;
  B:number; pB:number;
  C:number; pC:number;
  D:number; pD:number;
  E:number; pE:number;
  total: number;
}

function countCriterionLevels(schemeObject: AssessSchemeDetail) {
  let attainmentsPerCriterion = schemeObject.criteria.map((criterion, index) => {
    let counts: AttainmenRow = {
      label: (index+1).toString(),
      PI: criterion.performanceIndicator.name,
      A:0, pA:0,
      B:0, pB:0,
      C:0, pC:0,
      D:0, pD:0,
      E:0, pE:0,
      total: 0
    }

    criterion.records.forEach(record => {
      switch (record.answer) {
        case 'A':
          counts.A += 1;
          counts.total += 1;
          break;
        case 'B':
          counts.B += 1;
          counts.total += 1;
          break;
        case 'C':
          counts.C += 1;
          counts.total += 1;
          break;
        case 'D':
          counts.D += 1;
          counts.total += 1;
          break;
        case 'E':
          counts.E += 1;
          counts.total += 1;
          break;
        default:
          break;
      }
    })

    return counts;
  });

  // Calculate total
  let totalRow = {
    label: "Total",
    PI: '  ',
    A:0, pA:0,
    B:0, pB:0,
    C:0, pC:0,
    D:0, pD:0,
    E:0, pE:0,
    total: 0
  }

  // Calculate total, percentages for each row
  attainmentsPerCriterion.forEach(row => {
    row.pA = row.total > 0 ? Math.round(row.A/row.total*1000000)/10000 : 0;
    totalRow.A += row.A;
    row.pB = row.total > 0 ? Math.round(row.B/row.total*1000000)/10000 : 0;
    totalRow.B += row.B;
    row.pC = row.total > 0 ? Math.round(row.C/row.total*1000000)/10000 : 0;
    totalRow.C += row.C;
    row.pD = row.total > 0 ? Math.round(row.D/row.total*1000000)/10000 : 0;
    totalRow.D += row.D;
    row.pE = row.total > 0 ? Math.round(row.E/row.total*1000000)/10000 : 0;
    totalRow.E += row.E;
    totalRow.total += row.total;
  });

  totalRow.pA = totalRow.total > 0 ? Math.round(totalRow.A/totalRow.total*1000000)/10000 : 0;
  totalRow.pB = totalRow.total > 0 ? Math.round(totalRow.B/totalRow.total*1000000)/10000 : 0;
  totalRow.pC = totalRow.total > 0 ? Math.round(totalRow.C/totalRow.total*1000000)/10000 : 0;
  totalRow.pD = totalRow.total > 0 ? Math.round(totalRow.D/totalRow.total*1000000)/10000 : 0;
  totalRow.pE = totalRow.total > 0 ? Math.round(totalRow.E/totalRow.total*1000000)/10000 : 0;


  // return [...attainmentsPerCriterion, totalRow]
  return {
    rows: attainmentsPerCriterion,
    totalRow: [totalRow],
  }
}

const AttainmentsSection = ({ schemeObject }: { schemeObject: AssessSchemeDetail }) => {
  const fetchedData = countCriterionLevels(schemeObject)

  const [displayingData, setdisplayingData] = useState(fetchedData);
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<AttainmenRow>
  >({
    columnAccessor: "label",
    direction: "asc",
  });

  // useEffect for sorting
  useEffect(() => {
    const data = sortBy(
      displayingData.rows,
      sortStatus.columnAccessor,
    ) as AttainmenRow[];
    setdisplayingData({
      rows: sortStatus.direction === "desc" ? data.reverse() : data,
      totalRow: displayingData.totalRow
    }
    );
  }, [sortStatus]);

  if (!displayingData) return <div>Fetching data...</div>;
  return (
    <div className="mt-4">
      <DataTable
        withTableBorder
        borderRadius="md"
        striped
        highlightOnHover
        records={displayingData.rows}
        columns={[
          {
            accessor: "label",
            title: "Criterion",
            width: "5%",
            sortable: true
          },
          {
            accessor: "PI",
            title: "PI",
            width: "5%",
            sortable: true
          },
          {
            accessor: "A",
            title: "Level A",
            width: "10%",
            render: (record, index) => `${record.A} (${record.pA}%)`,
            sortable: true
          },
          {
            accessor: "B",
            title: "Level B",
            width: "10%",
            render: (record, index) => `${record.B} (${record.pB}%)`,
            sortable: true
          },
          {
            accessor: "C",
            title: "Level C",
            width: "10%",
            render: (record, index) => `${record.C} (${record.pC}%)`,
            sortable: true
          },
          {
            accessor: "D",
            title: "Level D",
            width: "10%",
            render: (record, index) => `${record.D} (${record.pD}%)`,
            sortable: true
          },
          {
            accessor: "E",
            title: "Level E",
            width: "10%",
            render: (record, index) => `${record.E} (${record.pE}%)`,
            sortable: true
          },
          {
            accessor: "total",
            title: "Total",
            width: "10%",
            render: (record, index) => `${record.total > 0 ? `${record.total} (100%)` : 0}`,
            sortable: true
          },
        ]}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        styles={{
          root:{zIndex: 10},
        }}
      />
      <DataTable
        withTableBorder
        borderRadius="md"
        // noHeader
        styles={{
          root:{zIndex: 0, marginTop: '-2em'},
          header: {
            opacity: 0,
            height: 0
          },
        }}
        records={displayingData.totalRow}
        columns={[
          {
            accessor: "label",
            title: "Criterion",
            width: "5%",
            sortable: true
          },
          {
            accessor: "PI",
            title: "PI",
            width: "5%",
            sortable: true
          },
          {
            accessor: "A",
            title: "Level A",
            width: "10%",
            render: (record, index) => `${record.A} (${record.pA}%)`,
            sortable: true
          },
          {
            accessor: "B",
            title: "Level B",
            width: "10%",
            render: (record, index) => `${record.B} (${record.pB}%)`,
            sortable: true
          },
          {
            accessor: "C",
            title: "Level C",
            width: "10%",
            render: (record, index) => `${record.C} (${record.pC}%)`,
            sortable: true
          },
          {
            accessor: "D",
            title: "Level D",
            width: "10%",
            render: (record, index) => `${record.D} (${record.pD}%)`,
            sortable: true
          },
          {
            accessor: "E",
            title: "Level E",
            width: "10%",
            render: (record, index) => `${record.E} (${record.pE}%)`,
            sortable: true
          },
          {
            accessor: "total",
            title: "Total",
            width: "10%",
            render: (record, index) => `${record.total > 0 ? `${record.total} (100%)` : 0}`,
            sortable: true
          },
        ]}
        rowClassName={"font-bold"}
      />
    </div>
  );
};

export default AttainmentsSection;
