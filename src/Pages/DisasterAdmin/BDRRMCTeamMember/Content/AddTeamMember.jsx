import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../../Components/Form/Input";
import Select from "../../../../Components/Form/Select";

const AddTeamMember = ({
  addTeamMemberModal,
  closeModal,
  editTeamMemberModal,
  selectedTeamMember,
}) => {
  const schema = z.object({
    type: z.string().nonempty("Type is required"),
    firstName: z.string().nonempty("Name is required"),
    birthday: z.string().refine(
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
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    if (selectedTeamMember) {
      // Logic to update the existing event
      console.log("Edit event data:", data);
    } else {
      // Logic to add a new event
      console.log("Add event data:", data);
    }
    closeModal();
  };

  useEffect(() => {
    if (selectedTeamMember) {
      // If editing an event, set form values using setValue
      setValue("type", selectedTeamMember.type);
      setValue("eventName", selectedTeamMember.eventName);
      setValue("when", selectedTeamMember.when); // Make sure it's in the correct format
      setValue("where", selectedTeamMember.where);
    }
  }, [selectedTeamMember, setValue]);

  return (
    <CustomModal
      show={addTeamMemberModal || editTeamMemberModal}
      handleClose={closeModal}
      title={
        selectedTeamMember
          ? "Edit BDRRMC Team Member"
          : "Add BDRRMC Team Member"
      }
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <CustomInput
          label="First Name"
          className="formInputModal"
          errors={errors}
          {...register("firstName")}
        />{" "}
        <CustomInput
          label="Middle Name"
          className="formInputModal"
          errors={errors}
          {...register("middleName")}
        />{" "}
        <CustomInput
          label="Last Name"
          className="formInputModal"
          errors={errors}
          {...register("lastName")}
        />
        <Select
          label="Gender"
          errors={errors}
          defaultOptionLabel="Select Gender"
          // data={landClassification}
          {...register("gender")}
          className="formSelectModal"
        />
        <CustomInput
          label="Birthdate"
          className="formInputModal"
          type="date"
          errors={errors}
          {...register("birthday")}
        />
        <Select
          label="Team"
          errors={errors}
          defaultOptionLabel="Select Team"
          // data={landClassification}
          {...register("team")}
          className="formSelectModal"
        />
        <CustomInput
          label="Period From"
          className="formInputModal"
          type="date"
          errors={errors}
          {...register("periodFrom")}
        />
        <CustomInput
          label="Period To"
          className="formInputModal"
          type="date"
          errors={errors}
          {...register("periodTo")}
        />
        <CustomInput
          label="Contact"
          className="formInputModal"
          errors={errors}
          {...register("contact")}
        />
      </form>
    </CustomModal>
  );
};

export default AddTeamMember;
