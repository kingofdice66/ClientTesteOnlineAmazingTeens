import React from "react";
import Link from "next/link";
import slugify from "slugify";
import useSWR from "swr";
import { v4 as uuidV4 } from "uuid";
import apiURL from "../ApiURL/ApiURL";

function Topics(): JSX.Element {
  const { data, error } = useSWR(`${apiURL}/getForumTopics`);

  console.log("data: ", data);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return data.map((x: any) => (
    <React.Fragment key={uuidV4()}>
      <Link
        href={`/forum/topic/${x.user_id}/${slugify(x.title).toLowerCase()}`}
        passHref
      >
        <a href="dummy">{x.title}</a>
      </Link>
      <br />
    </React.Fragment>
  ));
}

export default Topics;
