import React, { SyntheticEvent, useRef, useState } from "react";
import { Button, Typography } from "..";
import { MdOutlineFileUpload } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { FaAngleDoubleDown } from "react-icons/fa";

const UploadedFileItem = ({
  fileName,
  fileExtension,
}: {
  fileName: string;
  fileExtension: string;
}) => {
  return (
    <div className="w-full mt-3 flex items-center rounded-lg bg-lightergray px-3 py-2">
      <div>Icon</div>
      <div className="text-lg font-semibold text-lightblue">{fileName}</div>
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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = React.useState(false);
  var fileInput = useRef<any>(null);

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
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
      console.log(e.dataTransfer.files);
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
            accept=".txt,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            multiple={true}
            onChange={({ target: { files } }) => {
              if (files) {
                console.log(files[0]?.name);
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

      <UploadedFileItem fileName="ProjectVS.txt" fileExtension=".txt" />
    </div>
  );
};

export default UploadFileModal;
