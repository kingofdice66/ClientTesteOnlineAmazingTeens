import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TinyMCE from "../TinyMCE/TinyMCE";

const MakeSubsection = (): JSX.Element => {
  const [editor, setEditor] = useState<any>(null);

  const [text, setText] = useState<string | null>(null);

  const { control } = useForm({});

  return (
    <Controller
      name="textLength"
      control={control}
      render={({ field }): JSX.Element => (
        <TinyMCE field={field} setText={setText} setEditor={setEditor} />
      )}
    />
  );
};

export default MakeSubsection;
