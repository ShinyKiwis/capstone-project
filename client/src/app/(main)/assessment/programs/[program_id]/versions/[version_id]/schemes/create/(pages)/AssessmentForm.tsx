"use client";

import CriterionCard from "../(components)/CriterionCard";
import MultipleLevelCriterion from "@/app/_components/Criterion/MultipleLevelCriterion";
import {
  Criterion,
  CriterionObject,
} from "@/app/interfaces/Criterion.interface";
import {
  Accordion,
  Button,
  NumberInput,
  ScrollArea,
  Select,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AssessmentFormSection } from "../page";
import { useFormContext1 } from "../page";
import { Version } from "@/app/interfaces/Program.interface";

interface AssessmentFormProps {
  currentVersion: Version;
}

const AssessmentForm = ({ currentVersion }: AssessmentFormProps) => {
  let versionYears = Array.from(
    {
      length:
        new Date(currentVersion.endDate).getFullYear() -
        new Date(currentVersion.startDate).getFullYear() + 1,
    },
    (_, i) =>
      new Date(currentVersion.startDate).getFullYear() + i,
  ).map((yearNum) => yearNum.toString())
 
  const form = useFormContext1();

  return (
    <ScrollArea type="auto" scrollbarSize={8} className="flex-1">
      <div className="flex flex-col gap-6">
        <div>
          <Text size="xl" fw={600}>
            General
          </Text>

          <div className="flex flex-col gap-4 pl-4">
            <TextInput
              label="Scheme Name"
              placeholder="Input name of the assessment scheme"
              required
              {...form.getInputProps("name")}
            />
            <div className="flex gap-8">
              <Select
                label="Generation"
                placeholder="Generation"
                data={versionYears}
                required
                {...form.getInputProps("generation")}
              />
              <Select
                label="Year"
                placeholder="Assess Year"
                data={versionYears}
                required
                {...form.getInputProps("year")}
              />
              <Select
                label="Assess semester"
                placeholder="Semester"
                data={["1", "2"]}
                required
                {...form.getInputProps("semester")}
              />
            </div>
            <Textarea
              label="Description"
              placeholder="Input assessment scheme description"
              autosize
              minRows={4}
              maxRows={8}
              {...form.getInputProps("description")}
            />
            {/* <Select
              label="Assessment type"
              defaultValue={"i"}
              placeholder="Semester"
              data={[
                { label: "Individual", value: "i" },
                { label: "Group", value: "g" },
                { label: "Individual within group", value: "ig" },
              ]}
            /> */}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Text size="xl" fw={600}>
            Criteria
          </Text>

          {form.values.criteria.map((criterion, index) => (
            <CriterionCard
              key={index + Date.now().toString()}
              criterionObject={criterion}
              criterionNumber={index + 1}
              refreshFunction={() =>
                form.setFieldValue("criteria", [...form.values.criteria])
              }
              removeFunction={() => {
                form.setFieldValue("criteria", [
                  ...form.values.criteria.toSpliced(index, 1),
                ]);
                form.values.criteriaCount -= 1;
              }}
              form={form}
            />
          ))}

          <Button
            variant="transparent"
            td={"underline"}
            c={"blue"}
            px={0}
            justify="flex-start"
            onClick={() => {
              let newCriterion = new CriterionObject("", "written");
              form.setFieldValue("criteria", [
                ...form.values.criteria,
                newCriterion,
              ]);
              form.values.criteriaCount += 1;
            }}
            leftSection={<IoIosAddCircleOutline size={25} />}
          >
            Add another criterion
          </Button>

          {/* <Button
            variant="transparent"
            c={"red"}
            px={0}
            justify="flex-start"
            onClick={() => {
              setCriteria([...criteria]);
              console.log(criteria);
            }}
            leftSection={<IoIosAddCircleOutline size={25} />}
          >
            [Debug] Refresh criteria
          </Button> */}
        </div>
      </div>
    </ScrollArea>
  );
};

export default AssessmentForm;

{
 // const generateCriterion = () => {
  //   const generatedCriteria: Criterion[] = [];
  //   Array.from({ length: +numberOfCriterion }).forEach((_) => {
  //     generatedCriteria.push({
  //       description: "",
  //       associatedPI: null,
  //       assessment: {
  //         type: "MultipleLevelCriterion",
  //         numberOfLevels: 1,
  //         options: [
  //           {
  //             level: "A",
  //             description: "",
  //             minScore: 0,
  //             maxScore: 10,
  //           },
  //         ],
  //       },
  //     });
  //     setCriteria(generatedCriteria);
  //   });
  // };

  // useEffect(() => {
  //   generateCriterion();
  // }, [numberOfCriterion]);


  /* <NumberInput
					label="Number of criterion"
					placeholder="Number of criterion"
					value={numberOfCriterion}
					onChange={setNumberOfCriterion}
					className="w-1/6"
					min={0}
				/>
				<Accordion variant="contained">
					<div className="flex flex-col gap-4">
						{criteria.map((criterion, idx) => {
							switch (criterion.assessment.type) {
								case "MultipleLevelCriterion":
									return (
										<MultipleLevelCriterion criterion={criterion} order={idx} />
									);
							}
						})}
					</div>
				</Accordion> */
}
