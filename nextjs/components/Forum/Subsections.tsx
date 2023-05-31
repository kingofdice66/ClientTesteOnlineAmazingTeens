import React from "react";
import { Button } from "@mui/material";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { useRouter } from "next/router";
import ApiURL from "../ApiURL/ApiURL";

interface ISubsections {
  id: string;
  title: string;
  description: string;
}

const Subsections = (): JSX.Element => {
  const { data, error } = useSWR(`${ApiURL}/GetSubsections/Get`);
  const { sectionId } = useRouter().query;

  console.log(data);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return data.map((x: ISubsections) => (
    <React.Fragment key={uuidv4()}>
      <Link href="#test">
        <div>Title: {x.title}</div>
      </Link>

      <div>Description: {x.description}</div>

      <Link href={`/forum/sections/${sectionId}/subsections/${x.id}`}>
        <Button variant="contained">Crează Topic</Button>
      </Link>
    </React.Fragment>
  ));
};

export default Subsections;
