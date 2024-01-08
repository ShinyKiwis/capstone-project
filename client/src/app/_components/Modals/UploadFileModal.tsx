import React, { SyntheticEvent, useRef, useState } from "react";
import { Button, Typography } from "..";
import { MdOutlineFileUpload } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { FaAngleDoubleDown, FaRegFileWord } from "react-icons/fa";

const UploadedFileItem = ({
  file,
}: {
  file: File;
}) => {
  let icon: React.ReactNode
  if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) icon=<FaRegFileWord size={35} className='text-blue'/>
  else icon=<FaRegFileWord size={25}/>

  return (
    <div className="w-full mt-3 flex gap-3 items-center rounded-lg bg-lightergray px-3 py-2">
      {icon}
      <div className="text-lg font-semibold text-lightblue">{file.name}</div>
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

const UploadFileModal = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = React.useState(false);
  var fileInput = useRef<any>(null);

  function handleFileUpload(files: FileList){
    let newFilesList = uploadedFiles;
    Array.from(files).map((file) =>{
      // console.log('Added file:', file)
      newFilesList = newFilesList.concat(file);
    })
    setUploadedFiles(newFilesList);
    // console.log("File uploaded:",files)
    fileInput.current.value='';   // clear file input for new uploads
  }

  function handleFileRemove(){

  }

  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // File added by drag&drop
      handleFileUpload(e.dataTransfer.files);
    }
  };

  return (
    <div className="h-[80vh] w-[80vw]">
      <Typography variant="h2" text="Upload file or multiple files" className="mb-4"/>
      <div
        className=" flex h-1/2 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-lightblue bg-lightergray"
        onClick={() => {
          if (fileInput) fileInput.current!.click();
        }}
        onDragEnter={handleDrag}
      >
        {dragActive ? (
          <div className="contents-center flex flex-col items-center">
            <FaAngleDoubleDown size={50} className="text-gray" />
            <div className="mt-4 text-xl font-bold text-gray">
              Drop files here
            </div>
          </div>
        ) : (
          <div className="contents-center flex flex-col items-center ">
            <div className="mt-3">
              <MdOutlineFileUpload size={60} className="text-blue" />
            </div>
            <div className="text-xl font-bold">Drag and drop files here</div>
            <div className="text-xl font-bold">or</div>
            <Button
              isPrimary={true}
              variant="normal"
              className="mb-6 mt-2 px-6 py-1"
            >
              Browse files
            </Button>
          </div>
        )}
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input
            type="file"
            className="hidden"
            ref={fileInput}
            accept=".txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            multiple={true}
            onChange={(e) => {
              // Upload files via browse window
              if (e.target.files) {
                handleFileUpload(e.target.files)
              }
            }}
          />
        </form>
        {dragActive && (
          <div
            className="absolute h-full w-full bg-transparent"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </div>

      <div className="h-[40%] mt-3 overflow-y-auto">
        {
          uploadedFiles &&
          Array.from(uploadedFiles).map((file, index) =>{
            return(
              <UploadedFileItem file={file} key={index}/>
            )
          })
        }
      </div>
    </div>
  );
};

export default UploadFileModal;
