import { useState, Controller } from "react-hook-form";

import TinyMCE from "../TinyMCE/TinyMCE";

const MakeSubject = (): JSX.Element => {
  const [text, setText] = useState<string | null>(null);

  <Controller
    name="textLength"
    render={({ field }): JSX.Element => (
      <TinyMCE field={field} setText={setText} />
    )}
  />;
};

export default MakeSubject;
