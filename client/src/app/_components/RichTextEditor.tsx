import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "../globals.css"
const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {}

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{align: []}],
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
  "header", "font", "size",
  "bold", "italic", "underline", "strike",
  "align", "list", "bullet", "indent",
  "link"
];

const RichTextEditor = ({}: RichTextEditorProps) => {
  return (
    <div className="h-fit">
      <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" />
    </div>
  );
};

export default RichTextEditor;
