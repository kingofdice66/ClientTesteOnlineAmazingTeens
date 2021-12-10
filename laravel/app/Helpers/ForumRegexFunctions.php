<?php

namespace App\Helpers;

class ForumRegexFunctions
{
  /** Extract quoted text. */
  public function quoteSubstitution(string $str): string
  {
    /** 
     * (#1) Remove line breaks from text coming from database.
     * Must be used otherwise regex won't work properly.
     * (#2) Remove white spaces from beginning and end of the string.
     * Must be used otherwise regex won't work properly.
     * For some reason, white space is added into database.
     */

    $pattern = [
      "%\R+%", // (#1)
      "%(?s)^\s+|\s+$%" // (#2)
    ];

    $replace = ["", ""];

    $str = preg_replace($pattern, $replace, $str);

    // ############################################################################
    // ############                   strip <p>  tags                  ############
    // ############################################################################

    // (#1) Strip "<p>" and replace it with ""(nothing)
    // (#2) Strip "&nbsp;" from text.
    // (#3) Replace "</p>" with "<br>".

    $divPattern = [
      "%(?s)<p>%", // (#1)
      "%(?s)(&nbsp;)*%", // (#2)
      "%(?s)</p>%"  // (#3)
    ];

    $divReplace = ["", "", "<br>"];

    $str = preg_replace($divPattern, $divReplace, $str);

    // ############################################################################
    // ############              extract quoted information            ############
    // ############################################################################

    $quotePattern = '%(?s)\[QUOTE="username:(.+?),post:(\d+?),member:(\d+?)"\](?:(?:<br>)+)?(.*?)(?:(?:<br>)+)?\[/QUOTE\]%';

    $quoteReplace = <<<REPL
  <blockquote class="blockquote">
  <a href="#comment_id$2">$1 said:</a><br>
  $4
  </blockquote>
  REPL;

    $str = preg_replace($quotePattern, $quoteReplace, $str);

    // ############################################################################
    // ######         replace "</blockquote><br>" with "</blockquote>"       ######
    // ############################################################################

    /** 
     * Replace "</blockquote><br>" with "</blockquote>" to strip a brake "<br>" 
     * at the end of a blockquote so it doesn't break the text where it isn't suppose to. 
     */

    $patternQuote = "%</blockquote><br>%";

    $replaceQuote = "</blockquote>";

    $str = preg_replace($patternQuote, $replaceQuote, $str);

    // ############################################################################

    return $str;
  }

  /** Extract comments and leave out quoted text. This function is used for replying to comments. */
  public function extractCommentsReply(string $str): string
  {
    /**
     * (#1) Remove line breaks from text coming from database. 
     * Must be used otherwise regex won't work properly. 
     */

    $remNewlinePattern = "%\R+%"; // (#1)

    $replace = "";

    $str = preg_replace($remNewlinePattern, $replace, $str);

    /**  
     * (#2) When quoting someone, text inside "[QUOTE...]<div>some text inside</div>[/QUOTE]" is not desired,
     * so it's stripped from inside quote. It means that you are quoting someone who has quoted someone.
     */

    $pattern = [
      "%(?s)\[QUOTE(?:.*?)\](?:.*?)\[/QUOTE\]%", // (#2)
    ];

    $replace = [""];

    $str = preg_replace($pattern, $replace, $str);

    return $str;
  }

  /** Function to remove breaks when multiple quotes are involved. */
  public function removeBreaksBetweenQuotes(string $str): string
  {
    $pattern = [
      "%^<p><br></p>%",
      "%(?s)<p>\[/QUOTE\]</p><p><br></p>%"
    ];

    $replace = [
      "",
      "<p>[/QUOTE]</p>"
    ];

    $str = preg_replace($pattern, $replace, $str);

    return $str;
  }

  /** Remove a single brake from beginning of text and newlines. */
  public function removeNewlinesAndSingleBreak(string $str): string
  {
    /**
     * (#1) Remove line break from text coming from database.
     * Must be used otherwise regex won't work properly.
     * (#2) Remove a single brake at the beginning of text.
     * For some reason, when rich text field is empty, when a draft is saved, a single "<br>"(brake/newline)
     * is stored in database in drafts, so we remove it.
     * Example: <br><div>kkkk</div><div>ssss</div> ==> <div>kkkk</div><div>ssss</div> 
     */

    $pattern = [
      "%\R+%", // (#1)
      "%(?s)^<br>%" // (#2)
    ];

    $replace = ["", ""];

    $str = preg_replace($pattern, $replace, $str);

    return $str;
  }

  /** Get number of characters without spaces and tags in the comment string. */
  public function stringLengthWithoutSpaces(string $str): int
  {
    $stripTags = strip_tags($str);

    $pattern = [
      "%[ ]%",
      "%&nbsp;%"
    ];

    $replace = ["", ""];

    $pregReplace = preg_replace($pattern, $replace, $stripTags);

    $length = strlen($pregReplace);

    return $length;
  }
}
