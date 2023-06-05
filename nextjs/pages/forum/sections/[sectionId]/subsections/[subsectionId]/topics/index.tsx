import axios from "axios";
import { SWRConfig } from "swr";
import Topics from "../../../../../../../components/Forum/Topics";
import ApiURL from "../../../../../../../components/ApiURL/ApiURL";

const index = (props: any): JSX.Element => {
  const { fallback } = props;

  return (
    <SWRConfig value={{ fallback }}>
      <Topics />
    </SWRConfig>
  );
};

export default index;

interface ITopics {
  title: string;
}

interface ISSP {
  props: { fallback: { [key: string]: ITopics[] } };
}

export const getServerSideProps = async (context: any): Promise<ISSP> => {
  const { sectionId, subsectionId } = context.query;
  // prettier-ignore
  const topics = await axios.post(`${ApiURL}/GetTopics/Get`, {sectionId, subsectionId});

  return {
    props: { fallback: { [`${ApiURL}/GetTopics/Get`]: topics.data } },
  };
};
