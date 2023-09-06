/* eslint-disable react/jsx-props-no-spreading */
// Set the title and course description

import { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Link from "next/link";
import TinyMCE from "../../TinyMCE/TinyMCE";
import ApiURL from "../../ApiURL/ApiURL";

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
  // the link that takes the use to creating the tutorial chapters after he clicks on the submit button
  const [showLink, setShowLink] = useState<boolean>(false);
  // the id of the newly created tutorial
  const [tutorialId, setTutorialId] = useState<number | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      textLength: "",
      tutorialTitle: "",
    },
  });

  const onSubmit = (data: UseForm): void => {
    console.log(data);
    console.log(description);
    axios
      .post(`${ApiURL}/Courses/SetTitleAndDescription`, {
        tutorialTitle: data.tutorialTitle,
        description,
      })
      .then((response) => setTutorialId(response.data.tutorialId))
      .catch((error) => error);
  };

  return (
    <Box
      sx={{
        backgroundColor: "blue",
        height: "100vh",
        p: "50px 50px 0 50px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={!!errors.tutorialTitle}
          helperText={
            errors?.tutorialTitle ? errors?.tutorialTitle?.message : ""
          }
          label="Numele Tutorialului"
          {...register("tutorialTitle")}
        />

        <Controller
          name="textLength"
          control={control}
          render={({ field }): JSX.Element => (
            <TinyMCE
              field={field}
              setText={setDescription}
              placeholder="descriere tutorial..."
            />
          )}
        />
        <p>{errors?.textLength ? errors?.textLength?.message : ""}</p>

        <Button type="submit" variant="contained">
          submit
        </Button>
      </form>

      {showLink && (
        <Link href={`/courses/set-course-chapters/${tutorialId}`}>
          <Button variant="contained">du-ma catre crearea tutorialului</Button>
        </Link>
      )}
    </Box>
  );
};

export default SetTitleAndDescription;
