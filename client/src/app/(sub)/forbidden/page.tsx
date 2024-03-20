import React from "react";
import { Alert, Card, Container, Text } from "@mantine/core";

const Forbidden = () => {
  return (
    <Container className="mt-48 w-fit">
      <Card shadow="md" radius="md" withBorder className="p-0">
        <Alert
          variant="light"
          color="red"
          className="pe-16"
          title={
            <Text fw={600} size="xl">
              403 Forbidden - Restricted Access
            </Text>
          }
        >
          <Text fw={500}>
            You do not have permissions to view this content.
          </Text>
          <Text fw={500}>
            {" "}
            Please contact admin if you think this is a mistake.
          </Text>
          {/* Button to get back to root route */}
        </Alert>
      </Card>
    </Container>
  );
};

export default Forbidden;
