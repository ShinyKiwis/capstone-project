import React from "react";
import { Grid, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { AssessmentFormSection } from "../page";
import { Criterion } from "@/app/interfaces/Criterion.interface";

const FinalReview = ({
  form1,
}: {
  form1: UseFormReturnType<AssessmentFormSection>;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Text size="xl" fw={600}>
        FinalReview
      </Text>
      <Grid>
        <Grid.Col span={4}>
          <Text size="md" fw={600}>
            Scheme Name:
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size="md" fw={400}>
            {form1.values.name}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size="md" fw={600}>
            Description:
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size="md" fw={400}>
            {form1.values.description}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size="md" fw={600}>
            Assessment Time:
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size="md" fw={400}>
            Year {form1.values.year} - Semester {form1.values.semester}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size="md" fw={600}>
            Criteria Count:
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size="md" fw={400}>
            {form1.values.criteriaCount}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size="md" fw={600}>
            Maximum Score:
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size="md" fw={400}>
            {form1.values.criteria.reduce(function (sum, e: Criterion) {
              return sum + e.assessment.getMaxScore();
            }, 0)}
          </Text>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default FinalReview;
