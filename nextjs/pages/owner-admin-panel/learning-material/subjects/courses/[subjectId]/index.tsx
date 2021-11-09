import { SWRConfig } from "swr";
import axios from "axios";
import Courses from "../../../../../../components/OwnerAdminPanel/LearningMaterial/Courses";
import Navbar from "../../../../../../components/OwnerAdminPanel/Navbar/Navbar";
import apiURL from "../../../../../../components/ApiURL/ApiURL";

function courses(props: any): JSX.Element {
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

interface ISSP {
  props: {
    fallback: {
      [x: string]: any;
    };
  };
}

export async function getServerSideProps(context: any): Promise<ISSP> {
  const { subjectId } = context.query;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const courses = await axios.post(`${apiURL}/getCourses`, { subjectId });

  return {
    props: { fallback: { [`${apiURL}/getCourses`]: courses.data } },
  };
}
