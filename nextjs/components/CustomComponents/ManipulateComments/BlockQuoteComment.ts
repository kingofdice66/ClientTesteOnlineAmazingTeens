// Surround comment in a '<blockquote>...</blockquote>'
// This is used for comments with TinyMCE editor

// prettier-ignore
function wrappedComment(comment: string, username: string): string {
  const wrapped = `<blockquote style="
          background-color: #cfcdc8; 
          border-left: 5px solid #ff0066; 
          padding: 10px;"
        >
        <div style="color: blue">${username} a spus:</div>
          ${comment}
        </blockquote><br>`;
  return wrapped;
}

export default wrappedComment;
