/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import ApiURL from "../ApiURL/ApiURL";
import TinyMCE from "../TinyMCE/TinyMCE";

const MinMax = {
  title: {
    min: 3,
    max: 100,
  },
  // Character length that does not contain the HTML from TinyMCE. Used only for control. Will not be going to database.
  textLength: {
    min: 10,
    max: 10000,
  },
};

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .min(MinMax.title.min, `Minim ${MinMax.title.min} caractere`)
    .max(MinMax.title.max, `Maxim ${MinMax.title.max} caractere`),
  textLength: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .min(MinMax.textLength.min, `Minim ${MinMax.textLength.min} caractere`)
    .max(MinMax.textLength.max, `Maxim ${MinMax.textLength.max} caractere`),
});

type IUseForm = yup.InferType<typeof schema>;

const MakeTopic = (): JSX.Element => {
  const { sectionId, subsectionId } = useRouter().query;
  // contains the text from TinyMCE that contains HTML which will be going to database
  const [comment, setComment] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      textLength: "",
    },
  });

  const onSubmit = (data: IUseForm): void => {
    console.log(data);
    console.log(comment);
    axios
      .post(`${ApiURL}/SetTopic/Set`, {
        title: data.title,
        comment,
        sectionId,
        subsectionId,
      })
      .then((response) => console.log(response))
      .catch((error) => error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.title}
        label="Descriere"
        helperText={
          // prettier-ignore
          errors?.title ? errors?.title?.message : ""
        }
        {...register("title")}
      />
      <br />

      <Controller
        name="textLength"
        control={control}
        render={({ field }): JSX.Element => (
          <TinyMCE field={field} setText={setComment} placeholder="creaza topic..."/>
        )}
      />
      <Box sx={{ color: "red" }}>{errors?.textLength?.message}</Box>

      <Button type="submit" variant="contained">
        POSTEAZĂ
      </Button>
    </form>
  );
};

export default MakeTopic;
