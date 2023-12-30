import React from "react";

interface ProjectInformationTableProps {
  fontSize: string;
}

const ProjectInformationTable = ({fontSize}: ProjectInformationTableProps) => {
  return (
    <table className={`${fontSize}`}>
      <tbody>
        <tr>
          <th className="text-left">Program</th>
          <th className="pe-4">:</th>
          <td>High Quality</td>
        </tr>
        <tr>
          <th className="text-left">Major</th>
          <th className="pe-4">:</th>
          <td>Computer Science</td>
        </tr>
        <tr>
          <th className="text-left">Instructor</th>
          <th className="pe-4">:</th>
          <td>Nguyen Van A</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProjectInformationTable;
