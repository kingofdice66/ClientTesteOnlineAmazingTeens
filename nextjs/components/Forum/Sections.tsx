import React from "react";
import { Button } from "@mui/material";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import ApiURL from "../ApiURL/ApiURL";

const Sections = (): JSX.Element => {
  const { data, error } = useSWR(`${ApiURL}/GetSections/Get`);

  console.log(data);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return data.map((x: any) => (
    <React.Fragment key={uuidv4()}>
      <Link href={`/forum/subsections/${x.id}`}>
        <div>Title: {x.title}</div>
        <div>Description: {x.description}</div>
      </Link>
      <br />
      <Link href={`/forum/make-subsection/${x.id}`}>
        <Button variant="contained">Crează Subsecțiune</Button>
      </Link>
    </React.Fragment>
  ));
};

export default Sections;
