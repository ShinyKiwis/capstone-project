"use client"
import {
  Button,
  Checkbox,
  Grid,
  Group,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { AiOutlineProject } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiExam } from "react-icons/pi";
import { MdManageAccounts } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { useState } from "react";
import { useDisclosure, useListState } from "@mantine/hooks";
import {
  managementInitialValues,
  programInitialValues,
  projectInitialValues,
  assessmentInitialValues,
  evaluationInitialValues,
} from "./roleData";
import { Role, useRoles } from "@/app/providers/RolesProvider";
import { toggleNotification } from "@/app/lib/notification";

interface RoleModalProps {
  Icon: any;
  action: string;
  role?: Role;
}

const RoleModal = ({ Icon, action, role }: RoleModalProps) => {
  const { roles, setRoles, syncRoles } = useRoles();

  const prevRoleName = role?.roleName;
  const [roleName, setRoleName] = useState(role?.roleName || "");
  const [error, setError] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const [evaluationValues, setEvaluationValues] = useListState(
    evaluationInitialValues.map((value) => ({
      ...value,
      checked: role?.resources.includes(value.key) ?? false,
    })),
  );

  const allEvaluationValuesChecked = evaluationValues.every(
    (value) => value.checked,
  );

  const indeterminateEvaluation =
    evaluationValues.some((value) => value.checked) &&
    !allEvaluationValuesChecked;
  

  const [assessmentValues, setAssessmentValues] = useListState(
    assessmentInitialValues.map((value) => ({
      ...value,
      checked: role?.resources.includes(value.key) ?? false,
    })),
  );

  const allAssessmentValuesChecked = assessmentValues.every(
    (value) => value.checked,
  );

  const indeterminateAssessment =
    assessmentValues.some((value) => value.checked) &&
    !allAssessmentValuesChecked;

  const [managementValues, setManagementValues] = useListState(
    managementInitialValues.map((value) => ({
      ...value,
      checked: role?.resources.includes(value.key) ?? false,
    })),
  );

  const allManagementValuesChecked = managementValues.every(
    (value) => value.checked,
  );

  const indeterminateManagement =
    managementValues.some((value) => value.checked) &&
    !allManagementValuesChecked;

  const [projectValues, setProjectValues] = useListState(
    projectInitialValues.map((value) => ({
      ...value,
      checked: role?.resources.includes(value.key) ?? false,
    })),
  );

  const allProjectValuesChecked = projectValues.every((value) => value.checked);

  const indeterminateProject =
    projectValues.some((value) => value.checked) && !allProjectValuesChecked;

  const [programValues, setProgramValues] = useListState(
    programInitialValues.map((value) => ({
      ...value,
      checked: role?.resources.includes(value.key) ?? false,
    })),
  );

  const allProgramValuesChecked = programValues.every((value) => value.checked);

  const indeterminateProgram =
    programValues.some((value) => value.checked) && !allProgramValuesChecked;



  const handleCreateRole = async () => {
    if (roleName.length === 0) {
      setError("Role name is required");
      return;
    } else if (roles.some((role) => role.roleName == roleName)) {
      toggleNotification(
        `Role ${roleName} existed`,
        `The role ${roleName} is existed. Please try another.`,
        "danger",
      );
    } else {
      const resources = [managementValues, projectValues].flatMap((array) =>
        array.filter((item) => item.checked == true).map((item) => item.key),
      );
      syncRoles("create", roleName, resources);
      toggleNotification(
        `Create role ${roleName} successfully`,
        `The role ${roleName} is created.`,
        "success",
      );
    }
    setError("");
    setManagementValues.setState(managementInitialValues);
    setProjectValues.setState(projectInitialValues);
    setProgramValues.setState(programInitialValues);
    setRoleName("");
    close();
  };

  const handleUpdateRole = () => {
    if (roleName.length === 0) {
      setError("Role name is required");
      return;
    } else if (
      prevRoleName != roleName &&
      roles.some((role) => role.roleName == roleName)
    ) {
      toggleNotification(
        `Role ${roleName} existed`,
        `The role ${roleName} is existed. Please try another.`,
        "danger",
      );
    } else {
      const resources = [
        managementValues,
        projectValues,
        programValues,
        assessmentValues,
        evaluationValues,
      ].flatMap((array) =>
        array.filter((item) => item.checked == true).map((item) => item.key),
      );
      console.log(role);
      syncRoles("update", roleName, resources, role?.id);
      setRoles(
        roles.map((updateRole) => {
          if (updateRole.roleName == role?.roleName) {
            return {
              id: role.id,
              roleName: roleName,
              resources: resources,
            };
          }
          return updateRole;
        }),
      );
      toggleNotification(
        `Update role ${roleName} successfully`,
        `The role ${roleName} is updated.`,
        "success",
      );
    }
    close();
  };

  return (
    <>
      <Modal
        size="45%"
        opened={opened}
        onClose={close}
        yOffset="18vh"
        title={
          <Text size="lg" c="blue" fw={600}>
            {action[0].toLocaleUpperCase() + action.slice(1)} Role
          </Text>
        }
      >
        <>
          <TextInput
            required
            data-autofocus
            placeholder="E.g Admin..."
            className="mb-4 mt-2"
            label={
              <Text size="md" fw={600} className="mb-2">
                Role name
              </Text>
            }
            classNames={{
              label: "flex",
            }}
            value={roleName}
            inputWrapperOrder={["label", "error", "input"]}
            error={error}
            onChange={(e) => setRoleName(e.currentTarget.value)}
          />

          <Text size="md" fw={600} className="mb-2">
            Resources
          </Text>
          <Grid gutter="xl">
            <Grid.Col span={4}>
              <Checkbox
                checked={allManagementValuesChecked}
                indeterminate={indeterminateManagement}
                onChange={() =>
                  setManagementValues.setState((current) =>
                    current.map((value) => ({
                      ...value,
                      checked: !allManagementValuesChecked,
                    })),
                  )
                }
                label={
                  <div className="flex items-center gap-1 font-medium">
                    <MdManageAccounts size={20} />
                    Management
                  </div>
                }
              />
              {managementValues.map((value, index) => (
                <Checkbox
                  mt="xs"
                  ml={33}
                  label={value.label}
                  key={value.key}
                  checked={value.checked}
                  onChange={(e) =>
                    setManagementValues.setItemProp(
                      index,
                      "checked",
                      e.currentTarget.checked,
                    )
                  }
                />
              ))}
            </Grid.Col>
            <Grid.Col span={4}>
              <Checkbox
                checked={allProgramValuesChecked}
                indeterminate={indeterminateProgram}
                onChange={() =>
                  setProgramValues.setState((current) =>
                    current.map((value) => ({
                      ...value,
                      checked: !allProgramValuesChecked,
                    })),
                  )
                }
                label={
                  <div className="flex items-center gap-1 font-medium">
                    <FaChalkboardTeacher size={20} />
                    Program
                  </div>
                }
              />
              {programValues.map((value, index) => (
                <Checkbox
                  mt="xs"
                  ml={33}
                  label={value.label}
                  key={value.key}
                  checked={value.checked}
                  onChange={(e) =>
                    setProgramValues.setItemProp(
                      index,
                      "checked",
                      e.currentTarget.checked,
                    )
                  }
                />
              ))}
            </Grid.Col>
            <Grid.Col span={4}>
              <Checkbox
                checked={allProjectValuesChecked}
                indeterminate={indeterminateProject}
                onChange={() =>
                  setProjectValues.setState((current) =>
                    current.map((value) => ({
                      ...value,
                      checked: !allProjectValuesChecked,
                    })),
                  )
                }
                label={
                  <div className="flex items-center gap-2">
                    <AiOutlineProject size={25} />
                    Project
                  </div>
                }
              />
              {projectValues.map((value, index) => (
                <Checkbox
                  mt="xs"
                  ml={33}
                  label={value.label}
                  key={value.key}
                  checked={value.checked}
                  onChange={(e) =>
                    setProjectValues.setItemProp(
                      index,
                      "checked",
                      e.currentTarget.checked,
                    )
                  }
                />
              ))}
            </Grid.Col>
            <Grid.Col span={4}>
              <Checkbox
                checked={allAssessmentValuesChecked}
                indeterminate={indeterminateAssessment}
                onChange={() =>
                  setAssessmentValues.setState((current) =>
                    current.map((value) => ({
                      ...value,
                      checked: !allAssessmentValuesChecked,
                    })),
                  )
                }
                label={
                  <div className="flex items-center gap-2">
                    <PiExam size={25} />
                    Assessment
                  </div>
                }
              />
              {assessmentValues.map((value, index) => (
                <Checkbox
                  mt="xs"
                  ml={33}
                  label={value.label}
                  key={value.key}
                  checked={value.checked}
                  onChange={(e) =>
                    setAssessmentValues.setItemProp(
                      index,
                      "checked",
                      e.currentTarget.checked,
                    )
                  }
                />
              ))}
            </Grid.Col>
            <Grid.Col span={4}>
              <Checkbox
                checked={allEvaluationValuesChecked}
                indeterminate={indeterminateEvaluation}
                onChange={() =>
                  setEvaluationValues.setState((current) =>
                    current.map((value) => ({
                      ...value,
                      checked: !allEvaluationValuesChecked,
                    })),
                  )
                }
                label={
                  <div className="flex items-center gap-2">
                    <VscGraph size={25} />
                    Evaluation
                  </div>
                }
              />
              {evaluationValues.map((value, index) => (
                <Checkbox
                  mt="xs"
                  ml={33}
                  label={value.label}
                  key={value.key}
                  checked={value.checked}
                  onChange={(e) =>
                    setEvaluationValues.setItemProp(
                      index,
                      "checked",
                      e.currentTarget.checked,
                    )
                  }
                />
              ))}
            </Grid.Col>
          </Grid>
          <Group justify="flex-end" gap="xs">
            <Button onClick={close} variant="outline">
              Cancel
            </Button>
            <Button
              variant="filled"
              onClick={
                action.toLowerCase() === "edit"
                  ? handleUpdateRole
                  : handleCreateRole
              }
            >
              {action.toLowerCase() === "edit" ? "Update" : "Create"}
            </Button>
          </Group>
        </>
      </Modal>

      <Button onClick={open} leftSection={<Icon size={20} />}>
        {action}
      </Button>
    </>
  );
};

export default RoleModal;
