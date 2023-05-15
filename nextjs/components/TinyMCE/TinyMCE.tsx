/* eslint-disable camelcase */
import { Editor } from "@tinymce/tinymce-react";
import { ControllerRenderProps } from "react-hook-form";

interface IProps {
  field: ControllerRenderProps<{ subject: string; comment: string }, "comment">;
}

const TinyMCE = (props: IProps): JSX.Element => {
  const { field } = props;

  return (
    <Editor
      id="Editor"
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      onEditorChange={(content): void => field.onChange(content)}
      init={{
        content_style: "p {margin: 0; padding: 0;}",
        promotion: false,
        branding: false,
        menubar: false,
        browser_spellcheck: true,
        contextmenu: false,
        max_height: 300,
        placeholder: "scrie comentariul...",
      }}
    />
  );
};

export default TinyMCE;
