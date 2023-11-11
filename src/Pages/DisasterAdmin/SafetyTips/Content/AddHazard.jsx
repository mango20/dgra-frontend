import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import hazard from "../../../../Data/hazard.json";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import CustomTextArea from "../../../../Components/Form/TextArea";
import Select from "../../../../Components/Form/Select";

const AddHazard = ({
  addHazard,
  closeModal,
  editHazardModal,
  selectedHazard,
}) => {
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
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    if (selectedHazard) {
      // Logic to update the existing event
      console.log("Edit event data:", data);
    } else {
      // Logic to add a new event
      console.log("Add event data:", data);
    }
    reset();
    closeModal();
  };

  useEffect(() => {
    if (selectedHazard) {
      // If editing an event, set form values using setValue
      setValue("hazard", selectedHazard.hazard);
      setValue("description", selectedHazard.description);
      setValue("facts", selectedHazard.facts); // Make sure it's in the correct format
      setValue("safetyTips", selectedHazard.safetyTip);
      setValue("before", selectedHazard.before);
      setValue("during", selectedHazard.during);
      setValue("after", selectedHazard.after);
    }
  }, [selectedHazard, setValue]);
  return (
    <CustomModal
      show={addHazard || editHazardModal}
      handleClose={closeModal}
      title={selectedHazard ? "Edit Hazard" : "Add Hazard"}
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

export default AddHazard;
