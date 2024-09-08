import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { type GetStaticPropsContext } from "next";
import { useTranslations } from "~/hooks";

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
  const { t } = useTranslations("common");

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            {t("btn.toQC")}
          </h1>
        </div>
      </main>
    </>
  );
}
