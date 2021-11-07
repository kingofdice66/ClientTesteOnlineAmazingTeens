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
      {/* <SWRConfig value={{ fallback }}>
        <Courses />
      </SWRConfig> */}
      <div>Courses</div>
    </>
  );
}

export default courses;

export async function getServerSideProps(context: any) {
  const { subjectId } = context.query;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const courses = await axios.post(`${apiURL}/getCourses`, { subjectId });

  console.log("courses: ", courses.data);

  return {
    props: {
      // fallback: { [`${apiURL}/getCourses`]: courses.data[subjectId - 1] },
    },
  };
}
