/* eslint-disable camelcase */
import { Editor } from "@tinymce/tinymce-react";
import { ControllerRenderProps } from "react-hook-form";

interface IProps {
  field: ControllerRenderProps<
    { subject: string; textLength: string },
    "textLength"
  >;
  setText: (content: string) => void;
}

const TinyMCE = (props: IProps): JSX.Element => {
  const { field, setText } = props;

  return (
    <Editor
      id="Editor"
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      onEditorChange={(content, editor): void => {
        field.onChange(editor.getContent({ format: "text" }));
        setText(content);
      }}
      init={{
        content_style: "p {margin: 0; padding: 0;}",
        promotion: false,
        branding: false,
        menubar: false,
        browser_spellcheck: true,
        contextmenu: false,
        max_height: 300,
        placeholder: "scrie comentariul...",
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
      }}
    />
  );
};

export default TinyMCE;
