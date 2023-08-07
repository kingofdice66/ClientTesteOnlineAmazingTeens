/* eslint-disable camelcase */
import { Editor } from "@tinymce/tinymce-react";

interface IProps {
  field: any;
  setText: (content: string) => void;
  setEditor?: (editor: any) => void;
}

const TinyMCE = (props: IProps): JSX.Element => {
  const { field, setText, setEditor } = props;

  return (
    <Editor
      id="Editor"
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      onEditorChange={(content, editor): void => {
        // Get editor text without the HTML part for character count for preventing text abuse.
        field.onChange(editor.getContent({ format: "text" }));
        // Get editor text with the HTML part.
        setText(content);
      }}
      onInit={(evt, editor): void => {
        if (setEditor) setEditor(editor);
      }}
      init={{
        content_css: "/TinyMCE.module.css",
        content_style: "p {margin: 0; padding: 0;}",
        promotion: false,
        branding: false,
        menubar: false,
        browser_spellcheck: true,
        contextmenu: false,
        max_height: 300,
        // placeholder: "scrie comentariul...",
        placeholder: "adaugă conținutul subcapitolului...",
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
