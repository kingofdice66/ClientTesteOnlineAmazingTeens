<?php
// This is for decoding JWT(JSON Web Token) information. This JWT cookie is set when user signs in.
namespace App\Helpers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Carbon\Carbon;
use Exception;

class DecodeLoginJWT
{
  private $currentTime = NULL;

  public function __construct()
  {
    $this->currentTime = (new Carbon)->unix();
  }

  /** Decode the JWT(JSON Website Cookie) cookie. Cookie is set up when user logs in. */
  public function decodeJWT(object $request): array
  {

    $jwt_login = $request->cookie("jwt_login");

    // Cookie does not exist.
    if ($jwt_login === NULL) {
      return ["message" => "cookie_not_exist"];
    }

    $key       = env("JWT_KEY");
    $algorithm = env("JWT_ALG");

    try {
      $JWT_Decoded = (array) JWT::decode($jwt_login, new Key($key, $algorithm));
    } catch (Exception $e) {
      return ["message" => $e->getMessage()];
    }

    $JWT_Issuer   = $JWT_Decoded["issuer"];
    $JWT_ExpireAt = $JWT_Decoded["expireAt"];
    $JWT_UserId   = $JWT_Decoded["userId"];
    $JWT_Username = $JWT_Decoded["username"];

    // The issuer is not correct.
    if ($JWT_Issuer !== "localhost") {
      return ["message" => "issuer_not_correct"];
    }

    // The cookie has expired.
    if (!($JWT_ExpireAt >= $this->currentTime)) {
      return ["message" => "cookie_expired"];
    }

    return [
      "message"  => "ok",
      "userId"   => $JWT_UserId,
      "username" => $JWT_Username,
    ];
  }
}
