import {
  Button,
  Divider,
  Grid,
  Group,
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

const OverViewSection = ({
  schemeObject,
}: {
  schemeObject: AssessSchemeDetail;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
              <Text size="md">{"backend update needed"}</Text>
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
            >
              Duplicate Scheme
            </Button>
            <Divider my="xs" w={"20rem"} />
            <Button
              color="red"
              w={"20rem"}
              leftSection={<AiOutlineDelete size={20} />}
              classNames={{ inner: "justify-start px-2" }}
              onClick={async () => {
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
              Delete Scheme
            </Button>
          </Stack>
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
              Export Scheme
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default OverViewSection;
