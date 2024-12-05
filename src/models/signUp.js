import { object, string } from "yup";
import i18next from "i18next";


export const getSignUpSchema = () => object({
  fullname: string()
    .required(i18next.t("signUpShema.fullname.required"))
    .matches(
      /^[a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s]+$/,
      i18next.t("signUpShema.fullname.matches")
    ),

  email: string()
    .required(i18next.t("signUpShema.email.required"))
    .email(i18next.t("signUpShema.email.email")),
  password: string()
    .required(i18next.t("signUpShema.password.required"))
    .min(6, i18next.t("signUpShema.password.min"))
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      i18next.t("signUpShema.password.matches")
    ),
});
