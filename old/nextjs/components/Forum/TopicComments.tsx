import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { v4 as uuidV4 } from "uuid";
import useSWR from "swr";
import axios from "axios";
import RegexForumFunctions from "../CustomComponents/RegexForumFunctions/RegexForumFunctions";
import apiURL from "../ApiURL/ApiURL";
import TinyMCE from "../CustomComponents/TinyMCE/TinyMCE";
import style from "./TopicComments.module.scss";

interface IPosition {
  x: any;
  y: any;
}

function Topic(): JSX.Element {
  const regex = new RegexForumFunctions();
  const router = useRouter();
  const { data, error } = useSWR(`${apiURL}/getForumTopicComments`);
  // prettier-ignore
  const [editorPosition, setEditorPosition] = useState<IPosition>({x: 0, y: 0,}); // Editor scroll position
  const [editorContent, setEditorContent] = useState<string>("");
  const concatCommentsRef = useRef<string>(""); // Concatenate multiple replies.
  const editorRef = useRef<any>();

  // #######################################################
  // ####### Get editor and preview comment  position ######
  // #######################################################
  // Get the editor position to scroll to its position
  // when replying to comments.
  useEffect(() => {
    const editorPos = document.getElementById("editor");
    // Get element position
    setEditorPosition((prevState) => {
      // eslint-disable-next-line no-param-reassign
      prevState.x = editorPos?.offsetLeft;
      // eslint-disable-next-line no-param-reassign
      prevState.y = editorPos?.offsetTop;
      return { ...prevState };
    });
  }, []);
  // #######################################################

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  // Reply to chosen comment/comments.
  // prettier-ignore
  const replyToComment = (commentId: number, topicId: number, userId: number, username: string): void => {
    axios
      .post(`${apiURL}/getForumTopicCommentsForRely`, { commentId, topicId, userId, username })
      .then((comment: any) => {
        concatCommentsRef.current += comment.data;
        concatCommentsRef.current = regex.removeBrakesBetweenQuotes(concatCommentsRef.current);
        editorRef.current.setContent(concatCommentsRef.current); // Set editor content.
      })
      .catch((err: any) => console.error(err));

      // Scroll to editor position
      window.scrollTo({ 
        top: editorPosition.y,
        left: editorPosition.x,
        behavior: "smooth",
      });
  };

  // Post reply to database.
  const postReply = (): void => {
    const { topicId } = router.query;

    console.log("editorContent: ", editorContent);

    axios
      .post(
        `${apiURL}/setReplyForumTopicComments`,
        { comment: editorContent, topicId },
        { withCredentials: true }
      )
      .then((res: any) => router.replace(router.asPath))
      .catch((err: any) => console.error(err));

    concatCommentsRef.current = ""; // Clear text
    editorRef.current.setContent(""); // Clear editor content

    // router.replace(router.asPath);
  };

  /** Function is called every time editor content is changed. */
  const handleOnEditorChange = (evt: any): void => {
    setEditorContent(evt);
    concatCommentsRef.current = evt;
  };

  return (
    <>
      {data.map((x: any) => (
        <React.Fragment key={uuidV4()}>
          <div>
            <div className={style.commentInfo}>
              <span style={{ color: "white", fontWeight: "bold" }}>
                Creat la: {x.created_at} UTC &nbsp; &nbsp;&nbsp; COMMENT ID:{" "}
                {x.comment_id}
              </span>
            </div>
            <div style={{ backgroundColor: "green", color: "white" }}>
              Postat de: {x.username}
            </div>
            <div
              id={`comment_id${x.comment_id}`} // For bookmarks so user can jump to this comment when user want's to know the original quote.
              dangerouslySetInnerHTML={{ __html: `${x.comment}` }}
            />
            {/* prettier-ignore */}
            <button type="button" onClick={(): void => replyToComment(x.comment_id, x.topic_id, x.user_id, x.username)}>
              Răspunde
            </button>
          </div>
        </React.Fragment>
      ))}
      <br />
      {/* prettier-ignore */}
      <TinyMCE
        onInit={(evt: any, editor: any): void => { editorRef.current = editor }}
        height={150}
        onEditorChange={(evt: any, editor: any): void => handleOnEditorChange(evt)}
        initialValue="<h1>Hello Comment!</h1>"
      />
      <br />
      <div id="editor" />
      {/* prettier-ignore */}
      <button type="button" onClick={postReply}>Postează Răspunsul</button>
      &nbsp;&nbsp;&nbsp;
    </>
  );
}

export default Topic;
