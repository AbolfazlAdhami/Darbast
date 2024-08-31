import { ScrollViewStyled, TextStyled, ViewStyled, ImageStyled } from "@/components/CoreStyled";
import { icons, images } from "@/constant";
import Input from "@/components/Input";
import { useForm, Controller } from "react-hook-form";

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
          <TextStyled className="absolute right-5 bottom-5 text-black font-noorSemiBold text-3xl">ایجاد حساب کاربری</TextStyled>
        </ViewStyled>
        <ViewStyled className="p-5">
          {/* <Controller name="" /> */}
          <Input label="نام کاربری" icon={icons.person} />
        </ViewStyled>
      </ViewStyled>
    </ScrollViewStyled>
  );
};

export default SignUp;
