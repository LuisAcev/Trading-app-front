import i18next from "i18next";
import { object, string } from "yup";


export const getSignInSchema = () => object({
  email: string()
    .required(i18next.t("signInShema.email.required"))
    .email(i18next.t("signInShema.email.email")),

  password: string()
    .required(i18next.t("signInShema.password.required"))
    .min(6, i18next.t("signInShema.password.min"))
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      i18next.t("signInShema.password.matches")
    ),
});
