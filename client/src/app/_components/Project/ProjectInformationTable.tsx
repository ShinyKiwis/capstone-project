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
  programs: {
    id: number;
    name: string;
  }[];
  majors: {
    id: number;
    name: string
  }[];
  instructors: Instructor[]
}

function createString(arr:any, propName:string){
  // create string of names from array of object, seperated by ,
  return arr.map((ele:any) => ele[`${propName}`]).join(', ');
}

const ProjectInformationTable = ({ fontSize, programs, majors, instructors }: ProjectInformationTableProps) => {
  let programsString = createString(programs, 'name');
  let majorsString = createString(majors, 'name');
  let instructorsString = createString(instructors, 'name');
  // let instructorsTail: Instructor[];
  // if (instructors.length > 1) instructorsTail = instructors.slice(1)
  // else instructorsTail = []

  return (
    <table className={`${fontSize}`}>
      <tbody>
        <tr>
          <th className="text-left">Program</th>
          <th className="pe-4">:</th>
          <td>{programsString}</td>
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
        {/* {
          instructorsTail.map(function (instructor: Instructor, index) {
            return (
              <tr key={index}>
                <th></th>
                <th></th>
                <td>{instructor.name}</td>
              </tr>
            )
          })
        } */}
      </tbody>
    </table>
  );
};

export default ProjectInformationTable;
