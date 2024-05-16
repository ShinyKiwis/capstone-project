"use client"
import {
  Button,
  Checkbox,
  Grid,
  Group,
  Modal,
  NumberInput,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { AiOutlineProject } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
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
} from "../../../../_components/Modals/roleData";
import { Role, useRoles } from "@/app/providers/RolesProvider";
import { toggleNotification } from "@/app/lib/notification";
import { useForm } from "@mantine/form";

interface CreateUserModalProps {
  role?: Role;
}

const CreateUserModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [UID, setUID] = useState<number>();
  const [Uname, setUname] = useState('');
  const [Fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <>
      <Modal
        size="45%"
        opened={opened}
        onClose={close}
        yOffset="12vh"
        title={
          <Text size="lg" c="blue" fw={600}>
            Add a user
          </Text>
        }
      >
        <div className="flex flex-col gap-2">
          <NumberInput
            required
            label="New user's ID"
            placeholder="ID number"
            allowDecimal={false}
            allowNegative={false}
          />
          <TextInput
            required
            label="Full name"
            placeholder="user's full name"
          />
          <TextInput
            required
            label="Username"
            placeholder="username used at login"
          />
          <TextInput
            required
            label="Email"
            placeholder="user's email"
          />
          <PasswordInput
            label="Password"
            placeholder="user's login password"
          />

          <Group justify="flex-end" gap="xs" mt={'1em'}>
            <Button onClick={close} variant="outline">
              Cancel
            </Button>
            <Button
              variant="filled"
              onClick={()=>{}}
            >
              Add user
            </Button>
          </Group>
        </div>
      </Modal>

      <Button onClick={open} leftSection={<IoMdAdd size={20} />}>
        Add user
      </Button>
    </>
  );
};

export default CreateUserModal;
