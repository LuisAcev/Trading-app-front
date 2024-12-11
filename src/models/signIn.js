import { object, string } from "yup";


export const getSignInSchema = (t) => object({
  email: string()
    .required(t("signInShema.email.required"))
    .email(t("signInShema.email.email")),

  password: string()
    .required(t("signInShema.password.required"))
    .min(6, t("signInShema.password.min"))
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      t("signInShema.password.matches")
    ),
});
