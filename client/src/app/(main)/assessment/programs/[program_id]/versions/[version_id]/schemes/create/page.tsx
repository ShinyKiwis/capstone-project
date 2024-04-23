"use client";
import { PageHeader } from "@/app/_components";
import MultipleLevelCriterion from "@/app/_components/Criterion/MultipleLevelCriterion";
import { Criterion } from "@/app/interfaces/Criterion.interface";
import { Accordion, NumberInput, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [criteria, setCriteria] = useState<Criterion[]>([])
  const [numberOfCriterion, setNumberOfCriterion] = useState<string | number>(1)
  const generateCriterion = () => {
    const generatedCriteria: Criterion[] = []
    Array.from({length: +numberOfCriterion}).forEach(_ => {
      generatedCriteria.push({
        description: "",
        associatedPI: null,
        assessment: {
          type: "MultipleLevelCriterion",
          numberOfLevels: 1,
          options: [
            {
              level: "A",
              description: "",
              minScore: 0,
              maxScore: 10,
            }
          ]
        }
      })
      setCriteria(generatedCriteria)
    })
  }

  useEffect(() => {
    generateCriterion();
  }, [numberOfCriterion])

  console.log(criteria)
  return (
    <>
      <PageHeader pageTitle="Create Assessment Scheme" />
      <div className="flex h-[90%] flex-col gap-3 overflow-auto">
        <Text size="xl" fw={600}>Criteria</Text>
        <NumberInput 
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
              switch(criterion.assessment.type) {
                case "MultipleLevelCriterion":
                  return <MultipleLevelCriterion criterion={criterion} order={idx}/>
              }
            })}
          </div>
        </Accordion>
      </div>
    </>
  );
};

export default Page;
