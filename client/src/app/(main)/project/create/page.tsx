"use client";

import {
  Button,
  RichTextEditor,
  DropdownMenu,
  SearchBox,
  MultiselectDropdown,
  Profile,
} from "@/app/_components";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [instructors, setInstructors] = useState();
  // const [branch, setBranch] = useState();
  // const [program, setProgram] = useState();
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState("");
  const [refs, setRefs] = useState("");

  //Test rendering pre-made content in richtext input
  const [TestContent, setTestContent] = useState("");

  //////////////////////////////// Display components  ////////////////////////////////////////////
  const InputFieldTitle = ({ title }: { title: string }) => {
    let className = "text-2xl font-bold mb-2";
    return <div className={className}>{title}</div>;
  };

  const InputLabel = ({ title }: { title: string }) => {
    let className = "w-44 text-lg font-semibold";
    return <div className={className}>{title}</div>;
  };

  const InputField = ({ children }: { children: React.ReactNode }) => {
    let className = "w-full";
    return <div className={className}>{children}</div>;
  };

  const InputsTable = () => {
    return (
      <table className="border-separate border-spacing-3">
        <tbody>
          <tr>
            <td>
              <InputLabel title="Project ID:" />
            </td>
            <td className="rounded-md bg-lightgray px-2 py-2">Draft ID</td>
          </tr>
          <tr>
            <td>
              <InputLabel title="Project owner:" />
            </td>
            <td className="rounded-md bg-lightgray px-2 py-2">
              Its youuuuuuuuuuuuuuu
            </td>
          </tr>
          <tr>
            <td>
              <InputLabel title="Branch:" />
            </td>
            <td>
              <InputField>
                <DropdownMenu name="projectBranch" options={branchOptions} />
              </InputField>
            </td>
          </tr>
          <tr>
            <td>
              <InputLabel title="Program:" />
            </td>
            <td>
              <InputField>
                <DropdownMenu name="projectProgram" options={programOptions} />
              </InputField>
            </td>
          </tr>
          <tr>
            <td>
              <InputLabel title="Number of members:" />
            </td>
            <td>
              <InputField>
                <input
                  type="number"
                  name="membersLimit"
                  min={1}
                  max={20}
                  defaultValue={1}
                  className="w-full rounded-md bg-lightgray px-2 py-2"
                ></input>
              </InputField>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const ProfileItems = ({
    name,
    id,
    email,
  }: {
    name: string;
    id: string;
    email: string;
  }) => {
    return (
      <div className="flex w-full items-center pt-4">
        <div>
          <Profile
            type="horizontal-detailed"
            username={name}
            userEmail={email}
            userId={id}
          />
        </div>
        <div className="right-0 ml-auto">
          <CgClose
            size={25}
            className="text-lack cursor-pointer hover:text-lightgray"
            onClick={() => {}}
          />
        </div>
      </div>
    );
  };


  ////////////////////////// Test data   ///////////////////////////////////////////////////
  const branchOptions = [
    // retrieve from DB ?
    {
      title: "High Quality",
      value: "CC",
    },
    {
      title: "Standard Program",
      value: "SD",
    },
    {
      title: "Vie - JP",
      value: "VJ",
    },
    {
      title: "Vie - Fr",
      value: "VF",
    },
  ];

  const programOptions = [
    // retrieve from DB ?
    {
      title: "Computer Science",
      value: "CS",
    },
    {
      title: "Computer Engineering",
      value: "CE",
    },
    {
      title: "Very Long Computer Engineering Program Long Name",
      value: "long",
    },
  ];

  const instructorsList = [
    // retrieve from DB ?
    { value: "211300", label: "211300 - Nguyen Van A" },
    { value: "211301", label: "211301 - Pham Van C" },
    { value: "211302", label: "211302 - Do Hong D" },
    { value: "211303", label: "211303 - Phan Cao E" },
    { value: "211304", label: "211304 - Nguyen Hua F" },
    { value: "211305", label: "211305 - Do Cao G" },
  ];

  var selectedMembersList = [
    // Use state ?
    {
      id: "2013314",
      fullName: "Nguyen Van A",
      email: "vanA@hcmut.edu.vn",
    },
    {
      id: "2023214",
      fullName: "Tran Van B",
      email: "Btran@hcmut.edu.vn",
    },
    {
      id: "2023214 Long ID 2023214",
      fullName: "Loooong Loooooooong Maaaaaaaaaannnnnnn",
      email: "LoooooooooongEmaillllllll@hcmut.edu.vn",
    },
  ];

  var selectedInstructorsList= [
    // Use state ?
    {
      id: "1013314",
      fullName: "Nguyen Hoang A",
      email: "AHoang@hcmut.edu.vn",
    },
    {
      id: "1023214",
      fullName: "Nguyen Van B",
      email: "Bnguyen@hcmut.edu.vn",
    },
  ];
  

  return (
    <div className="w-full flex-1 bg-white">

      {/* Project title section: */}
      <textarea
        className="max-h-[5em] w-full border-b-2 border-gray py-2 pb-4 pt-8 text-center text-3xl font-semibold focus:outline-none"
        placeholder="Project Title"
        rows={1}
        style={{ resize: "none" }}
        required
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>

      <div className="mt-8 flex">
        {/* Project metadata section: */}
        <div className="w-1/3 pr-[16px]">
          <div>
            <InputFieldTitle title="Project's information" />
            <InputsTable />
          </div>

          <div className="pt-4">
            <InputFieldTitle title="Instructors" />
            <SearchBox placeholder="Search instructor's name, id..." />
            {/* <MultiselectDropdown
              name="supervisors"
              isMulti={true}
              options={instructorsList}
              placeholder="Add instructors"
            /> */}
            <div>
              {selectedInstructorsList.map(function (instructor) {
                return (
                  <ProfileItems
                    name={instructor.fullName}
                    id={instructor.id}
                    email={instructor.email}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <InputFieldTitle title="Members" />
            <SearchBox placeholder="Search student's name, id..." />
            <div>
              {selectedMembersList.map(function (member) {
                return (
                  <ProfileItems
                    name={member.fullName}
                    id={member.id}
                    email={member.email}
                  />
                );
              })}
            </div>
          </div>
        </div>


        {/* Project details section: */}
        <div className="w-2/3">
          <div>
            <p className="mb-4 text-2xl font-bold">Description</p>
            <RichTextEditor onChange={setDesc} />
          </div>
          <div>
            <p className="my-4 text-2xl font-bold">Tasks</p>
            <RichTextEditor onChange={setTasks} />
          </div>
          <p className="my-4 text-2xl font-bold">References</p>
          <RichTextEditor onChange={setRefs} />

          {/* test rendering content in richtext input */}
          <p className="my-4 text-2xl font-bold">Test render</p>
          <RichTextEditor
            onChange={setTestContent}
            initialContent="<h1>Header</h1><p><strong>This section test rendering pre-made project fields for project editing pages</strong></p><p><strong><em>List:</em></strong></p><ul><li>a</li><li>b</li><li>c</li></ul><p><u>Enumerate</u>:</p><ol><li>a</li><li>b</li><li>c</li><li>d</li></ol><p>Link to: <a href='https://javascript.plainenglish.io/creating-rich-text-editor-for-react-app-a-comprehensive-guide-using-the-quill-library-ae5ead8a0d3a' rel='noopener noreferrer' target='_blank'>https://javascript.plainenglish.io/creating-rich-text-editor-for-react-app-a-comprehensive-guide-using-the-quill-library-ae5ead8a0d3a</a></p>"
          />
          <button
            className="border-2 bg-blue"
            onClick={() => alert(TestContent)}
          >
            Get test content
          </button>
          {/* test rendering content in richtext input */}


          {/* Actions section */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              isPrimary={true}
              variant="confirm"
              className="px-[0.8em] py-[0.25em] text-lg"
              onClick={() =>
                // alert(
                //   `SUBMITTING PROJECT:\nTitle:${title}\n\nInstructors:\n${JSON.stringify(instructors)}\n\nBranch: ${branch}\n\nProgram: ${program}\n\nProject description:\n ${desc} \n Project tasks:\n ${tasks} \n Project refs:\n ${refs}`
                // )
                alert(
                  `SUBMITTING PROJECT:\nTitle:${title}\n\nProject description:\n ${desc} \n Project tasks:\n ${tasks} \n Project refs:\n ${refs}`,
                )
              }
            >
              Submit for approval
            </Button>
            <Button
              isPrimary={true}
              variant="action"
              className="px-[0.8em] py-[0.25em] text-lg"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
