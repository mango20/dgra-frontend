import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../../../Components/Form/Input";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";

const AddHousehold = ({ addHousehold, closeModal }) => {
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
      show={addHousehold}
      handleClose={closeModal}
      title="Add Household"
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

export default AddHousehold;
