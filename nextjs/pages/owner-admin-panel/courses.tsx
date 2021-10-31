import axios from "axios";
import Courses from "../../components/OwnerAdminPanel/Courses";
import Navbar from "../../components/OwnerAdminPanel/Navbar";

function courses(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { courses } = props;

  return (
    <>
      <Navbar />
      <Courses courses={courses} />
    </>
  );
}

export default courses;

export async function getServerSideProps() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const courses = await axios.get("http://localhost:4000/courses");

  console.log("data: ", courses.data);

  return { props: { courses: courses.data } };
}
