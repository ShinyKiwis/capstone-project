import {
  Button,
  Divider,
  Grid,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoDuplicateOutline } from "react-icons/io5";
import { TbFileExport } from "react-icons/tb";
import { AiOutlineFileWord } from "react-icons/ai";
import FormExportModal from "./FormExportModal";
import { toggleNotification } from "@/app/lib/notification";
import { AssessSchemeDetail } from "@/app/interfaces/Assessment.interface";
import useNavigate from "@/app/hooks/useNavigate";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";

const OverViewSection = ({
  schemeObject,
}: {
  schemeObject: AssessSchemeDetail;
}) => {
  const [delModalOpened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const totalScore = schemeObject.criteria.reduce(
    (accumulator, currentCriterion) => {
      if (currentCriterion.type === "written")
        return accumulator + currentCriterion.levels[0].maxScore;
      else
        return (
          accumulator +
          (currentCriterion.levels.length === 5 &&
          currentCriterion.levels[3].maxScore <
            currentCriterion.levels[4].maxScore
            ? currentCriterion.levels[4].maxScore
            : currentCriterion.levels[3].maxScore)
        );
    },
    0,
  );

  return (
    <div>
      <div className="w-10/12">
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ width: "25%", verticalAlign: "top" }}>
              <Text size="md" fw={500}>
                Scheme Name
              </Text>
            </td>
            <td style={{ width: "75%" }}>
              <Text size="md">{schemeObject.name}</Text>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "top" }}>
              <Text size="md" fw={500}>
                Description
              </Text>
            </td>
            <td>
              <Text size="md">{schemeObject.description}</Text>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "top" }}>
              <Text size="md" fw={500}>
                Generation
              </Text>
            </td>
            <td style={{ verticalAlign: "top" }}>
              <Text size="md">{schemeObject.generation}</Text>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "top" }}>
              <Text size="md" fw={500}>
                Assess Time
              </Text>
            </td>
            <td style={{ verticalAlign: "top" }}>
              <Text size="md">
                Year {schemeObject.semester.year} - Semester{" "}
                {schemeObject.semester.no}
              </Text>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "top" }}>
              <Text size="md" fw={500}>
                Criteria Count
              </Text>
            </td>
            <td>
              <Text size="md">{schemeObject.criteria.length}</Text>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "top" }}>
              <Text size="md" fw={500}>
                Maximum Score
              </Text>
            </td>
            <td>
              <Text size="md">{totalScore}</Text>
            </td>
          </tr>
          {/* <tr>
            <td style={{ verticalAlign: "top" }}>
              <Text size="md" fw={500}>
                Last Modified
              </Text>
            </td>
            <td>
              <Text size="md">{schemeObject.lastModified}</Text>
            </td>
          </tr> */}
        </table>
      </div>

      <Divider my="md" />

      <div>
        <Text size="md" fw={500} mb={"0.8rem"}>
          Actions
        </Text>
        <div className="flex gap-4">
          <Stack>
            <Button
              w={"20rem"}
              leftSection={<AiOutlineEdit size={20} />}
              classNames={{ inner: "justify-start px-2" }}
              onClick={() => {
                navigate(`edit/${schemeObject.id}`);
              }}
            >
              Edit Scheme
            </Button>
            <Button
              w={"20rem"}
              leftSection={<IoDuplicateOutline size={20} />}
              classNames={{ inner: "justify-start px-2" }}
              onClick={async () => {
                axios
                  .post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${schemeObject.versionProgramId}/versions/${schemeObject.versionId}/assessment-schemes/${schemeObject.id}/duplicate`,
                  )
                  .then(async (res) => {
                    queryClient.invalidateQueries({
                      queryKey: ["scheme"],
                    });
                    toggleNotification(
                      "Success",
                      `Scheme duplicated!`,
                      "success",
                    );
                    navigate("./");
                  })
                  .catch((err) => {
                    console.error("Error duplicating scheme:", err);
                    toggleNotification(
                      "Error",
                      "Scheme duplication failed !",
                      "danger",
                    );
                  });
              }}
            >
              Duplicate Scheme
            </Button>
            <Divider my="xs" w={"20rem"} />
            <Button
              color="red"
              w={"20rem"}
              leftSection={<AiOutlineDelete size={20} />}
              classNames={{ inner: "justify-start px-2" }}
              onClick={open}
            >
              Delete Scheme
            </Button>
          </Stack>
          <Modal
            opened={delModalOpened}
            onClose={() => {
              close();
            }}
            centered
            size="45%"
            padding="md"
            yOffset="8em"
            title={
              <Text size="lg" c="gray" fw={600}>
                Please confirm deletion
              </Text>
            }
          >
            <Text size="sm">
              Are you sure you want to delete this assessment scheme? This
              cannot be undone!
            </Text>
            <Group justify="flex-end" gap="xs" mt="md">
              <Button
                onClick={() => {
                  close();
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                variant="filled"
                color="red"
                onClick={() => {
                  // send API to delete
                  axios
                    .delete(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${schemeObject.versionProgramId}/versions/${schemeObject.versionId}/assessment-schemes/${schemeObject.id}`,
                    )
                    .then(async (res) => {
                      queryClient.invalidateQueries({
                        queryKey: ["scheme"],
                      });
                      toggleNotification(
                        "Success",
                        `Removed scheme: ${schemeObject.name}`,
                        "success",
                      );
                      close();
                      navigate(`./`);
                    })
                    .catch((err) => {
                      console.error("Error deleteing scheme:", err);
                      toggleNotification(
                        "Error",
                        "Scheme deletion failed !",
                        "danger",
                      );
                    });
                }}
              >
                Delete
              </Button>
            </Group>
          </Modal>
          <Stack>
            <FormExportModal targetScheme={schemeObject} />
            <Button
              w={"20rem"}
              leftSection={<TbFileExport size={20} />}
              classNames={{ inner: "justify-start px-2" }}
              onClick={() => {
                toggleNotification(
                  "Success",
                  `Assessment scheme ${schemeObject.name} has been exported!`,
                  "success",
                );
              }}
            >
              <a
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(schemeObject),
                )}`}
                download={`${schemeObject.name}_exported.json`}
                style={{ width: "100%" }}
              >
                Export Scheme
              </a>
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default OverViewSection;
