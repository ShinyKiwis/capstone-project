import {
  ScrollArea,
  Text,
  TextInput,
  Group,
  Textarea,
  Select,
} from "@mantine/core";
import React from "react";

const AssessmentForm = () => {
  return (
    <div>
      <ScrollArea h={"100%"} type="scroll" offsetScrollbars>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex h-fit flex-col gap-4">
            <div>
              <Text size="md" fw={600} className="mb-2">
                Scheme Name
              </Text>
              <TextInput
                autoFocus
                // value={name}
                // onChange={(event) => setName(event.currentTarget.value)}
                // error={errors.nameError}
                placeholder="Scheme Name"
              />
            </div>
            <div>
              <Text size="md" fw={600} className="mb-2">
                Assess Time
              </Text>
              <div className="flex gap-5">
                <Select
                  autoFocus
                  label="Year"
                  placeholder="Pick value"
                  data={["React", "Angular", "Vue", "Svelte"]}
                />
                <Select
                  autoFocus
                  label="Semester"
                  placeholder="Pick value"
                  data={["React", "Angular", "Vue", "Svelte"]}
                />
              </div>
            </div>
            <div>
              <Text size="md" fw={600} className="mb-2">
                Description
              </Text>
              <Textarea
                autosize
                // value={description}
                minRows={4}
                maxRows={6}
                // onChange={(event) => setDescription(event.currentTarget.value)}
                // error={errors.descriptionError}
                placeholder="Description"
              />
            </div>
          </div>
        </form>
      </ScrollArea>
    </div>
  );
};

export default AssessmentForm;
