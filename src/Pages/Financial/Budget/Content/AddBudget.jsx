import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../Components/Form/Input";
import Select from "../../../Components/Form/Select";
import landClassification from "../../../Data/landClassification.json";
const AddBudget = ({ addBudget, closeModal }) => {
  const schema = z.object({
    year: z.string().nonempty("Year is required"),
    name: z.string().nonempty("Name is required"),
    code: z.string().nonempty("Code is required"),
    amount: z.string().nonempty("Amount is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    closeModal();
  };
  return (
    <CustomModal
      show={addBudget}
      handleClose={closeModal}
      title="Add Budget"
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <Select
          label="Fiscal Year"
          defaultOptionLabel="Choose Year"
          data={landClassification}
          errors={errors}
          {...register("year")}
          className="formSelectModal"
        />
        <CustomInput
          label="Account Code"
          className="formInputModal"
          errors={errors}
          {...register("code")}
        />
        <CustomInput
          label="Account Name"
          className="formInputModal"
          errors={errors}
          {...register("name")}
        />
        <CustomInput
          label="Funding Amount"
          className="formInputModal"
          errors={errors}
          {...register("amount")}
        />
      </form>
    </CustomModal>
  );
};

export default AddBudget;
