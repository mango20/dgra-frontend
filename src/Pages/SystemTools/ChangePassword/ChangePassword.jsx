import React, { useState } from "react";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import CustomInput from "../../../Components/Form/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import "../../../Asset/Scss/Pages/SystemUser/ChangePassword/_changePassword.scss";
import Sidebar from "../../../Layout/Sidebar/Sidebar";
import PageContainer from "../../../Layout/Container/PageContainer";
import { postReq } from "../../../Service/API";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const schema = z
    .object({
      userPassword: z.string().nonempty("Old Password is required"),
      newPassword: z.string().nonempty("New Password is required"),
      confirmPassword: z.string().nonempty("Confirm Password is required"),
    })
    .refine(
      (data) => {
        return data.newPassword === data.confirmPassword;
      },
      {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }
    );

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const userEmail = useSelector((state) => state.reducer.auth?.authUser.email);
  // console.log(userEmail);
  const onSubmit = async (data) => {
    // console.log(data);

    try {
      const { confirmPassword, ...newData } = data;
      const payload = {
        email: userEmail,
        ...newData,
      };
      // console.log(payload);
      const response = await postReq("/api/auth/updatePass", payload);
      console.log("changePass response: ", response);
    } catch (error) {
      console.log("Error changing password:", error);
    }

    // reset();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <PageContainer>
        <ContentContainer title={"Change Password"}>
          <div className="changePassword">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Enter User Password</h1>
              <CustomInput
                label="Old Password"
                className="formInputModal"
                errors={errors}
                type="password"
                {...register("userPassword")}
              />
              <CustomInput
                label="New Password"
                className="formInputModal"
                errors={errors}
                type="password"
                {...register("newPassword")}
              />
              <CustomInput
                label="Confirm Password"
                className="formInputModal"
                errors={errors}
                type="password"
                {...register("confirmPassword")}
              />
              <div className="updateBtnContainer">
                <Button variant="success" type="submit">
                  Update
                </Button>
              </div>
            </form>
          </div>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default ChangePassword;
