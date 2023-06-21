// prettier-ignore
const commonRegex = /<blockquote([\s\S]*?)data-quote="(?<quote>[\s\S]*?)"([\s\S]*?)data-post="(?<post>[\s\S]*?)"([\s\S]*?)data-member="(?<member>[\s\S]*?)">(?<comment>[\s\S]*?)<\/blockquote>/gm;

/** Regex to format forum topic comment reply correctly */
const RgxBlockquote = (str: string): string => {
  // prettier-ignore
  // eslint-disable-next-line quotes
  const replace = 
        `<blockquote class=topic_comments>
            <span class="username"><a href="https://www.google.com">$<quote> a spus:</a></span>
            $<comment>
         </blockquote>`;
  return str.replace(commonRegex, replace);
};

/**
 *  Remove `<p>` tag and replace it with "" nothing.
 *  Remove `</p>` tag and replace it with `<br/>`.
 */
const RgxReplacePTag = (str: string): string => {
  // eslint-disable-next-line no-param-reassign
  str = str.replace(/<p>/gm, "");
  // eslint-disable-next-line no-param-reassign
  str = str.replace(/<\/p>/gm, "<br/>");

  return str;
};

/** Remove whitespace like `<p>&nbsp;</p>` */
const RgxRemoveWhiteSpace = (str: string): string => {
  // eslint-disable-next-line no-param-reassign
  str = str.replace(/<p>&nbsp;<\/p>/gm, "");

  return str;
};

/** Remove all quotes from replies */
const RgxRemoveQuotes = (str: string): string => {
  // eslint-disable-next-line no-param-reassign
  str = str.replace(commonRegex, "");

  return str;
};

export { RgxBlockquote, RgxReplacePTag, RgxRemoveWhiteSpace, RgxRemoveQuotes };
