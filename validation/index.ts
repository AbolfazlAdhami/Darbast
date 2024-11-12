import { passwordPattern } from "@/constant";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("پر کردن ایم فیلد اجباریست").min(5, "نام کاربری باید حداقل ۵ حرفی باشد").max(20, "تعداد کاراکتر بیش از حد مجاز"),
  email: Yup.string().email("فرمت ایمیل نامناسب است").required("پر کردن ایم فیلد اجباریست"),
  password: Yup.string()
    .required("پر کردن ایم فیلد اجباریست")
    .min(8, "پسسورد حداقل باید ۸ کاراکتری باشد")
    .max(24, "حداکثر ۲۴ کاراکتر مجاز است")
    .matches(passwordPattern, "پسوورد باید ترکیبی از حروف کوچک و بزرگ و علامتی مثل ! باشد"),
});

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("فرمت ایمیل نامناسب است").required("پر کردن ایم فیلد اجباریست"),
  password: Yup.string()
    .required("پر کردن ایم فیلد اجباریست")
    .min(8, "پسسورد حداقل باید ۸ کاراکتری باشد")
    .max(24, "حداکثر ۲۴ کاراکتر مجاز است")
    .matches(passwordPattern, "پسوورد باید ترکیبی از حروف کوچک و بزرگ و علامتی مثل ! باشد"),
});

export { SignupSchema, SignInSchema };
