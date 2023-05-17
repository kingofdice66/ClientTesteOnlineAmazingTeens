/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";
import TinyMCE from "../TinyMCE/TinyMCE";

const MinMax = {
  subject: {
    min: 10,
    max: 100,
  },
  // Character length that does not contain the HTML from TinyMCE. Used only for control. Will not be going to database.
  textLength: {
    min: 10,
    max: 10000,
  },
};

const schema = yup.object().shape({
  subject: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .min(MinMax.subject.min, `Minim ${MinMax.subject.min} caractere`)
    .max(MinMax.subject.max, `Maxim ${MinMax.subject.max} caractere`),
  textLength: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .min(MinMax.textLength.min, `Minim ${MinMax.textLength.min} caractere`)
    .max(MinMax.textLength.max, `Maxim ${MinMax.textLength.max} caractere`),
});

type UseForm = yup.InferType<typeof schema>;

const MakeSection = (): JSX.Element => {
  // contains the text from TinyMCE that contains HTML which will be going to database
  const [comment, setComment] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      subject: "",
      textLength: "",
    },
  });

  const onSubmit = (data: UseForm): void => {
    console.log(data);
    console.log(comment);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.subject}
        label="Descriere"
        helperText={
          // prettier-ignore
          errors?.subject ? errors?.subject?.message : ""
        }
        {...register("subject")}
      />
      <br />

      <Controller
        name="textLength"
        control={control}
        render={({ field }): JSX.Element => (
          <TinyMCE field={field} setComment={setComment} />
        )}
      />
      <Box sx={{ color: "red" }}>{errors?.textLength?.message}</Box>

      <Button type="submit" variant="contained">
        POSTEAZĂ
      </Button>
    </form>
  );
};

export default MakeSection;
