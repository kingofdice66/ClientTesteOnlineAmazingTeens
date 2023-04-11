class RegexForumFunctions {
  str = "";

  /** Remove brakes in between 'blockquote' tag. */
  removeBrakesBetweenQuotes(str: string): string {
    this.str = str.replace(
      /(?:\s+?)?(?:<br>|<p>&nbsp;<\/p>)(?:\s+?)?<blockquote(.+?)>/gms,
      "<blockquote$1>"
    );

    return this.str;
  }

  /** Convert from <blockquote> to [QUOTE] before storing it in database. */
  convertBlockQuote(str: string): string {
    this.str = str.replace(
      /<blockquote(?:.*?)style(?:.*?)data-username=(.*?)data-comment_id=(.*?)data-user_id=(.*?)>(?:\s+)?<div(?:.*?)>(?:.*?)<\/div>(?:\+)?(.*?)<\/blockquote>/gms,
      "<p>[QUOTE=username:$1,post:$2,member:$3]</p><p>$4</p><p>[/QUOTE]</p>"
    );

    return this.str;
  }
}

export default RegexForumFunctions;
