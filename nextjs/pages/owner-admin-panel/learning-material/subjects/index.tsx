import { SWRConfig } from "swr";
import axios from "axios";
import Navbar from "../../../../components/OwnerAdminPanel/Navbar/Navbar";
import Subjects from "../../../../components/OwnerAdminPanel/LearningMaterial/Subjects";
import apiURL from "../../../../components/ApiURL/ApiURL";

function subjects(props: any): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { fallback } = props;

  return (
    <>
      <Navbar />
      <SWRConfig value={{ fallback }}>
        <Subjects />
      </SWRConfig>
    </>
  );
}

export default subjects;

interface ISSP {
  props: {
    fallback: {
      [x: string]: any;
    };
  };
}

export async function getServerSideProps(): Promise<ISSP> {
  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const subjects = await axios.get(`${apiURL}/getSubjects`);

  return {
    props: { fallback: { [`${apiURL}/getSubjects`]: subjects.data } },
  };
}
