import {
  Criterion,
  CriterionObject,
  CriterionType,
  MultipleChoiceCriterion,
  MultipleLevelCriterion,
} from "@/app/interfaces/Criterion.interface";
import {
  Card,
  Group,
  Text,
  Container,
  Button,
  Textarea,
  Stack,
  Divider,
  Select,
  NumberInput,
  Radio,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";

interface CriterionCardProps {
  criterionObject: CriterionObject;
  criterionNumber: number;
  refreshFunction: () => void;
  removeFunction: () => void;
}

interface LevelCardProps {
  levelLabel: string;
  type: "multilevel" | "multiplechoice";
}

const LevelCard = ({ levelLabel, type }: LevelCardProps) => {
  return (
    <div className="flex w-full flex-col gap-1 rounded-sm border-2 bg-white px-3 py-4">
      <div className="flex w-full justify-between align-top">
        <Text size="sm" td="underline" fw={500}>
          Level {levelLabel}
        </Text>
        <Button variant="transparent" c={"red"} px={0} py={0}>
          <IoIosRemoveCircleOutline size={25} />
        </Button>
      </div>

      <div className="flex flex-col gap-2 px-3">
        <Textarea
          label="Description"
          placeholder="Input level description"
          autosize
          minRows={1}
          maxRows={3}
        />

        {type === "multilevel" ? (
          <div className="flex gap-8">
            <NumberInput
              label="Score range"
              placeholder="From"
              clampBehavior="strict"
              min={0}
              max={9999}
              required
            />
            <NumberInput
              label=" "
              placeholder="To"
              clampBehavior="strict"
              min={0}
              max={9999}
              required
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

interface LevelCardBodyProps {
  criterionObject: Criterion;
  criterionNumber: number;
  refreshFunction: () => void;
}

const LevelCardBody = ({
  criterionObject,
  criterionNumber,
  refreshFunction,
}: LevelCardBodyProps) => {

  switch (criterionObject.type) {
    case "multilevel":
      return (
        <div className="flex flex-col gap-2">
          {(criterionObject.assessment as MultipleLevelCriterion).options.map(
            (level) => {
              return (
                <LevelCard levelLabel={level.levelLabel} type="multilevel" />
              );
            },
          )}
          <Button
            variant="transparent"
            td={"underline"}
            c={"blue"}
            px={0}
            justify="flex-start"
            onClick={() => {
              criterionObject.addLevel();
              refreshFunction();
            }}
            leftSection={<IoIosAddCircleOutline size={25} />}
          >
            Add another level
          </Button>
        </div>
      );

    case "written":
      return (
        <div>
          <NumberInput
            label="Maximum Score"
            placeholder="Number"
            clampBehavior="strict"
            min={0}
            max={9999}
            defaultValue={3}
            required
          />
        </div>
      );

    case "multiplechoice":
      return (
        <div className="flex flex-col gap-2">
          <NumberInput
            label="Score"
            placeholder="Numbwe"
            clampBehavior="strict"
            min={0}
            max={9999}
            defaultValue={3}
            required
          />

          <Radio.Group
            name={`choice_${criterionNumber}`}
            label="Choose correct selection"
            onChange={(value) => {
              criterionObject.changeSelection(value);
            }}
            value={(criterionObject.assessment as MultipleChoiceCriterion).getValue()}
            required
          >
            <div className="flex flex-col gap-2">
              {(
                criterionObject.assessment as MultipleChoiceCriterion
              ).options.map((level) => {
                return (
                  <div className="flex items-start gap-3">
                    <Radio
                      value={level.levelLabel}
                      checked={level.is_correct}
                    />
                    <LevelCard
                      levelLabel={level.levelLabel}
                      type="multiplechoice"
                    />
                  </div>
                );
              })}
            </div>
          </Radio.Group>

          <Button
            variant="transparent"
            td={"underline"}
            c={"blue"}
            px={0}
            justify="flex-start"
            onClick={() => {
              criterionObject.addLevel();
              refreshFunction();
            }}
            leftSection={<IoIosAddCircleOutline size={25} />}
          >
            Add another level
          </Button>
        </div>
      );
  }
  return <>cannot switch type{}</>;
};

const CriterionCard = ({
  criterionObject,
  criterionNumber,
  refreshFunction,
  removeFunction,
}: CriterionCardProps) => {
  return (
    <div className="flex w-full flex-col rounded-md bg-gray-100 py-4 pl-6 pr-4">
      <div className="flex w-full justify-between align-top">
        <Text size="md" td="underline" fw={700}>
          Criterion {criterionNumber}
        </Text>
        <Button
          variant="transparent"
          c={"red"}
          px={0}
          py={0}
          onClick={() => {
            removeFunction();
          }}
        >
          <IoIosRemoveCircleOutline size={25} />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <Textarea
          label="Description"
          placeholder="Input assessment scheme description"
          autosize
          minRows={4}
          maxRows={8}
          required
        />
        <div>
          <Text size="sm" fw={500}>
            Corresponding PI
          </Text>
          <Button
            variant="transparent"
            td={"underline"}
            c={"blue"}
            px={0}
            onClick={() => {}}
          >
            Select a PI for this criterion
          </Button>
        </div>
      </div>

      <Divider my="md" color="gray" />

      <div>
        <div className="flex items-center gap-4 pb-4">
          <Text size="sm" fw={500}>
            Assessment Method
          </Text>
          <Select
            value={criterionObject.type}
            data={[
              { label: "Multiple Levels", value: "multilevel" },
              { label: "Written Response", value: "written" },
              { label: "Multiple Choice", value: "multiplechoice" },
            ]}
            onChange={(value) => {
              criterionObject.changeType(value as CriterionType);
              refreshFunction();
            }}
          />
          <Text size="xs" fw={400} c="red">
            *Levels configurations will be discarded upon method change
          </Text>
        </div>

        <LevelCardBody
          criterionObject={criterionObject}
          criterionNumber={criterionNumber}
          refreshFunction={refreshFunction}
        />
      </div>
    </div>
  );
};

export default CriterionCard;
