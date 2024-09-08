import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { api } from "~/utils/api";
import { type GetStaticPropsContext } from "next";
import { useTranslations } from "~/hooks";
import { useRouter } from "next/router";

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
            className="w-10 border text-center text-white"
          >
            {Locale[locale as keyof typeof Locale]}
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps = async ({
  locale = "pl",
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
};

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const { t } = useTranslations("common");

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <LocaleSwitcher />
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            {t("btn.toQC")}
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
        </div>
      </main>
    </>
  );
}
