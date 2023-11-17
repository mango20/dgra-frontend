import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import landClassification from "../../../../Data/landClassification.json";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import Select from "../../../../Components/Form/Select";
import CustomInput from "../../../../Components/Form/Input";
import { patchReq, postReq } from "../../../../Service/API";
const AddBudget = ({
  addBudget,
  closeModal,
  editBudgetModal,
  selectedBudget,
  alertMsg,
  onItemAddedOrUpdated,
}) => {
  const schema = z.object({
    fiscalYear: z.string().nonempty("Year is required"),
    accountName: z.string().nonempty("Name is required"),
    accountCode: z.string().nonempty("Code is required"),
    fundingAmount: z.string().nonempty("Amount is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const endpoint = selectedBudget
      ? "/api/financial/budget"
      : "/api/financial/budget";

    // const fullname = generateFullName(currentUser);

    const payload = selectedBudget
      ? { _id: selectedBudget._id, ...data }
      : { ...data };

    console.log(payload);

    try {
      const response = selectedBudget
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

  const title = selectedBudget ? "Edit Budget" : "Add Budget";

  function generateFiscalYears() {
    const date = new Date();
    let currentYear = date.getFullYear();

    let fiscalYears = [];

    while (currentYear >= 2016) {
      fiscalYears.push(currentYear.toString()); // Convert the year to a string
      currentYear--;
    }

    return fiscalYears;
  }

  const fiscalYears = generateFiscalYears();

  useEffect(() => {
    console.log(editBudgetModal && selectedBudget);
    if (editBudgetModal && selectedBudget) {
      console.log("fdsfsdf");
      setValue("fiscalYear", selectedBudget.fiscalYear);
      setValue("accountCode", selectedBudget.accountCode);
      setValue("accountName", selectedBudget.accountName);
      setValue("fundingAmount", selectedBudget.fundingAmount);
    } else {
      console.log("first");
      setValue("fiscalYear", "");
      setValue("accountCode", "");
      setValue("accountName", "");
      setValue("fundingAmount ", "");
    }
  }, [selectedBudget, setValue]);

  return (
    <CustomModal
      show={addBudget || editBudgetModal}
      handleClose={closeModal}
      title={title}
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <Select
          label="Fiscal Year"
          defaultOptionLabel="Choose Year"
          data={fiscalYears}
          errors={errors}
          {...register("fiscalYear")}
          className="formSelectModal"
        />
        <CustomInput
          label="Account Code"
          className="formInputModal"
          errors={errors}
          {...register("accountCode")}
        />
        <CustomInput
          label="Account Name"
          className="formInputModal"
          errors={errors}
          {...register("accountName")}
        />
        <CustomInput
          label="Funding Amount"
          className="formInputModal"
          errors={errors}
          {...register("fundingAmount")}
        />
      </form>
    </CustomModal>
  );
};

export default AddBudget;
