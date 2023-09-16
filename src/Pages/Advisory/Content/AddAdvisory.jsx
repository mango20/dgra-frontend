import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../Components/Form/Input";
import CustomTextArea from "../../../Components/Form/TextArea";

const AddAdvisory = ({ addAdvisory, closeModal }) => {
  const schema = z.object({
    subject: z.string().nonempty("Subject is required"),
    type: z.string().nonempty("Type is required"),
    message: z.string().nonempty("Message is required"),
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    reset();
    closeModal();
  };

  return (
    <CustomModal
      show={addAdvisory}
      handleClose={closeModal}
      title="Add Advisory"
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <CustomInput
          label="Subject"
          className="formInputModal"
          errors={errors}
          {...register("subject")}
        />
        <CustomInput
          label="Type"
          className="formInputModal"
          errors={errors}
          {...register("type")}
        />

        <CustomTextArea
          label="Message"
          className="formTextareaModal"
          errors={errors}
          {...register("message")}
        />
      </form>
    </CustomModal>
  );
};

export default AddAdvisory;
