import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../../../Components/UI/Modal/CustomModal";
import Select from "../../../../../Components/Form/Select";
import landClassification from "../../../../../Data/landClassification.json";
import CustomInput from "../../../../../Components/Form/Input";
import YesNo from "../../../../../Data/YesNo.json";
import civilStatus from "../../../../../Data/civilStatus.json";
import placeOfWork from "../../../../../Data/placeOfWork.json";
import typeOfDisability from "../../../../../Data/typeOfDisability.json";
import relationToHousehold from "../../../../../Data/relationToHousehold.json";
import "../../../../../Asset/Scss/Pages/ResidenceProfile/_addHouseholdMember.scss";
const AddHouseholdMember = ({
  addHouseholdMember,
  closeModal,
  editHouseholdModal,
  selectedEvent,
}) => {
  const schema = z.object({
    province: z.string().nonempty("Province is required"),
    municipality: z.string().nonempty("Municipality is required"),
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
      size="lg"
      show={addHouseholdMember}
      handleClose={closeModal}
      title="Add Household Member"
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <div className="householdMemberName">
          <label>C.1 What is the name of the family member?</label>
          <div className="householdMemberNameContent">
            <CustomInput
              label="First Name"
              placeholder="First Name"
              className="formInputModalHouseholdMemberName"
              errors={errors}
              {...register("province")}
            />
            <CustomInput
              label="Middle Name"
              placeholder="Middle Name"
              className="formInputModalHouseholdMemberName"
              errors={errors}
              {...register("province")}
            />
            <CustomInput
              label="Last Name"
              placeholder="Last Name"
              className="formInputModalHouseholdMemberName"
              errors={errors}
              {...register("province")}
            />
          </div>
        </div>
        <Select
          label="C.2 In which family does this family belong?"
          errors={errors}
          defaultOptionLabel="Choose Category"
          data={landClassification}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.3 What is the relation to the household head?"
          errors={errors}
          defaultOptionLabel="Choose Relation"
          data={relationToHousehold}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.4 What is his/her civil status?"
          errors={errors}
          defaultOptionLabel="Choose Status"
          data={civilStatus}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.5 Is the member Deleted or Active?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.7 Is he/she currently staying on the same address?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.8 Is this family member attending school?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.9 [If Yes in Question C.8]. What grade or year level is he/she presently attending?"
          errors={errors}
          defaultOptionLabel="Choose Category"
          data={landClassification}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.10 What is the highest educational level completed?"
          errors={errors}
          defaultOptionLabel="Choose Category"
          data={landClassification}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.11 If Active, is she pregnant?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.12 Is the family have children?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.13 Is solo parent?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.14 Does the family member have a disability?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.15 [If Yes in in Question C.14]. What type of disability?"
          errors={errors}
          defaultOptionLabel="Choose Category"
          data={typeOfDisability}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <CustomInput
          label="C.16 Are there other health problems? Specify"
          className="formInputModalAddHouseholdMember"
          errors={errors}
          {...register("province")}
        />
        <Select
          label="C.17 Is the family member employed?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
        <CustomInput
          label="C.18 What is the occupation of the family member?"
          className="formInputModalAddHouseholdMember"
          errors={errors}
          {...register("province")}
        />
        <Select
          label="C.19 Where the  family member work?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={placeOfWork}
          {...register("barangayCategory")}
          className="formSelectModalAddHouseholdMember"
        />
      </form>

      {/* <form> */}
      {/* <CustomInput
      label="Type"
      className="formInputModal"
      errors={errors}
      {...register("type")}
    />
    <CustomInput
      label="Name"
      className="formInputModal"
      errors={errors}
      {...register("name")}
    />
    <CustomInput
      label="When"
      className="formInputModal"
      type="date"
      errors={errors}
      {...register("when")}
    />
    <CustomInput
      label="Where"
      className="formInputModal"
      errors={errors}
      {...register("where")}
    /> */}
      {/* </form> */}
    </CustomModal>
  );
};

export default AddHouseholdMember;
