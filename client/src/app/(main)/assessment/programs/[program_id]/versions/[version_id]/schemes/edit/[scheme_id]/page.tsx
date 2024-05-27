"use client";
import { PageHeader } from "@/app/_components";
import Program, { PI, SO, Version } from "@/app/interfaces/Program.interface";
import formatDate from "@/app/lib/formatDate";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { useProgram } from "@/app/providers/ProgramProvider";
import { Text, Button, Stepper, Group, ScrollArea } from "@mantine/core";
import React, { useEffect, useState, createContext } from "react";
import AssessmentForm from "./(pages)/AssessmentForm";
import FinalReview from "../../create/(pages)/FinalReview";
import { createFormContext } from "@mantine/form";
import { isNotEmpty } from "@mantine/form";
import {
  Criterion,
  CriterionObject,
  MultipleChoiceCriterion,
  MultipleLevelCriterion,
  WrittenResponseCriterion,
} from "@/app/interfaces/Criterion.interface";
import { toggleNotification } from "@/app/lib/notification";
import useNavigate from "@/app/hooks/useNavigate";
import axios from "axios";
import {
  AssessSchemeDetail,
  FetchedCriterion,
} from "@/app/interfaces/Assessment.interface";
import PIsConfigurationEdit from "./(pages)/PIsConfigurationEdit";
import { useQueryClient } from "@tanstack/react-query";

export const SOsContext_editScheme = createContext<SO[] | null>(null);

export interface AssessmentFormSection {
  name: string;
  generation: string;
  year: string;
  semester: string;
  description: string;
  criteriaCount: number;
  criteria: Criterion[];
}

export const [FormProviderE1, useFormContextE1, useFormE1] =
  createFormContext<AssessmentFormSection>();

export interface SchemeConfigs {
  SOs: SO[];
}

export const [FormProviderE2, useFormContextE2, useFormE2] =
  createFormContext<SchemeConfigs>();

const Page = ({
  params,
}: {
  params: {
    id(id: any): any;
    program_id: string;
    version_id: string;
    scheme_id: string;
  };
}) => {
  // Build context section
  const [program, setProgram] = useState<Program | null>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [SOs, setSOs] = useState<SO[]>([]);
  const [fetchedScheme, setFetchedScheme] = useState<AssessSchemeDetail>();

  const { buildBreadCrumbs } = useBreadCrumbs();
  const { getProgram } = useProgram();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.program_id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(
          (existedVersion) => existedVersion.id == parseInt(params.version_id),
        )[0];
        buildBreadCrumbs(targetProgram, targetVersion);
        setProgram(targetProgram);
        setVersion(targetVersion);
        console.log("Current version:", targetVersion);

        let programDetailsURL = `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${targetProgram.id}/versions/${targetVersion.id}`;
        const response = await axios.get(programDetailsURL);
        const targetSOs = response.data.studentOutcomes;
        console.log("Loaded SOs:", targetSOs);
        setSOs(targetSOs.sort((a: SO, b: SO) => (a.name < b.name ? -1 : 1)));
      }
    };

    if (!program) {
      fetchProgram();
    }
  });

  // retreive scheme data
  useEffect(() => {
    let schemeData: AssessSchemeDetail | undefined = undefined;
    if (queryClient.getQueryData(["schemeDetail"]) != undefined) {
      schemeData = queryClient.getQueryData(["schemeDetail"]);
    } else {
      let queryURL = `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${params.program_id}/versions/${params.version_id}/assessment-schemes/${params.scheme_id}`;
      axios
        .get(queryURL)
        .then((response) => {
          console.log("Fetched scheme:", response.data);
          schemeData = response.data;
        })
        .catch((error) => {
          console.log("Err fetching scheme: ", error.response);
          return;
        });
    }
    if (!schemeData) return;

    setFetchedScheme(schemeData);

    // Map scheme criteria back to criterion objects
    let mappedCriteria: Criterion[] = (
      schemeData as AssessSchemeDetail
    ).criteria.map((fetchedCriterion: FetchedCriterion) => {
      let mappedCriterion = new CriterionObject(
        fetchedCriterion.content,
        fetchedCriterion.type,
      );
      mappedCriterion.setPI(fetchedCriterion.performanceIndicator);
      if (fetchedCriterion.type === "written") {
        (mappedCriterion.assessment as WrittenResponseCriterion).maximumScore =
          fetchedCriterion.levels[0].maxScore;
      } else if (fetchedCriterion.type === "multilevel") {
        fetchedCriterion.levels.forEach((level, index) => {
          if (index > 3)
            (mappedCriterion.assessment as MultipleLevelCriterion).addLevel(
              level.content,
              level.maxScore,
              level.minScore,
            );
          else {
            (mappedCriterion.assessment as MultipleLevelCriterion).options[
              index
            ].description = level.content;
            (mappedCriterion.assessment as MultipleLevelCriterion).options[
              index
            ].minScore = level.minScore;
            (mappedCriterion.assessment as MultipleLevelCriterion).options[
              index
            ].maxScore = level.maxScore;
          }
        });
      } else {
        fetchedCriterion.levels.forEach((level, index) => {
          if (level.maxScore !== 0) {
            (mappedCriterion.assessment as MultipleChoiceCriterion).score =
              level.maxScore;
          }
          if (index > 3)
            (mappedCriterion.assessment as MultipleChoiceCriterion).addLevel(
              level.content,
              level.maxScore !== 0,
            );
          else {
            (mappedCriterion.assessment as MultipleChoiceCriterion).options[
              index
            ].description = level.content;
            (mappedCriterion.assessment as MultipleChoiceCriterion).options[
              index
            ].is_correct = level.maxScore !== 0;
          }
        });
      }
      return mappedCriterion;
    });
    // Initialize scheme's form
    form1.setValues({
      name: schemeData.name,
      generation: schemeData.generation,
      year: schemeData.semester.year.toString(),
      semester: schemeData.semester.no.toString(),
      description: schemeData.description,
      criteriaCount: schemeData.criteria.length,
      criteria: mappedCriteria,
    });
  }, []);

  // Stepper states & controllers
  const [active, setActive] = useState<number>(0); // current step

  const handleStepChange = (step: number) => {
    if (step < active) {
      setActive(step);
      return;
    }

    switch (
      active // Validate current step before changing step
    ) {
      case 0:
        // Validate assessment form
        if (!form1.validate().hasErrors && form1.values.criteriaCount > 0) {
          setActive(step);
        } else {
          toggleNotification(
            "Error",
            form1.values.criteriaCount < 1
              ? "Must have at least 1 criterion"
              : "Check unsatisfied fields",
            "danger",
          );
          console.log("Form 1 errors:", form1.validate().errors);
        }
        break;
      case 1:
        // Validate PI configurations
        if (!form2.validate().hasErrors) {
          setActive(step);
        } else {
          toggleNotification(
            "Error",
            "Check unsatisfied configurations",
            "danger",
          );
        }
        break;
      case 2:
        // No validation needed
        setActive(step);
        break;
    }
  };

  const handleSchemeSubmit = async () => {
    // Map form data to submit scheme's interface
    let schemeData = {
      name: form1.values.name,
      description: form1.values.description,
      generation: form1.values.generation,
      semester: {
        year: form1.values.year,
        no: form1.values.semester,
      },

      // Get criteria list from form1
      criteria: form1.values.criteria.map((criterion) => {
        const { name, description, ...mappedPI } = criterion.associatedPI as PI;

        let mappedLevels: any[] = [];
        if (criterion.type === "multilevel") {
          mappedLevels = (
            criterion.assessment as MultipleLevelCriterion
          ).options.map((option) => {
            return {
              content: option.description,
              maxScore: option.maxScore,
              minScore: option.minScore,
            };
          });
        } else if (criterion.type === "multiplechoice") {
          mappedLevels = (
            criterion.assessment as MultipleChoiceCriterion
          ).options.map((option) => {
            return {
              content: option.description,
              maxScore: option.is_correct
                ? (criterion.assessment as MultipleChoiceCriterion).score
                : 0,
              minScore: option.is_correct
                ? (criterion.assessment as MultipleChoiceCriterion).score
                : 0,
            };
          });
        } else {
          mappedLevels = [
            {
              content: "writtenScore",
              maxScore: (criterion.assessment as WrittenResponseCriterion)
                .maximumScore,
              minScore: 0,
            },
          ];
        }

        return {
          content: criterion.description,
          type: criterion.type,
          performanceIndicator: mappedPI,
          levels: mappedLevels,
        };
      }),

      // Get PIs configurations from form2
      performanceIndicators: form2.values.SOs.map((SO) => {
        return SO.performanceIndicators
          .map((PI) => {
            return {
              performanceIndicator: {
                id: PI.id,
                studentOutcomeId: PI.studentOutcomeId,
                studentOutcomeVersionId: PI.studentOutcomeVersionId,
                studentOutcomeVersionProgramId:
                  PI.studentOutcomeVersionProgramId,
              },
              passingGoal: PI.passingGoal,
            };
          })
          .flat();
      }).flat(),
    };

    console.log("Scheme data:", schemeData);
    // axios
    //   .post(
    //     `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${params.program_id}/versions/${params.version_id}/assessment-schemes`,
    //     schemeData,
    //   )
    //   .then((res) => {
    //     toggleNotification(
    //       "Success",
    //       "The new assessment scheme is created successfully !",
    //       "success",
    //     );
    //     console.log("Created scheme:", res.data);
    //     navigate(
    //       `http://localhost:3000/assessment/programs/${params.program_id}/versions/${params.version_id}/schemes`,
    //     );
    //   })
    //   .catch((err) => {
    //     console.log("Error creating scheme:", err.response);
    //     toggleNotification("Error", "Scheme creation failed !", "danger");
    //   });
  };

  // Forms
  const form1 = useFormE1({
    initialValues: {
      name: "",
      generation: "",
      year: "",
      semester: "1",
      description: "",
      criteriaCount: 0,
      criteria: [],
    },

    validate: {
      name: isNotEmpty("Scheme name required"),
      generation: isNotEmpty("Generation required"),
      year: isNotEmpty("Assess year is required"),
      semester: (value) => (!value ? "Semester required" : null),
      criteria: {
        description: (value) =>
          value === "" ? "Criterion description required" : null,
        associatedPI: (value) => (value === null ? "A PI is required" : null),
        assessment: {
          score: (value) =>
            value !== undefined && value.toString() === ""
              ? "Score is required"
              : null,
          maximumScore: (value) =>
            value !== undefined && value.toString() === ""
              ? "Maximum score is required"
              : null,
          options: {
            description: isNotEmpty("Description required"),
            maxScore: (value) =>
              value !== undefined && value.toString() === ""
                ? "Maximum score is required"
                : null,
            minScore: (value) =>
              value !== undefined && value.toString() === ""
                ? "Minimum score is required"
                : null,
          },
        },
      },
    },
  });

  useEffect(() => {
    // for testing
    console.log("Form1:", form1.values);
  }, [form1]);

  const form2 = useFormE2({
    initialValues: {
      SOs: [],
    },

    validate: {
      SOs: {
        performanceIndicators: {
          passingGoal: (value) =>
            value === undefined || value.toString() === ""
              ? "Passing goal is required"
              : null,
        },
      },
    },
  });

  useEffect(() => {
    // for testing
    console.log("Form2:", form2.values);
  }, [form2]);

  // Main return
  if (!fetchedScheme) return <div>Fetching scheme...</div>;
  return program && version ? (
    <div className="flex h-full flex-col">
      <PageHeader pageTitle="Create Assessment Scheme" />

      <div>
        {/* Contexts section */}
        <div className="flex gap-2">
          <Text size="md" fw={600}>
            Program:
          </Text>
          <Text size="md" fw={400}>
            {program.name}
          </Text>
        </div>
        <div className="flex gap-2">
          <Text size="md" fw={600}>
            Major:
          </Text>
          <Text size="md" fw={400}>
            {program.major}
          </Text>
        </div>
        <div className="flex gap-2">
          <Text size="md" fw={600}>
            Version:
          </Text>
          <Text size="md" fw={400}>
            {version?.name} ({formatDate(version.startDate.toString())} -{" "}
            {formatDate(version.endDate.toString())})
          </Text>
        </div>
      </div>

      <ScrollArea type="auto" offsetScrollbars scrollbarSize={8} mt={4}>
        <Stepper active={active} onStepClick={handleStepChange} size="sm">
          <Stepper.Step
            label="First step"
            description="Create assessment form"
            allowStepSelect={active !== 0}
          >
            <SOsContext_editScheme.Provider value={SOs}>
              <FormProviderE1 form={form1}>
                <AssessmentForm currentVersion={version} />
              </FormProviderE1>
            </SOsContext_editScheme.Provider>
          </Stepper.Step>
          <Stepper.Step
            label="Second step"
            description="Configure PIs"
            allowStepSelect={active !== 1}
          >
            <SOsContext_editScheme.Provider value={SOs}>
              <FormProviderE2 form={form2}>
                <PIsConfigurationEdit
                  form1={form1}
                  form2={form2}
                  schemeObject={fetchedScheme}
                />
              </FormProviderE2>
            </SOsContext_editScheme.Provider>
          </Stepper.Step>
          <Stepper.Step
            label="Final step"
            description="Review scheme"
            allowStepSelect={active !== 2}
          >
            <FinalReview form1={form1} />
          </Stepper.Step>
        </Stepper>

        <Group justify="end" mt="xl">
          {active === 0 ? (
            <Button
              variant="outline"
              onClick={() => {
                navigate("../");
              }}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={() => handleStepChange(active > 0 ? active - 1 : active)}
            >
              Back
            </Button>
          )}

          {active === 2 ? (
            <Button
              onClick={() => {
                console.log("Saving scheme...");
                handleSchemeSubmit();
              }}
            >
              Save Scheme
            </Button>
          ) : (
            <Button
              onClick={() => handleStepChange(active < 2 ? active + 1 : active)}
            >
              Next Step
            </Button>
          )}
        </Group>
      </ScrollArea>
    </div>
  ) : (
    <div>Program not found</div>
  );
};

export default Page;
