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
        display: true,
      },
      {
        title: "Roles Management",
        href: "/management/roles",
        resource: "manage_roles",
        display: true,
      },
      {
        title: "Deadline Management",
        href: "/management/deadline",
        resource: "manage_deadline",
        display: true,
      },
    ],
  },
  {
    Icon: FaChalkboardTeacher,
    title: "Program",
    resource: "programs",
    pages: [
      {
        title: "Programs Management",
        href: "/program",
        resource: "manage_programs",
        display: true,
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
        display: true,
      },
      {
        title: "Capstone Projects",
        href: "/project?project=capstone",
        resource: "view_projects",
        display: true,
      },
      {
        title: "Create project",
        href: "/project/create",
        resource: "create_projects",
        display: false,
      },
      {
        title: "Approve Specialized Projects",
        href: "/project/approve?project=specialized",
        resource: "approve_projects",
        display: false,
      },
      {
        title: "Approve Capstone Projects",
        href: "/project/approve?project=capstone",
        resource: "approve_projects",
        display: false,
      },
      {
        title: "Edit Projects",
        href: "/project/edit",
        resource: "modify_projects",
        display: false,
      },
    ],
  },
  {
    Icon: PiExam,
    title: "Assessment",
    resource: "assessments",
    pages: [
      {
        title: "Schemes Management",
        href: "/assessment/programs",
        resource: "manage_assessments_schemes",
        display: true,
      },
    ],
  },
  {
    Icon: VscGraph,
    title: "Evaluation",
    resource: "evaluate",
    pages: [
      {
        title: "Programs Evaluation",
        href: "/evaluate/programs",
        resource: "evaluate_programs",
        display: true,
      },
    ],
  },
];

export default sidebarItems;
