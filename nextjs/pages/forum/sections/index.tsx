import axios from "axios";
import { SWRConfig } from "swr";
import Sections from "../../../components/Forum/Sections";
import ApiURL from "../../../components/ApiURL/ApiURL";

const index = (props: any): JSX.Element => {
  const { fallback } = props;

  return (
    <SWRConfig value={{ fallback }}>
      <Sections />
    </SWRConfig>
  );
};

export default index;

interface ISSP {
  props: { fallback: { [x: string]: any } };
}

export const getServerSideProps = async (): Promise<ISSP> => {
  const sections = await axios.post(`${ApiURL}/GetSections/Get`);

  return {
    props: { fallback: { [`${ApiURL}/GetSections/Get`]: sections.data } },
  };
};
