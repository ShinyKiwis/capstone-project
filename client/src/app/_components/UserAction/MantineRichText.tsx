import { RichTextEditor, Link } from "@mantine/tiptap";
import { Content, Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Input } from "@mantine/core";

interface MantineRichTextProps {
  content: Content;
  onChange: any;
  label?: string
  description?: string;
  error?: string;
}

function MantineRichText({ description, label, content, onChange, error }: MantineRichTextProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal",
          },
        },
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    onUpdate(props) {
      const newContent = props.editor.getHTML();
      onChange(newContent);
    },
  });

  return (
    <Input.Wrapper
      withAsterisk
      label={label}
      description={description}
      error={error}
    >
      <RichTextEditor
        editor={editor}
        onChange={(e) => {
          console.log(e);
        }}
      >
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.Highlight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content
          className="max-h-80 min-h-40 overflow-auto"
          onChange={(cont) => console.log(cont)}
        />
      </RichTextEditor>
    </Input.Wrapper>
  );
}

export default MantineRichText;
