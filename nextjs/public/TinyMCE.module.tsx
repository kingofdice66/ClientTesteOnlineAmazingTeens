// The style has to be similar to what is found in TinyMCE.module.css
import css from "styled-jsx/css";

export default css.global`
  .topic_comments {
    background-color: rgba(128, 128, 128, 0.541);
    border-left: 3px solid blue;
    padding-left: 5px;
    margin: 5px 0;
  }

  .topic_comments .username {
    display: block;
    color: orangered;
  }

  .topic_comments a {
    text-decoration: none;
    color: orangered;
  }
`;
