import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import Select from "../../../../Components/Form/Select";
import usertype from "../../../../Data/usertype.json";
import accesOption from "../../../../Data/access.json";
import CustomInput from "../../../../Components/Form/Input";
import { patchReq, postReq } from "../../../../Service/API";
import { useSelector } from "react-redux";
import { generateFullName } from "../../../../Utils/Fullname";

const AddUser = ({
  addUser,
  closeModal,
  editUserModal,
  alertMsg,
  selectedUser,
  onItemAddedOrUpdated,
}) => {
  const currentUser = useSelector((state) => state.reducer.userInfo?.userInfo);

  const schema = z.object({
    username: z.string().nonempty("Username is required"),
    firstname: z.string().nonempty("First Name is required"),
    middlename: z.string().nonempty("Middle Name is required"),
    lastname: z.string().nonempty("Last Name is required"),
    email: z.string().nonempty("Email is required"),
    userType: z.string().nonempty("User Type is required"),
    access: z.string().nonempty("Access is required"),
  });

  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const endpoint = selectedUser
      ? "/api/system-tools/systemTools"
      : "/api/system-tools/systemTools";

    const fullname = generateFullName(currentUser);

    const payload = selectedUser
      ? { _id: selectedUser._id, ...data }
      : { assignedChairman: fullname, ...data };

    console.log(payload);

    try {
      const response = selectedUser
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
    if (editUserModal && selectedUser) {
      const {
        username,
        firstname,
        lastname,
        middlename,
        email,
        userType,
        access,
      } = selectedUser;
      setValue("username", username);
      setValue("firstname", firstname);
      setValue("lastname", lastname);
      setValue("middlename", middlename);
      setValue("email", email);
      setValue("userType", userType);
      setValue("access", access);
    } else {
      setValue("username", "");
      setValue("fullname", "");
      setValue("email", "");
      setValue("userType", "");
      setValue("access", "");
    }
  }, [editUserModal, selectedUser, setValue]);

  const title = selectedUser ? "Edit User" : "Add User";

  return (
    <CustomModal
      show={addUser || editUserModal}
      handleClose={closeModal}
      title={title}
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
          {...register("firstname")}
        />
        <CustomInput
          label="Middle Name"
          className="formInputBlockModal"
          errors={errors}
          type="text"
          {...register("middlename")}
        />{" "}
        <CustomInput
          label="Last Name"
          className="formInputBlockModal"
          errors={errors}
          type="text"
          {...register("lastname")}
        />
        <CustomInput
          label="Email"
          className="formInputBlockModal"
          errors={errors}
          type="email"
          {...register("email")}
        />
        <Select
          data={usertype}
          label="Usertype"
          className="formSelectBlockModal"
          defaultOptionLabel="Select User Type"
          errors={errors}
          {...register("userType")}
        />
        <Select
          data={accesOption}
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
