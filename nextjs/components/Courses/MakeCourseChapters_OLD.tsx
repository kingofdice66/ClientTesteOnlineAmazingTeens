import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import { Stepper } from "@mui/material";

// interface IFormValues{
//   items:{
//     name: string;
//     type: string;
//     amount:number
//   }
// }

const MakeCourseChapters = (): JSX.Element => {
  const { subjectId } = useRouter().query;
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  return <Stepper orientation="vertical"></Stepper>;
};

export default MakeCourseChapters;
