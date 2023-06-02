import { useRouter } from "next/router";
import { Button } from "@mui/material";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import ApiURL from "../ApiURL/ApiURL";

interface ITopics {
  title: string;
}

const Topics = (): JSX.Element => {
  const { data, error } = useSWR(`${ApiURL}/GetTopics/Get`);
  const { sectionId, subsectionId } = useRouter().query;

  console.log(data);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <>
      {/* prettier-ignore */}
      <Link href={`/forum/sections/${sectionId}/subsections/${subsectionId}/make-topic`}>
        <Button variant="contained">Crează Topic</Button>
      </Link>

      {data.map((x: ITopics) => (
        <div key={uuidv4()}>
          <div>{x.title}</div>
        </div>
      ))}
    </>
  );
};

export default Topics;
