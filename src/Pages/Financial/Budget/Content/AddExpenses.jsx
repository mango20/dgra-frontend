import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../../Components/Form/Input";
import { patchReq, postReq } from "../../../../Service/API";
import { useLocation, useParams } from "react-router-dom";

const AddExpenses = ({
  addExpenses,
  closeModal,
  editExpensesModal,
  selectedExpenses,
  alertMsg,
  onItemAddedOrUpdated,
}) => {
  const location = useLocation();
  const { id } = useParams();

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
    amount: z.string(),
    remarks: z.string().nonempty("Remarks is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const endpoint = selectedExpenses
      ? "/api/financial/expense"
      : "/api/financial/expense";

    const payload = selectedExpenses
      ? { ...data, _id: selectedExpenses._id }
      : {
          ...data,
          _id: id,
        };

    console.log(payload);

    try {
      const response = selectedExpenses
        ? await patchReq(endpoint, payload)
        : await postReq(endpoint, payload);
      console.log(response);
      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.error("Error Adding User", error);
    }

    reset();
    closeModal();
  };

  useEffect(() => {
    if (editExpensesModal && selectedExpenses) {
      setValue("date", selectedExpenses.date);
      setValue("particular", selectedExpenses.particular);
      setValue("amount", selectedExpenses.amount);
      setValue("remarks", selectedExpenses.remarks);
    } else {
      console.log("first");
      setValue("date", "");
      setValue("particular", "");
      setValue("amount", "");
      setValue("remarks", "");
    }
  }, [selectedExpenses, setValue]);

  return (
    <CustomModal
      show={addExpenses || editExpensesModal}
      handleClose={closeModal}
      title={selectedExpenses ? "Edit Expenses" : "Add Expenses"}
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
