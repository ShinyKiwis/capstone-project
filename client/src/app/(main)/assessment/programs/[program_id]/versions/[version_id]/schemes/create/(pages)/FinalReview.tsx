import React from "react";
import { Grid, Text } from "@mantine/core";

const FinalReview = ({
  name,
  description,
  year,
  semester,
  criteriaCount,
  maximumScore,
  type,
}: {
  name: string;
  description: string;
  year: number;
  semester: number;
  criteriaCount: number;
  maximumScore: number;
  type: string;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Text size="xl" fw={600}>FinalReview</Text>
      <Grid>
        <Grid.Col span={4}>
          <Text size="md" fw={600}>
            Scheme Name:
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size="md" fw={400}>
            {name}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size="md" fw={600}>
            Description:
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size="md" fw={400}>
            {description}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size="md" fw={600}>
            Assessment Time:
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size="md" fw={400}>
            Year {year} - Semester {semester}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size="md" fw={600}>
            Criteria Count:
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size="md" fw={400}>
            {criteriaCount}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size="md" fw={600}>
            Assessment Type:
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size="md" fw={400}>
            {type}
          </Text>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default FinalReview;
