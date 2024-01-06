'use client'

import { Button, RichTextEditor, DropdownMenu } from "@/app/_components";
import { useState } from "react";

const CreateProject = () => {
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState("");
  const [refs, setRefs] = useState("");

  //Test rendering pre-made content in richtext input
  const [TestContent, setTestContent] = useState("");

  const branchOptions = [   // retrieve from DB ?
    {
      title:'High Quality',
      value:'CC'
    },
    {
      title:'Standard Program',
      value:'SD'
    },
    {
      title:'Vie - JP',
      value:'VJ'
    },
    {
      title:'Vie - Fr',
      value:'VF'
    }
  ]

  const programOptions = [   // retrieve from DB ?
    {
      title:'Computer Science',
      value:'CS'
    },
    {
      title:'Computer Engineering',
      value:'CE'
    },
    {
      title:'Very Long Computer Engineering Program Long Name',
      value:'long'
    }
  ]

  const InputLabel = ({title}: {title: string}) => {
    let className = "<w-44></w-44> text-lg font-semibold"
    return (
      <div className={className}>{title}</div>
    )
  }

  const InputField = ({children}: {children:React.ReactNode}) => {
    let className = "w-full"
    return(
      <div className={className}>{children}</div>
    )
  }

  const InputsTable = () => {
    return(
      <table className="border-separate border-spacing-3">
        <tbody>
          <tr>
            <td><InputLabel title="Project ID:"/></td>
            <td className="bg-lightgray rounded-md px-2 py-2">Draft ID</td>
          </tr>
          <tr>
            <td><InputLabel title="Branch:" /></td>
            <td>
              <InputField><DropdownMenu name="projectBranch" options={branchOptions} /></InputField>
            </td>
          </tr>
          <tr>
            <td><InputLabel title="Program:" /></td>
            <td>
              <InputField><DropdownMenu name="projectProgram" options={programOptions} /></InputField>
            </td>
          </tr>
          <tr>
            <td><InputLabel title="Members number:" /></td>
            <td>
            <InputField>
              <input
                type="number"
                name="membersLimit"
                min={1}
                max={20}
                defaultValue={1}
                className="w-full bg-lightgray rounded-md px-2 py-2"
              >
              </input>
            </InputField>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <div className="flex-1 w-full bg-white">
      {/* Project title section: */}
      <textarea 
        className="border-b-2 border-gray w-full text-center text-3xl max-h-[5em] font-semibold pt-8 pb-4 py-2 focus:outline-none"
        placeholder="Project Title"
        rows={1}
        style={{resize: 'none'}}
        required
      ></textarea>

      {/* Project metadata section: */}
      <div className="flex mt-8">
        <div className="w-1/3 pr-4">
          <p className="text-2xl font-bold mb-2">Project's information</p>
          <InputsTable />
          
          <div>
            <p className="text-2xl font-bold mb-4">Supervisors list</p>
          </div>
          
          <div>
            <p className="text-2xl font-bold mb-4">Members list</p>
          </div>
        </div>

        {/* Project details section: */}
        <div className="w-2/3">
          <div>
            <p className="text-2xl font-bold mb-4">Description</p>
            <RichTextEditor onChange={setDesc} />
          </div>
          <div>
            <p className="text-2xl font-bold my-4">Tasks</p>
            <RichTextEditor onChange={setTasks} />
          </div>
          <p className="text-2xl font-bold my-4">References</p>
          <RichTextEditor onChange={setRefs} />

          {/* test rendering content in richtext input */}
          <p className="text-2xl font-bold my-4">Test render</p>
          <RichTextEditor onChange={setTestContent} initialContent="<h1>Header</h1><p><strong>This section test rendering pre-made project fields for project editing pages</strong></p><p><strong><em>List:</em></strong></p><ul><li>a</li><li>b</li><li>c</li></ul><p><u>Enumerate</u>:</p><ol><li>a</li><li>b</li><li>c</li><li>d</li></ol><p>Link to: <a href='https://javascript.plainenglish.io/creating-rich-text-editor-for-react-app-a-comprehensive-guide-using-the-quill-library-ae5ead8a0d3a' rel='noopener noreferrer' target='_blank'>https://javascript.plainenglish.io/creating-rich-text-editor-for-react-app-a-comprehensive-guide-using-the-quill-library-ae5ead8a0d3a</a></p>" />
          <button className="bg-blue border-2" onClick={()=>alert(TestContent)}>Get test content</button>
          {/* test rendering content in richtext input */}

          <div className="flex gap-4 pt-4 justify-end">
            <Button 
              isPrimary={true} 
              variant="confirm" 
              children={"Submit for approval"}
              onClick={()=>alert(`Project description:\n ${desc} \n Project tasks:\n ${tasks} \n Project refs:\n ${refs}`)}
            ></Button>
            <Button 
              isPrimary={true} 
              variant="confirm" 
              children={"Save Changes"} 
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
