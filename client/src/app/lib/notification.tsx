import { notifications } from "@mantine/notifications";
import { Text } from "@mantine/core";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";


const typeMapping = {
  success: {
    color: "green",
    icon: <FaCircleCheck />,
  },
  danger: {
    color: "red",
    icon: <FaCircleExclamation />,
  },
};

export const toggleNotification = (
  title: string,
  message: string,
  type: keyof typeof typeMapping,
) => {
  notifications.show({
    color: typeMapping[type].color,
    autoClose: 5000,
    icon: typeMapping[type].icon,
    title: (
      <Text fw={600} c={typeMapping[type].color} size="md">
        {title}
      </Text>
    ),
    message: message,
  });
};
