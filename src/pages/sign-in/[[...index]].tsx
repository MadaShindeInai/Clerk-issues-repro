import {
  type GetStaticPathsContext,
  type GetStaticPropsContext,
  type NextPage,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";

export const getStaticProps = async ({
  locale = "pl",
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["signin-page", "common"])),
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

const SignInPage: NextPage = () => {
  const { locale = "pl" } = useRouter();
  const path = locale === "pl" ? "/sign-in" : `/${locale}/sign-in`;

  return (
    <>
      <div className="mb-4 flex items-center justify-center">
        <SignIn path={path} />
      </div>
    </>
  );
};

export default SignInPage;
