import { Text, Button, Checkbox, Group, TextInput, Modal } from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { SyntheticEvent, useRef, useState } from "react";
import { toggleNotification } from "@/app/lib/notification";
import { AiOutlineFileWord } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import {
  AssessSchemeDetail,
  FetchedCriterion,
} from "@/app/interfaces/Assessment.interface";
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  SectionType,
  TabStopPosition,
  TabStopType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import { index_levelMapping } from "@/app/interfaces/Criterion.interface";

const FormExportModal = ({
  targetScheme,
}: {
  targetScheme: AssessSchemeDetail;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedOptions, setSelectedOptions] = useState([
    "pi",
    "ranges",
    "input",
  ]);

  const handleExport = () => {
    createFormDoc(selectedOptions);
    toggleNotification(
      "Success",
      `Assessment form ${targetScheme.name} has been exported!`,
      "success",
    );
    close();
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => {
          close();
        }}
        centered
        size="45%"
        padding="md"
        yOffset="8em"
        title={
          <Text size="lg" fw={600}>
            Export options
          </Text>
        }
      >
        <Checkbox.Group value={selectedOptions} onChange={setSelectedOptions}>
          <div className="mt-2 flex flex-col gap-2">
            <Checkbox value="pi" label="PIs" />
            <Checkbox value="ranges" label="Score ranges" />
            <Checkbox value="input" label="Score input" />
          </div>
        </Checkbox.Group>
        <Group justify="flex-end" gap="xs" mt="md">
          <Button
            onClick={() => {
              close();
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button variant="filled" onClick={handleExport}>
            Export
          </Button>
        </Group>
      </Modal>

      <Button
        w={"20rem"}
        leftSection={<AiOutlineFileWord size={20} />}
        classNames={{ inner: "justify-start px-2" }}
        onClick={open}
      >
        Export Assessment Form
      </Button>
    </div>
  );

  function createFormDoc(options: string[]) {
    function renderCriterion(
      criterionObj: FetchedCriterion,
      criterionNum: number,
    ) {
      if (criterionObj.type === "written") {
        let maxScore = criterionObj.levels[0].maxScore;

        return new TableRow({
          cantSplit: true,
          children: [
            new TableCell({
              borders: options.includes('input') ? {} : {
                top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
              },
              children: [
                new Paragraph({
                  text: `${criterionNum + 1}. ${criterionObj.content}`,
                  heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({
                  text: !options.includes("input")
                    ? "  ____________________________________________________________________________________   "
                    : "  __________________________________________________________________   ",
                }),
                new Paragraph({
                  text: !options.includes("input")
                    ? "  ____________________________________________________________________________________   "
                    : "  __________________________________________________________________   ",
                }),
                new Paragraph({
                  text: !options.includes("input")
                    ? "  ____________________________________________________________________________________   "
                    : "  __________________________________________________________________   ",
                }),
                new Paragraph({
                  children: options.includes("pi")
                    ? [
                        new TextRun({
                          text: "PI: ",
                          bold: true,
                        }),
                        new TextRun(
                          `${criterionObj.performanceIndicator.name} - ${criterionObj.performanceIndicator.description}`,
                        ),
                      ]
                    : [],
                }),
              ],
            }),
            ...(options.includes("input")
              ? [
                  new TableCell({
                    borders: options.includes('input') ? {} : {
                      top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                      bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                      left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                      right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                    },
                    width: {
                      size: 25,
                      type: WidthType.PERCENTAGE,
                    },
                    children: [
                      new Paragraph({
                        text: `Assessment`,
                        heading: HeadingLevel.HEADING_3,
                      }),
                      new Paragraph(`Maximum score: ${maxScore}`),
                      new Paragraph(`Score:`),
                    ],
                  }),
                ]
              : []),
          ],
        });
      } else {
        let maxScore = 0;
        if (criterionObj.type === "multilevel")
          if (criterionObj.levels.length > 4)
            maxScore =
              criterionObj.levels[3].maxScore > criterionObj.levels[4].maxScore
                ? criterionObj.levels[3].maxScore
                : criterionObj.levels[4].maxScore;
          else maxScore = criterionObj.levels[3].maxScore;
        else
          criterionObj.levels.forEach((level) => {
            if (level.maxScore > 0) maxScore = level.maxScore;
          });

        return new TableRow({
          cantSplit: true,
          children: [
            new TableCell({
              columnSpan: criterionObj.type === "multilevel" ? 1 : 2,
              borders: options.includes('input') ? {} : {
                top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun(`${criterionNum + 1}. ${criterionObj.content}`),
                    ...(criterionObj.type === "multilevel"
                      ? []
                      : [
                          new TextRun({
                            text: `  (Score: ${maxScore})`,
                            color: "#808080",
                          }),
                        ]),
                  ],
                  heading: HeadingLevel.HEADING_3,
                }),
                ...criterionObj.levels.map((level, lvIndex) => {
                  return new Paragraph({
                    children: [
                      new TextRun(
                        `  ${index_levelMapping[lvIndex]}. ${level.content}`,
                      ),
                      ...(options.includes("ranges")
                        ? [
                            new TextRun({
                              text: `${criterionObj.type === "multilevel" ? `  (${level.minScore} - ${level.maxScore})` : ""}`,
                              bold: true,
                              color: "#808080",
                            }),
                          ]
                        : []),
                    ],
                  });
                }),
                new Paragraph({
                  children: options.includes("pi")
                    ? [
                        new TextRun({
                          text: "PI: ",
                          bold: true,
                        }),
                        new TextRun(
                          `${criterionObj.performanceIndicator.name} - ${criterionObj.performanceIndicator.description}`,
                        ),
                      ]
                    : [],
                }),
              ],
            }),
            ...(options.includes("input") && criterionObj.type === "multilevel"
              ? [
                  new TableCell({
                    borders: options.includes('input') ? {} : {
                      top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                      bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                      left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                      right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                    },
                    children: [
                      new Paragraph({
                        text: `Assessment`,
                        heading: HeadingLevel.HEADING_3,
                      }),
                      new Paragraph(`Maximum score: ${maxScore}`),
                      new Paragraph(`Score:`),
                    ],
                  }),
                ]
              : []),
          ],
        });
      }
    }

    const doc = new Document({
      sections: [
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [
            new Paragraph({
              text: "Student Name",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text: "________________________________________________________________________________",
            }),
            new Paragraph({
              text: "Student ID",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text: "________________________________________________________________________________",
            }),
            new Paragraph({
              text: "Project ID",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text: "________________________________________________________________________________",
            }),
            new Paragraph({
              text: "Project Name",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text: "________________________________________________________________________________",
            }),
            new Paragraph({
              text: " ",
            }),
          ],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children: [
            new Table({
              borders: options.includes('input') ? {} : {
                top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
              },
              rows: targetScheme.criteria.map((criterion, index) => {
                return renderCriterion(criterion, index);
              }),
            }),
          ],
        },
      ],
    });

    // Download doc
    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `${targetScheme.name}_form.docx`);
      console.log("Document created successfully");
    });
  }
};

export default FormExportModal;
