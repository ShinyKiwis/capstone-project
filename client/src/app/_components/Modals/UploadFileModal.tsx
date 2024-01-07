import React, { useRef } from "react";
import { Button, Typography } from "..";
import { MdOutlineFileUpload } from "react-icons/md";
import { CgClose } from "react-icons/cg";

const UploadedFileItem = ({fileName, fileExtension}:{fileName:string, fileExtension: string}) => {
  return(
    <div className="mx-10 flex items-center bg-lightergray rounded-lg px-3 py-2">
      <div>Icon</div>
      <div className="text-lg font-semibold text-lightblue">{fileName}</div>
      <div className="ml-auto right-0">
        <CgClose
          size={25}
          className="text-lack cursor-pointer hover:text-lightgray"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

const UploadFileModal = () => {
  var fileInput = useRef(null);
  return (
    <div>
      <Typography variant="h2" text="Upload file or multiple files" />
      <div className="mx-10 my-14 flex h-fit w-[65vw] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-lightblue bg-lightergray">
        <div className="mt-3">
          <MdOutlineFileUpload size={60} className="text-blue" />
        </div>
        <div className="text-xl font-bold">Drag and drop files here</div>
        <div className="text-xl font-bold">or</div>
        <Button
          isPrimary={true}
          variant="normal"
          className="mb-6 mt-2 px-6 py-1"
          onClick={() => {
            if (fileInput) fileInput.current!.click();
          }}
        >
          Browse files
        </Button>
        <form action="">
          <input
            type="file"
            className="hidden"
            ref={fileInput}
            accept=".txt,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </form>
      </div>

      <UploadedFileItem fileName="ProjectVS.txt" fileExtension=".txt"/>
    </div>
  );
};

export default UploadFileModal;
