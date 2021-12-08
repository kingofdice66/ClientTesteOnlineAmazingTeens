import { SWRConfig } from "swr";
import axios from "axios";
import apiURL from "../../../../../../../components/ApiURL/ApiURL";
import Chapters from "../../../../../../../components/OwnerAdminPanel/LearningMaterial/Chapters";
import Navbar from "../../../../../../../components/OwnerAdminPanel/Navbar/Navbar";

function chapters(props: any): JSX.Element {
  const { fallback } = props;

  return (
    <>
      <Navbar />
      <SWRConfig value={{ fallback }}>
        <Chapters />
      </SWRConfig>
    </>
  );
}

export default chapters;

interface ISSP {
  props: { fallback: { [x: string]: any } };
}

export async function getServerSideProps(context: any): Promise<ISSP> {
  const { query } = context;
  const { subjectId, courseId } = query;

  console.log("subjectId: ", subjectId);
  console.log("courseId: ", courseId);

  // eslint-disable-next-line no-underscore-dangle
  const chapters_ = await axios.get(`${apiURL}/chapters`);
  return {
    props: {
      fallback: {
        [`${apiURL}/chapters`]: chapters_.data[subjectId - 1][courseId - 1],
      },
    },
  };
}
