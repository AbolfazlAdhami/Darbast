import React, { useState } from "react";
import { ScrollViewStyled, TextStyled, ViewStyled } from "@/components/CoreStyled";
import { icons, passwordPattern } from "@/constant";
import { Formik } from "formik";
import { CustomButton, ErrorInfo, InputField, OAuth, TopHeaderAuthPages } from "@/components";
import * as Yup from "yup";
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("پر کردن ایم فیلد اجباریست").min(5, "نام کاربری باید حداقل ۵ حرفی باشد").max(20, "تعداد کاراکتر بیش از حد مجاز"),
  email: Yup.string().email("فرمت ایمیل نامناسب است").required("پر کردن ایم فیلد اجباریست"),
  password: Yup.string()
    .required("پر کردن ایم فیلد اجباریست")
    .min(8, "پسسورد حداقل باید ۸ کاراکتری باشد")
    .max(24, "حداکثر ۲۴ کاراکتر مجاز است")
    .matches(passwordPattern, "پسوورد باید ترکیبی از حروف کوچک و بزرگ و علامتی مثل ! باشد"),
});

type FormInputesType = {
  username: string;
  email: string;
  password: string;
};
type VerificationType = {
  state: "default" | "pending" | "accepted" | "rejected";
  error: string;
  code: string;
};

const initValuesForm = { email: "", username: "", password: "" };
const SignUpPage = () => {
  const { isLoaded, setActive, signUp } = useSignUp();
  const [varification, setVerification] = useState<VerificationType>({
    state: "default",
    error: "",
    code: "",
  });
  const [code, setCode] = useState<string>("");

  // Verification Email Address
  const onPresVerify = async () => {
    if (!isLoaded) return;

    try {
      const completedSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completedSignUp.status === "complete") {
        setActive({ session: completedSignUp.createdSessionId });
        router.push("/(tabs)/home");
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <ScrollViewStyled className=" bg-white ">
      <ViewStyled className="flex-1  bg-white">
        <TopHeaderAuthPages title="ایجاد حساب کاربری" />
        <ViewStyled className="p-5">
          <Formik
            initialValues={initValuesForm}
            validationSchema={SignupSchema}
            onSubmit={async (values: FormInputesType) => {
              if (!isLoaded) return;
              const { email, password, username } = values;
              try {
                await signUp?.create({
                  emailAddress: email,
                  username,
                  password,
                });
                await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
                setVerification({
                  ...varification,
                  state: "pending",
                });
              } catch (error) {
                console.error(JSON.stringify(error, null, 2));
              }
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
              <>
                <InputField
                  value={values.username}
                  onBlur={handleBlur("username")}
                  onChangeText={handleChange("username")}
                  label="نام کاربری"
                  placeholder="نام کاربری خود را وارد کنید"
                  className="text-right"
                  icon={icons.person}
                />
                {errors.username && touched.username ? <ErrorInfo message={errors.username} /> : null}
                <InputField
                  value={values.email}
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                  keyboardType="email-address"
                  label="ایمیل"
                  placeholder="ایمیل خود را وارد کنید"
                  className="placeholder:text-right mx-2"
                  icon={icons.email}
                />
                {errors.email && touched.email ? <ErrorInfo message={errors.email} /> : null}
                <InputField label="پسوورد" icon={icons.lock} secureTextEntry={true} value={values.password} onBlur={handleBlur("password")} onChangeText={handleChange("password")} />
                {errors.password && touched.password ? <ErrorInfo message={errors.password} /> : null}
                <CustomButton title="ثبت نام " onPress={handleSubmit} className="my-4" />
              </>
            )}
          </Formik>
          {/* FIXME: Add Functionality to hanldeSinginGoogle */}
          <OAuth />
          <Link href={"/(auth)/sign-in"} className="text-lg text-center mt-4 text-general-200 ">
            <TextStyled>
              اگر حساب فعال دارید؟<TextStyled className="text-primary-500">وارد شوید</TextStyled>
            </TextStyled>
          </Link>
          {/* TODO:Verification Modal */}
        </ViewStyled>
      </ViewStyled>
    </ScrollViewStyled>
  );
};

export default SignUpPage;
