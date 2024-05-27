import { Text, Button, Modal, Group } from "@mantine/core";
import React, { useContext } from "react";
import { useDisclosure } from "@mantine/hooks";
import { SO } from "@/app/interfaces/Program.interface";
import { Criterion } from "@/app/interfaces/Criterion.interface";
import { DataTable } from "mantine-datatable";
import { SOsContext_editScheme } from "../[scheme_id]/page";

const PIselectEditModal = ({
  SOs,
  targetCriterion,
  criterionNum,
}: {
  SOs: SO[];
  targetCriterion: Criterion;
  criterionNum: number;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const SOsList = useContext(SOsContext_editScheme);

  return !SOsList ? (
    "Loading SOs..."
  ) : (
    <div>
      <Modal
        opened={opened}
        onClose={() => {
          close();
        }}
        centered
        size="55%"
        padding="md"
        title={
          <Text size="lg" fw={600}>
            Select A PI for criterion {criterionNum}
          </Text>
        }
      >
        <DataTable
          withTableBorder
          withColumnBorders
          columns={[
            {
              accessor: "name",
              title: "SO name",
              width: "10%",
              sortable: true,
            },
            {
              accessor: "description",
              title: "SO description",
              sortable: true,
            },
          ]}
          records={SOsList}
          rowExpansion={{
            content: ({ record }) => (
              <div className="bg-slate-300 px-6 py-4">
                <Text size="sm" fs={"italic"} c={"white"}>
                  Click on a row to select PI
                </Text>
                <DataTable
                  withTableBorder
                  withColumnBorders
                  width={"75%"}
                  columns={[
                    {
                      accessor: "name",
                      title: "PI name",
                      width: "10%",
                    },
                    {
                      accessor: "description",
                      title: "PI description",
                    },
                  ]}
                  records={record.performanceIndicators}
                  onRowClick={({ record, index, event }) => {
                    targetCriterion.associatedPI = record;
                    close();
                  }}
                />
              </div>
            ),
          }}
        />
      </Modal>

      {targetCriterion.associatedPI === null ? (
        <Button
          variant="transparent"
          td={"underline"}
          c={"blue"}
          px={0}
          onClick={() => {
            open();
          }}
        >
          Select a PI for this criterion
        </Button>
      ) : (
        <Button
          variant="transparent"
          px={0}
          onClick={() => {
            open();
          }}
        >
          <Group>
            <Text size="sm" c={'black'} fw={500} lineClamp={2}>
              {targetCriterion.associatedPI.name} -{" "}
              {targetCriterion.associatedPI.description}
            </Text>
            <Text size="sm" c={'gray'} fs={'italic'}>(click to select another)</Text>
          </Group>
        </Button>
      )}
    </div>
  );
};

export default PIselectEditModal;
