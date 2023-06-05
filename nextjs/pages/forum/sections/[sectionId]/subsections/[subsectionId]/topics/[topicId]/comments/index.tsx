import axios from "axios";
import { SWRConfig } from "swr";
import TopicComments from "../../../../../../../../../components/Forum/TopicComments";
import ApiURL from "../../../../../../../../../components/ApiURL/ApiURL";

const index = (props: any): JSX.Element => {
  const { fallback } = props;

  return (
    <SWRConfig value={{ fallback }}>
      <TopicComments />
    </SWRConfig>
  );
};

export default index;

interface ITopicComments {
  comment: string;
  created_by: string;
  created_at: string;
}

interface ISSP {
  props: { fallback: { [key: string]: ITopicComments[] } };
}

export const getServerSideProps = async (context: any): Promise<ISSP> => {
  const { sectionId, subsectionId, topicId } = context.query;

  // prettier-ignore
  const topicComments = await axios.post(`${ApiURL}/GetTopicComments/Get`, {sectionId, subsectionId, topicId});

  return {
    props: {
      fallback: { [`${ApiURL}/GetTopicComments/Get`]: topicComments.data },
    },
  };
};
