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
        display: true
      },
      {
        title: "Roles Management",
        href: "/management/roles",
        resource: "manage_roles",
        display: true
      },
      {
        title: "Deadline Management",
        href: "/management/deadline",
        resource: "manage_deadline",
        display: true
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
        display: true
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
        display: true
      },
      {
        title: "Capstone Projects",
        href: "/project?project=capstone",
        resource: "view_projects",
        display: true
      },
      {
        title: "Create project",
        href: "/project/create",
        resource: "create_projects",
        display: false
      },
      {
        title: "Approve Specialized Projects",
        href: "/project/approve?project=specialized",
        resource: "approve_projects",
        display: false
      },
      {
        title: "Approve Capstone Projects",
        href: "/project/approve?project=capstone",
        resource: "approve_projects",
        display: false
      }
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
        display: true
      },
      {
        title: "Assessment records",
        href: "/assessment/records",
        resource: "",
        display: true
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
        display: true
      },
      {
        title: "Feedback Management",
        href: "",
        resource: "",
        display: true
      },
    ],
  },
];

export default sidebarItems;
