// This component is used for single page app like behavior for a certain page/pages.

import React from "react";

interface IProps {
  to: string;
  name: string;
  highlight: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}
/**
 * @param {string} to - The link to redirect to.
 * @param {string} name - Then name of the link.
 * @param {(number | string)} highlight - The url parameter to get. 'searchParams.get(highlight)'
 * @param {state} setPage - React state. 'setPage(param)' in order to load the appropriate component.
 */
function Link(props: IProps): JSX.Element {
  const { to, name, highlight, setPage } = props;

  const historyPushState = (to_: any): void => {
    window.history.pushState(null, null, to_);
    const url: string = window.location.search;
    const searchParams: URLSearchParams = new URLSearchParams(url);
    const param = searchParams.get(highlight);
    setPage(param);
  };

  return (
    <button type="button" onClick={(): void => historyPushState(to)}>
      {name}
    </button>
  );
}

export default Link;
