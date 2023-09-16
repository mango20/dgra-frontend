import React from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../Components/Form/Input";
import "../../Asset/Scss/Pages/Login/_login.scss";
import CustomButton from "../../Components/Form/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // useNavigate
  const navigate = useNavigate();
  const schema = z.object({
    username: z.string().nonempty("Username is required"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password cannot exceed 16 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);

    navigate("barangay-profile");
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
          {...register("password")}
          type="password"
          className="loginField"
        />
        <CustomButton label="Login" type="submit" />
      </form>
    </div>
  );
};

export default Login;
