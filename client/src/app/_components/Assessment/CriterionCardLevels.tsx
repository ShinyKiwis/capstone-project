import {
  Criterion,
  WrittenResponseCriterion,
  MultipleChoiceCriterion,
  MultipleLevelCriterion,
} from "@/app/interfaces/Criterion.interface";
import { Button, Textarea, NumberInput, Radio, Text } from "@mantine/core";
import { useState } from "react";
import {
  IoIosRemoveCircleOutline,
  IoIosAddCircleOutline,
} from "react-icons/io";

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

const WrittenCardLevels = ({
  criterionObject,
}: {
  criterionObject: Criterion;
}) => {
  const [maxScore, setMaxScore] = useState(
    (criterionObject.assessment as WrittenResponseCriterion).maximumScore,
  );

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
        onChange={(newValue) => {
          (
            criterionObject.assessment as WrittenResponseCriterion
          ).maximumScore = newValue as number;
          setMaxScore(newValue as number);
        }}
        value={maxScore}
      />
    </div>
  );
};

interface CriterionCardLevelsProps {
  criterionObject: Criterion;
  criterionNumber: number;
  refreshFunction: () => void;
}

const CriterionCardLevels = ({
  criterionObject,
  criterionNumber,
  refreshFunction,
}: CriterionCardLevelsProps) => {
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
              (criterionObject.assessment as MultipleLevelCriterion).addLevel();
              refreshFunction();
            }}
            leftSection={<IoIosAddCircleOutline size={25} />}
          >
            Add another level
          </Button>
        </div>
      );

    case "written":
      return <WrittenCardLevels criterionObject={criterionObject} />;

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
              (
                criterionObject.assessment as MultipleChoiceCriterion
              ).changeSelection(value);
            }}
            value={(
              criterionObject.assessment as MultipleChoiceCriterion
            ).getValue()}
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
              (
                criterionObject.assessment as MultipleChoiceCriterion
              ).addLevel();
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

export default CriterionCardLevels;
