import { SWRConfig } from "swr";
import axios from "axios";
import Courses from "../../../../../../components/OwnerAdminPanel/LearningMaterial/Courses";
import Navbar from "../../../../../../components/OwnerAdminPanel/Navbar/Navbar";
import apiURL from "../../../../../../components/ApiURL/ApiURL";

function courses(props: any) {
  const { fallback } = props;

  return (
    <>
      <Navbar />
      <SWRConfig value={{ fallback }}>
        <Courses />
      </SWRConfig>
    </>
  );
}

export default courses;

export async function getServerSideProps(context: any) {
  const { subjectId } = context.query;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const courses = await axios.get(`${apiURL}/courses`);

  return {
    props: { fallback: { [`${apiURL}/courses`]: courses.data[subjectId - 1] } },
  };
}
