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
    pages: [
      {
        title: "Users Management",
        href: "/management/users",
      },
      {
        title: "Roles Management",
        href: "/management/roles"
      },
      {
        title: "Deadline Management",
        href: "/management/deadline",
      },
    ],
  },
  {
    Icon: FaChalkboardTeacher,
    title: "Program",
    paths: ["/program"],
    pages: [
      {
        title: "Programs Management",
        href: "/programs",
      },
    ],
  },
  {
    Icon: AiOutlineProject,
    title: "Projects",
    pages: [
      {
        title: "Specialized Projects",
        href: "/project?project=specialized",
      },
      {
        title: "Capstone Projects",
        href: "/project?project=capstone",
      },
    ],
  },
  {
    Icon: PiExam,
    title: "Assessment",
    pages: [
      {
        title: "Assessment schemes",
        href: "/assessment/schemes",
      },
      {
        title: "Assessment records",
        href: "/assessment/records",
      },
    ],
  },
  {
    Icon: VscGraph,
    title: "Evaluation",
    pages: [
      {
        title: "Evaluation Setup",
        href: "",
      },
      {
        title: "Feedback Management",
        href: "",
      },
    ],
  },
];

export default sidebarItems;