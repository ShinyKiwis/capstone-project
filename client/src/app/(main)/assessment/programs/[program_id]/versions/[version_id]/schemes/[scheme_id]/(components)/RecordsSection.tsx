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
import { AssessSchemeDetail, FetchedCriterion, FetchedCriterionRecord } from "@/app/interfaces/Assessment.interface";

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

const fetchedRecords: FetchedCriterionRecord[] = [
  {
    id: 23,
    criterionId: 5,
    criterionAssessmentSchemeId: 6,
    criterionAssessmentSchemeVersionId: 1,
    criterionAssessmentSchemeVersionProgramId: 1,
    answer: "Nam answer",
    score: 2,
    project: null,
    user: {
      id: 1,
      email: "daonam@hcmut.edu.vn",
      username: "daonam",
      name: "Đào Nam",
      roles: [
        {
          id: 1,
          name: "Student",
          resources: [
            {
              id: 5,
              name: "view_projects",
            },
            {
              id: 6,
              name: "enroll_projects",
            },
          ],
        },
      ],
    },
  },
  {
    id: 32,
    criterionId: 5,
    criterionAssessmentSchemeId: 6,
    criterionAssessmentSchemeVersionId: 1,
    criterionAssessmentSchemeVersionProgramId: 1,
    answer: "Vi own answer",
    project: null,
    score: 3,
    user: {
      id: 2,
      email: "danvi@hcmut.edu.vn",
      username: "danvi",
      name: "Dân Vĩ",
      roles: [
        {
          id: 1,
          name: "Student",
          resources: [
            {
              id: 5,
              name: "view_projects",
            },
            {
              id: 6,
              name: "enroll_projects",
            },
          ],
        },
      ],
    },
  },
  {
    id: 29,
    criterionId: 5,
    criterionAssessmentSchemeId: 6,
    criterionAssessmentSchemeVersionId: 1,
    criterionAssessmentSchemeVersionProgramId: 1,
    answer: "Vi in group answer",
    project: {id:2, name:'Developing id2'},
    score: 6,
    user: {
      id: 2,
      email: "danvi@hcmut.edu.vn",
      username: "danvi",
      name: "Dân Vĩ",
      roles: [
        {
          id: 1,
          name: "Student",
          resources: [
            {
              id: 5,
              name: "view_projects",
            },
            {
              id: 6,
              name: "enroll_projects",
            },
          ],
        },
      ],
    },
  },
  {
    id: 26,
    criterionId: 5,
    criterionAssessmentSchemeId: 6,
    criterionAssessmentSchemeVersionId: 1,
    criterionAssessmentSchemeVersionProgramId: 1,
    answer: "Group answer",
    score: 10,
    project: {id:2, name:'Developing id2'},
    user: null,
  },
  {
    id: 24,
    criterionId: 6,
    criterionAssessmentSchemeId: 6,
    criterionAssessmentSchemeVersionId: 1,
    criterionAssessmentSchemeVersionProgramId: 1,
    answer: "C",
    score: 2,
    project: null,
    user: {
      id: 1,
      email: "daonam@hcmut.edu.vn",
      username: "daonam",
      name: "Đào Nam",
      roles: [
        {
          id: 1,
          name: "Student",
          resources: [
            {
              id: 5,
              name: "view_projects",
            },
            {
              id: 6,
              name: "enroll_projects",
            },
          ],
        },
      ],
    },
  },

  {
    id: 33,
    criterionId: 6,
    criterionAssessmentSchemeId: 6,
    criterionAssessmentSchemeVersionId: 1,
    criterionAssessmentSchemeVersionProgramId: 1,
    answer: "B",
    score: 1,
    project: null,
    user: {
      id: 2,
      email: "danvi@hcmut.edu.vn",
      username: "danvi",
      name: "Dân Vĩ",
      roles: [
        {
          id: 1,
          name: "Student",
          resources: [
            {
              id: 5,
              name: "view_projects",
            },
            {
              id: 6,
              name: "enroll_projects",
            },
          ],
        },
      ],
    },
  },
  {
    id: 30,
    criterionId: 6,
    criterionAssessmentSchemeId: 6,
    criterionAssessmentSchemeVersionId: 1,
    criterionAssessmentSchemeVersionProgramId: 1,
    answer: "A",
    score: 0,
    project: {id:2, name:'Developing id2'},
    user: {
      id: 2,
      email: "danvi@hcmut.edu.vn",
      username: "danvi",
      name: "Dân Vĩ",
      roles: [
        {
          id: 1,
          name: "Student",
          resources: [
            {
              id: 5,
              name: "view_projects",
            },
            {
              id: 6,
              name: "enroll_projects",
            },
          ],
        },
      ],
    },
  },
  {
    id: 27,
    criterionId: 6,
    criterionAssessmentSchemeId: 6,
    criterionAssessmentSchemeVersionId: 1,
    criterionAssessmentSchemeVersionProgramId: 1,
    answer: "D",
    score: 4,
    project: {id:2, name:'Developing id2'},
    user: null,
  },

  {
    id: 25,
    criterionId: 7,
    criterionAssessmentSchemeId: 6,
    criterionAssessmentSchemeVersionId: 1,
    criterionAssessmentSchemeVersionProgramId: 1,
    answer: "A",
    score: 0,
    project: null,
    user: {
      id: 1,
      email: "daonam@hcmut.edu.vn",
      username: "daonam",
      name: "Đào Nam",
      roles: [
        {
          id: 1,
          name: "Student",
          resources: [
            {
              id: 5,
              name: "view_projects",
            },
            {
              id: 6,
              name: "enroll_projects",
            },
          ],
        },
      ],
    },
  },
  {
    id: 34,
    criterionId: 7,
    criterionAssessmentSchemeId: 6,
    criterionAssessmentSchemeVersionId: 1,
    criterionAssessmentSchemeVersionProgramId: 1,
    answer: "D",
    score: 0,
    project: null,
    user: {
      id: 2,
      email: "danvi@hcmut.edu.vn",
      username: "danvi",
      name: "Dân Vĩ",
      roles: [
        {
          id: 1,
          name: "Student",
          resources: [
            {
              id: 5,
              name: "view_projects",
            },
            {
              id: 6,
              name: "enroll_projects",
            },
          ],
        },
      ],
    },
  },
  {
    id: 31,
    criterionId: 7,
    criterionAssessmentSchemeId: 6,
    criterionAssessmentSchemeVersionId: 1,
    criterionAssessmentSchemeVersionProgramId: 1,
    answer: "C",
    score: 0,
    project: {id:2, name:'Developing id2'},

    user: {
      id: 2,
      email: "danvi@hcmut.edu.vn",
      username: "danvi",
      name: "Dân Vĩ",
      roles: [
        {
          id: 1,
          name: "Student",
          resources: [
            {
              id: 5,
              name: "view_projects",
            },
            {
              id: 6,
              name: "enroll_projects",
            },
          ],
        },
      ],
    },
  },
  {
    id: 28,
    criterionId: 7,
    criterionAssessmentSchemeId: 6,
    criterionAssessmentSchemeVersionId: 1,
    criterionAssessmentSchemeVersionProgramId: 1,
    answer: "E",
    score: 5,
    project: {id:2, name:'Developing id2'},
    user: null,
  },
];

const mockCriteriaCount = 3;
const criteraColumns: DataTableColumn<MockAssessmentRecords>[] = [];
for (let i = 0; i < mockCriteriaCount; i++) {
  criteraColumns.push({
    accessor: "criterion",
    title: i + 1,
    width: "5%",
    render: (record: MockAssessmentRecords) => record.critera[i].level,
  });
}

const RecordsSection = ({
  schemeObject,
}: {
  schemeObject: AssessSchemeDetail;
}) => {
  const [displayingRecords, setDisplayingRecords] =
    useState<MockAssessmentRecords[]>([]);
  const [searchedRecords, setSearchedRecords] = useState<
    MockAssessmentRecords[]
  >([]);

  const navigate = useNavigate();
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

  function groupBy(data: FetchedCriterionRecord[]) {
    const groups = {};

    data.forEach((item) => {
      let key = "";

      if (item.project && item.user) {
        key = `project-${item.project.id}-user-${item.user.id}`;
      } else if (item.user) {
        key = `user-${item.user.id}`;
      } else if (item.project) {
        key = `project-${item.project.id}`;
      }

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(item);
    });

    return Object.values(groups);
  }

  const groupedData = groupBy(data);
  console.log(groupedData);

  // function handleSearchRecords(searchTerm?: string) {
  //   setPage(1);
  //   if (!searchTerm) searchTerm = searchQuery;
  //   if (searchTerm === "") {
  //     setSearchedRecords([]);
  //     setDisplayingRecords(fetchedRecords);
  //     return;
  //   }

  //   let results = fetchedRecords.filter((record) => {
  //     const { student, project } = record;
  //     return (
  //       student.id.toString().includes(searchTerm) ||
  //       student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       project.id.toString().includes(searchTerm) ||
  //       project.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   });

  //   setDisplayingRecords(results);
  //   setSearchedRecords(results);
  // }

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

  // useEffect(() => {
  //   const from = (page - 1) * pageSize;
  //   const to = from + pageSize;
  //   setDisplayingRecords(
  //     searchedRecords.length > 0
  //       ? searchedRecords.slice(from, to)
  //       : fetchedRecords.slice(from, to),
  //   );
  // }, [page, pageSize]);

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
            <Text size="md">{"need max score for db"}</Text>
          </td>
        </tr>
        <tr>
          <td style={{ verticalAlign: "top" }}>
            <Text size="md" fw={500}>
              Average Score
            </Text>
          </td>
          <td>
            <Text size="md">{"avg calculate from records"}</Text>
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
                // handleSearchRecords();
              }}
            />
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              // handleSearchRecords();
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
              render: (record, index) => {
                return (
                  <Group gap={4} justify="center" wrap="nowrap">
                    <Button
                      variant="transparent"
                      onClick={() =>
                        navigate(`${schemeObject.id}/edit/${record.id}`)
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
              : fetchedRecords.length
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
