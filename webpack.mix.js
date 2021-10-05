const mix = require("laravel-mix");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts("resources/src/main/public/Main.tsx", "public/js").version();

mix.ts(
    "resources/src/contactForm/public/ContactForm.tsx",
    "public/js"
).version();

mix.ts("resources/src/makeCourse/public/MakeCourse.tsx", "public/js").version();

mix.ts(
    "resources/src/usersAccount/public/UsersAccount.tsx",
    "public/js"
).version();

mix.ts("resources/src/courses/public/Courses.tsx", "public/js").version();

mix.ts("resources/src/chapters/public/Chapters.tsx", "public/js").version();

mix.webpackConfig({
    plugins: [new StylelintPlugin(), new ESLintPlugin()],
});
