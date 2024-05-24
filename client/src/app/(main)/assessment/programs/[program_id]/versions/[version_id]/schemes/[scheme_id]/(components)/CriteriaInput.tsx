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

interface FormInputPropsHandlers{
  value? :any;
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
  answerInputProps
}: {
  variant: "minimal" | "full";
  criterionObject: FetchedCriterion;
  scoreInputProps: FormInputPropsHandlers;
  answerInputProps: FormInputPropsHandlers;
}) => {
  if (variant === "minimal")
    return (
      <NumberInput
        placeholder="Score"
        min={0}
        max={(criterionObject.levels[3].maxScore)}
        allowNegative={false}
        allowDecimal={false}
        w={"6em"}
        className="z-0 relative"
        {...scoreInputProps}
        onChange={(newVal) => {
          scoreInputProps.onChange(newVal);
          if (newVal.toString() !== ''){
            let matchingIdx = criterionObject.levels.findIndex(level => newVal as number >= level.minScore && newVal as number <= level.maxScore)
            let newLevel = index_levelMapping[matchingIdx];
            answerInputProps.onChange(newLevel);
          }
          else answerInputProps.onChange('');
        }}
      />
    );

  return (
    <div className="flex w-full justify-start rounded-md border-2 border-gray-200 px-3 py-3">
      <div className="flex flex-1 flex-col gap-3">
        <Text size={"md"} fw={500}>
          Presenting the goals of the project
        </Text>
        <div className="flex flex-col gap-1 px-2">
          <div className="flex items-start gap-2">
            <div className="flex items-start gap-2">
              <Text fw={600}>A.</Text>
              <Text size="sm">
                The student cannot present project goals or the goals are all
                unfeasible.
              </Text>
            </div>
            <Text fw={600} c={"gray"} size="sm">
              (0 - 5)
            </Text>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex items-start gap-2">
              <Text fw={600}>B.</Text>
              <Text size="sm">
                Most of the presented goals are unclear or unfeasible.
              </Text>
            </div>
            <Text fw={600} c={"gray"} size="sm">
              (5 - 10)
            </Text>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex items-start gap-2">
              <Text fw={600}>C.</Text>
              <Text size="sm">
                The student can present more than 80% but less than 50% of the
                project goals clearly, but the rest is not clear enough or not
                feasible.
              </Text>
            </div>
            <Text fw={600} c={"gray"} size="sm">
              (10 - 15)
            </Text>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex items-start gap-2">
              <Text fw={600}>D.</Text>
              <Text size="sm">
                The student can present more than 80% of the goals clearly,
                feasible for the project.
              </Text>
            </div>
            <Text fw={600} c={"gray"} size="sm">
              (15 - 20)
            </Text>
          </div>
        </div>
        <div className="flex gap-2">
          <Text size={"md"} fw={500}>
            PI:
          </Text>
          <Text>A1 - Understand simple theoretical knowledge.</Text>
        </div>
      </div>
      <Divider size="sm" orientation="vertical" />
      <div className="w-1/5 px-3">
        <Text size={"md"} fw={500}>
          Assessment
        </Text>
        <div className="flex gap-2">
          <Text>Maximum score:</Text> <Text fw={600}>20</Text>
        </div>
        <NumberInput
          label="Achieved Score"
          placeholder="Number"
          min={0}
          // max={(criterionObject.assessment as MultipleLevelCriterion).getMaxScore()}
          allowNegative={false}
          allowDecimal={false}
          className="z-0 relative"
        />
      </div>
    </div>
  );
};

const WrittenInput = ({
  variant,
  criterionObject,
  answerInputProps,
  scoreInputProps
}: {
  variant: "minimal" | "full";
  criterionObject: FetchedCriterion;
  answerInputProps: FormInputPropsHandlers;
  scoreInputProps: FormInputPropsHandlers;
}) => {
  if (variant === "minimal")
    return (
      <div className="flex w-full flex-col gap-2">
        <TextInput placeholder="Written response" miw={'10em'} {...answerInputProps} />
        <NumberInput
          placeholder="Score"
          min={0}
          max={(criterionObject.levels[0].maxScore)}
          allowNegative={false}
          allowDecimal={false}
          w={"6em"}
          className="z-0 relative"
          {...scoreInputProps}
        />
      </div>
    );

  return (
    <div className="flex w-full justify-start rounded-md border-2 border-gray-200 px-3 py-3">
      <div className="mr-3 flex flex-1 flex-col gap-3">
        <Text size={"md"} fw={500}>
          Presenting the goals of the project
        </Text>
        <Textarea
          placeholder="Written response"
          autosize
          minRows={2}
          maxRows={4}
        />
        <div className="flex gap-2">
          <Text size={"md"} fw={500}>
            PI:
          </Text>
          <Text>A2 - Presentation skill.</Text>
        </div>
      </div>
      <Divider size="sm" orientation="vertical" />
      <div className="w-1/5 px-3">
        <Text size={"md"} fw={500}>
          Assessment
        </Text>
        <div className="flex gap-2">
          <Text>Maximum Score:</Text> <Text fw={600}>20</Text>
        </div>
        <NumberInput
          label="Achieved Score"
          placeholder="Number"
          min={0}
          // max={(criterionObject.assessment as MultipleLevelCriterion).getMaxScore()}
          allowNegative={false}
          allowDecimal={false}
          className="z-0 relative"
        />
      </div>
    </div>
  );
};

const MultipleChoiceInput = ({
  variant,
  criterionObject,
  scoreInputProps,
  answerInputProps
}: {
  variant: "minimal" | "full";
  criterionObject: FetchedCriterion;
  answerInputProps: FormInputPropsHandlers;
  scoreInputProps: FormInputPropsHandlers;
}) => {
  if (variant === "minimal")
    return (
      <Select
        placeholder="Select answer"
        data={criterionObject.levels.length === 5 ? ["A", "B", "C", "D", "E"] : ["A", "B", "C", "D"]}
        w={"6em"}
        className="z-0 relative"
        {...answerInputProps}
        onChange={(newVal) => {
          answerInputProps.onChange(newVal);
          if (newVal){
            let achievedScore = criterionObject.levels[level_indexMapping[newVal]].maxScore;
            scoreInputProps.onChange(achievedScore);
          }
          else scoreInputProps.onChange(null);
        }}
      />
    );

  return (
    <div className="flex w-full justify-start rounded-md border-2 border-gray-200 px-3 py-3">
      <div className="flex flex-1 flex-col gap-3">
        <Text size={"md"} fw={500}>
          Presenting the goals of the project
        </Text>
        <div className="flex flex-col gap-1 px-2">
          <div className="flex items-start gap-2">
            <div className="flex items-start gap-2">
              <Text fw={600}>A.</Text>
              <Text size="sm">
                The student cannot present project goals or the goals are all
                unfeasible.
              </Text>
            </div>
            {/* <Text fw={600} c={"gray"} size="sm">
								(0 - 5)
							</Text> */}
          </div>
          <div className="flex items-start gap-2">
            <div className="flex items-start gap-2">
              <Text fw={600}>B.</Text>
              <Text size="sm">
                Most of the presented goals are unclear or unfeasible.
              </Text>
            </div>
            {/* <Text fw={600} c={"gray"} size="sm">
								(5 - 10)
							</Text> */}
          </div>
          <div className="flex items-start gap-2">
            <div className="flex items-start gap-2">
              <Text fw={600}>C.</Text>
              <Text size="sm">
                The student can present more than 80% but less than 50% of the
                project goals clearly, but the rest is not clear enough or not
                feasible.
              </Text>
            </div>
            {/* <Text fw={600} c={"gray"} size="sm">
								(10 - 15)
							</Text> */}
          </div>
          <div className="flex items-start gap-2">
            <div className="flex items-start gap-2">
              <Text fw={600}>D.</Text>
              <Text size="sm">
                The student can present more than 80% of the goals clearly,
                feasible for the project.
              </Text>
            </div>
            {/* <Text fw={600} c={"gray"} size="sm">
								(15 - 20)
							</Text> */}
          </div>
        </div>
        <div className="flex gap-2">
          <Text size={"md"} fw={500}>
            PI:
          </Text>
          <Text>A1 - Understand simple theoretical knowledge.</Text>
        </div>
      </div>
      <Divider size="sm" orientation="vertical" />
      <div className="w-1/5 px-3">
        <Text size={"md"} fw={500}>
          Assessment
        </Text>
        <div className="flex gap-2">
          <Text>Score:</Text> <Text fw={600}>20</Text>
        </div>
        <Text size="sm">(Correct answer: B)</Text>
        <Select label="Selected answer" data={["A", "B", "C", "D"]} />
      </div>
    </div>
  );
};

function CriterionInput({
  type,
  variant,
  criterionObject,
  scoreInputProps,
  answerInputProps
}: CriterionInputProps) {
  switch (type) {
    case "multilevel":
      return (
        <MultilevelInput variant={variant} criterionObject={criterionObject} scoreInputProps={scoreInputProps} answerInputProps={answerInputProps} />
      );
    case "written":
      return (
        <WrittenInput variant={variant} criterionObject={criterionObject} answerInputProps={answerInputProps} scoreInputProps={scoreInputProps} />
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
