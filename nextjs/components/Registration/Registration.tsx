/* eslint-disable react/jsx-props-no-spreading */
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
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
    max: 150,
  },
  password: {
    min: 8,
    max: 150,
  },
  retypePassword: {
    min: 8,
    max: 150,
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
    .min(MinMax.username.min, `Minim ${MinMax.username.min} caractere`)
    .max(MinMax.username.max, `Maxim ${MinMax.username.max} caractere`),
  email: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .email("Adresa de email nu este validă")
    .min(MinMax.email.min, `Minim ${MinMax.email.min} caractere`)
    .max(MinMax.email.max, `Maxim ${MinMax.email.max} caractere`),
  firstName: yup
    .string()
    .nullable()
    .transform((v) => (v === "" ? null : v))
    .min(MinMax.firstName.min, `Minim ${MinMax.firstName.min} caractere`)
    .max(MinMax.firstName.max, `Maxim ${MinMax.firstName.max} caractere`),
  lastName: yup
    .string()
    .nullable()
    .transform((v) => (v === "" ? null : v))
    .min(MinMax.lastName.min, `Minim ${MinMax.lastName.min} caractere`)
    .max(MinMax.lastName.max, `Maxim ${MinMax.lastName.max} caractere`),
  dateOfBirth: yup
    .date()
    .required("Câmpul nu poate fi gol")
    .max(new Date("2100-12-31"), "Data nu este validă")
    .typeError("Data nu este validă"),
  gender: yup.string().required("Alegerea sexului este necesar"),
  password: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .min(MinMax.password.min, `Minimum ${MinMax.password.min} caractere`)
    .max(MinMax.password.max, `Maximum ${MinMax.password.max} caractere`),
  retypePassword: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .oneOf([yup.ref("password")], "Parola nu se potrivește"),
});

type UseForm = yup.InferType<typeof schema>;

/**
 * For the date format. For example, if the day is 1 and month is 4 then it will return 01 and 04 for compatibility.
 * The server has to receive the date in the format "dd/MM/yyyy". For example "01/04/2020".
 */
const DateFormat = (date: number): string => {
  if (date < 10) return `0${date}`;

  return `${date}`;
};

const Registration = (): JSX.Element => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseForm>({
    resolver: yupResolver<UseForm>(schema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: undefined,
      gender: "",
      password: "",
      retypePassword: "",
    },
  });

  const onSubmit = (data: UseForm): void => {
    axios
      .post("http://localhost:5177/registration/registeruser", {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        // prettier-ignore
        dateOfBirth: 
              `${DateFormat(data.dateOfBirth.getDate())}/` + 
              `${DateFormat(data.dateOfBirth.getMonth() + 1)}/` + 
              `${DateFormat(data.dateOfBirth.getFullYear())}`,
        gender: data.gender,
        password: data.password,
      })
      .then((resp) => console.log(resp.data))
      .catch((error) => error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.username}
        label="Nume utilizator *"
        helperText={
          // prettier-ignore
          errors?.username ? errors?.username?.message : ""
        }
        {...register("username")}
      />
      <br />

      <TextField
        error={!!errors.email}
        label="Email *"
        helperText={
          // prettier-ignore
          errors?.email ? errors?.email?.message : ""
        }
        {...register("email")}
      />
      <br />

      <TextField
        error={!!errors.firstName}
        label="Nume"
        helperText={
          // prettier-ignore
          errors?.firstName ? errors?.firstName?.message : ""
        }
        {...register("firstName")}
      />
      <br />

      <TextField
        error={!!errors.lastName}
        label="Prenume"
        helperText={
          // prettier-ignore
          errors?.lastName? errors?.lastName?.message : ""
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
              label="Anul nașterii *"
              onChange={(date: any): void => field.onChange(date)}
              slotProps={{
                textField: {
                  // prettier-ignore
                  helperText: errors.dateOfBirth ? errors?.dateOfBirth?.message : "",
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
      <br />

      <Controller
        name="gender"
        control={control}
        render={({ field }): JSX.Element => (
          <FormControl error={!!errors.gender}>
            <FormLabel id="gender">Sex: *</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender"
              onChange={(e): void => field.onChange(e)}
            >
              <FormControlLabel
                value="masculin"
                control={<Radio />}
                label="Masculin"
              />
              <FormControlLabel
                value="feminin"
                control={<Radio />}
                label="Feminin"
              />
              <FormControlLabel
                value="altul"
                control={<Radio />}
                label="Altul"
              />
            </RadioGroup>
          </FormControl>
        )}
      />
      <FormHelperText sx={{ color: "red" }}>
        {errors?.gender?.message}
      </FormHelperText>
      <br />

      <TextField
        error={!!errors.password}
        label="Parola"
        type="password"
        helperText={
          // prettier-ignore
          errors?.password ? errors?.password?.message : ""
        }
        {...register("password")}
      />
      <br />

      <TextField
        error={!!errors.password}
        label="Rescrie parola"
        type="password"
        helperText={
          // prettier-ignore
          errors?.retypePassword ? errors?.retypePassword?.message : ""
        }
        {...register("retypePassword")}
      />

      <FormHelperText>Câmpurile marcate cu * sunt obligatorii</FormHelperText>

      <Button variant="contained" type="submit">
        Înregistrează-mă
      </Button>
    </form>
  );
};

export default Registration;
