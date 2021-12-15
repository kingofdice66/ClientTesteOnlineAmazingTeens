import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { v4 as uuidV4 } from "uuid";
import useSWR from "swr";
import axios from "axios";
import apiURL from "../ApiURL/ApiURL";
import TinyMCE from "../CustomComponents/TinyMCE/TinyMCE";
import style from "./TopicComments.module.scss";

function Topic(): JSX.Element {
  const router = useRouter();
  const { data, error } = useSWR(`${apiURL}/getForumTopicComments`);
  const [editorContent, setEditorContent] = useState<string>("");
  const concatCommentsRef = useRef<string>(""); // Concatenate multiple replies.
  const editorRef = useRef<any>();

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  console.log("data: ", data);

  // Reply to chosen comment/comments.
  // prettier-ignore
  const replyToComment = (commentId: number, topicId: number, userId: number, username: string): void => {
    axios
      .post(`${apiURL}/getForumTopicCommentsForRely`, { commentId, topicId, userId, username })
      .then((res: any) => {
        concatCommentsRef.current += res.data;
        editorRef.current.setContent(concatCommentsRef.current); // Set editor content.
      })
      .catch((err: any) => console.error(err));
  };

  // Post reply to database.
  const postReply = (): void => {
    const { topicId } = router.query;

    console.log("postReply-topicId", topicId);

    // prettier-ignore
    axios
      .post(`${apiURL}/setReplyForumTopicComments`, { comment: editorContent, topicId }, { withCredentials: true })
      .then((res: any) => console.log("response: ", res.data))
      .catch((err: any) => console.error(err));

    concatCommentsRef.current = ""; // Clear text
    editorRef.current.setContent(""); // Clear editor content
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
            <button type="button" onClick={(): void => replyToComment(x.comment_id, x.topic_id, x.user_id, x.username)}>Răspunde</button>
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
      {/* prettier-ignore */}
      <button type="button" onClick={postReply}>Postează Răspunsul</button>
    </>
  );
}

export default Topic;
