"use client";

import "react-quill/dist/quill.snow.css";
import "../globals.css";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";

interface RichTextEditorProps {
  onChange: any;
  initialContent?: string;
}

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "list",
  "bullet",
  "indent",
  "link",
];

const RichTextEditor = ({ onChange, initialContent }: RichTextEditorProps) => {
  return (
    <div className="grow">
      <ReactQuill
        modules={modules}
        formats={formats}
        onChange={onChange}
        value={initialContent}
        theme="snow"
      />
    </div>
  );
};

export default RichTextEditor;
