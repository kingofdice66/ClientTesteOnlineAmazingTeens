import React, { useState, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import useSWR from "swr";
import axios from "axios";
import apiURL from "../ApiURL/ApiURL";
import TinyMCE from "../CustomComponents/TinyMCE/TinyMCE";

function Topic(): JSX.Element {
  const { data, error } = useSWR(`${apiURL}/getForumTopicComments`);
  const [editorContent, setEditorContent] = useState<string>("");
  const editorRef = useRef<any>(null);

  if (!data) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  console.log("data: ", data);

  const replyToComment = (topicId: number, userId: number): void => {
    console.log("replyToComment_topicId: ", topicId);
    console.log("replyToComment_userId: ", userId);

    axios
      .post(`${apiURL}/getForumTopicCommentForRely`, { topicId, userId })
      .then((res: any) => editorRef.current.setContent(res.data))
      .catch((err: any) => console.error(err));

    // console.log(
    //   "editorContent: ",
    //   editorRef.current.setContent("<h1>TEST</h1>")
    // );
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
            <button type="button" onClick={():void => replyToComment(x.topic_id, x.user_id)}>Reply</button>
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
    </>
  );
}

export default Topic;
