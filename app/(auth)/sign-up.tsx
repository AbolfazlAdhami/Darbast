import { Platform } from "react-native";
import { ScrollViewStyled, TextStyled, ViewStyled, ImageStyled } from "@/components/CoreStyled";
import { icons, images } from "@/constant";
import { Formik } from "formik";
import { CustomButton, ErrorInfo, InputField, OAuth } from "@/components";
import * as Yup from "yup";
import { Link } from "expo-router";

const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/;

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

const SignUp = () => {
  return (
    <ScrollViewStyled className=" bg-white ">
      <ViewStyled className="flex-1  bg-white">
        <ViewStyled className="flex-1 relative w-full h-[250px]">
          <ImageStyled className="z-0 w-fulwl h-[250px]" source={images.signUpCar} />
          <TextStyled className={`absolute ${Platform.OS === "android" ? "left-5" : "right-5 "} bottom-5 text-black font-noorSemiBold text-3xl`}>ایجاد حساب کاربری</TextStyled>
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
              <ViewStyled className="">
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
              </ViewStyled>
            )}
          </Formik>
          {/* TODO:OAuth Compoentns */}
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

export default SignUp;
