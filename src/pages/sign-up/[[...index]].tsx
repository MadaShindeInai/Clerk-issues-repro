import {
  type GetStaticPathsContext,
  type GetStaticPropsContext,
  type NextPage,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SignUp } from "@clerk/nextjs";

import { useRouter } from "next/router";

export const getStaticProps = async ({
  locale = "pl",
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["signup-page", "common"])),
    },
  };
};

export const getStaticPaths = ({ locales = [] }: GetStaticPathsContext) => {
  const paths = locales.flatMap((locale) => [
    { params: { index: [""] }, locale },
  ]);
  return {
    paths,
    fallback: true,
  };
};

const SignUpPage: NextPage = () => {
  const { locale = "pl" } = useRouter();
  const path = locale === "pl" ? "/sign-up" : `/${locale}/sign-up`;

  return (
    <>
      <div className="-mt-8 mb-4 flex items-center justify-center">
        <SignUp
          path={path}
          appearance={{
            layout: {
              termsPageUrl: "https://niceadvice.pl",
              privacyPageUrl: "https://niceadvice.pl",
              helpPageUrl: "https://niceadvice.pl",
            },
          }}
        />
      </div>
    </>
  );
};

export default SignUpPage;
