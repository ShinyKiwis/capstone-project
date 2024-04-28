"use client";

import { CriterionCard } from "@/app/_components";
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
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const Step1 = () => {
  const [criteria, setCriteria] = useState<CriterionObject[]>([]);
  const [numberOfCriterion, setNumberOfCriterion] = useState<number>(0);

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

  console.log(criteria);

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
            />
            <div className="flex gap-8">
              <NumberInput
                label="Assess time"
                placeholder="Year"
                clampBehavior="strict"
                min={2008}
                max={2014}
                defaultValue={2008}
                required
              />
              <Select
                label=" "
                defaultValue={"1"}
                placeholder="Semester"
                data={["1", "2"]}
              />
            </div>
            <Textarea
              label="Description"
              placeholder="Input assessment scheme description"
              autosize
              minRows={4}
              maxRows={8}
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

          {criteria.map((criterion, index) => (
            <CriterionCard
              key={index+Date.now().toString()}
              criterionObject={criterion}
              criterionNumber={index + 1}
              refreshFunction={() => setCriteria([...criteria])}
              removeFunction={() => {
                setCriteria([...criteria.toSpliced(index, 1)]);
              }}
            />
          ))}

          <Button
            variant="transparent"
            td={"underline"}
            c={"blue"}
            px={0}
            justify="flex-start"
            onClick={() => {
              let newCriterion = new CriterionObject("", "multilevel");
              setCriteria([...criteria, newCriterion]);
              setNumberOfCriterion(numberOfCriterion + 1);
            }}
            leftSection={<IoIosAddCircleOutline size={25} />}
          >
            Add another criterion
          </Button>
          <Button
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
            Refresh
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Step1;

{
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
