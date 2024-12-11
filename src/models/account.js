import { number, object, string } from "yup";

export const accountShema = (t) =>
  object({
    _id: string().required(),

    fullname: string()
      .required(t("accountShema.fullname.required"))
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s]+$/,
        t("accountShema.fullname.matches")
      ),

    email: string()
      .required(t("accountShema.email.required"))
      .email(t("accountShema.email.email")),

    password: string()
      .required(t("accountShema.password.required"))
      .min(6, t("accountShema.password.min"))
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        t("accountShema.password.matches")
      ),
    cellPhone: number(),

    country: string(),
    img: string(),
  });
