import { PI, SO } from "@/app/interfaces/Program.interface";
import { Accordion, Button, Input, NumberInput, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import React, { useContext, useState, useEffect } from "react";
import { AssessmentFormSection, SchemeConfigs } from "../page";
import { UseFormReturnType } from "@mantine/form";
import { SOsContext_createScheme } from "../page";

const PIsConfiguration = ({
  form1,
  form2,
}: {
  form1: UseFormReturnType<AssessmentFormSection>;
  form2: UseFormReturnType<SchemeConfigs>;
}) => {
  const allSOs = useContext(SOsContext_createScheme);
  var selectedSOs: SO[] = form2.values.SOs;
  if (!allSOs) return <div className="red">SOs not loaded</div>;

  const [SOnames, setSOnames] = useState<string[]>([]);
  useEffect(() => {
    // Extract selected SOs and PIs from stage 1
    form1.values.criteria.forEach((criterion) => {
      let parentSO = allSOs.find(
        (SO) => SO.id === criterion.associatedPI?.studentOutcomeId,
      );
      // console.log(`PI: ${criterion.associatedPI?.name} - SO: ${parentSO?.name}`)
      if (parentSO) {
        // Find whether the parent SO associated with the PI is already added
        let foundIndex = selectedSOs.findIndex(
          (selectedSO) => selectedSO.id === parentSO.id,
        );
        if (foundIndex !== -1) {
          // Avoid adding duplicated PIs
          // console.log("SO already added, adding new PI", selectedSOs)
          let foundPIidx = selectedSOs[
            foundIndex
          ].performanceIndicators.findIndex(
            (addedPI) => addedPI.id === (criterion.associatedPI as PI).id,
          );
          if (foundPIidx === -1) {
            // console.log("Adding new PI")
            selectedSOs[foundIndex].performanceIndicators.push(
              criterion.associatedPI as PI,
            );
          }
        } else {
          // console.log("Adding new SO along with new PI", selectedSOs)
          let newSO = { ...parentSO };
          newSO.performanceIndicators = [criterion.associatedPI as PI];
          selectedSOs.push(newSO);
        }
      }
    });

    form2.setFieldValue("SOs", selectedSOs);
    // console.log("Extracted SOs:", selectedSOs);
    // Expand all SOs on default
    if (SOnames.length < 1) {
      selectedSOs.forEach((SO) => {
        if (!SOnames.includes(SO.name)){
          setSOnames([...SOnames, SO.name]);
          setexpandedSOs([...SOnames, SO.name]);
        }
      });
    }
    // console.log("Extracted names:", SOnames);
  },[]);

  const [expandedSOs, setexpandedSOs] = useState<string[]>(SOnames);
  if (selectedSOs.length === 0)
    return <div className="text-slate-400">*No PIs selected</div>;
  return (
    <div>
      <Text size="xl" fw={600}>
        PIs Configuraton
      </Text>
      <div className="mt-4 h-full overflow-auto pb-4">
        <Button
          ml={"auto"}
          px={0}
          py={0}
          td={"underline"}
          variant="transparent"
          display={selectedSOs.length === 0 ? "none" : ""}
          onClick={() => {
            setexpandedSOs(
              expandedSOs?.length && expandedSOs?.length > 0 ? [] : SOnames,
            );
          }}
        >
          {expandedSOs?.length && expandedSOs?.length > 0
            ? "Collapse All"
            : "Expand All"}
        </Button>
        <Accordion
          chevronPosition="right"
          variant="contained"
          multiple
          value={expandedSOs}
          onChange={setexpandedSOs}
        >
          {selectedSOs!.map((studentOutcome, SOindex) => (
            <Accordion.Item value={studentOutcome.name} key={studentOutcome.id}>
              <Accordion.Control>
                <Text className="text-md" fw={500}>
                  SO {studentOutcome.name} - {studentOutcome.description}
                </Text>
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
                      render: (record: PI, PIindex) => {
                        return (
                          <div className="flex items-center gap-1">
                            <NumberInput
                              min={0}
                              max={100}
                              allowNegative={false}
                              allowDecimal={false}
                              clampBehavior="strict"
                              placeholder="0 - 100"
                              // value={record.passingThreshold}
                              {...form2.getInputProps(
                                `SOs.${SOindex}.performanceIndicators.${PIindex}.expectedGoal`,
                              )}
                            />
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
