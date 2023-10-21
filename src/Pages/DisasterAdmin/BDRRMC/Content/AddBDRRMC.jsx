import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../../Components/Form/Input";

const AddBDRRMC = ({ addBDRRMC, closeModal }) => {
  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    code: z.string().nonempty("Code is required"),
    roles: z.string().nonempty("Roles is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    closeModal();
  };

  return (
    <CustomModal
      show={addBDRRMC}
      handleClose={closeModal}
      title="Add BDRRMC Team"
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <CustomInput
          label="Name of the Team"
          className="formInputModal"
          errors={errors}
          {...register("name")}
        />
        <CustomInput
          label="Code"
          className="formInputModal"
          errors={errors}
          {...register("code")}
        />
        <CustomTextArea
          label="Functional Roles and Responsibilities"
          className="formTextareaModal"
          errors={errors}
          {...register("roles")}
        />
      </form>
    </CustomModal>
  );
};

export default AddBDRRMC;
