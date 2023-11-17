import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../../Components/Form/Input";
import CustomTextArea from "../../../../Components/Form/TextArea";
import { patchReq, postReq } from "../../../../Service/API";

const AddBDRRMC = ({
  addBDRRMC,
  closeModal,
  editBDRRMCModal,
  selectedBDRRMC,
  alertMsg,
  onItemAddedOrUpdated,
}) => {
  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    code: z.string().nonempty("Code is required"),
    roles: z.string().nonempty("Roles is required"),
  });

  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const endpoint = selectedBDRRMC
      ? "/api/disasterAdmin/bdrrmcteam"
      : "/api/disasterAdmin/bdrrmcteam";

    const payload = selectedBDRRMC
      ? { _id: selectedBDRRMC._id, ...data }
      : { ...data };

    console.log(payload);

    try {
      const response = selectedBDRRMC
        ? await patchReq(endpoint, payload)
        : await postReq(endpoint, payload);

      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.error("Error Adding User", error);
    }

    reset();
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
