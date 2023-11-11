import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import hazard from "../../../../Data/hazard.json";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import CustomTextArea from "../../../../Components/Form/TextArea";
import Select from "../../../../Components/Form/Select";

const AddHouseholdMember = ({ addHazard, closeModal }) => {
  const schema = z.object({
    hazard: z.string().nonempty("Hazard is required"),
    description: z.string().nonempty("Description is required"),
    facts: z.string().nonempty("Facts is required"),
    safetyTips: z.string().nonempty("Safety tips is required"),
    before: z.string().nonempty("Before is required"),
    during: z.string().nonempty("During is required"),
    after: z.string().nonempty("After is required"),
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
      show={addHazard}
      handleClose={closeModal}
      title="Add Hazard"
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <Select
          data={hazard}
          label="Hazard"
          className="formSelectModal"
          defaultOptionLabel="Select Hazard"
          errors={errors}
          {...register("hazard")}
        />
        <CustomTextArea
          label="Description"
          className="formTextareaModal"
          errors={errors}
          {...register("description")}
        />
        <CustomTextArea
          label="Facts"
          className="formTextareaModal"
          errors={errors}
          {...register("facts")}
        />
        <CustomTextArea
          label="Safety Tips"
          className="formTextareaModal"
          errors={errors}
          {...register("safetyTips")}
        />
        <label
          style={{ fontFamily: "$lato", fontSize: "20px", fontWeight: "bold" }}
        >
          What To Do
        </label>
        <CustomTextArea
          label="Before"
          className="formTextareaModal"
          errors={errors}
          {...register("before")}
        />
        <CustomTextArea
          label="During"
          className="formTextareaModal"
          errors={errors}
          {...register("during")}
        />
        <CustomTextArea
          label="After"
          className="formTextareaModal"
          errors={errors}
          {...register("after")}
        />
      </form>
    </CustomModal>
  );
};

export default AddHouseholdMember;
