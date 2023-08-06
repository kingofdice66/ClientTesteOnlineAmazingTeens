import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import Array from "./Array";
import MuiStepper from "./MuiStepper";

interface IForm {
  sections: {
    section: string;
    subsections: { subsection: string }[];
  }[];
}

const MakeCourseChapters = (): JSX.Element => {
  const [stepArray, setStepArray] = useState<IForm | null>(null);

  const { control, register, getValues, handleSubmit } = useForm<IForm>({
    defaultValues: {
      sections: [{ section: "", subsections: [{ subsection: "" }] }],
    },
  });

  const previewForm = (): void => {
    setStepArray(getValues());
  };

  const onSubmit = (data: IForm): void => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Array {...{ control, register }} />

        <br />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>

      <br />
      <br />
      <br />
      <br />
      <br />

      <Button onClick={(): void => previewForm()}>Arată Modificările</Button>

      <MuiStepper {...{ stepArray }} />
    </>
  );
};

export default MakeCourseChapters;
