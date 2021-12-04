import useSWR from "swr";
import apiURL from "../ApiURL/ApiURL";

function Topic(): JSX.Element {
  const { data, error } = useSWR(`${apiURL}/getForumTopicComments`);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  console.log("data: ", data);

  return <div>TOPIC</div>;
}

export default Topic;
