'use client'

import { InputBox, RichTextEditor } from "@/app/_components";

const CreateProject = () => {
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
            <RichTextEditor />
          </div>
          <div>
            <p className="text-2xl font-bold my-4">Tasks</p>
            <RichTextEditor />
          </div>
          <p className="text-2xl font-bold my-4">References</p>
          <RichTextEditor />
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
