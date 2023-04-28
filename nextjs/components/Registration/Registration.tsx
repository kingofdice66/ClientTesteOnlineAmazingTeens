/* eslint-disable react/jsx-props-no-spreading */
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ro";

dayjs.locale("ro");

const MinMax = {
  username: {
    min: 3,
    max: 20,
  },
  firstName: {
    min: 2,
    max: 50,
  },
  lastName: {
    min: 2,
    max: 50,
  },
  email: {
    min: 2,
    max: 300,
  },
};

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .matches(
      /^(?![_-])[a-zA-Z0-9_-]+$/,
      "Format neacceptat. Poate să conțină numai numere, litere, '_' și/sau '-'. Fără '-' și/sau '_' la început."
    ) // The username must not start with "-" or/and "_"
    // and must contain only letter and numbers and is not allowed on multiple lines
    .min(MinMax.username.min, `Minimum ${MinMax.username.min} caractere`)
    .max(MinMax.username.max, `Maximum ${MinMax.username.max} caractere`),
  email: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .email("Adresa de email nu este validă")
    .min(MinMax.email.min, `Minimum ${MinMax.email.min} caractere`)
    .max(300),
  firstName: yup
    .string()
    .nullable()
    .transform((v) => (v === "" ? null : v))
    .min(MinMax.firstName.min, `Minimum ${MinMax.firstName.min} caractere`)
    .max(MinMax.firstName.max, `Maximum ${MinMax.firstName.max} caractere`),
  lastName: yup
    .string()
    .nullable()
    .transform((v) => (v === "" ? null : v))
    .min(MinMax.lastName.min, `Minimum ${MinMax.lastName.min} caractere`)
    .max(MinMax.lastName.max, `Maximum ${MinMax.lastName.max} caractere`),
  dateOfBirth: yup
    .date()
    .required("Câmpul nu poate fi gol")
    .max(new Date("2100-12-31"), "Data nu este validă")
    .typeError("Data nu este validă"),
});

type UseForm = yup.InferType<typeof schema>;

const Registration = (): JSX.Element => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: new Date("0000-00-00"), // set to `0000-00-00` intentionally in order to give an error if is not filled
    },
  });

  const onSubmit = (data: UseForm): void => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.username}
        label="Nume utilizator"
        helperText={
          // prettier-ignore
          errors?.username ? errors?.username?.message : "Câmp obligatoriu"
        }
        {...register("username")}
      />
      <br />

      <TextField
        error={!!errors.email}
        label="Email"
        helperText={
          // prettier-ignore
          errors?.email ? errors?.email?.message : "Câmp obligatoriu"
        }
        {...register("email")}
      />
      <br />

      <TextField
        error={!!errors.firstName}
        label="Nume"
        helperText={
          // prettier-ignore
          errors?.firstName ? errors?.firstName?.message : "Câmpul nu este obligatoriu"
        }
        {...register("firstName")}
      />
      <br />

      <TextField
        error={!!errors.lastName}
        label="Prenume"
        helperText={
          // prettier-ignore
          errors?.lastName? errors?.lastName?.message : "Câmpul nu este obligatoriu"
        }
        {...register("lastName")}
      />
      <br />

      <Controller
        name="dateOfBirth"
        control={control}
        render={({ field }): JSX.Element => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              label="An naștere"
              onChange={(date): void => field.onChange(date)}
              slotProps={{
                textField: {
                  // prettier-ignore
                  helperText: errors.dateOfBirth ? errors?.dateOfBirth?.message : "Câmp obligatoriu",
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
      <br />

      <Button variant="contained" type="submit">
        Înregistrează-mă
      </Button>
    </form>
  );
};

export default Registration;
