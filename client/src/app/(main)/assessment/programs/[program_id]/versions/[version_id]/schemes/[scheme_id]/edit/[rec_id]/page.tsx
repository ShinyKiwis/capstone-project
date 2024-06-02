"use client";
import {
  NavigationContext,
  PageHeader,
  ProjectSelector,
  StudentProfileSelector,
} from "@/app/_components";
import React, { useEffect, useState } from "react";
import { Accordion, Button, NavLink, ScrollArea, Text } from "@mantine/core";
import { Version } from "@/app/interfaces/Program.interface";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { useProgram } from "@/app/providers/ProgramProvider";
import Program from "@/app/interfaces/Program.interface";
import {
  IconChevronRight,
  IconChevronCompactRight,
  IconChevronLeft,
} from "@tabler/icons-react";
import CriterionInput from "../../(components)/CriteriaInput";
import axios from "axios";
import {
  AssessSchemeDetail,
  FetchedCriterionRecord,
} from "@/app/interfaces/Assessment.interface";
import { useForm } from "@mantine/form";
import { InputtedRecord } from "../../input/page";
import useNavigate from "@/app/hooks/useNavigate";
import { toggleNotification } from "@/app/lib/notification";
import { Student } from "@/app/interfaces/User.interface";
import { useQueryClient } from "@tanstack/react-query";

const RecordEdit = ({
  params,
}: {
  params: {
    id(id: any): any;
    program_id: string;
    version_id: string;
    scheme_id: string;
    rec_id: string;
  };
}) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [fetchedScheme, setFetchedScheme] = useState<AssessSchemeDetail>();
  let studentId: string;
  let projectId: string;
  const [answersFetched, setAnswersFetched] = useState(false);

  const { buildBreadCrumbs } = useBreadCrumbs();
  const { getProgram } = useProgram();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Fetch current program to set context
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.program_id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(
          (existedVersion) => existedVersion.id == parseInt(params.version_id),
        )[0];
        buildBreadCrumbs(targetProgram, targetVersion, null, null, {id: params.scheme_id, name: 'Scheme Details'});
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
    let schemeData: AssessSchemeDetail | undefined = undefined;
    if (queryClient.getQueryData(["schemeDetail"]) != undefined) {
      schemeData = queryClient.getQueryData(["schemeDetail"]);
    } else {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${params.program_id}/versions/${params.version_id}/assessment-schemes/${params.scheme_id}`,
        )
        .then((res) => {
          console.log("SCheme detail response", res.data);
          schemeData = res.data;
        })
        .catch((err) => {
          console.log("Err fetching scheme:", err.response);
          return <div>{err.response}</div>;
        });
    }
    setFetchedScheme(schemeData);

    // Fetch answers
    [studentId, projectId] = params.rec_id.split("_p");
    let answersURL = `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${params.program_id}/versions/${params.version_id}/assessment-schemes/${params.scheme_id}/assessment-records?${studentId ? `&userId=${studentId}` : ""}${projectId ? `&projectId=${projectId}` : ""}`;
    // console.log("Fetching answers:", answersURL)
    axios
      .get(answersURL)
      .then((res) => {
        // console.log("Fetched answers", res.data);
        let schemeAnswers = (res.data as FetchedCriterionRecord[]).filter(
          (record) => {
            if (!studentId && record.user === null) return true;
            if (!projectId && record.project === null) return true;
            if (
              record.user &&
              studentId === record.user.id.toString() &&
              record.project &&
              projectId === record.project.code.toString()
            )
              return true;
            return false;
          },
        );
        // setFetchedAnswers(res.data);
        console.log("Filtered records", schemeAnswers);
        form.setValues({
          userObj: studentId
            ? [
                JSON.stringify({
                  user: schemeAnswers[0].user,
                  userId: schemeAnswers[0].user?.id,
                  credits: 0,
                  generation: 0,
                  GPA: 0,
                  enrolledAt: "",
                }),
              ]
            : [],
          project: projectId,
          criteria: schemeAnswers.map((ans) => {
            return {
              ansId: ans.id,
              criterionId: ans.criterionId,
              answer: ans.answer,
              score: ans.score,
            };
          }),
        });
        setAnswersFetched(true);
      })
      .catch((err) => {
        console.log("Err fetching answers:", err);
      });
  }, []);

  interface InputtedEditRecord {
    userObj: string[];
    project: string;
    criteria: {
      ansId: number;
      criterionId: number;
      answer: string;
      score: number | null;
    }[];
  }

  const form = useForm<InputtedEditRecord>({
    initialValues: {
      userObj: [],
      project: "",
      criteria: [],
    },
    validate: {
      userObj: (value, values) =>
        value.length === 0 && values.project === ""
          ? "Select a target student or project"
          : null,
      project: (value, values) =>
        values.userObj.length === 0 && value === ""
          ? "Select a target student or project"
          : null,
      criteria: {
        answer: (value) => (value === "" ? "Required" : null),
        score: (value) =>
          value === null || (value as number).toString() === ""
            ? "Required"
            : null,
      },
    },
  });

  // Logging
  useEffect(() => {
    console.log("Form values:", form.values);
  }, [form]);

  async function handleSaveRecord() {
    // Validate fields
    if (form.validate().hasErrors) {
      toggleNotification("Error", "Check missing fields", "danger");
      console.log("Form errors:", form.validate().errors);
      return;
    }

    // Extract all answers to submit
    let submittedRecords = {
      records: form.values.criteria.map((criterion) => {
        return {
          criterionId: criterion.criterionId,
          answer: criterion.answer,
          userId:
            form.values.userObj.length > 0
              ? (JSON.parse(form.values.userObj[0]) as Student).userId
              : null,
          score: criterion.score,
          projectId: form.values.project || "",
        };
      }),
    };

    // Submit records
    console.log("Submitting records:", submittedRecords);
    axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${params.program_id}/versions/${params.version_id}/assessment-schemes/${params.scheme_id}/assessment-records`,
      submittedRecords,
    )
    .then((res) => {
      console.log("Patch response", res.data);
      // Delete old
    form.values.criteria.forEach((answer) => {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${params.program_id}/versions/${params.version_id}/assessment-schemes/${params.scheme_id}/criteria/${answer.criterionId}/assessment-records/${answer.ansId}`,
        )
        .then((res) => {
          console.log(
            "Deleted answer with record id:",
            answer.ansId,
          );
        });
    });
    queryClient.invalidateQueries({
      queryKey: ["schemeDetail"],
    });
      toggleNotification("Success", "Record saved !", "success");
      navigate(`/assessment/programs/${params.program_id}/versions/${params.version_id}/schemes/${params.scheme_id}`);
    })
    .catch((err) => {
      console.log("Err saving record:", err.response);
      toggleNotification("Error", "Records modifying failed !", "danger");
    });
    
  }

  if (!fetchedScheme) return <div>Fetching scheme's critera...</div>;
  if (!answersFetched) return <div>Fetching record details...</div>;
  return (
    <div className="flex h-full w-full min-w-0 flex-col">
      <PageHeader pageTitle="Edit Assessment Record" />
      {program && version ? (
        <NavigationContext
          program={program}
          version={version}
          schemeName={fetchedScheme.name}
        />
      ) : null}

      {/* <div className="flex justify-between">
        <NavLink
          href={`${parseInt(params.rec_id) - 1}`}
          label="Previous Record"
          td={"underline"}
          c={"blue"}
          leftSection={
            <IconChevronLeft
              size="0.8rem"
              stroke={1.5}
              className="mantine-rotate-rtl"
            />
          }
        />
        <NavLink
          href={`/assessment/programs/${params.program_id}/versions/${params.version_id}/schemes/${params.scheme_id}`}
          label="Back to scheme details"
          td={"underline"}
          c={"blue"}
          ta={"center"}
        />
        <NavLink
          href={`${parseInt(params.rec_id) + 1}`}
          label="Next Record"
          td={"underline"}
          c={"blue"}
          ta={"right"}
          rightSection={
            <IconChevronRight
              size="0.8rem"
              stroke={1.5}
              className="mantine-rotate-rtl"
            />
          }
        />
      </div> */}

      <ScrollArea type="auto" scrollbarSize={8} className="flex min-w-0 flex-1">
        <div className="flex items-start">
          <div className="w-1/2 py-2 pr-3">
            <Text size="lg" fw={600}>
              Student
            </Text>
            <StudentProfileSelector
              onChange={form.getInputProps("userObj").onChange}
              value={form.getInputProps("userObj").value}
              error={form.getInputProps("userObj").error}
              // onChange={setselectedStudent}
              // value={selectedStudent}
              placeholder="Search student name, id"
              searchApi="http://localhost:3500/users/students"
              limit={7}
              mode="single"
            />
          </div>
          <div className="w-1/2 py-2 pr-3">
            <Text size="lg" fw={600}>
              Project
            </Text>
            <ProjectSelector
              placeholder="Search project name, id, description"
              showCard
              value={form.getInputProps("project").value}
              onChange={form.getInputProps("project").onChange}
              error={form.getInputProps("project").error}
            />
          </div>
        </div>

        <Text size="lg" fw={600} mt={"1em"}>
          Criteria
        </Text>
        <div className="px-3">
          {fetchedScheme.criteria.map((criterion, index) => {
            return (
              <div className="my-3 flex items-start">
                <Text size="xl" fw={600} w={"2em"}>
                  {index + 1}
                </Text>
                <CriterionInput
                  type={criterion.type}
                  variant="full"
                  criterionObject={criterion}
                  scoreInputProps={form.getInputProps(
                    `criteria.${index}.score`,
                  )}
                  answerInputProps={form.getInputProps(
                    `criteria.${index}.answer`,
                  )}
                />
              </div>
            );
          })}
        </div>

        <div className="mb-3 mr-3 flex w-full justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => {
              navigate("../");
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSaveRecord}>Save</Button>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecordEdit;
