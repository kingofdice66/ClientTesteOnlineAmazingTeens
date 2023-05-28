/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import ApiURL from "../ApiURL/ApiURL";

const MinMax = {
  title: {
    min: 10,
    max: 50,
  },
  description: {
    min: 10,
    max: 500,
  },
};

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .min(MinMax.title.min, `Minim ${MinMax.title.min} caractere`)
    .max(MinMax.title.max, `Maxim ${MinMax.title.max} caractere`),
  description: yup
    .string()
    .nullable()
    .transform((v) => (v === "" ? null : v))
    .min(MinMax.description.min, `Minim ${MinMax.description.min} caractere`)
    .max(MinMax.description.max, `Maxim ${MinMax.description.max} caractere`),
});

type UseForm = yup.InferType<typeof schema>;

const MakeSection = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: UseForm): void => {
    console.log(data.description);
    console.log(data.title);
    axios
      .post(`${ApiURL}/SetSection/Set`, {
        title: data.title,
        description: data.description,
      })
      .then((response): void => console.log(response))
      .catch((error): void => error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.title}
        label="Titlul"
        helperText={
          // prettier-ignore
          errors?.title ? errors?.title?.message : ""
        }
        {...register("title")}
      />
      <br />

      <TextField
        error={!!errors.description}
        label="Descriere"
        multiline
        rows={5}
        helperText={
          // prettier-ignore
          errors?.description ? errors?.description?.message : ""
        }
        {...register("description")}
      />
      <br />

      <Button type="submit" variant="contained">
        POSTEAZĂ
      </Button>
    </form>
  );
};

export default MakeSection;
