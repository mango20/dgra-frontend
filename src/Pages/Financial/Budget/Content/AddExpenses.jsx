import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../Components/Form/Input";

const AddExpenses = ({ addExpenses, closeModal }) => {
  const schema = z.object({
    amount: z.string().nonempty("Amount is required"),
    particular: z.string().nonempty("Particular is required"),
    date: z.string().refine(
      (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      },
      { message: "Invalid Date" }
    ),
    remarks: z.string().nonempty("Remarks is required"),
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
      show={addExpenses}
      handleClose={closeModal}
      title="Add Expenses"
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <CustomInput
          label="Date"
          type="date"
          className="formInputModal"
          errors={errors}
          {...register("date")}
        />
        <CustomInput
          label="Particular"
          className="formInputModal"
          errors={errors}
          {...register("particular")}
        />
        <CustomInput
          label="Amount"
          className="formInputModal"
          errors={errors}
          {...register("amount")}
        />
        <CustomInput
          label="Remarks"
          className="formInputModal"
          errors={errors}
          {...register("remarks")}
        />
      </form>
    </CustomModal>
  );
};

export default AddExpenses;
