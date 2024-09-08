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
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link.js";
import { useTranslations } from "~/hooks";
import { type PropsWithChildren } from "react";
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

const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslations("common");
  const { user } = useUser();
  const { data } = api.post.getUser.useQuery(
    { id: user?.id ?? "" },
    { enabled: !!user },
  );

  return (
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
              <UserButton.MenuItems>
                {!!data && data.isExpert ? (
                  <UserButton.Link
                    label={t("btn.myExpertPage")}
                    labelIcon={<div>1</div>}
                    href="/test"
                  />
                ) : (
                  <UserButton.Link
                    label={t("btn.becomeExpert")}
                    labelIcon={<div>2</div>}
                    href="/test2"
                  />
                )}
              </UserButton.MenuItems>
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
        {!!data && data.isExpert ? (
          <Link href="/test">{t("btn.myExpertPage")}</Link>
        ) : (
          <Link href="/test2">{t("btn.becomeExpert")}</Link>
        )}
      </div>
      {children}
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
};

export default api.withTRPC(appWithTranslation(MyApp, nextI18NextConfig));
