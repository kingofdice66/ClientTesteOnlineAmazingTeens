import { useRouter } from "next/router";

const Topics = (): JSX.Element => {
  const { sectionId, subsectionId } = useRouter().query;

  return (
    <>
      <div>Topics</div>
      <div>sectionId: {sectionId}</div>
      <div>subsectionId: {subsectionId}</div>
    </>
  );
};

export default Topics;
