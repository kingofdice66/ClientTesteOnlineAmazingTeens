import { SWRConfig } from "swr";
import axios from "axios";
import TopicComments from "../../../../../components/Forum/TopicComments";
import apiURL from "../../../../../components/ApiURL/ApiURL";

function index(props: any): JSX.Element {
  const { fallback } = props;

  return (
    <SWRConfig value={{ fallback }}>
      <TopicComments />
    </SWRConfig>
  );
}

export default index;

interface ISSP {
  props: { fallback: { [x: string]: any } };
}

export async function getServerSideProps(context: any): Promise<ISSP> {
  const { topicId } = context.params;
  // prettier-ignore
  const topics = await axios.post(`${apiURL}/getForumTopicComments`, { topicId });

  return {
    props: { fallback: { [`${apiURL}/getForumTopicComments`]: topics.data } },
  };
}
