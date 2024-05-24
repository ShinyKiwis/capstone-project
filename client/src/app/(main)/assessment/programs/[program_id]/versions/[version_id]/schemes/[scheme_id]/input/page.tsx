"use client";
import {
  NavigationContext,
  PageHeader,
  ProjectSelector,
  StudentProfileSelector,
} from "@/app/_components";
import React, { useEffect, useState } from "react";
import { Accordion, Button, ScrollArea, Table, Text } from "@mantine/core";
import { Version } from "@/app/interfaces/Program.interface";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { useProgram } from "@/app/providers/ProgramProvider";
import Program from "@/app/interfaces/Program.interface";
import CriterionInput from "../(components)/CriteriaInput";
import { CriterionType } from "@/app/interfaces/Criterion.interface";
import { DataTable } from "mantine-datatable";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { AssessSchemeDetail } from "@/app/interfaces/Assessment.interface";
import { useForm } from "@mantine/form";
import { toggleNotification } from "@/app/lib/notification";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Student } from "@/app/interfaces/User.interface";
import useNavigate from "@/app/hooks/useNavigate";

const RecordInput = ({
  params,
}: {
  params: {
    id(id: any): any;
    program_id: string;
    version_id: string;
    scheme_id: string;
  };
}) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [fetchedScheme, setFetchedScheme] = useState<AssessSchemeDetail>();
  const criterionColumns = fetchedScheme
    ? Array.from(
        { length: fetchedScheme.criteria.length },
        (_, index) => index + 1,
      )
    : []; // create array of numbers from 1 to criteria count
  const [targetError, setTargetError] = useState<(string | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  const { buildBreadCrumbs } = useBreadCrumbs();
  const { getProgram } = useProgram();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      rows: [
        {
          userObj: [],
          project: "",
          criteria: [
            {
              criterionId: -1,
              answer: "",
              score: null,
            },
          ],
        },
      ],
    },
    validate: {
      rows: {
        criteria: {
          answer: (value) => (value === "" ? "Required" : null),
          score: (value) =>
            value === null || (value as number).toString() === ""
              ? "Required"
              : null,
        },
      },
    },
  });

  // Log form values
  useEffect(() => {
    console.log("Form values:", form.values);
  }, [form]);

  useEffect(() => {
    // Fetch current program to set context
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.program_id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(
          (existedVersion) => existedVersion.id == parseInt(params.version_id),
        )[0];
        buildBreadCrumbs(targetProgram, targetVersion);
        setProgram(targetProgram);
        setVersion(targetVersion);
      }
    };

    if (!program) {
      fetchProgram();
    }
  });

  useEffect(() => {
    // Retreive scheme data
    if (program && version) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${program.id}/versions/${version.id}/assessment-schemes/${params.scheme_id}`,
        )
        .then((res) => {
          console.log("fetch response", res.data);
          setFetchedScheme(res.data);
          form.setValues({
            rows: [
              {
                userObj: [],
                project: "",
                criteria: (res.data as AssessSchemeDetail).criteria.map(
                  (criterion) => {
                    return {
                      criterionId: criterion.id,
                      answer: "",
                      score: null,
                    };
                  },
                ),
              },
              // {
              //   userObj: [],
              //   project: "",
              //   criteria: (res.data as AssessSchemeDetail).criteria.map(
              //     (criterion) => {
              //       return {
              //         criterionId: criterion.id,
              //         answer: "",
              //         score: null,
              //       };
              //     },
              //   ),
              // },
              // {
              //   userObj: [],
              //   project: "",
              //   criteria: (res.data as AssessSchemeDetail).criteria.map(
              //     (criterion) => {
              //       return {
              //         criterionId: criterion.id,
              //         answer: "",
              //         score: null,
              //       };
              //     },
              //   ),
              // },
              // {
              //   userObj: [],
              //   project: "",
              //   criteria: (res.data as AssessSchemeDetail).criteria.map(
              //     (criterion) => {
              //       return {
              //         criterionId: criterion.id,
              //         answer: "",
              //         score: null,
              //       };
              //     },
              //   ),
              // },
            ],
          });
        })
        .catch((err) => {
          console.log("Err fetching scheme:", err.response);
          return <div>{err.response}</div>;
        });
    }
  }, [program]);

  // Handle submit
  function handleRecordsSubmit() {
    // Validate fields
    let errFlag = false;
    form.values.rows.forEach((row, index) => {
      if (
        row.criteria[0].score != null &&
        row.userObj.length === 0 &&
        row.project === ""
      ) {
        let newErr: (string | undefined)[] = [...targetError];
        newErr[index] = "Target student or project required";
        setTargetError(newErr);
        errFlag = true;
      }
    });
    if (form.validate().hasErrors) {
      toggleNotification("Error", "Check missing fields", "danger");
      console.log('Form errors:',form.validate().errors)
      errFlag = true;
    }
    if (errFlag) return;

    // Extract all answers to submit
    let submittedRecords = {
      records: form.values.rows.map(row => {
        return row.criteria.map(criterion => {
          return {
            criterionId: criterion.criterionId,
            answer: criterion.answer,
            userId: row.userObj.length > 0 ? (JSON.parse(row.userObj[0]) as Student).userId : null,
            score: criterion.score,
            projectId: row.project
          }
        })
      }).flat()
    }

    // Submit records
    console.log("Submitting records:", submittedRecords);
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${program?.id}/versions/${version?.id}/assessment-schemes/${params.scheme_id}/assessment-records`, submittedRecords)
    .then(res => {
      console.log("Submit response", res.data);
      toggleNotification("Success", "Records submitted !", "success");
      navigate('./');
    })
    .catch(err => {
      console.log("Err fetching scheme:", err.response);
      toggleNotification("Error", "Records submission failed !", "danger");
    })
  }

  if (!fetchedScheme) return <div>Fetching scheme data...</div>;
  return (
    <div className="flex h-full w-full min-w-0 flex-col">
      <PageHeader pageTitle="Input Records" />
      {program && version ? (
        <NavigationContext
          program={program}
          version={version}
          schemeName={fetchedScheme.name}
        />
      ) : null}

      <DataTable
        withTableBorder
        withColumnBorders
        pinFirstColumn
        my={"2em"}
        h={"fit-content"}
        records={form.values.rows}
        columns={[
          {
            accessor: "#",
            title: "Assessing target",
            titleStyle: () => ({ paddingLeft: "5.3em" }),
            cellsStyle: () => ({ alignItems: "start" }),
            render: (record: any, index) => (
              <div className="z-50 flex items-center gap-3">
                <Button variant="transparent" c={"red"} px={0} py={0} m={0}>
                  <AiOutlineDelete size={25} />
                </Button>
                <Text c={"gray"}>{index + 1}.</Text>

                <StudentProfileSelector
                  onChange={
                    form.getInputProps(`rows.${index}.userObj`).onChange
                  }
                  value={form.values.rows[index].userObj}
                  error={targetError[index]}
                  placeholder="Search student name, id"
                  searchApi="http://localhost:3500/users/students"
                  limit={7}
                  mode="single"
                  showCard={false}
                />
                <ProjectSelector
                  placeholder="Search project name, id"
                  onChange={
                    form.getInputProps(`rows.${index}.project`).onChange
                  }
                  value={form.values.rows[index].project}
                  error={targetError[index]}
                  showCard={false}
                />
              </div>
            ),
            width: 504,
          },
          ...fetchedScheme.criteria.map((criterion, criterionIdx: number) => {
            return {
              accessor: "#",
              title: `Criterion ${criterionIdx + 1}`,
              with: "fit-content",
              render: (record: any, recIdx: number) => {
                return (
                  <CriterionInput
                    type={criterion.type}
                    variant="minimal"
                    criterionObject={criterion}
                    scoreInputProps={form.getInputProps(
                      `rows.${recIdx}.criteria.${criterionIdx}.score`,
                    )}
                    answerInputProps={form.getInputProps(
                      `rows.${recIdx}.criteria.${criterionIdx}.answer`,
                    )}
                  />
                );
              },
            };
          }),
        ]}
      />
      <Button
        variant="transparent"
        td={"underline"}
        c={"blue"}
        px={0}
        justify="flex-start"
        onClick={() => {
          form.values.rows.push({
            userObj: [],
            project: "",
            criteria: (fetchedScheme as AssessSchemeDetail).criteria.map(
              (criterion) => {
                return {
                  criterionId: criterion.id,
                  answer: "",
                  score: null,
                };
              },
            ),
          });
        }}
        leftSection={<IoIosAddCircleOutline size={25} />}
      >
        Add another record
      </Button>

      <div className="mr-3 flex w-full justify-end gap-4">
        <Button variant="outline" onClick={()=> {
          navigate('./')
        }}>Cancel</Button>
        <Button onClick={handleRecordsSubmit}>Add records</Button>
      </div>
    </div>
  );
};

export default RecordInput;
