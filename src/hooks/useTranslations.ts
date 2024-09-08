import { useTranslation } from "next-i18next";

type Translations =
  | "common"
  | "experts-page"
  | "home-page"
  | "login-page"
  | "question-page"
  | "signup-page"
  | "signin-page"
  | "expert-createExpert-page"
  | "question-createQuestion-page"
  | "question-editQuestion-page"
  | "expert-page"
  | "expert-editExpert-page"
  | "reviews-page";

export const useTranslations = (translation: Translations) => {
  const { ...all } = useTranslation(translation);

  return { ...all };
};
