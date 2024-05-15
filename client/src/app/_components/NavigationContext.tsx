import Program, { SO, Version } from "../interfaces/Program.interface";
import { Text } from "@mantine/core";
import formatDate from "../lib/formatDate";

interface NavigationContextProps {
  program?: Program;
  version?: Version;
  SO?: SO;
}

function NavigationContext({ program, version, SO }: NavigationContextProps) {
  return (
    <div className="flex flex-col gap-0">
      {program ? (
        <>
          <div className="flex gap-2">
            <Text size="sm" fw={600}>
              Program:
            </Text>
            <Text size="sm" fw={400}>
              {program.name}
            </Text>
          </div>
          <div className="flex gap-2">
            <Text size="sm" fw={600}>
              Major:
            </Text>
            <Text size="sm" fw={400}>
              {program.major}
            </Text>
          </div>
        </>
      ) : null}

      {version ? (
        <div className="flex gap-2">
          <Text size="sm" fw={600}>
            Version:
          </Text>
          <Text size="sm" fw={400}>
            {version.name} ({formatDate(version.startDate.toString())} -{" "}
            {formatDate(version.endDate.toString())})
          </Text>
        </div>
      ) : null}

      {SO ? (
        <div className="flex gap-2">
          <Text size="sm" fw={600}>
            SO:
          </Text>
          <Text size="sm" fw={400}>
            {SO.name} - {SO.description}
          </Text>
        </div>
      ) : null}
    </div>
  );
}

export default NavigationContext;
