/* eslint-disable react/no-danger */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Box } from "@mui/material";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { useRouter } from "next/router";
import ApiURL from "../ApiURL/ApiURL";
import TinyMCE from "../TinyMCE/TinyMCE";

const MinMax = {
  // Character length that does not contain the HTML from TinyMCE. Used only for control. Will not be going to database.
  textLength: {
    min: 10,
    max: 10000,
  },
};

const schema = yup.object().shape({
  textLength: yup
    .string()
    .required("Câmpul nu poate fi gol")
    .min(MinMax.textLength.min, `Minim ${MinMax.textLength.min} caractere`)
    .max(MinMax.textLength.max, `Maxim ${MinMax.textLength.max} caractere`),
});

type UseForm = yup.InferType<typeof schema>;

interface ITopicComments {
  comment: string;
  created_by: string;
  created_at: string;
}

const TopicComments = (): JSX.Element => {
  const { sectionId, subsectionId, topicId } = useRouter().query;

  const { data, error } = useSWR(`${ApiURL}/GetTopicComments/Get`);

  const [comment, setComment] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      textLength: "",
    },
  });

  console.log(data);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  const onSubmit = (data_: UseForm): void => {
    console.log(data_);
    console.log(comment);
  };

  return (
    <>
      {data.map((x: ITopicComments) => (
        <div key={uuidv4()}>
          <div dangerouslySetInnerHTML={{ __html: x.comment }} />
        </div>
      ))}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="textLength"
          control={control}
          render={({ field }): JSX.Element => (
            <TinyMCE field={field} setText={setComment} />
          )}
        />
        <Box sx={{ color: "red" }}>{errors?.textLength?.message}</Box>

        <Button type="submit" variant="contained">
          POSTEAZĂ
        </Button>
      </form>
    </>
  );
};

export default TopicComments;
