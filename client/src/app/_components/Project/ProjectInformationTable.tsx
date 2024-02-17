import React from "react";

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

  return (
    <table className={`${fontSize}`}>
      <tbody>
        <tr>
          <th className="text-left align-top">Branches</th>
          <th className="pe-4 align-top">:</th>
          <td>{branchesString}</td>
        </tr>
        <tr>
          <th className="text-left align-top">Major</th>
          <th className="pe-4 align-top">:</th>
          <td>{majorsString}</td>
        </tr>
        <tr>
          <th className="text-left align-top">Instructor</th>
          <th className="pe-4 align-top">:</th>
          <td>{instructorsString}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProjectInformationTable;
