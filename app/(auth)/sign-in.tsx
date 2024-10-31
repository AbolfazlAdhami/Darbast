import { Platform } from "react-native";
import { ScrollViewStyled, TextStyled, ViewStyled, ImageStyled } from "@/components/CoreStyled";
import { icons, images, passwordPattern } from "@/constant";
import { Formik } from "formik";
import { CustomButton, ErrorInfo, InputField, OAuth } from "@/components";
import * as Yup from "yup";
import { Link } from "expo-router";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("فرمت ایمیل نامناسب است").required("پر کردن ایم فیلد اجباریست"),
  password: Yup.string()
    .required("پر کردن ایم فیلد اجباریست")
    .min(8, "پسسورد حداقل باید ۸ کاراکتری باشد")
    .max(24, "حداکثر ۲۴ کاراکتر مجاز است")
    .matches(passwordPattern, "پسوورد باید ترکیبی از حروف کوچک و بزرگ و علامتی مثل ! باشد"),
});

type FormInputesType = {
  email: string;
  password: string;
};
const SignIn = () => {
  return (
    <ScrollViewStyled className=" bg-white ">
      <ViewStyled className="flex-1  bg-white">
        <ViewStyled className="flex-1 relative w-full h-[200px]">
          <ImageStyled className="z-0 w-full h-[200px]" source={images.signUpCar} />
          <TextStyled className={`absolute ${Platform.OS === "android" ? "left-5" : "right-5 "} bottom-5 text-black font-noorSemiBold text-3xl`}>خوش آمدید 👋</TextStyled>
        </ViewStyled>
        <ViewStyled className="p-5">
          <Formik
            initialValues={{ email: "", username: "", password: "" }}
            validationSchema={SignupSchema}
            onSubmit={(values: FormInputesType) => {
              console.log(values);
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
                <CustomButton title="ثبت نام " onPress={handleSubmit} className="my-4" />
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
          {/* TODO:Verification Modal */}
        </ViewStyled>
      </ViewStyled>
    </ScrollViewStyled>
  );
};

export default SignIn;
