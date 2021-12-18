// This is for removing '<br>' between block quotes like for example
// if we have something like '<blockquote>...</blockquote><p>&nbsp;</p><blockquote>...</blockquote>
//!                                                        ^ this <p>&nbsp;</p> must be removed

function removeBr(quote: string): string {
  console.log(typeof quote);

  const replace = quote.replace(
    /(?:\s+?)?(?:<br>|<p>&nbsp;<\/p>)(?:\s+?)?<blockquote(.+?)>/s,
    "<blockquote$1>"
  );

  return replace;
}

export default removeBr;
