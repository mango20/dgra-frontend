import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../Components/Form/Input";
import "../../Asset/Scss/Pages/Login/_login.scss";
import CustomButton from "../../Components/Form/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { postReq } from "../../Service/API";
import Message from "../../Components/UI/Message/Message";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../Service/Action/AuthSlice";
import { setUserInfo } from "../../Service/Action/UserInfo";

const Login = () => {
  // useNavigate
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = z.object({
    username: z.string().nonempty("Username is required"),
    userPassword: z.string(),
    // .nonempty("Password is required")
    // .min(8, "Password must be at least 8 characters")
    // .max(16, "Password cannot exceed 16 characters")
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    // ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setErrorMsg("");
    dispatch(loginStart());

    try {
      const loginResponse = await postReq("/api/auth/login", data);
      dispatch(loginSuccess(loginResponse));

      const profileResponse = await postReq("/api/auth/getInfo", {
        email: loginResponse.email,
      });

      console.log("profileResponse :", profileResponse);
      dispatch(setUserInfo(profileResponse.user));
      navigate("/barangay-profile/about-barangay");
    } catch (error) {
      setErrorMsg(error.response.statusText);
      dispatch(loginFailure());
      console.error("Error login:", error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
        <CustomInput
          name="username"
          label="Username"
          errors={errors}
          {...register("username")}
          type="text"
          className="loginField"
        />
        <CustomInput
          name="password"
          label="Password"
          errors={errors}
          {...register("userPassword")}
          type="password"
          className="loginField"
        />
        <div style={{ margin: "-10px 0 20px 0" }}>
          <Message label={errorMsg} className="error" />
        </div>

        <CustomButton label="Login" type="submit" />
      </form>
    </div>
  );
};

export default Login;
