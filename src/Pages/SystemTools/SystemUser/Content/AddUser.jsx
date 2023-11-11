import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import Select from "../../../../Components/Form/Select";
import hazard from "../../../../Data/hazard.json";
import CustomInput from "../../../../Components/Form/Input";

const AddUser = ({ addUser, closeModal, editEventModal, selectedEvent }) => {
  const schema = z.object({
    username: z.string().nonempty("Username is required"),
    firstName: z.string().nonempty("First Name is required"),
    middleName: z.string().nonempty("Middle Name is required"),
    lastName: z.string().nonempty("Last Name is required"),
    email: z.string().nonempty("Email is required"),
    userType: z.string().nonempty("User Type is required"),
    access: z.string().nonempty("Access is required"),
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    if (selectedEvent) {
    } else {
    }

    reset();
    closeModal();
  };

  return (
    <CustomModal
      show={addUser}
      handleClose={closeModal}
      title="Add User"
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <CustomInput
          label="Username"
          className="formInputBlockModal"
          errors={errors}
          type="text"
          {...register("username")}
        />
        <CustomInput
          label="First Name"
          className="formInputBlockModal"
          errors={errors}
          type="text"
          {...register("firstName")}
        />
        <CustomInput
          label="Middle Name"
          className="formInputBlockModal"
          errors={errors}
          type="text"
          {...register("middleName")}
        />
        <CustomInput
          label="Last Name"
          className="formInputBlockModal"
          errors={errors}
          type="text"
          {...register("lastName")}
        />
        <CustomInput
          label="Email"
          className="formInputBlockModal"
          errors={errors}
          type="email"
          {...register("email")}
        />
        <Select
          data={hazard}
          label="Usertype"
          className="formSelectBlockModal"
          defaultOptionLabel="Select User Type"
          errors={errors}
          {...register("userType")}
        />
        <Select
          data={hazard}
          label="Access"
          className="formSelectBlockModal"
          defaultOptionLabel="Select Access"
          errors={errors}
          {...register("access")}
        />
      </form>
    </CustomModal>
  );
};

export default AddUser;
