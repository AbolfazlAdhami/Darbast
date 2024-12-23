import React, { useState } from "react";
import { ImageStyled, ScrollViewStyled, TextStyled, ViewStyled } from "@/components/CoreStyled";
import { icons, images } from "@/constant";
import { Formik } from "formik";
import { CustomButton, ErrorInfo, InputField, OAuth, TopHeaderAuthPages, Modal } from "@/components";

import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { Alert } from "react-native";
import { SignupSchema } from "@/validation";
import { fetchAPI } from "@/lib/fetch";

type FormInputesType = {
  username: string;
  email: string;
  password: string;
};
type VerificationType = {
  state: "default" | "pending" | "success" | "failed";
  error: string;
};
const initValuesForm = { email: "", username: "", password: "" };

const SignUpPage = () => {
  const { isLoaded, setActive, signUp } = useSignUp();
  const [verification, setVerification] = useState<VerificationType>({
    state: "default",
    error: "",
  });
  const [userData, setUserData] = useState({ email: "", username: "" });
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  // Verification Email Address
  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completedSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completedSignUp.status === "complete") {
        await fetchAPI("/(api)/users", {
          method: "POST",
          body: JSON.stringify({
            username: userData.username,
            email: userData.email,
            clerkId: completedSignUp.createdUserId,
          }),
        });
        setActive({ session: completedSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification Failed!",
        });
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      setVerification({
        ...verification,
        state: "failed",
        error: JSON.stringify(error, null, 2),
      });
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
                  password,
                });
                setUserData(() => ({
                  email,
                  username,
                }));
                await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
                setVerification({
                  ...verification,
                  state: "pending",
                });
              } catch (error: any) {
                console.error(error);
                console.error(JSON.stringify(error, null, 2));
                if (error.errors[0]) Alert.alert("Error", error?.errors[0].longMEssage);
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
          {/*  */}
          <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} isVisible={showSuccessModal}>
            <ViewStyled className="bg-white px-6 py-8 rounded-2xl min-h-[300px]">
              <ImageStyled source={images.check} resizeMode="contain" className="w-[110px] h-[110px] mx-auto my-4" />
              <TextStyled className="text-2xl text-center  font-noorSemiBold">تایید شد!</TextStyled>
              <TextStyled className="text-base font-noor text-center text-gray-400">شما با موفقیت حساب خود را تأیید کردید.</TextStyled>
              <CustomButton
                title="صفحه اصلی"
                className="mt-4"
                onPress={() => {
                  setShowSuccessModal(false);
                  router.replace("/(root)/(tabs)/home");
                }}
              />
            </ViewStyled>
          </Modal>

          <Modal
            isVisible={verification.state === "pending"}
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
            onModalHide={() => {
              if (verification.state === "success") setShowSuccessModal(true);
            }}
          >
            <ViewStyled className="bg-white px-6 py-8 rounded-2xl min-h-[300px]">
              <TextStyled className="text-2xl text-right  font-noorSemiBold">تایید ایمیل کاربری</TextStyled>
              <TextStyled className="text-base font-noor text-right text-gray-400">کد تایید به ایمیل شما ارسال شد</TextStyled>
              <InputField label="کد تایید" icon={icons.lock} value={code} placeholder="12345" keyboardType="numeric" onChangeText={(value: string) => setCode(value)} />
              {verification.error.length !== 0 && <ErrorInfo message={verification.error} />}
              <CustomButton title="تایید کد" className="bg-success-500 my-4" onPress={onPressVerify} />
            </ViewStyled>
          </Modal>
          {/*  */}
        </ViewStyled>
      </ViewStyled>
    </ScrollViewStyled>
  );
};

export default SignUpPage;
