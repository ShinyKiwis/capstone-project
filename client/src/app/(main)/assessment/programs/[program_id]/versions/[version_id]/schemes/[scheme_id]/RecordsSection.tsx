import { Button, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";

const RecordsSection = ({ schemeObject }: { schemeObject: any }) => {
	const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <tr>
        <td style={{width:'13em', verticalAlign: "top" }}>
          <Text size="md" fw={500}>
            Submitted Records
          </Text>
        </td>
        <td style={{ verticalAlign: "top" }}>
          <Text size="md">{schemeObject.maxScore}</Text>
        </td>
      </tr>
      <tr>
        <td style={{ verticalAlign: "top" }}>
          <Text size="md" fw={500}>
            Average Score
          </Text>
        </td>
        <td>
          <Text size="md">{schemeObject.maxScore}</Text>
        </td>
      </tr>
			<div className="flex justify-between mt-2">
				<Button leftSection={<IoCreate size={18} />}>Input New Records</Button>
				<TextInput
          placeholder="Search records by student id, name, project"
					className="w-5/12"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          rightSection={
            <BiSearch
              size={20}
              className="group-focus-within:text-blue text-gray"
              onClick={(e) => {}}
            />
          }
        />
			</div>
    </div>
  );
};

export default RecordsSection;
