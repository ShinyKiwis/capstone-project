import {
  FaChalkboardTeacher,
  FaProjectDiagram,
  FaUserGraduate,
} from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { MdManageAccounts } from "react-icons/md";
import { RiExpandRightLine, RiExpandLeftLine } from "react-icons/ri";
import { AiOutlineProject } from "react-icons/ai";
import { PiExam } from "react-icons/pi";

const sidebarItems = [
  {
    Icon: MdManageAccounts,
    title: "Management",
    resource: "manage",
    pages: [
      {
        title: "Users Management",
        href: "/management/users",
        resource: "manage_users",
      },
      {
        title: "Roles Management",
        href: "/management/roles",
        resource: "manage_roles",
      },
      {
        title: "Deadline Management",
        href: "/management/deadline",
        resource: "manage_deadline",
      },
    ],
  },
  {
    Icon: FaChalkboardTeacher,
    title: "Program",
    resource: "",
    paths: ["/program"],
    pages: [
      {
        title: "Programs Management",
        href: "/programs",
        resource: "",
      },
    ],
  },
  {
    Icon: AiOutlineProject,
    title: "Projects",
    resource: "projects",
    pages: [
      {
        title: "Specialized Projects",
        href: "/project?project=specialized",
        resource: "view_projects",
      },
      {
        title: "Capstone Projects",
        href: "/project?project=capstone",
        resource: "view_projects",
      },
    ],
  },
  {
    Icon: PiExam,
    title: "Assessment",
    resource: "",
    pages: [
      {
        title: "Assessment schemes",
        href: "/assessment/schemes",
        resource: "",
      },
      {
        title: "Assessment records",
        href: "/assessment/records",
        resource: "",
      },
    ],
  },
  {
    Icon: VscGraph,
    title: "Evaluation",
    resource: "",
    pages: [
      {
        title: "Evaluation Setup",
        href: "",
        resource: "",
      },
      {
        title: "Feedback Management",
        href: "",
        resource: "",
      },
    ],
  },
];

export default sidebarItems;
