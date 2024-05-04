import {
  Criterion,
  CriterionObject,
  CriterionType,
  MultipleChoiceCriterion,
  MultipleLevelCriterion,
  WrittenResponseCriterion,
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
import CriterionCardLevels from "./CriterionCardLevels";
import { AssessmentFormSection } from "@/app/(main)/assessment/programs/[program_id]/versions/[version_id]/schemes/create/page";
import { UseFormReturnType, createFormContext } from "@mantine/form";

interface CriterionCardProps {
  criterionObject: CriterionObject;
  criterionNumber: number;
  refreshFunction: () => void;
  removeFunction: () => void;
  form: UseFormReturnType<AssessmentFormSection>;
}

interface CriterionCardStates {
  criterionObject: CriterionObject;
  criterionNumber: number;
}

const [FormProvider, useFormContext, useForm] = createFormContext<AssessmentFormSection>();
class CriterionCard extends React.Component<
  CriterionCardProps,
  CriterionCardStates
> {
  state: Readonly<CriterionCardStates> = {
    criterionObject: this.props.criterionObject,
    criterionNumber: this.props.criterionNumber,
  };

  render() {
    return (
      <div className="flex w-full flex-col rounded-md bg-gray-100 py-4 pl-6 pr-4">
        <div className="flex w-full justify-between align-top">
          <Text size="md" td="underline" fw={700}>
            Criterion {this.state.criterionNumber}
          </Text>
          <Button
            variant="transparent"
            c={"red"}
            px={0}
            py={0}
            onClick={() => {
              this.props.removeFunction(); // remove criterion
            }}
          >
            <IoIosRemoveCircleOutline size={25} />
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <Textarea
            label="Description"
            placeholder="Input criterion description"
            autosize
            minRows={4}
            maxRows={8}
            required
            value={this.state.criterionObject.getDesc()}
            onChange={(e) => {
              this.state.criterionObject.setDesc(e.target.value);
              this.setState({ criterionObject: this.state.criterionObject });
            }}
            error={
              this.props.form.getInputProps(
                `criteria.${this.state.criterionNumber - 1}.description`,
              ).error
            }
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
              Criterion Type
            </Text>
            <Select
              value={this.state.criterionObject.type}
              data={[
                { label: "Multiple Levels", value: "multilevel" },
                { label: "Written Response", value: "written" },
                { label: "Multiple Choice", value: "multiplechoice" },
              ]}
              onChange={(value) => {
                this.state.criterionObject.changeType(value as CriterionType);
                this.props.refreshFunction();
              }}
            />
            <Text size="xs" fw={400} c="red">
              *Levels configurations will be discarded upon method change
            </Text>
          </div>
          
          <CriterionCardLevels
            criterionObject={this.state.criterionObject}
            criterionNumber={this.state.criterionNumber}
            refreshFunction={this.props.refreshFunction}
            parentCriterionNum={this.props.criterionNumber}
          />
          
        </div>
      </div>
    );
  }
}

export default CriterionCard;
