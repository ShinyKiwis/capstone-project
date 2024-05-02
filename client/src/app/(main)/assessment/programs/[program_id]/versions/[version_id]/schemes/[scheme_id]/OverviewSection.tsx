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

const OverViewSection = ({ schemeObject }: { schemeObject: any }) => {
  return (
    <div>
      <div className="w-9/12">
        <table style={{ width: "85%" }}>
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
              <Text size="md">
                Quisque rhoncus pretium pretium. Vestibulum ac ante et nisi
                auctor efficitur in eget urna. Sed augue enim, tincidunt eu
                tincidunt ac, sagittis at erat. Nam gravida, sapien a lobortis
                consequat, dolor ante fringilla dolor, imperdiet bibendum ex mi
                a turpis. Aliquam placerat sagittis semper. Integer urna sapien,
                aliquet facilisis quam nec, aliquam hendrerit est. Integer in
                dolor volutpat, fermentum magna a, cursus ex. Donec vel odio sed
                dolor gravida auctor. Mauris semper posuere lectus vitae congue.
                Nam nulla mi, fringilla eu euismod at, pretium ut nibh. Praesent
                vitae nibh malesuada, interdum quam mattis, lobortis dui. Sed
                facilisis tempor scelerisque.
              </Text>
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
                Year {schemeObject.assessTime.year} - Semester{" "}
                {schemeObject.assessTime.no}
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
              <Text size="md">{schemeObject.criteriaCount}</Text>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "top" }}>
              <Text size="md" fw={500}>
                Maximum Score
              </Text>
            </td>
            <td>
              <Text size="md">{schemeObject.maxScore}</Text>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "top" }}>
              <Text size="md" fw={500}>
                Last Modified
              </Text>
            </td>
            <td>
              <Text size="md">{schemeObject.lastModified}</Text>
            </td>
          </tr>
        </table>
      </div>

      <Divider my="md" />

      <div>
        <Text size="md" fw={500}>
          Actions
        </Text>
        <div className="flex gap-4">
          <Stack>
            <Button w={"20rem"} leftSection={<AiOutlineEdit size={20} />} classNames={{inner: 'justify-start px-2'}}>
              Edit Scheme
            </Button>
            <Button w={"20rem"} leftSection={<IoDuplicateOutline size={20} /> } classNames={{inner: 'justify-start px-2'}}>
              Duplicate Scheme
            </Button>
            <Divider my="xs" w={"20rem"} />
            <Button color="red" w={"20rem"} leftSection={<AiOutlineDelete size={20} />} classNames={{inner: 'justify-start px-2'}}>
              Delete Scheme
            </Button>
          </Stack>
          <Stack>
            <Button w={"20rem"} leftSection={<AiOutlineFileWord  size={20}/>} classNames={{inner: 'justify-start px-2'}}>
              Export Assessment Form
            </Button>
            <Button w={"20rem"} leftSection={<TbFileExport size={20} />} classNames={{inner: 'justify-start px-2'}}>
              Export Scheme
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default OverViewSection;
