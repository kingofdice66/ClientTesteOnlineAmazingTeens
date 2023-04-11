import { Editor } from "@tinymce/tinymce-react";

interface IProps {
  onEditorChange: (evt: any, editor: any) => void;
  initialValue: any;
  height: number;
  // eslint-disable-next-line react/require-default-props
  onInit?: any;
}

function TinyMCE(props: IProps): JSX.Element {
  const { onEditorChange, initialValue, height, onInit } = props;

  return (
    <Editor
      id="Editor"
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      // prettier-ignore
      onEditorChange={onEditorChange} // It gets executed upon editor changes like typing, text bolding etc.
      // onInit={(evt: any, editor: any): void => (editorRef.current = editor)}
      initialValue={initialValue}
      onInit={onInit}
      init={{
        height: height,
        menubar: false,
        // eslint-disable-next-line camelcase
        browser_spellcheck: true,
        plugins: [
          "advlist autolink lists link image charmap anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor |" +
          "alignleft aligncenter alignright alignjustify |" +
          "bullist numlist outdent indent | removeformat | help",
        // eslint-disable-next-line camelcase
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }" +
          "p {margin: 0}",
      }}
    />
  );
}

export default TinyMCE;
