import SWRConfig from "swr";
import Chapters from "../../../../../../../components/OwnerAdminPanel/LearningMaterial/Chapters";
import Navbar from "../../../../../../../components/OwnerAdminPanel/Navbar/Navbar";

function chapters() {
  return (
    <>
      <Navbar />
      <Chapters />
    </>
  );
}

export default chapters;
