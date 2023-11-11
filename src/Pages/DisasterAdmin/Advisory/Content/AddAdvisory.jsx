import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../../Components/Form/Input";
import CustomTextArea from "../../../../Components/Form/TextArea";
import Select from "../../../../Components/Form/Select";
import advisoryTypeOption from "../../../../Data/advisoryType.json";
const AddAdvisory = ({
  addAdvisory,
  closeModal,
  editAdvisoryModal,
  selectedAdvisory,
}) => {
  const schema = z.object({
    subject: z.string().nonempty("Subject is required"),
    type: z.string().nonempty("Type is required"),
    message: z.string().nonempty("Message is required"),
  });

  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    reset();
    closeModal();
  };

  useEffect(() => {
    if (selectedAdvisory) {
      // If editing an event, set form values using setValue
      setValue("type", selectedAdvisory.type);
      setValue("subject", selectedAdvisory.subject);
      setValue("message", selectedAdvisory.message); // Make sure it's in the correct format
    }
  }, [selectedAdvisory, setValue]);

  return (
    <CustomModal
      show={addAdvisory || editAdvisoryModal}
      handleClose={closeModal}
      title={
        selectedAdvisory ? "Edit Advisory Message" : "Add Advisory Message"
      }
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <CustomInput
          label="Subject"
          className="formInputModal"
          errors={errors}
          {...register("subject")}
        />

        <Select
          label="Type"
          errors={errors}
          defaultOptionLabel="Select Advisory Type"
          data={advisoryTypeOption}
          {...register("type")}
          className="formSelectModal"
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
