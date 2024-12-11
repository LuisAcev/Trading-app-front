import { object, string } from "yup";

export const getSignUpSchema = (t) =>
  object({
    fullname: string()
      .required(t("signUpShema.fullname.required"))
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s]+$/,
        t("signUpShema.fullname.matches")
      ),

    email: string()
      .required(t("signUpShema.email.required"))
      .email(t("signUpShema.email.email")),
    password: string()
      .required(t("signUpShema.password.required"))
      .min(6, t("signUpShema.password.min"))
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        t("signUpShema.password.matches")
      ),
  });
