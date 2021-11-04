import useSWR from "swr";
import apiURL from "../../ApiURL/ApiURL";

function Chapters() {
  // const { data, error } = useSWR(`${apiURL}/chapters`);

  // if (!data) return <h1>Loading...</h1>;
  // if (error) return <h1>Error</h1>;

  return (
    <>
      <div>ChaptersX</div>
      {
        // data.map((chapter: any) => (
        //   <div key={chapter.id}>{chapter.name}</div>
        // ))
      }
    </>
  );
}

export default Chapters;
