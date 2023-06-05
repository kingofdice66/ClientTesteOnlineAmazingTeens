/* eslint-disable react/no-danger */
import React from "react";
import { Button } from "@mui/material";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { useRouter } from "next/router";
import ApiURL from "../ApiURL/ApiURL";

interface ITopicComments {
  comment: string;
  created_by: string;
  created_at: string;
}

const TopicComments = (): JSX.Element => {
  const { data, error } = useSWR(`${ApiURL}/GetTopicComments/Get`);

  console.log(data);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return data.map((x: ITopicComments) => (
    <React.Fragment key={uuidv4()}>
      <div dangerouslySetInnerHTML={{ __html: x.comment }} />
    </React.Fragment>
  ));
};

export default TopicComments;
