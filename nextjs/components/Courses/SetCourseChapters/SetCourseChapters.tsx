/**
 * This is only for setting the course chapters titles.
 * Like, for example, for a Photoshop tutorial:
 *
 *    1.Introduction and installation
 *        What is Photoshop?
 *        What is it used for?
 *    2.Pictures and layers
 *        Photoshop interface
 *        Creating a document
 *
 * Their contents will be set afterwards.
 * */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Box } from "@mui/material";
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
    <Box
      sx={{
        backgroundColor: "blue",
        height: "100vh",
        overflow: "scroll",
      }}
    >
      <Box
        sx={{
          backgroundColor: "blue",
          pt: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          width: "30%",
        }}
      >
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
      </Box>
    </Box>
  );
};

export default MakeCourseChapters;