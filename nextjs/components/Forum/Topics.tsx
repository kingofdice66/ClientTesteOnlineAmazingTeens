import useSWR from "swr";
import { v4 as uuidV4 } from "uuid";
import apiURL from "../ApiURL/ApiURL";

function Topics(): JSX.Element {
  const { data, error } = useSWR(`${apiURL}/getForumTopics`);

  console.log("data: ", data);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return data.map((x: any) => (
    <div key={uuidV4()} dangerouslySetInnerHTML={{ __html: `${x.comment}` }} />
  ));
}

export default Topics;
