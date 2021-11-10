import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import apiURL from "../../ApiURL/ApiURL";

const EXIT_SUCCESS = 0;
const EXIT_FAILED = 1;

function SetChapter(): JSX.Element {
  const router = useRouter();
  const { subjectId, courseId, showSetChaptersBtn } = router.query;

  const timoutRef = useRef<NodeJS.Timeout>(null);
  const [chapterName, setChapterName] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  const uploadChapterNameToDatabase = (): number => {
    // ##################################################################
    // #####         If input field is empty, give a warning        #####
    // ##################################################################
    const pattern = /^[ ]*$/;
    if (chapterName.length === 0 || pattern.test(chapterName)) {
      setInputError("Campul nu poate fi gol");

      return EXIT_FAILED; // Exit. Don't send data to database.
    }
    // ##################################################################

    axios
      .post(`${apiURL}/setChapters`, { chapterName, subjectId, courseId })
      .then((res: any) => console.log("res: ", res))
      .catch((err: any) => console.error(err));

    setChapterName(""); // Clear textarea;

    return EXIT_SUCCESS;
  };

  return (
    <div>
      <label htmlFor="chapterName">
        <span>Numele capitolului</span>
        <br />
        <textarea
          id="chapterName"
          placeholder="Scrie aici numele capitolului ..."
          value={chapterName}
          onChange={(e): void => setChapterName(e.target.value)}
        />
      </label>
      <br />
      {
        // prettier-ignore
        inputError.length !== 0 ? <div><span>{inputError}</span></div> : ""
      }
      {
        // prettier-ignore
        showSetChaptersBtn === "yes" ? <button type="button" onClick={uploadChapterNameToDatabase}><span>Seteaza Numele Capitolului</span></button> : ""
      }
    </div>
  );
}

export default SetChapter;
