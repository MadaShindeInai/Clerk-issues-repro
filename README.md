# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

This is a small repro of 2 issues I'm facing with Clerk's features:
1. https://discord.com/channels/856971667393609759/1276087332939890690/1276087332939890690
2. https://discord.com/channels/856971667393609759/1276095523203584061/1276095523203584061

How to run:
1. Clone the repo
2. add required envs from .env.example
3. `pnpm i`
4. `make s` or `pnpm dev`

### Steps to reproduce issue №1:
1. Run app
2. Login with Clerk
3. Click "GO TO TEST" button in header
4. Sign out

#### Current behaviour:
- User is signed out and redirected to the home page

#### Expected behaviour:
- User is signed out and stays on the same page

#### Additional steps:
- Uncomment afterSignOutUrl={asPath} in UserButton, comment in ClerkProvider and see that everything works as expected

### Steps to reproduce issue №2 (Part 1: invalid condition):
0. For your convenience, I have duplicated the text and the conditions by which the text is displayed, as well as the localization logic used for custom element in UserButton.  It (the correct values) are displayed in the Header, to the right of GO TO TEST.
1. Run app
2. Login with Clerk
3. Open Clerk dropdown and see an item between Manage Account and Sign Out

#### Current behaviour:
- We see Zostan Ekspertem (become an expert) in the dropdown

#### Expected behaviour:
- We see "Idź do swojego profilu" in the dropdown (same as text is displayed to the right of GO TO TEST)

### Steps to reproduce issue №2 (Part 2: invalid translation):
1. Run app
2. Login with Clerk
3. Open Clerk dropdown and see an item between Manage Account and Sign Out.
4. Change the language

#### Current behaviour:
- You see that app was translated. Open dropdown and see that the text is still in the previous language

#### Expected behaviour:
- Text in the dropdown translated altogeather with the app

#### Additional steps:
- Change language and refresh a page. You will see that the text in the dropdown is translated correctly.
