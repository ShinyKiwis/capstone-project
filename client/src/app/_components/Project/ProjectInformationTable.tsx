import React from "react";
import { ProjectProps } from "./ProjectCard";

type Instructor = {
  id: number;
  email: string;
  username: string;
  name: string
}

interface ProjectInformationTableProps {
  fontSize: string;
  branches: {
    id: number;
    name: string;
  }[];
  majors: {
    id: number;
    name: string
  }[];
  supervisors: Instructor[]
}

function createString(arr:any, propName:string){
  // create string of names from array of object, seperated by ,
  return arr.map((ele:any) => ele[`${propName}`]).join(', ');
}

const ProjectInformationTable = ({ fontSize, branches, majors, supervisors }: ProjectInformationTableProps) => {
  let branchesString = createString(branches, 'name');
  let majorsString = createString(majors, 'name');
  let instructorsString = createString(supervisors, 'name');
  // let instructorsTail: Instructor[];
  // if (instructors.length > 1) instructorsTail = instructors.slice(1)
  // else instructorsTail = []

  return (
    <table className={`${fontSize}`}>
      <tbody>
        <tr>
          <th className="text-left">Branches</th>
          <th className="pe-4">:</th>
          <td>{branchesString}</td>
        </tr>
        <tr>
          <th className="text-left">Major</th>
          <th className="pe-4">:</th>
          <td>{majorsString}</td>
        </tr>
        <tr>
          <th className="text-left">Instructor</th>
          <th className="pe-4">:</th>
          <td>{instructorsString}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProjectInformationTable;
