import { Button, Group, Text, TextInput } from "@mantine/core";
import {
  DataTable,
  DataTableSortStatus,
  DataTableColumn,
} from "mantine-datatable";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { sortBy } from "lodash";

interface MockAssessmentRecords {
  id: number;
  student: {
    id: number;
    name: string;
  };
  project: {
    id: number;
    name: string;
  };
  critera: { number: number; level: string }[];
  score: number;
}

const fetchedRecords: MockAssessmentRecords[] = [
  {
    id: 1,
    student: { id: 101, name: "Nguyen Hua Hoang Van A" },
    project: {
      id: 201,
      name: "Creating an automated system using AI and blockchain for validating used goods quality and sources in e-commerce settings",
    },
    critera: [
      { number: 1, level: "A" },
      { number: 2, level: "B" },
      { number: 3, level: "C" },
      { number: 4, level: "D" },
      { number: 5, level: "A" },
      { number: 6, level: "B" },
    ],
    score: 85,
  },
  {
    id: 2,
    student: { id: 102, name: "Jane Smith" },
    project: { id: 202, name: "Project B" },
    critera: [
      { number: 1, level: "B" },
      { number: 2, level: "C" },
      { number: 3, level: "D" },
      { number: 4, level: "A" },
      { number: 5, level: "B" },
      { number: 6, level: "C" },
    ],
    score: 78,
  },
  {
    id: 3,
    student: { id: 103, name: "Alice Johnson" },
    project: { id: 203, name: "Project C" },
    critera: [
      { number: 1, level: "C" },
      { number: 2, level: "D" },
      { number: 3, level: "A" },
      { number: 4, level: "B" },
      { number: 5, level: "C" },
      { number: 6, level: "D" },
    ],
    score: 92,
  },
  {
    id: 4,
    student: { id: 104, name: "Michael Brown" },
    project: { id: 204, name: "Project D" },
    critera: [
      { number: 1, level: "D" },
      { number: 2, level: "A" },
      { number: 3, level: "B" },
      { number: 4, level: "C" },
      { number: 5, level: "D" },
      { number: 6, level: "A" },
    ],
    score: 87,
  },
  {
    id: 5,
    student: { id: 105, name: "Emily Wilson" },
    project: { id: 205, name: "Project E" },
    critera: [
      { number: 1, level: "A" },
      { number: 2, level: "B" },
      { number: 3, level: "C" },
      { number: 4, level: "D" },
      { number: 5, level: "A" },
      { number: 6, level: "B" },
    ],
    score: 80,
  },
  {
    id: 6,
    student: { id: 106, name: "David Lee" },
    project: { id: 206, name: "Project F" },
    critera: [
      { number: 1, level: "B" },
      { number: 2, level: "C" },
      { number: 3, level: "D" },
      { number: 4, level: "A" },
      { number: 5, level: "B" },
      { number: 6, level: "C" },
    ],
    score: 75,
  },
  {
    id: 7,
    student: { id: 107, name: "Sophia Martinez" },
    project: { id: 207, name: "Project G" },
    critera: [
      { number: 1, level: "C" },
      { number: 2, level: "D" },
      { number: 3, level: "A" },
      { number: 4, level: "B" },
      { number: 5, level: "C" },
      { number: 6, level: "D" },
    ],
    score: 89,
  },
  {
    id: 8,
    student: { id: 108, name: "Daniel Garcia" },
    project: { id: 208, name: "Project H" },
    critera: [
      { number: 1, level: "D" },
      { number: 2, level: "A" },
      { number: 3, level: "B" },
      { number: 4, level: "C" },
      { number: 5, level: "D" },
      { number: 6, level: "A" },
    ],
    score: 82,
  },
  {
    id: 9,
    student: { id: 109, name: "Olivia Brown" },
    project: { id: 209, name: "Project I" },
    critera: [
      { number: 1, level: "A" },
      { number: 2, level: "B" },
      { number: 3, level: "C" },
      { number: 4, level: "D" },
      { number: 5, level: "A" },
      { number: 6, level: "B" },
    ],
    score: 93,
  },
  {
    id: 10,
    student: { id: 110, name: "James Rodriguez" },
    project: { id: 210, name: "Project J" },
    critera: [
      { number: 1, level: "B" },
      { number: 2, level: "C" },
      { number: 3, level: "D" },
      { number: 4, level: "A" },
      { number: 5, level: "B" },
      { number: 6, level: "C" },
    ],
    score: 79,
  },
  {
    id: 11,
    student: { id: 111, name: "Emma Johnson" },
    project: { id: 211, name: "Project K" },
    critera: [
      { number: 1, level: "C" },
      { number: 2, level: "D" },
      { number: 3, level: "A" },
      { number: 4, level: "B" },
      { number: 5, level: "C" },
      { number: 6, level: "D" },
    ],
    score: 88,
  },
  {
    id: 12,
    student: { id: 112, name: "Alexander Lee" },
    project: { id: 212, name: "Project L" },
    critera: [
      { number: 1, level: "D" },
      { number: 2, level: "A" },
      { number: 3, level: "B" },
      { number: 4, level: "C" },
      { number: 5, level: "D" },
      { number: 6, level: "A" },
    ],
    score: 84,
  },
  {
    id: 13,
    student: { id: 113, name: "Mia Martinez" },
    project: { id: 213, name: "Project M" },
    critera: [
      { number: 1, level: "A" },
      { number: 2, level: "B" },
      { number: 3, level: "C" },
      { number: 4, level: "D" },
      { number: 5, level: "A" },
      { number: 6, level: "B" },
    ],
    score: 91,
  },
  {
    id: 14,
    student: { id: 114, name: "Ethan Wilson" },
    project: { id: 214, name: "Project N" },
    critera: [
      { number: 1, level: "B" },
      { number: 2, level: "C" },
      { number: 3, level: "D" },
      { number: 4, level: "A" },
      { number: 5, level: "B" },
      { number: 6, level: "C" },
    ],
    score: 77,
  },
  {
    id: 15,
    student: { id: 115, name: "Ava Garcia" },
    project: { id: 215, name: "Project O" },
    critera: [
      { number: 1, level: "C" },
      { number: 2, level: "D" },
      { number: 3, level: "A" },
      { number: 4, level: "B" },
      { number: 5, level: "C" },
      { number: 6, level: "D" },
    ],
    score: 90,
  },
];

const mockCriteriaCount = 6;
const criteraColumns: DataTableColumn<MockAssessmentRecords>[] = [];
for (let i = 0; i < mockCriteriaCount; i++) {
  criteraColumns.push({
    accessor: "criterion",
    title: i + 1,
    width: "5%",
    render: (record: MockAssessmentRecords) => record.critera[i].level,
  });
}

const RecordsSection = ({ schemeObject }: { schemeObject: any }) => {
  const [displayingRecords, setDisplayingRecords] =
    useState<MockAssessmentRecords[]>(fetchedRecords);
	const [searchedRecords, setSearchedRecords] =
    useState<MockAssessmentRecords[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const PAGE_SIZES = [5, 20, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<MockAssessmentRecords>
  >({
    columnAccessor: "id",
    direction: "asc",
  });

  function handleSearchRecords(searchTerm?: string) {
		setPage(1);
    if (!searchTerm) searchTerm = searchQuery;
    if (searchTerm === "") {
			setSearchedRecords([]);
      setDisplayingRecords(fetchedRecords);
      return;
    }

    let results = fetchedRecords.filter((record) => {
      const { student, project } = record;
      return (
        student.id.toString().includes(searchTerm) ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.id.toString().includes(searchTerm) ||
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setDisplayingRecords(results);
		setSearchedRecords(results);
  }

	// useEffect for sorting
  useEffect(() => {
    const data = sortBy(
      displayingRecords,
      sortStatus.columnAccessor,
    ) as MockAssessmentRecords[];
    setDisplayingRecords(
      sortStatus.direction === "desc" ? data.reverse() : data,
    );
  }, [sortStatus]);

	// useEffect for pagination
	useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setDisplayingRecords(searchedRecords.length>0 ? searchedRecords.slice(from, to) : fetchedRecords.slice(from, to));
  }, [page, pageSize]);

  return (
    <div style={{ maxWidth: "74vw" }}>
      <table>
        <tr>
          <td style={{ width: "13em", verticalAlign: "top" }}>
            <Text size="md" fw={500}>
              Submitted Records
            </Text>
          </td>
          <td style={{ verticalAlign: "top" }}>
            <Text size="md">{schemeObject.maxScore}</Text>
          </td>
        </tr>
        <tr>
          <td style={{ verticalAlign: "top" }}>
            <Text size="md" fw={500}>
              Average Score
            </Text>
          </td>
          <td>
            <Text size="md">{schemeObject.maxScore}</Text>
          </td>
        </tr>
      </table>

      <div className="my-4 flex justify-between">
        <Button leftSection={<IoCreate size={18} />}>Input New Records</Button>
        <TextInput
          placeholder="Search records by student id, name, project"
          className="w-5/12"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          rightSection={
            <BiSearch
              size={20}
              className="group-focus-within:text-blue text-gray"
              onClick={(e) => {
                handleSearchRecords();
              }}
            />
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearchRecords();
            }
          }}
        />
      </div>

      <div>
        <DataTable
          height={500}
          withTableBorder
          borderRadius="md"
          striped
          // fetching={fetching}
          highlightOnHover
          pinFirstColumn
          pinLastColumn
          records={displayingRecords}
          columns={[
            {
              accessor: "student.id",
              title: "Student ID",
              width: "10%",
              sortable: true,
            },
            {
              accessor: "student.name",
              title: "Student Full Name",
              width: "20%",
              sortable: true,
            },
            {
              accessor: "project.id",
              title: "Project ID",
              width: "10%",
              sortable: true,
            },
            {
              accessor: "project.name",
              title: "Project Name",
              width: "30%",
              sortable: true,
            },
            {
              accessor: "score",
              title: "Score",
              sortable: true,
            },
            ...criteraColumns,
            // ...criteraColumns,
            // ...criteraColumns,
            {
              accessor: "actions",
              title: "Actions",
              render: (record) => {
                return (
                  <Group gap={4} justify="center" wrap="nowrap">
                    <Button variant="transparent">
                      <AiOutlineEdit size={25} />
                    </Button>
                    <Button variant="transparent" c={"red"}>
                      <AiOutlineDelete size={25} />
                    </Button>
                  </Group>
                );
              },
            },
          ]}
          paginationText={({ from, to, totalRecords }) =>
            `Showing ${from} - ${to} of ${totalRecords}`
          }
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}

          totalRecords={searchedRecords.length>0 ? searchedRecords.length : fetchedRecords.length}
          recordsPerPage={pageSize}
          page={page}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default RecordsSection;
