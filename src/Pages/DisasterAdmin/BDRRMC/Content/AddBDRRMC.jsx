import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../../Components/Form/Input";
import CustomTextArea from "../../../../Components/Form/TextArea";

const AddBDRRMC = ({
  addBDRRMC,
  closeModal,
  editBDRRMCModal,
  selectedBDRRMC,
}) => {
  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    code: z.string().nonempty("Code is required"),
    roles: z.string().nonempty("Roles is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    if (selectedBDRRMC) {
      // Logic to update the existing event
      console.log("Edit event data:", data);
    } else {
      // Logic to add a new event
      console.log("Add event data:", data);
    }
    closeModal();
  };

  useEffect(() => {
    if (selectedBDRRMC) {
      // If editing an event, set form values using setValue
      setValue("name", selectedBDRRMC.name);
      setValue("code", selectedBDRRMC.code);
      setValue("roles", selectedBDRRMC.roles); // Make sure it's in the correct format
    }
  }, [selectedBDRRMC, setValue]);

  return (
    <CustomModal
      show={addBDRRMC || editBDRRMCModal}
      handleClose={closeModal}
      title={selectedBDRRMC ? "Edit BDRRMC Team" : "Add BDRRMC Team"}
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
