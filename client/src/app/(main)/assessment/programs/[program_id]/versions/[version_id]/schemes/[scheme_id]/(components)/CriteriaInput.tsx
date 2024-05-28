import { FetchedCriterion } from "@/app/interfaces/Assessment.interface";
import {
  MultipleLevelCriterion,
  index_levelMapping,
  level_indexMapping,
} from "@/app/interfaces/Criterion.interface";
import {
  NumberInput,
  Select,
  TextInput,
  Text,
  Divider,
  Textarea,
} from "@mantine/core";

interface FormInputPropsHandlers {
  value?: any;
  onChange?: any;
  error?: string | undefined;
  onFocus?: any;
  onBlur?: any;
}

interface CriterionInputProps {
  type: "multilevel" | "written" | "multiplechoice";
  variant: "minimal" | "full";
  criterionObject: FetchedCriterion;
  scoreInputProps: FormInputPropsHandlers;
  answerInputProps: FormInputPropsHandlers;
}

const MultilevelInput = ({
  variant,
  criterionObject,
  scoreInputProps,
  answerInputProps,
}: {
  variant: "minimal" | "full";
  criterionObject: FetchedCriterion;
  scoreInputProps: FormInputPropsHandlers;
  answerInputProps: FormInputPropsHandlers;
}) => {
  let levelsMaxScore = 0;
  if (criterionObject.levels.length > 4)
    levelsMaxScore =
      criterionObject.levels[3].maxScore > criterionObject.levels[4].maxScore
        ? criterionObject.levels[3].maxScore
        : criterionObject.levels[4].maxScore;
  else levelsMaxScore = criterionObject.levels[3].maxScore;

  if (variant === "minimal")
    return (
      <NumberInput
        placeholder="Score"
        min={0}
        max={levelsMaxScore}
        allowNegative={false}
        allowDecimal={false}
        w={"6em"}
        className="relative z-0"
        {...scoreInputProps}
        onChange={(newVal) => {
          scoreInputProps.onChange(newVal);
          if (newVal.toString() !== "") {
            let matchingIdx = criterionObject.levels.findIndex(
              (level) =>
                (newVal as number) >= level.minScore &&
                (newVal as number) <= level.maxScore,
            );
            let newLevel = index_levelMapping[matchingIdx];
            answerInputProps.onChange(newLevel);
          } else answerInputProps.onChange("");
        }}
      />
    );

  return (
    <div className="flex w-full justify-start rounded-md border-2 border-gray-200 px-3 py-3">
      <div className="flex flex-1 flex-col gap-3">
        <Text size={"md"} fw={500}>
          {criterionObject.content}
        </Text>
        <div className="flex flex-col gap-1 px-2">
          {criterionObject.levels.map((level, index) => {
            return (
              <div className="flex items-start gap-2">
                <div className="flex items-start gap-2">
                  <Text fw={600}>{index_levelMapping[index]}.</Text>
                  <Text size="sm">{level.content}</Text>
                </div>
                <Text fw={600} c={"gray"} size="sm">
                  ({level.minScore} - {level.maxScore})
                </Text>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Text size={"md"} fw={500}>
            PI:
          </Text>
          <Text>{criterionObject.performanceIndicator.name} - {criterionObject.performanceIndicator.description}</Text>
        </div>
      </div>
      <Divider size="sm" orientation="vertical" />
      <div className="w-1/5 px-3">
        <Text size={"md"} fw={500}>
          Assessment
        </Text>
        <div className="flex gap-2">
          <Text>Maximum score:</Text> <Text fw={600}>{levelsMaxScore}</Text>
        </div>
        <NumberInput
          label="Achieved Score"
          placeholder="Number"
          min={0}
          max={levelsMaxScore}
          allowNegative={false}
          allowDecimal={false}
          className="relative z-0"
          {...scoreInputProps}
          onChange={(newVal) => {
            scoreInputProps.onChange(newVal);
            if (newVal.toString() !== "") {
              let matchingIdx = criterionObject.levels.findIndex(
                (level) =>
                  (newVal as number) >= level.minScore &&
                  (newVal as number) <= level.maxScore,
              );
              let newLevel = index_levelMapping[matchingIdx];
              answerInputProps.onChange(newLevel);
            } else answerInputProps.onChange("");
          }}
        />
      </div>
    </div>
  );
};

const WrittenInput = ({
  variant,
  criterionObject,
  answerInputProps,
  scoreInputProps,
}: {
  variant: "minimal" | "full";
  criterionObject: FetchedCriterion;
  answerInputProps: FormInputPropsHandlers;
  scoreInputProps: FormInputPropsHandlers;
}) => {
  if (variant === "minimal")
    return (
      <div className="flex w-full flex-col gap-2">
        <TextInput
          placeholder="Written response"
          miw={"10em"}
          {...answerInputProps}
        />
        <NumberInput
          placeholder="Score"
          min={0}
          max={criterionObject.levels[0].maxScore}
          allowNegative={false}
          allowDecimal={false}
          w={"6em"}
          className="relative z-0"
          {...scoreInputProps}
        />
      </div>
    );

  return (
    <div className="flex w-full justify-start rounded-md border-2 border-gray-200 px-3 py-3">
      <div className="mr-3 flex flex-1 flex-col gap-3">
        <Text size={"md"} fw={500}>
          {criterionObject.content}
        </Text>
        <Textarea
          placeholder="Written response"
          autosize
          minRows={2}
          maxRows={4}
          {...answerInputProps}
        />
        <div className="flex gap-2">
          <Text size={"md"} fw={500}>
            PI:
          </Text>
          <Text>
            {criterionObject.performanceIndicator.name} -{" "}
            {criterionObject.performanceIndicator.description}
          </Text>
        </div>
      </div>
      <Divider size="sm" orientation="vertical" />
      <div className="w-1/5 px-3">
        <Text size={"md"} fw={500}>
          Assessment
        </Text>
        <div className="flex gap-2">
          <Text>Maximum Score:</Text>{" "}
          <Text fw={600}>{criterionObject.levels[0].maxScore}</Text>
        </div>
        <NumberInput
          label="Achieved Score"
          placeholder="Number"
          min={0}
          max={criterionObject.levels[0].maxScore}
          allowNegative={false}
          allowDecimal={false}
          className="relative z-0"
          {...scoreInputProps}
        />
      </div>
    </div>
  );
};

const MultipleChoiceInput = ({
  variant,
  criterionObject,
  scoreInputProps,
  answerInputProps,
}: {
  variant: "minimal" | "full";
  criterionObject: FetchedCriterion;
  answerInputProps: FormInputPropsHandlers;
  scoreInputProps: FormInputPropsHandlers;
}) => {
  let fullScore = criterionObject.levels.find((level) => level.maxScore !== 0 )?.maxScore || 0;

  if (variant === "minimal")
    return (
      <Select
        placeholder="Select answer"
        data={
          criterionObject.levels.length === 5
            ? ["A", "B", "C", "D", "E"]
            : ["A", "B", "C", "D"]
        }
        w={"6em"}
        className="relative z-0"
        {...answerInputProps}
        onChange={(newVal) => {
          answerInputProps.onChange(newVal);
          if (newVal) {
            let achievedScore =
              criterionObject.levels[level_indexMapping[newVal]].maxScore;
            scoreInputProps.onChange(achievedScore);
          } else scoreInputProps.onChange(null);
        }}
      />
    );

  return (
    <div className="flex w-full justify-start rounded-md border-2 border-gray-200 px-3 py-3">
      <div className="flex flex-1 flex-col gap-3">
        <Text size={"md"} fw={500}>
          {criterionObject.content}
        </Text>
        <div className="flex flex-col gap-1 px-2">
        {criterionObject.levels.map((level, index) => {
          return (
            <div className="flex items-start gap-2">
              <div className="flex items-start gap-2">
                <Text fw={600}>{index_levelMapping[index]}.</Text>
                <Text size="sm">{level.content}</Text>
              </div>
            </div>
          );
        })}
        </div>
        <div className="flex gap-2">
          <Text size={"md"} fw={500}>
            PI:
          </Text>
          <Text>{criterionObject.performanceIndicator.name} - {criterionObject.performanceIndicator.description}</Text>
        </div>
      </div>
      <Divider size="sm" orientation="vertical" />
      <div className="w-1/5 px-3">
        <Text size={"md"} fw={500}>
          Assessment
        </Text>
        <div className="flex gap-2">
          <Text>Score:</Text> <Text fw={600}>{fullScore}</Text>
        </div>
        <Text size="sm">(Solution: B)</Text>
        <Select
          label='Selected answer'
          placeholder="Select answer"
          data={
            criterionObject.levels.length === 5
              ? ["A", "B", "C", "D", "E"]
              : ["A", "B", "C", "D"]
          }
          w={"6em"}
          className="relative z-0"
          {...answerInputProps}
          onChange={(newVal) => {
            answerInputProps.onChange(newVal);
            if (newVal) {
              let achievedScore =
                criterionObject.levels[level_indexMapping[newVal]].maxScore;
              console.log("New score", achievedScore);
              scoreInputProps.onChange(achievedScore);
            } else scoreInputProps.onChange(null);
          }}
        />
      </div>
    </div>
  );
};

function CriterionInput({
  type,
  variant,
  criterionObject,
  scoreInputProps,
  answerInputProps,
}: CriterionInputProps) {
  switch (type) {
    case "multilevel":
      return (
        <MultilevelInput
          variant={variant}
          criterionObject={criterionObject}
          scoreInputProps={scoreInputProps}
          answerInputProps={answerInputProps}
        />
      );
    case "written":
      return (
        <WrittenInput
          variant={variant}
          criterionObject={criterionObject}
          answerInputProps={answerInputProps}
          scoreInputProps={scoreInputProps}
        />
      );
    case "multiplechoice":
      return (
        <MultipleChoiceInput
          variant={variant}
          criterionObject={criterionObject}
          answerInputProps={answerInputProps}
          scoreInputProps={scoreInputProps}
        />
      );
    default:
      break;
  }
  return <></>;
}

export default CriterionInput;
