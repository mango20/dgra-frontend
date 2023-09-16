import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../Components/Form/Input";

const AddEducation = ({ addEvacuation, closeModal }) => {
  const schema = z.object({
    type: z.string().nonempty("Type is required"),
    name: z.string().nonempty("Name is required"),
    when: z.string().refine(
      (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      },
      { message: "Invalid Date" }
    ),
    where: z.string().nonempty("Location is required"),
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
      show={addEvacuation}
      handleClose={closeModal}
      title="Add Evacuation"
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <CustomInput
          label="Type"
          className="formInputModal"
          errors={errors}
          {...register("type")}
        />
        <CustomInput
          label="Name"
          className="formInputModal"
          errors={errors}
          {...register("name")}
        />
        <CustomInput
          label="When"
          className="formInputModal"
          type="date"
          errors={errors}
          {...register("when")}
        />
        <CustomInput
          label="Where"
          className="formInputModal"
          errors={errors}
          {...register("where")}
        />
      </form>
    </CustomModal>
  );
};

export default AddEducation;
