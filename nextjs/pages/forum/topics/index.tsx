import { SWRConfig } from "swr";
import axios from "axios";
import Forum from "../../../components/Forum/Topics";
import apiURL from "../../../components/ApiURL/ApiURL";

function forum(props: any): JSX.Element {
  const { fallback } = props;

  return (
    <SWRConfig value={{ fallback }}>
      <Forum />
    </SWRConfig>
  );
}

export default forum;

interface ISSP {
  props: {
    fallback: {
      [x: string]: any;
    };
  };
}

export async function getServerSideProps(): Promise<ISSP> {
  const topics = await axios.get(`${apiURL}/getForumTopics`);

  return {
    props: { fallback: { [`${apiURL}/getForumTopics`]: topics.data } },
  };
}
