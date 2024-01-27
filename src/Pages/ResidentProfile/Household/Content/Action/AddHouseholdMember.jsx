import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../../../Components/UI/Modal/CustomModal";
import Select from "../../../../../Components/Form/Select";
import CustomInput from "../../../../../Components/Form/Input";
import YesNo from "../../../../../Data/YesNo.json";
import civilStatus from "../../../../../Data/civilStatus.json";
import placeOfWork from "../../../../../Data/placeOfWork.json";
import gradeYear from "../../../../../Data/gradeYear.json";

import highestEducation from "../../../../../Data/highestEducation.json";
import familyBelong from "../../../../../Data/familyBelong.json";
import typeOfDisability from "../../../../../Data/typeOfDisability.json";
import relationToHousehold from "../../../../../Data/relationToHousehold.json";
import "../../../../../Asset/Scss/Pages/ResidenceProfile/_addHouseholdMember.scss";
import { postReq } from "../../../../../Service/API";
const AddHouseholdMember = ({
  addHouseholdMember,
  closeModal,
  editHouseholdModal,
  selectedEvent,
}) => {
  const [showc9, setShowc9] = useState(false);
  const [showc15, setShowc15] = useState(false);

  const schema = z.object({
    cfirstname: z.string().nonempty("First name is required"),
    cmiddlename: z.string().nonempty("Middle name is required"),
    clastname: z.string().nonempty("Last name is required"),
    c2: z.string().nonempty("c2 is required"),
    c3: z.string().nonempty("c3 is required"),
    c4: z.string().nonempty("c4 is required"),
    c5: z.string().nonempty("c5 is required"),
    c6: z.string().nonempty("c6 is required"),
    c7: z.string().nonempty("c7 is required"),
    c8: z.string().nonempty("c8 is required"),
    c9: z.string().optional(),
    c10: z.string().nonempty("c10 is required"),
    c11: z.string().nonempty("c11 is required"),
    c12: z.string().nonempty("c12 is required"),
    c13: z.string().nonempty("c13 is required"),
    c14: z.string().nonempty("c14 is required"),
    c15: z.string().optional(),
    c16: z.string().nonempty("c16 is required"),
    c17: z.string().nonempty("c17 is required"),
    c18: z.string().nonempty("c18 is required"),
    c19: z.string().nonempty("c19 is required"),
  });

  const {
    register,
    formState: { errors, isDirty },
    reset,
    setValue,
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });
  console.log(errors);
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await postReq("/api/getHouseholdMember", data);
      console.log(response);
    } catch (error) {
      console.log("Error Get User", error);
    }

    // closeModal();
  };

  const handleClose = () => {
    if (isDirty) {
      if (window.confirm("Do you want to discard changes?")) {
        reset();
        closeModal();
      }
    } else {
      closeModal();
    }
  };

  return (
    <CustomModal
      size="lg"
      show={addHouseholdMember}
      handleClose={handleClose}
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
              {...register("cfirstname")}
            />
            <CustomInput
              label="Middle Name"
              placeholder="Middle Name"
              className="formInputModalHouseholdMemberName"
              errors={errors}
              {...register("cmiddlename")}
            />
            <CustomInput
              label="Last Name"
              placeholder="Last Name"
              className="formInputModalHouseholdMemberName"
              errors={errors}
              {...register("clastname")}
            />
          </div>
        </div>
        <Select
          label="C.2 In which family does this family belong?"
          errors={errors}
          defaultOptionLabel="Choose Category"
          data={familyBelong}
          {...register("c2")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.3 What is the relation to the household head?"
          errors={errors}
          defaultOptionLabel="Choose Relation"
          data={relationToHousehold}
          {...register("c3")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.4 What is his/her civil status?"
          errors={errors}
          defaultOptionLabel="Choose Status"
          data={civilStatus}
          {...register("c4")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.5 Is the member Deleted or Active?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("c5")}
          className="formSelectModalAddHouseholdMember"
        />
        <CustomInput
          type="date"
          label="What is the birth date of the family member?"
          placeholder="Middle Name"
          className="formSelectModalAddHouseholdMember"
          errors={errors}
          {...register("c6")}
        />
        <Select
          label="C.7 Is he/she currently staying on the same address?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("c7")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.8 Is this family member attending school?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("c8")}
          className="formSelectModalAddHouseholdMember"
          onChange={(e) => {
            if (e.target.value === "Yes") {
              setShowc9(true);
            } else {
              setShowc9(false);
              setValue("c9", "");
            }
          }}
        />
        {showc9 && (
          <Select
            label="C.9 [If Yes in Question C.8]. What grade or year level is he/she presently attending?"
            errors={errors}
            defaultOptionLabel="Choose Category"
            data={gradeYear}
            {...register("c9")}
            className="formSelectModalAddHouseholdMember"
          />
        )}

        <Select
          label="C.10 What is the highest educational level completed?"
          errors={errors}
          defaultOptionLabel="Choose Category"
          data={highestEducation}
          {...register("c10")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.11 If Active, is she pregnant?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("c11")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.12 Is the family have children?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("c12")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.13 Is solo parent?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("c13")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.14 Does the family member have a disability?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("c14")}
          className="formSelectModalAddHouseholdMember"
          onChange={(e) => {
            if (e.target.value === "Yes") {
              setShowc15(true);
            } else {
              setShowc15(false);
              setValue("c15", "");
            }
          }}
        />
        {showc15 && (
          <Select
            label="C.15 [If Yes in in Question C.14]. What type of disability?"
            errors={errors}
            defaultOptionLabel="Choose Category"
            data={typeOfDisability}
            {...register("c15")}
            className="formSelectModalAddHouseholdMember"
          />
        )}

        <CustomInput
          label="C.16 Are there other health problems? Specify"
          className="formInputModalAddHouseholdMember"
          errors={errors}
          {...register("c16")}
        />
        <Select
          label="C.17 Is the family member employed?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("c17")}
          className="formSelectModalAddHouseholdMember"
        />
        <CustomInput
          label="C.18 What is the occupation of the family member?"
          className="formInputModalAddHouseholdMember"
          errors={errors}
          {...register("c18")}
        />
        <Select
          label="C.19 Where the  family member work?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={placeOfWork}
          {...register("c19")}
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
