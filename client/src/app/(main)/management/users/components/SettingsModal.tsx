import { Button, Popover, Stack, Checkbox, Text } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { Dispatch } from "react";

export type State = {
  id: boolean;
  name: boolean;
  email: boolean;
  roles: boolean;
};

export type Action =
  | { type: "toggleId" }
  | { type: "toggleName" }
  | { type: "toggleEmail" }
  | { type: "toggleRoles" };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "toggleId":
      return {
        ...state,
        id: !state.id,
      };
    case "toggleName":
      return {
        ...state,
        name: !state.name,
      };
    case "toggleEmail":
      return {
        ...state,
        email: !state.email,
      };
    case "toggleRoles":
      return {
        ...state,
        roles: !state.roles,
      };
  }
};

const SettingsModal = ({
  hideOptions,
  dispatch,
}: {
  hideOptions: State;
  dispatch: Dispatch<Action>;
}) => {
  return (
    <Popover shadow="md" position="bottom">
      <Popover.Target>
        <Button leftSection={<IconSettings size={16} />}>Settings</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          <Text fw={600} c="blue">
            Hide columns
          </Text>
          <Checkbox
            label='Hide "ID" column'
            checked={hideOptions.id}
            onChange={() => {
              dispatch({ type: "toggleId" });
            }}
          />
          <Checkbox
            label='Hide "Name" column'
            checked={hideOptions.name}
            onChange={() => {
              dispatch({ type: "toggleName" });
            }}
          />
          <Checkbox
            label='Hide "Email" column'
            checked={hideOptions.email}
            onChange={() => {
              dispatch({ type: "toggleEmail" });
            }}
          />
          <Checkbox
            label='Hide "Roles" column'
            checked={hideOptions.roles}
            onChange={() => {
              dispatch({ type: "toggleRoles" });
            }}
          />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default SettingsModal;
