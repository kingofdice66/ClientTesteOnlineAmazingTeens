import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { v4 as uuidV4 } from "uuid";
import useSWR from "swr";
import axios from "axios";
import apiURL from "../ApiURL/ApiURL";
import BlockQuoteComment from "../CustomComponents/ManipulateComments/BlockQuoteComment";
import RemoveBrBetweenBlockQuotes from "../CustomComponents/ManipulateComments/RemoveBrBetweenBlockQuotes";
import TinyMCE from "../CustomComponents/TinyMCE/TinyMCE";
import style from "./TopicComments.module.scss";

interface IPosition {
  x: any;
  y: any;
}

function Topic(): JSX.Element {
  const router = useRouter();
  const { data, error } = useSWR(`${apiURL}/getForumTopicComments`);
  // prettier-ignore
  const [editorPosition, setEditorPosition] = useState<IPosition>({x: 0, y: 0,}); // Editor scroll position
  const [editorContent, setEditorContent] = useState<string>("");
  const [commentPreview, setCommentPreview] = useState<string>("");
  const concatCommentsRef = useRef<string>(""); // Concatenate multiple replies.
  const editorRef = useRef<any>();

  // #######################################################
  // ####### Get editor and preview comment  position ######
  // #######################################################
  // Get the editor position to scroll to its position
  // when replying to comments.
  useEffect(() => {
    // Get element position.
    const editorPos = document.getElementById("editor");
    // Get element position
    const previewCommentPos = document.getElementById("previewComment");

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
      .then((res: any) => {
        const tmp = BlockQuoteComment(res.data.comment, username);
        concatCommentsRef.current += tmp;
        concatCommentsRef.current = RemoveBrBetweenBlockQuotes(concatCommentsRef.current);
        console.log(concatCommentsRef.current);
          editorRef.current.setContent(concatCommentsRef.current); // Set editor content.
      })
      .catch((err: any) => console.error(err));

      window.scrollTo({ 
        top: editorPosition.y,
        left: editorPosition.x,
        behavior: "smooth",
      });
  };

  // Post reply to database.
  const postReply = (): void => {
    const { topicId } = router.query;

    axios.post(
      `${apiURL}/setReplyForumTopicComments`,
      { comment: editorContent, topicId },
      { withCredentials: true }
    );

    concatCommentsRef.current = ""; // Clear text
    editorRef.current.setContent(""); // Clear editor content
  };

  const previewComment = (): void => {
    axios
      .post(`${apiURL}/previewTopicComments`, { comment: editorContent })
      .then((res: any) => setCommentPreview(res.data))
      .catch((err: any) => console.error(err));
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
      <div id="editor" />
      {/* prettier-ignore */}
      <TinyMCE
        onInit={(evt: any, editor: any): void => { editorRef.current = editor }}
        height={150}
        onEditorChange={(evt: any, editor: any): void => handleOnEditorChange(evt)}
        initialValue="<h1>Hello Comment!</h1>"
      />
      <br />
      {/* prettier-ignore */}
      <button type="button" onClick={postReply}>Postează Răspunsul</button>
      &nbsp;&nbsp;&nbsp;
      {/* prettier-ignore */}
      <button type="button" onClick={previewComment}>Previzualizează Răspunsul</button>
      <div dangerouslySetInnerHTML={{ __html: `${commentPreview}` }} />
      <div id="previewComment" />
    </>
  );
}

export default Topic;
