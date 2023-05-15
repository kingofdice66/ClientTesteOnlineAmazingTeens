/* eslint-disable react/jsx-props-no-spreading */
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
  comment: {
    min: 10,
    max: 1000,
  },
};

const schema = yup.object().shape({
  subject: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .min(MinMax.subject.min, `Minim ${MinMax.subject.min} caractere`)
    .max(MinMax.subject.max, `Maxim ${MinMax.subject.max} caractere`),
  comment: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .min(MinMax.comment.min, "Prea puține caractere")
    .max(MinMax.comment.max, `Maxim ${MinMax.comment.max} caractere`),
});

type UseForm = yup.InferType<typeof schema>;

const MakeSection = (): JSX.Element => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      subject: "",
      comment: "",
    },
  });

  const onSubmit = (data: UseForm): void => {
    console.log(data);
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
        name="comment"
        control={control}
        render={({ field }): JSX.Element => <TinyMCE field={field} />}
      />
      <Box sx={{ color: "red" }}>{errors?.comment?.message}</Box>

      <Button type="submit" variant="contained">
        POSTEAZĂ
      </Button>
    </form>
  );
};

export default MakeSection;
