// Set the title and course description

import { useState } from "react";
import { TextField, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TinyMCE from "../../TinyMCE/TinyMCE";

const MinMax = {
  // Character length that does not contain the HTML from TinyMCE. Used only for control. Will not be going to database.
  textLength: {
    min: 10,
    max: 10000,
  },
  tutorialTitle: {
    min: 10,
    max: 500,
  },
};

const schema = yup.object().shape({
  textLength: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .min(MinMax.textLength.min, `Minim ${MinMax.textLength.min} caractere`)
    .max(MinMax.textLength.max, `Max ${MinMax.textLength.max} caractere`),
  tutorialTitle: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .min(
      MinMax.tutorialTitle.min,
      `Minim ${MinMax.tutorialTitle.min} caractere`
    )
    .max(MinMax.tutorialTitle.max, `Max ${MinMax.tutorialTitle.max} caractere`),
});

type UseForm = yup.InferType<typeof schema>;

const SetTitleAndDescription = (): JSX.Element => {
  const [description, setDescription] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UseForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      textLength: "",
      tutorialTitle: "",
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: "blue",
        height: "100vh",
        p: "50px 50px 0 50px",
      }}
    >
      <TextField label="Numele Tutorialului" />
      <Controller
        name="textLength"
        control={control}
        render={({ field }): JSX.Element => (
          <TinyMCE field={field} setText={setDescription} />
        )}
      />
    </Box>
  );
};

export default SetTitleAndDescription;
