import { GeistSans } from "geist/font/sans";
import { appWithTranslation } from "next-i18next";
import { type AppType } from "next/app";
import nextI18NextConfig from "../../next-i18next.config.js";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link.js";
enum Locale {
  pl = "PL",
  en = "EN",
  ru = "РУ",
}

export const LocaleSwitcher = (_: { footer?: boolean }) => {
  const router = useRouter();
  const { locales = [], pathname, query, asPath } = router;
  const changeLocale = (locale: string) => {
    // change just the locale and maintain all other route information including href's query
    void router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <div className="flex gap-2">
      {locales.map((locale) => {
        return (
          <div
            key={locale}
            onClick={() => changeLocale(locale)}
            className="w-10 border text-center text-black"
          >
            {Locale[locale as keyof typeof Locale]}
          </div>
        );
      })}
    </div>
  );
};

const MyApp: AppType = ({ Component, pageProps }) => {
  const { asPath } = useRouter();

  return (
    <ClerkProvider
      {...pageProps}
      localization={{
        footerPageLink__help: "By signing up you agree to our",
        footerPageLink__privacy: "privacy policy",
        footerPageLink__terms: "and",
      }}
      appearance={{
        elements: {
          selectOptionsContainer: "text-foreground dark:text-background",
          formButtonPrimary: "bg-primary text-black body-bold shadow-clerkbtn",
        },
      }}
      afterSignOutUrl={asPath}
    >
      <div className={GeistSans.className}>
        <div className="flex gap-3">
          <div className="h-10 w-10 cursor-pointer rounded-full">
            <SignedIn>
              <UserButton
                // afterSignOutUrl={asPath}
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: 40,
                      height: 40,
                    },
                  },
                }}
              >
                {/* <UserButton.MenuItems>
          {isExpert && !!userData ? (
            <UserButton.Link
              label={t("btn.myExpertPage")}
              labelIcon={
                <Image
                  className="h-4 w-4 object-cover object-center"
                  width={16}
                  height={16}
                  src="/images/icy/icon/promouter_cube_transparent.png"
                  alt="promouter icon"
                />
              }
              href={getExpertUrl(userData.slug)}
            />
          ) : (
            <UserButton.Link
              label={t("btn.becomeExpert")}
              labelIcon={
                <Image
                  className="h-4 w-4 object-cover object-center"
                  width={16}
                  height={16}
                  src="/images/icy/icon/promouter_cube_transparent.png"
                  alt="promouter icon"
                />
              }
              href={EXPERT_CREATE_ROUTE}
            />
          )}
        </UserButton.MenuItems> */}
              </UserButton>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button className="h-full w-full text-sm">Sign in</button>
              </SignInButton>
            </SignedOut>
          </div>
          <LocaleSwitcher />
          <Link href="/test">GO TO TEST</Link>
        </div>
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(appWithTranslation(MyApp, nextI18NextConfig));
