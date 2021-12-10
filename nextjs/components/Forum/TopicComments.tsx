import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { v4 as uuidV4 } from "uuid";
import useSWR from "swr";
import axios from "axios";
import apiURL from "../ApiURL/ApiURL";
import TinyMCE from "../CustomComponents/TinyMCE/TinyMCE";

function Topic(): JSX.Element {
  const router = useRouter();
  const { data, error } = useSWR(`${apiURL}/getForumTopicComments`);
  const [editorContent, setEditorContent] = useState<string>("");
  const [replyComment, setReplyComment] = useState<string>("");
  const concatCommentsRef = useRef<string>(""); // Concatenate multiple replies.
  const editorRef = useRef<any>(null);

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
        setReplyComment(concatCommentsRef.current);
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
      .post(`${apiURL}/setReplyForumTopicComments`, { comment: editorContent, topicId })
      .then((res: any) => console.log("response: ", res.data))
      .catch((err: any) => console.error(err));

    concatCommentsRef.current = ""; // Clear text
    editorRef.current.setContent(""); // Clear editor content
  };

  return (
    <>
      {data.map((x: any) => (
        <React.Fragment key={uuidV4()}>
          <div>
            {/* prettier-ignore */}
            <div>
              Username: {x.username} &nbsp;&nbsp; 
              Topic id: {x.topic_id} &nbsp;&nbsp;
              User id: {x.user_id} &nbsp;&nbsp;
            </div>
            <div dangerouslySetInnerHTML={{ __html: `${x.comment}` }} />
            {/* prettier-ignore */}
            <button type="button" onClick={():void => replyToComment(x.comment_id, x.topic_id,x.user_id, x.username)}>Răspunde</button>
          </div>
        </React.Fragment>
      ))}
      <br />
      {/* prettier-ignore */}
      <TinyMCE
        onInit={(evt: any, editor: any): void => {editorRef.current = editor}}
        height={150}
        onEditorChange={(evt: any, editor: any): void => setEditorContent(evt)}
        initialValue="<h1>Hello Comment!</h1>"
      />
      <br />
      {/* prettier-ignore */}
      <button type="button" onClick={postReply}>Postează Răspunsul</button>
    </>
  );
}

export default Topic;
