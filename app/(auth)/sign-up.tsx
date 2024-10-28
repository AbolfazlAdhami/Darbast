import { ScrollViewStyled, TextStyled, ViewStyled, ImageStyled } from "@/components/CoreStyled";
import { icons, images } from "@/constant";
import Input from "@/components/Input";
import { useForm, Controller, SubmitHandler, FieldValue } from "react-hook-form";
import { Platform } from "react-native";
import CustomButton from "@/components/CustomButton";
import ErrorInfo from "@/components/ErrorInfo";

type FormType = {
  username: string;
  email: string;
  password: string;
};
const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/;
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <ScrollViewStyled className="flex-1 bg-white ">
      <ViewStyled className="flex-1 bg-white">
        <ViewStyled className="flex-1 relative w-full h-[250px]">
          <ImageStyled className="z-0 w-fulwl h-[250px]" source={images.signUpCar} />
          <TextStyled className={`absolute ${Platform.OS === "android" ? "left-5" : "right-5 "} bottom-5 text-black font-noorSemiBold text-3xl`}>ایجاد حساب کاربری</TextStyled>
        </ViewStyled>
        <ViewStyled className="p-5">
          <Controller
            control={control}
            name="username"
            rules={{
              required: { value: true, message: "نام کاربری اجباریست" },
              minLength: { value: 5, message: "نام کاربری باید حداقل ۵ حرفی باشد" },
              maxLength: { value: 15, message: "نام کاربری باید حداکثر ۱۵ حرفی باشد" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="نام کاربری" placeholder="نام کاربری خود را وارد کنید" className="text-right" icon={icons.person} value={value} onChange={onChange} onBlur={onBlur} />
            )}
          />
          {errors?.username ? <ErrorInfo message={errors?.username.message?.toString()} /> : null}
          <Controller
            control={control}
            name="email"
            rules={{ required: { value: true, message: "وارد کردن ایمیل الزامیست" }, pattern: { value: emailPattern, message: "فرمت ایمیل نامناسب " } }}
            render={({ field: { onBlur, onChange, value } }) => <Input label="ایمیل" onChange={onChange} onBlur={onBlur} value={value} placeholder="ایمیل خود را وارد کنید" icon={icons.email} />}
          />
          {errors?.email ? <ErrorInfo message={errors?.email.message?.toString()} /> : null}

          <Controller
            control={control}
            name="password"
            rules={{
              required: { message: "پسورد الزامیست", value: true },
              minLength: { value: 8, message: "پسسورد حداقل ۸ کاراکتری باشد" },
              maxLength: { value: 24, message: "پسوورد حداکثر باید ۲۴ کاراکتری باشد" },
              pattern: { value: passwordPattern, message: "پسوورد باید ترکیبی از حروف بزرگ، کوچک و یه علامت مثل ! باشد" },
            }}
            render={({ field: { value, onChange, onBlur } }) => <Input onChange={onChange} onBlur={onBlur} value={value} label="پسوورد" icon={icons.lock} secureTextEntry={true} />}
          />
          {errors?.password ? <ErrorInfo message={errors?.password.message?.toString()} /> : null}

          <CustomButton onPress={handleSubmit(onSubmit)} title="ثبت نام " className="my-4" />
        </ViewStyled>
      </ViewStyled>
    </ScrollViewStyled>
  );
};

export default SignUp;
