import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../_constants";
import { ContactFormData, ContactResponse } from "../_types";

export const useContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res: AxiosResponse<ContactResponse> = await axios.post(
        `${BASE_URL}/contacts`,
        data
      );

      alert("お問い合わせを送信しました。ありがとうございます！");
      reset();
    } catch (error) {
      console.error("送信エラー:", error);
      alert("エラーが発生しました。ネットワークをご確認ください。");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    onSubmit,
  };
};
