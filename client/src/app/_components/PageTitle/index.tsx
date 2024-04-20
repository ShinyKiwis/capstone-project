import React from "react";
import { Text } from "@mantine/core";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <Text size="xl" fw={700} c="blue">
      {title}
    </Text>
  );
};

export default PageTitle;
