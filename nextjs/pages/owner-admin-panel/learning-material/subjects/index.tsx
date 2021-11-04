import { SWRConfig } from "swr";
import axios from "axios";
import Navbar from "../../../../components/OwnerAdminPanel/Navbar";
import Subjects from "../../../../components/OwnerAdminPanel/Subjects";
import apiURL from "../../../../components/ApiURL/ApiURL";

function subjects(props: any) {
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

export async function getServerSideProps() {
  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const subjects = await axios.get(`${apiURL}/subjects`);

  return {
    props: { fallback: { [`${apiURL}/subjects`]: subjects.data } },
  };
}
