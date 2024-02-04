import React from "react";
import CustomButton from "../../Components/Form/Button";
import CustomInput from "../../Components/Form/Input";
import { useForm } from "react-hook-form";
import usertype from "../../Data/useAdmin.json";
import Select from "../../Components/Form/Select";
import { postReq } from "../../Service/API";
const AddPage = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAdd = async (data) => {
    const payload = {
      username: "Admin",
      access: "Enabled",
      assignedChariman: "Cha",
      ...data,
    };

    try {
      const endpoint = "/api/system-tools/createAdmin";

      const response = await postReq(endpoint, payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(handleAdd)}>
          <h1>Add Admin</h1>
          <CustomInput
            {...register("lastName")}
            placeholder="Enter Last Name"
            label="Last Name"
            type="text"
            errors={errors}
          />

          <CustomInput
            {...register("firstName")}
            placeholder="Enter First Name"
            label="First Name"
            type="text"
            errors={errors}
          />

          <CustomInput
            {...register("middleName")}
            placeholder="Enter Middle Name"
            label="Middle Name"
            type="text"
            errors={errors}
          />

          <CustomInput
            {...register("email")}
            placeholder="Enter Email"
            label="Email"
            type="email"
            errors={errors}
          />

          <Select
            data={usertype}
            label="Usertype"
            className="formSelectBlockModal"
            defaultOptionLabel="Select User Type"
            errors={errors}
            {...register("userType")}
          />

          {/* <CustomInput
            {...register("password")}
            placeholder="Enter Password"
            label="Password"
            type="password"
            errors={errors}
          /> */}
          <CustomButton label="Add" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddPage;
