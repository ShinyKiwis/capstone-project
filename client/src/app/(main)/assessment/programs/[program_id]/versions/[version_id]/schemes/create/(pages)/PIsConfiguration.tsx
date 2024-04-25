import { PI, SO } from "@/app/interfaces/Program.interface";
import { Accordion, Input, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import React from "react";

const PIsConfiguration = ({ studentOutcomes }: { studentOutcomes: SO[] }) => {
  return (
    <div>
      <div>PIsConfiguration</div>
      <div className="mt-4 h-full overflow-auto pb-4">
        <Accordion chevronPosition="right" variant="contained">
          {studentOutcomes.map((studentOutcome) => (
            <Accordion.Item value={studentOutcome.name} key={studentOutcome.id}>
              <Accordion.Control>
                <div className="flex-col items-center gap-2"></div>
                <Text className="text-2xl" fw={700}>
                  SO {studentOutcome.name}
                </Text>
                <div className="flex gap-1">
                  <strong>Description:</strong> {studentOutcome.description}
                </div>
              </Accordion.Control>
              <Accordion.Panel>
                <DataTable
                  withTableBorder
                  columns={[
                    {
                      accessor: "name",
                      title: "Indicator Name",
                      width: "10%",
                      render: (record: PI) => {
                        return <Text>{record.name}</Text>;
                      },
                    },
                    {
                      accessor: "passingGoal",
                      title: "Passing Goal",
                      render: (record: PI) => {
                        return (
                          <div className="flex gap-1 items-center">
                            <Input value={record.passingThreshold} />
                            <Text>%</Text>
                          </div>
                        );
                      },
                    },
                    {
                      accessor: "description",
                      title: "Description",
                      render: (record: PI) => {
                        return <Text>{record.description}</Text>;
                      },
                    },
                  ]}
                  records={studentOutcome.performanceIndicators}
                />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default PIsConfiguration;
