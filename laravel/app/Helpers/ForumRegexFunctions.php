<?php

namespace App\Helpers;

class ForumRegexFunctions
{
  /** Remove brakes in between 'blockquote' tag. */
  public function removeBrakesBetweenQuotes(string $str): string
  {
    // This is for removing '<br>' or '<p>&nbsp;</p>' between block quotes like for example
    // if we have something like '<blockquote>...</blockquote><p>&nbsp;</p><blockquote>...</blockquote>
    //!                                                            ^ this <p>&nbsp;</p> must be removed

    $pattern = '%(?:\R+?)?(?:<br>|<p>&nbsp;<\/p>)(?:\R+?)?<blockquote(.+?)>%s';

    $replace = '<blockquote$1>';

    $str = preg_replace($pattern, $replace, $str);


    return $str;
  }

  /** Convert from <blockquote> to [QUOTE] before storing it in database. */
  public function convertBlockQuote(string $str): string
  {
    $pattern = "%<blockquote(?:.*?)style(?:.*?)data-username=(.*?)data-comment_id=(.*?)data-user_id=(.*?)>(?:\s+)?<div(?:.*?)>(?:.*?)<\/div>(?:\+)?(.*?)<\/blockquote>%sm";

    $replace = '<p>[QUOTE=username:$1,post:$2,member:$3]</p>$4<p>[/QUOTE]</p>';

    $str = preg_replace($pattern, $replace, $str);

    return $str;
  }

  /** Wrap comment in blockquote. This is use for replying to comments*/
  public function wrapCommentInBlockquote(string $comment, string $username, string $commentId, int $userId): string
  {
    $comment = <<<COMM
        <blockquote
          style="
              background-color: #cfcdc8; 
              border-left: 5px solid #ff0066; 
              padding: 10px;
              margin: 5px 0 5px 0"
          data-username=$username
          data-comment_id=$commentId
          data-user_id=$userId
        >
        <div style="color: blue">$username a spus:</div>
          $comment
        </blockquote><br>
        COMM;

    return $comment;
  }

  /** Extract quoted text. */
  public function quoteSubstitution(string $str): string
  {
    // #############################################
    // ######         Remove newlines        #######
    // #############################################
    // String comes with newlines from database 
    // attached, so it is unnecessary and thus removed
    $pattern = '%(\R+)%sm';

    $replace = '';

    $str = preg_replace($pattern, $replace, $str);

    // #############################################
    // ##   Remove brakes from beginning and end  ##
    // #############################################
    // (#1) Remove '<br>' tags from beginning
    // (#2) Remove '<br>' tags from end
    // (#3) Remove '<p>...</p>' tags from beginning
    // (#4) Remove '<p>...</p>' from end
    $pattern = [
      '%^((<br>)+)%ms', // (#1)
      '%((<br>)+)$%ms', // (#2)
      '%^(<p>(\s+?)<\/p>)+%msu', // (#3)
      '%(<p>(\s+?)<\/p>)+$%msu' // (#4)
    ];

    $replace = ['', '', '', ''];

    $str = preg_replace($pattern, $replace, $str);

    // ##############################################
    // ##  Replace '</p>', &nbsp, '<p>' and '<br>' ##
    // ##############################################
    // (#1) Remove '<p>' tags and replace it with ""(nothing)
    // (#2) Remove '</p>' tags and replace it with '<br>'
    // (#3) Remove '<br>' tags only at the end of text
    // (#4) Remove '&nbsp;' only at the end of text
    $pattern = [
      '%<p>%sm', // (#1)
      '%</p>%sm', // (#2)
      '%((<br>)+)$%sm', // (#3)
      '%((&nbsp;)+)$%sm' // (#4)
    ];

    $replace = ['', '<br>', '', ''];

    $str = preg_replace($pattern, $replace, $str);

    // ##############################################
    // ###    Replace [QUOTE] with <blockquote>   ###
    // ##############################################
    $pattern = '%\[QUOTE=username:"(.*?)"(?:.*?),post:"(.*?)"(?:.*?),member:"(.*?)"](.*?)\[/QUOTE]%ms';

    $replace = <<<REPL
      <blockquote style="
        background-color: #cfcdc8;
        border-left: 5px solid #ff0066;
        padding: 10px;
        margin: 5px 0 5px 0"
      >
      <a href="#comment_id$2">$1 a spus:</a>
        $4
      </blockquote>
    REPL;

    $str = preg_replace($pattern, $replace, $str);

    // #########################################################
    // ###  Replace "</blockquote><br>" with "</blockquote>" ###
    // #########################################################
    //  Replace "</blockquote><br>" with "</blockquote>" to strip a brake "<br>" 
    //  at the end of a blockquote so it doesn't break the text where it isn't suppose to.  
    $pattern = "%</blockquote><br>%";

    $replace = "</blockquote>";

    $str = preg_replace($pattern, $replace, $str);

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
    $pattern = "%\[QUOTE(?:.*?)\](?:.*?)\[/QUOTE\]%ms"; // (#2)

    $replace = "";

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

  // Remove '<p></p>' tags
  public function removePTags(string $str): string
  {
    // (#1) remove newlines
    // (#2) remove '<p></p>' tags and replace is with ""(nothing)
    $pattern = [
      "%(\R+)%ms", // (#1)
      "%(<p></p>)%ms", // (#2)
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
