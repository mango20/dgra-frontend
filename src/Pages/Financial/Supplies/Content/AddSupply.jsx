import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import landClassification from "../../../../Data/landClassification.json";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import Select from "../../../../Components/Form/Select";
import CustomInput from "../../../../Components/Form/Input";
import { patchReq, postReq } from "../../../../Service/API";
const AddSupply = ({
  addSupply,
  closeModal,
  editSupplyModal,
  selectedSupply,
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
    const endpoint = selectedSupply
      ? "/api/financial/budget"
      : "/api/financial/budget";

    // const fullname = generateFullName(currentUser);

    const payload = selectedSupply
      ? { _id: selectedSupply._id, ...data }
      : { ...data };

    console.log(payload);

    try {
      const response = selectedSupply
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

  const title = selectedSupply ? "Edit Budget" : "Add Budget";

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
    console.log(editSupplyModal && selectedSupply);
    if (editSupplyModal && selectedSupply) {
      console.log("fdsfsdf");
      setValue("fiscalYear", selectedSupply.fiscalYear);
      setValue("accountCode", selectedSupply.accountCode);
      setValue("accountName", selectedSupply.accountName);
      setValue("fundingAmount", selectedSupply.fundingAmount);
    } else {
      console.log("first");
      setValue("fiscalYear", "");
      setValue("accountCode", "");
      setValue("accountName", "");
      setValue("fundingAmount ", "");
    }
  }, [selectedSupply, setValue]);

  return (
    <CustomModal
      show={addSupply || editSupplyModal}
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

export default AddSupply;
