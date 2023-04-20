CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    username_lowercase TEXT UNIQUE NOT NULL, /* username_lowercase - username will be stored both in lowercase
    and a mix of uppercase and lowercase or just lowercase. For example, bob and BoB, ANdrew and andrew or Andrew
    or ANdreW, _G_Eorge or _g_Eorge or _g_eorge.
    Necessary for when we need to tell users who want to register if the username is already taken or not
    because we have to convert to lowercase first then check database if the username is already taken.*/
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    avatar BOOLEAN NOT NULL DEFAULT FALSE, /*avatar - FALSE if user doesn’t have avatar and TRUE if user does*/
    token TEXT NOT NULL, /* token - Verification key. It will be send by email. */
    verified_email BOOLEAN NOT NULL DEFAULT FALSE, /* verified_email - user is verified or not, TRUE for yes FALSE for no. A token fore verification will bes sent by email.*/
    token_expiration TEXT NOT NULL, /* token_expiration - If the user doesn’t verify his email in a certain amount of time, the user must resend email verification.*/
    date_of_birth DATE NOT NULL,
    gender TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
)