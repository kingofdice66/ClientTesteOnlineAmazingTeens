import { useState, useRef, useEffect } from "react";
import axios from "axios";
import apiURL from "../ApiURL/ApiURL";
import TinyMCE from "../CustomComponents/TinyMCE/TinyMCE";

function CreateNewTopic(): JSX.Element {
  const timeoutCommentRef = useRef<NodeJS.Timeout>();
  const timeoutTitleRef = useRef<NodeJS.Timeout>();
  const [title, setTitle] = useState<string>("");

  /**
   * This is used to prevent 'useEffect(()=> {...},[title])'
   * from updating data to the database too early.
   */
  const countRef = useRef<number>(2);

  /** Save new topic comment as you type as draft in database. */
  const handleOnEditorChange = (evt: any, editor: any): void => {
    // #################################################################
    // #######                    setTimeout()                   #######
    // #################################################################
    /**
     * "setTimeout()" necessary here because we don't want to send the data
     * to the database on every key press. It waits for 0.75 seconds after
     * each key press.
     */
    if (timeoutCommentRef.current) {
      clearTimeout(timeoutCommentRef.current);
    }

    // prettier-ignore
    timeoutCommentRef.current = setTimeout((): Promise<any> => 
      axios.post(`${apiURL}/setDraftsNewTopic_Comment`, {comment: evt}),
      0.75 * 1000
    );
    // #################################################################
  };

  /**
   * Count countRef to 0 first in order for 'useEffect(()=>{...},[title])'
   * to not send data to the database too early because 'title' state will update
   * immediately first setting state initially to "" causing 'useEffect' to be
   * called which it is not desired on the first go.
   * */
  useEffect(() => {
    if (countRef.current !== 0) {
      countRef.current--;
    }
  }, [title]);

  /** Save new topic title as you type as draft in database. */
  useEffect(() => {
    if (countRef.current === 0) {
      // #################################################################
      // #######                    setTimeout()                   #######
      // #################################################################
      /**
       * "setTimeout()" necessary here because we don't want to send the data
       * to the database on every key press. It waits for 0.75 seconds after
       * each key press.
       */
      if (timeoutTitleRef.current) {
        clearTimeout(timeoutTitleRef.current);
      }

      // prettier-ignore
      timeoutTitleRef.current = setTimeout((): Promise<any> =>
          axios.post(`${apiURL}/setDraftsNewTopic_Title`, { title }),
        0.75 * 1000
      );
      // #################################################################
    }
  }, [title]);

  return (
    <>
      <label htmlFor="topic">
        Creeaza topic:
        <br />
        <input
          id="topic"
          value={title}
          onChange={(e): void => setTitle(e.target.value)}
          placeholder="Numele topicului..."
        />
      </label>
      <br />
      <br />
      <TinyMCE
        // prettier-ignore
        onEditorChange={(evt: any, editor: any): void => handleOnEditorChange(evt, editor)} // It gets executed upon editor changes like typing, text bolding etc.
        initialValue="<h1>Hello There!</h1>"
      />
    </>
  );
}

export default CreateNewTopic;
