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
import useNavigate from "@/app/hooks/useNavigate";
import {
  AssessSchemeDetail,
  FetchedCriterion,
  FetchedCriterionRecord,
  FetchedRecordUser,
} from "@/app/interfaces/Assessment.interface";

interface AssessmentRecordRow {
  user: FetchedRecordUser | null;
  project: FetchedCriterionRecord["project"];
  answers: FetchedCriterionRecord[];
  totalScore: number;
}

function groupRecords(data: FetchedCriterionRecord[]) {
  const groups: {[key: string]: AssessmentRecordRow} = {};

  data.forEach((item) => {
    let key = "";

    if (item.project && item.user) {
      key = `project-${item.project.code}-user-${item.user.id}`;
    } else if (item.user) {
      key = `user-${item.user.id}`;
    } else if (item.project) {
      key = `project-${item.project.code}`;
    }

    if (!groups[key]) {
      groups[key] = {
        user: item.user,
        project: item.project,
        answers: [],
        totalScore: 0,
      };
    }

    groups[key].answers.push(item);
    groups[key].totalScore += item.score;
  });

  return Object.values(groups);
}

const RecordsSection = ({
  schemeObject,
}: {
  schemeObject: AssessSchemeDetail;
}) => {
  const allRecords = groupRecords(schemeObject.records);
  var avgScore = allRecords.reduce((total, next) => total + next.totalScore, 0) / allRecords.length;
  const [displayingRecords, setDisplayingRecords] = useState<AssessmentRecordRow[]>(allRecords);
  const [searchedRecords, setSearchedRecords] = useState<AssessmentRecordRow[]>([],
  );

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const PAGE_SIZES = [5, 20, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<AssessmentRecordRow>
  >({
    columnAccessor: "user.id",
    direction: "asc",
  });


  function handleSearchRecords(searchTerm?: string) {
    setPage(1);
    if (!searchTerm) searchTerm = searchQuery;
    if (searchTerm === "") {
      setSearchedRecords([]);
      setDisplayingRecords(allRecords);
      return;
    }

    let results = allRecords.filter((record) => {
      const { user, project } = record;
      return (
        user?.id.toString().includes(searchTerm) ||
        user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project?.code.toString().includes(searchTerm) ||
        project?.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    ) as AssessmentRecordRow[];
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
    setDisplayingRecords(
      searchedRecords.length > 0
        ? searchedRecords.slice(from, to)
        : allRecords.slice(from, to),
    );
  }, [page, pageSize]);

  const criteraColumns: DataTableColumn<AssessmentRecordRow>[] = [];
  for (let i = 0; i < schemeObject.criteria.length; i++) {
    criteraColumns.push({
      accessor: "criterion",
      title: `Criterion ${i + 1}`,
      render: (record: AssessmentRecordRow) => <div className="w-fit max-w-56 overflow-hidden">{record.answers[i].answer}</div>,
    });
  }

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
            <Text size="md">{allRecords.length}</Text>
          </td>
        </tr>
        <tr>
          <td style={{ verticalAlign: "top" }}>
            <Text size="md" fw={500}>
              Average Score
            </Text>
          </td>
          <td>
            <Text size="md">{avgScore}</Text>
          </td>
        </tr>
      </table>

      <div className="my-4 flex justify-between">
        <Button
          leftSection={<IoCreate size={18} />}
          onClick={() => navigate(`${schemeObject.id}/input`)}
        >
          Input New Records
        </Button>
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
            
      {/* <Button onClick={()=>{setDisplayingRecords(groupRecords(schemeObject.records))}}>Refresh table</Button> */}

      <div>
        <DataTable
          height={500}
          withTableBorder
          withColumnBorders
          borderRadius="md"
          striped
          // fetching={fetching}
          highlightOnHover
          pinFirstColumn
          pinLastColumn
          records={displayingRecords}
          columns={[
            {
              accessor: "user.id",
              title: "Student ID",
              width: "10%",
              sortable: true,
            },
            {
              accessor: "user.name",
              title: "Student Full Name",
              width: "20%",
              sortable: true,
            },
            {
              accessor: "project.code",
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
              accessor: "totalScore",
              title: "Score",
              sortable: true,
            },
            ...criteraColumns,
            // ...criteraColumns,
            // ...criteraColumns,
            {
              accessor: "actions",
              title: "Actions",
              render: (record, index) => {
                return (
                  <Group gap={4} justify="center" wrap="nowrap">
                    <Button
                      variant="transparent"
                      onClick={() =>
                        navigate(`${schemeObject.id}/edit/${record.user?.id}`)
                      }
                    >
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
          totalRecords={
            searchedRecords.length > 0
              ? searchedRecords.length
              : allRecords.length
          }
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
