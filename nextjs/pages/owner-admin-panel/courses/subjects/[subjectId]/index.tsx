import axios from "axios";
import Navbar from "../../../../../components/OwnerAdminPanel/Navbar";
import Subjects from "../../../../../components/OwnerAdminPanel/Subjects";

function subjects(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { subjects } = props; //

  return (
    <>
      <Navbar />
      <Subjects subjects={subjects} />
    </>
  );
}

export default subjects;

export async function getServerSideProps(context: any) {
  const { query } = context;
  const { subjectId } = query;

  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const subjects = await axios.get("http://localhost:4000/subjects");

  return { props: { subjects: subjects.data[subjectId - 1] } };
}
