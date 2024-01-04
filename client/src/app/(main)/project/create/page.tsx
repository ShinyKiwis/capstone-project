'use client'

import { Button, InputBox, RichTextEditor } from "@/app/_components";
import { useState } from "react";

const CreateProject = () => {
  const [Desc, setDesc] = useState("");
  const [Tasks, setTasks] = useState("");
  const [Refs, setRefs] = useState("");

  //Test rendering pre-made content in richtext input
  const [TestContent, setTestContent] = useState("");

  return (
    <div className="flex-1 w-full bg-white">
      <InputBox 
        inputName="projectTitle" 
        placeholderText="Project Title" 
        type="text" 
        onChange={()=>{}}
      />
      <div className="flex mt-8">
        <div className="w-1/3">Meta data section</div>
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
              variant="green_confirm" 
              children={"Submit for approval"}
              onClick={()=>alert(`Project description:\n ${Desc} \n Project tasks:\n ${Tasks} \n Project refs:\n ${Refs}`)}
            ></Button>
            <Button 
              isPrimary={true} 
              variant="blue_confirm" 
              children={"Save Changes"} 
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
