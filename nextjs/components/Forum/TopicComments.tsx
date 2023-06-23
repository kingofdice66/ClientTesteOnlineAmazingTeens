/* eslint-disable react/no-danger */
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Box } from "@mui/material";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import ApiURL from "../ApiURL/ApiURL";
import TinyMCE from "../TinyMCE/TinyMCE";
import QuoteStyle from "../../public/TinyMCE.module";

import {
  RgxBlockquote,
  RgxRemoveQuotes,
  RgxRemoveWhiteSpace,
} from "../../helpers/Regex";

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
  id: number;
  comment: string;
  created_by: string;
  created_at: string;
}

interface Replies {
  reply: string;
}

type IReplies = Replies[];

const TopicComments = (): JSX.Element => {
  const { sectionId, subsectionId, topicId } = useRouter().query;
  const { data, error } = useSWR(`${ApiURL}/GetTopicComments/Get`);
  // TinyMCE text.
  const [comment, setComment] = useState<string | null>(null);
  // TinyMCE editor parameter.
  const [editor, setEditor] = useState<any>(null);
  // The replies that the usef just entered. They will be shown temporarily on the current page.
  const [replies, setReplies] = useState<IReplies | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UseForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      textLength: "",
    },
  });

  // console.log(data);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  const onSubmit = (): void => {
    axios
      .post(`${ApiURL}/SetTopicComment/Set`, {
        sectionId,
        subsectionId,
        topicId,
        comment,
      })
      .then((response) => {
        // prettier-ignore
        setReplies((prevState: IReplies | null) => [...prevState || [], { reply: comment || "" }]);

        // Clear TinyMCE text area.
        editor.setContent("");

        console.log(response.data);
      })
      .catch((error_) => error_);

    console.log(typeof comment);
  };

  const reply = (id: number): void => {
    axios
      .post(`${ApiURL}/GetTopicComment/Get`, {
        sectionId,
        subsectionId,
        topicId,
        commentId: id,
      })
      .then((response) => {
        // eslint-disable-next-line no-underscore-dangle
        let comment_ = RgxRemoveQuotes(response.data);
        comment_ = RgxBlockquote(comment_);
        comment_ = RgxRemoveWhiteSpace(comment_);

        editor.insertContent(
          `<blockquote class="topic_comments" data-quote="kingofdice66" data-post="1434" data-member="1234">
              ${comment_}
           </blockquote><br/>`
        );
      })
      .catch((error_) => error_);

    // editor.insertContent(
    //   `<blockquote class="topic_comments" data-quote="kingofdice66" data-post="1434" data-member="1234">
    //       <p class="comment">
    //         Blockquote text
    //       </p>
    //   </blockquote><br/>`
    // );
  };

  return (
    <>
      {data !== "empty" ? (
        data.map((x: ITopicComments): JSX.Element => {
          // eslint-disable-next-line no-underscore-dangle
          let comment_ = RgxBlockquote(x.comment);
          comment_ = RgxRemoveWhiteSpace(comment_);

          return (
            <div key={uuidv4()}>
              <div dangerouslySetInnerHTML={{ __html: comment_ }} />
              <Button variant="contained" onClick={(): void => reply(x.id)}>
                Răspunde
              </Button>
            </div>
          );
        })
      ) : (
        <div>Nothing to see</div>
      )}

      {replies !== null
        ? replies.map(
            (x: any): JSX.Element => (
              <div key={uuidv4()}>
                <Box>Postat de tine acum:</Box>
                <Box dangerouslySetInnerHTML={{ __html: x.reply }} />
              </div>
            )
          )
        : ""}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="textLength"
          control={control}
          render={({ field }): JSX.Element => (
            <TinyMCE field={field} setText={setComment} setEditor={setEditor} />
          )}
        />
        <Box sx={{ color: "red" }}>{errors?.textLength?.message}</Box>

        <Button type="submit" variant="contained">
          POSTEAZĂ
        </Button>
      </form>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>
        {QuoteStyle}
      </style>
    </>
  );
};

export default TopicComments;
