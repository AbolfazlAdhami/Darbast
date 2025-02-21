import React from "react";
import { ScrollViewStyled, TextStyled, ViewStyled } from "@/components/CoreStyled";
import { icons } from "@/constant";
import { Formik } from "formik";
import { CustomButton, ErrorInfo, InputField, OAuth, TopHeaderAuthPages } from "@/components";
import { Link, router } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { SignInSchema } from "@/validation";

type FormInputesType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  return (
    <ScrollViewStyled className=" bg-white ">
      <ViewStyled className="flex-1  bg-white">
        <TopHeaderAuthPages title="خوش آمدید 👋" />
        <ViewStyled className="p-5">
          <Formik
            initialValues={{ email: "", username: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={async (values: FormInputesType) => {
              console.log(isLoaded);
              if (!isLoaded) return;
              const { email, password } = values;
              try {
                const signInAttempt = await signIn.create({
                  identifier: email,
                  password,
                });
                if (signInAttempt.status === "complete") {
                  setActive({ session: signInAttempt.createdSessionId });
                  router.push("/(tabs)/home");
                }
              } catch (error) {
                console.error(JSON.stringify(error, null, 2));
              }
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
              <>
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

                <CustomButton disabled={isLoaded} title="ورود" onPress={handleSubmit} className="my-4" />
              </>
            )}
          </Formik>
          {/* FIXME: Add Functionality to hanldeSinginGoogle */}
          <OAuth />
          <Link href={"/(auth)/sign-up"} className="text-lg text-center mt-4 text-general-200 ">
            <TextStyled>
              اگر حساب فعال ندارید؟<TextStyled className="text-primary-500">ثبت نام کنید</TextStyled>
            </TextStyled>
          </Link>
        </ViewStyled>
      </ViewStyled>
    </ScrollViewStyled>
  );
};

export default SignIn;
