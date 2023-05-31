import axios from "axios";
import { SWRConfig } from "swr";
import Subsections from "../../../../../components/Forum/Subsections";
import ApiURL from "../../../../../components/ApiURL/ApiURL";

const index = (props: any): JSX.Element => {
  const { fallback } = props;

  return (
    <SWRConfig value={{ fallback }}>
      <Subsections />
    </SWRConfig>
  );
};

export default index;

interface ISubsections {
  title: string;
  description: string;
}

interface ISSP {
  props: {
    fallback: { [key: string]: ISubsections[] };
  };
}

export const getServerSideProps = async (context: any): Promise<ISSP> => {
  const { sectionId } = context.query;
  // prettier-ignore
  const subsections = await axios.post(`${ApiURL}/GetSubsections/Get`, { sectionId });

  return {
    props: { fallback: { [`${ApiURL}/GetSubsections/Get`]: subsections.data } },
  };
};
