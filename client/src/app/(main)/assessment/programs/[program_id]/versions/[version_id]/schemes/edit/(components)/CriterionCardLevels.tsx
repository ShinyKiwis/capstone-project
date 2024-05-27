import { AssessmentFormSection } from "@/app/(main)/assessment/programs/[program_id]/versions/[version_id]/schemes/create/page";
import {
  Criterion,
  WrittenResponseCriterion,
  MultipleChoiceCriterion,
  MultipleLevelCriterion,
  MultiLevelOption,
  MultipleChoiceOption,
  level_indexMapping,
} from "@/app/interfaces/Criterion.interface";
import { Button, Textarea, NumberInput, Radio, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useFormContextE1 } from "../[scheme_id]/page";
import {
  IoIosRemoveCircleOutline,
  IoIosAddCircleOutline,
} from "react-icons/io";


interface LevelCardProps {
  levelObject: MultiLevelOption | MultipleChoiceOption;
  type: "multilevel" | "multiplechoice";
  removeFunction: () => void;
  levelsCount: number;
  parentCriterionNum: number;
}

const LevelCard = ({
  levelObject,
  type,
  removeFunction,
  levelsCount,
  parentCriterionNum
}: LevelCardProps) => {
  const [desc, setDesc] = useState(levelObject.description);
  const [minScore, setMinScore] = useState(
    (levelObject as MultiLevelOption) &&
      (levelObject as MultiLevelOption).minScore,
  );
  const [maxScore, setMaxScore] = useState(
    (levelObject as MultiLevelOption) &&
      (levelObject as MultiLevelOption).maxScore,
  );
  const form = useFormContextE1();

  return (
    <div className="flex w-full flex-col gap-1 rounded-sm border-2 bg-white px-3 py-4">
      <div className="flex w-full justify-between align-top">
        <Text size="sm" td="underline" fw={500}>
          Level {levelObject.levelLabel}
        </Text>
        {levelsCount <= 4 ? null : (
          <Button
            variant="transparent"
            c={"red"}
            px={0}
            py={0}
            onClick={removeFunction}
          >
            <IoIosRemoveCircleOutline size={25} />
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-2 px-3">
        <Textarea
          label="Description"
          placeholder="Input level description"
          autosize
          minRows={1}
          maxRows={3}
          value={desc}
          onChange={(e) => {
            levelObject.description = e.currentTarget.value;
            setDesc(e.currentTarget.value);
          }}
          required
          error = {form.getInputProps(`criteria.${parentCriterionNum-1}.assessment.options.${level_indexMapping[levelObject.levelLabel]}.description`).error}
        />

        {type === "multilevel" ? (
          <div className="flex gap-8">
            <NumberInput
              label="Minimum score"
              placeholder="From"
              clampBehavior="strict"
              min={0}
              max={9999}
              required
              value={minScore}
              onChange={(newVal) => {
                (levelObject as MultiLevelOption).minScore = newVal as number;
                setMinScore(newVal as number);
              }}
              error = {form.getInputProps(`criteria.${parentCriterionNum-1}.assessment.options.${level_indexMapping[levelObject.levelLabel]}.minScore`).error}
            />
            <NumberInput
              label="Maximum Score"
              placeholder="To"
              clampBehavior="strict"
              min={0}
              max={9999}
              required
              value={maxScore}
              onChange={(newVal) => {
                (levelObject as MultiLevelOption).maxScore = newVal as number;
                setMaxScore(newVal as number);
              }}
              error = {form.getInputProps(`criteria.${parentCriterionNum-1}.assessment.options.${level_indexMapping[levelObject.levelLabel]}.maxScore`).error}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const MultiLevelCardLevels = ({
  criterionObject,
  updateLevels,
  criterionNum,
}: {
  criterionObject: Criterion;
  updateLevels: () => void;
  criterionNum: number;
}) => {

  return (
    <div className="flex flex-col gap-2">
      {(criterionObject.assessment as MultipleLevelCriterion).options.map(
        (level) => {
          return (
            <LevelCard
              key={level.levelLabel + Date.now().toString()}
              levelObject={level}
              type="multilevel"
              levelsCount={
                (criterionObject.assessment as MultipleLevelCriterion)
                  .numberOfLevels
              }
              removeFunction={() => {
                (
                  criterionObject.assessment as MultipleLevelCriterion
                ).removeLevel(level.levelLabel);
                updateLevels();
              }}
              parentCriterionNum = {criterionNum}
            />
          );
        },
      )}
      {(criterionObject.assessment as MultipleLevelCriterion).numberOfLevels >=
      5 ? null : (
        <Button
          variant="transparent"
          td={"underline"}
          c={"blue"}
          px={0}
          justify="flex-start"
          onClick={() => {
            (criterionObject.assessment as MultipleLevelCriterion).addLevel();
            updateLevels();
          }}
          leftSection={<IoIosAddCircleOutline size={25} />}
        >
          Add another level
        </Button>
      )}
    </div>
  );
};

const MultipleChoiceCardLevels = ({
  criterionObject,
  updateLevels,
  criterionNum,
}: {
  criterionObject: Criterion;
  updateLevels: () => void;
  criterionNum: number;
}) => {
  const [score, setScore] = useState(
    (criterionObject.assessment as MultipleChoiceCriterion).score,
  );
  const [selectedOption, setSelectedOption] = useState(
    (criterionObject.assessment as MultipleChoiceCriterion).getValue(),
  );
  const form = useFormContextE1();

  return (
    <div className="flex flex-col gap-2">
      <NumberInput
        label="Score"
        placeholder="Number"
        clampBehavior="strict"
        min={0}
        max={9999}
        defaultValue={3}
        required
        value={score}
        onChange={(value) => {
          (criterionObject.assessment as MultipleChoiceCriterion).score = value as number;
          setScore(value as number);
        }}
        error = {form.getInputProps(`criteria.${criterionNum-1}.assessment.score`).error}
      />

      <Radio.Group
        name={`choice_${criterionObject.type}_${Date.now()}`}
        label="Choose correct selection"
        onChange={(value) => {
          (
            criterionObject.assessment as MultipleChoiceCriterion
          ).changeSelection(value);
          setSelectedOption(value);
        }}
        value={selectedOption}
        required
      >
        <div className="flex flex-col gap-2">
          {(criterionObject.assessment as MultipleChoiceCriterion).options.map(
            (level) => {
              return (
                <div className="flex items-start gap-3">
                  <Radio value={level.levelLabel} checked={level.is_correct} />
                  <LevelCard
                    key={level.levelLabel + Date.now().toString()}
                    levelObject={level}
                    type="multiplechoice"
                    levelsCount={
                      (criterionObject.assessment as MultipleChoiceCriterion)
                        .numberOfLevels
                    }
                    removeFunction={() => {
                      if (selectedOption === level.levelLabel)
                        setSelectedOption("");
                      (
                        criterionObject.assessment as MultipleChoiceCriterion
                      ).removeLevel(level.levelLabel);
                      updateLevels();
                    }}
                    parentCriterionNum={criterionNum}
                  />
                </div>
              );
            },
          )}
        </div>
      </Radio.Group>

      {(criterionObject.assessment as MultipleChoiceCriterion).numberOfLevels >=
      5 ? null : (
        <Button
          variant="transparent"
          td={"underline"}
          c={"blue"}
          px={0}
          justify="flex-start"
          onClick={() => {
            (criterionObject.assessment as MultipleChoiceCriterion).addLevel();
            updateLevels();
          }}
          leftSection={<IoIosAddCircleOutline size={25} />}
        >
          Add another level
        </Button>
      )}
    </div>
  );
};

const WrittenCardLevels = ({
  criterionObject,
  criterionNum
}: {
  criterionObject: Criterion;
  criterionNum: number;
}) => {
  const form = useFormContextE1();
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
        error = {form.getInputProps(`criteria.${criterionNum-1}.assessment.maximumScore`).error}
      />
    </div>
  );
};

interface CriterionCardLevelsProps {
  criterionObject: Criterion;
  criterionNumber: number;
  refreshFunction: () => void;
  parentCriterionNum: number;
}

const CriterionCardLevels = ({
  criterionObject,
  refreshFunction,
  parentCriterionNum
}: CriterionCardLevelsProps) => {
  const [renderingCriterion, setRenderingCriterion] =
    useState<Criterion>(criterionObject);
  const updateLevels = () => {
    setRenderingCriterion({ ...renderingCriterion });
  };

  switch (criterionObject.type) {
    case "multilevel":
      return (
        <MultiLevelCardLevels
          criterionObject={renderingCriterion}
          updateLevels={updateLevels}
          criterionNum = {parentCriterionNum}
        />
      );

    case "written":
      return <WrittenCardLevels criterionObject={renderingCriterion} criterionNum = {parentCriterionNum}/>;

    case "multiplechoice":
      return (
        <MultipleChoiceCardLevels
          criterionObject={criterionObject}
          updateLevels={updateLevels}
          criterionNum = {parentCriterionNum}
        />
      );
  }
  return <>cannot switch type{}</>;
};

export default CriterionCardLevels;
