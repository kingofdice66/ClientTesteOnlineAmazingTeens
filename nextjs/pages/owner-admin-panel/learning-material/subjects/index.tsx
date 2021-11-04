import { SWRConfig } from "swr";
import axios from "axios";
import Navbar from "../../../../components/OwnerAdminPanel/Navbar";
import Subjects from "../../../../components/OwnerAdminPanel/Subjects";

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
  const subjects = await axios.get("http://localhost:4000/subjects");

  return {
    props: { fallback: { "http://localhost:4000/subjects": subjects.data } },
  };
}
