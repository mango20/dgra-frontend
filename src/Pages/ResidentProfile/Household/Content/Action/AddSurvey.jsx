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
import { Col, Row, Table } from "react-bootstrap";

import {
  a2Item,
  b2Item,
  b3Item,
  c4Item,
  d10Item,
  sourceOfAssistanceItem,
} from "../../../../../Data/JsData/surveyItems";
import Checkbox from "../../../../../Components/Form/Checkbox";
const AddSurvey = ({
  isAddSurveyOpen,
  closeModal,
  editHouseholdModal,
  selectedEvent,
}) => {
  const schema = z.object({
    year: z.string().nonempty("Year is required"),
    a1: z.string(),
    a2: z.string(),
    a3: z.string(),
    a4: z.string(),
    a5: z.string(),

    b1: z.string(),
    b2: z.string(),
    b3: z.string(),
    b4: z.string(),

    c1: z.string(),
    c2: z.string(),
    c3: z.string(),
    c4: z.string(),
    c5: z.string(),
    c6: z.string(),

    d1: z.string(),
    d2: z.string(),
    d3: z.string(),
    d4: z.string(),
    d5: z.string(),
    d6: z.string(),
    d7: z.string(),
    d8: z.string(),
    d9: z.string(),
    d10: z.string(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });
  console.log(errors);
  const onSubmit = (data) => {
    console.log(data);
    // closeModal();
  };

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
  return (
    <CustomModal
      size="lg"
      show={isAddSurveyOpen}
      handleClose={closeModal}
      title="Add Surveys"
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <Select
          label="Year"
          errors={errors}
          defaultOptionLabel="Please choose"
          data={fiscalYears}
          {...register("year")}
          className="formSelectModalAddHouseholdMember"
        />
        {/* first */}
        <Select
          label="A.1. Has the household experienced
          destructive calamity for the past 12
          months?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("a1")}
          className="formSelectModalAddHouseholdMember"
        />
        <Table striped bordered responsive>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>Destructive calamity/ies experienced in the household</th>
              <th>Number of calamities have occurred for the past 12 months</th>
              <th>Did the household receive any assistance?</th>
              <th>Source of assistance</th>
            </tr>
          </thead>
          <tbody>
            {a2Item.map((item, index) => {
              return (
                <>
                  <tr>
                    <td>
                      <Checkbox
                        type="checkbox"
                        label={item}
                        value="1"
                        {...register(`a2_${index + 1}`)}
                      />
                    </td>
                    <td>
                      <CustomInput
                        {...register(`a3_${index + 1}`)}
                        className="inputSurvey"
                      />
                    </td>{" "}
                    <td>
                      <Select
                        {...register(`a4_${index + 1}`)}
                        data={YesNo}
                        defaultOptionLabel="Choose Option"
                      />
                    </td>
                    <td>
                      {sourceOfAssistanceItem.map((item, i) => {
                        return (
                          <>
                            <Checkbox
                              label={item}
                              {...register(`a5_${index + 1}_${i + 1}`)}
                              value="1"
                            />
                          </>
                        );
                      })}
                    </td>{" "}
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        {/* Second */}
        <div className="mt-5">
          <Select
            label="B.1. Have you seen or heard information
          encouraging people in your community to
          be prepared for disaster situations in
          the past 12 months?"
            errors={errors}
            defaultOptionLabel="Choose Option"
            data={YesNo}
            {...register("b1")}
            className="formSelectModalAddHouseholdMember"
          />
          <label className="separatelabelForm">
            B.2. Where did you receive information, attended meeting or training
            about how to make your household and home safer from disaster?
          </label>
          {b2Item.map((keyName, i) => {
            if (i < 7)
              return (
                <>
                  <Checkbox
                    // disabled={questionA1set1}
                    {...register(`b2_${(i + 1).toString()}`)}
                    label={keyName}
                    value="1"
                  />
                  <Checkbox
                    //    disabled={questionA1set1}
                    {...register(`b2_${(i + 8).toString()}`)}
                    label={b2Item[i + 7]}
                    value="1"
                  />
                </>
              );
          })}
        </div>
        <label className="separatelabelForm">
          B.3. What is your preferred way to receive information or training
          about how to make your household and home safer from disaster?{" "}
        </label>
        {b3Item.map((keyName, i) => {
          if (i < 8)
            return (
              <>
                <Checkbox
                  {...register(`b3_${(i + 1).toString()}`)}
                  label={keyName}
                  value="1"
                />

                {i < 7 ? (
                  <>
                    <Checkbox
                      id={keyName}
                      {...register(`b3_${(i + 9).toString()}`)}
                      label={b3Item[i + 8]}
                      value="1"
                    />
                  </>
                ) : (
                  ""
                )}
              </>
            );
        })}
        <Select
          label="B.4. Have you or someone in your
          household attended meetings,
          received information or training
          regarding disaster preparedness in
          the past 12 months?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("b4")}
          className="formSelectModalAddHouseholdMember"
        />
        {/* Third */}
        <Select
          label="C.1. Is your house secured enough and there is no need for you to
          evacuate during calamity?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("c1")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.2. In the past 3 years, have you experience to evacuate because of calamity?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("c2")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="C.3. Are you aware of a place where to evacuate?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("c3")}
          className="formSelectModalAddHouseholdMember"
        />
        <label className="separatelabelForm">
          C.4. Where did you evacuate?
        </label>
        {c4Item.map((keyName, i) => {
          if (i < 3)
            return (
              <>
                <Checkbox
                  {...register(`c4_${(i + 1).toString()}`)}
                  label={keyName}
                  value="1"
                />

                <Checkbox
                  {...register(`c4_${(i + 4).toString()}`)}
                  label={c4Item[i + 3]}
                  value="1"
                />
              </>
            );
        })}
        <Select
          label="C.5. Are you willing to adopt an evacuee?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("c5")}
          className="formSelectModalAddHouseholdMember"
        />
        <CustomInput
          label="C.6. How many evacuees can you accommodate?"
          {...register(`c6`)}
          className="formInputModalHouseholdCharacteristics"
        />

        {/* Last */}
        <Select
          label="D.1. Did the family carefully select the construction site of the residential building?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("d1")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="D.2. Did the family secure the house to its foundation/structure?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("d2")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="D.3. Are typhoon guards installed on windows during disaster?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("d3")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="D.4. Is the house reinforced in preparation for disaster occurrence?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("d4")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="D.5. Does your family have a “Household/Family Emergency Plan” in case of calamity?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("d5")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="D.6. If family or loved ones get separated during disaster, does your family have a communication plan?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("d6")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="D.7. Are you aware of warning and monitoring activity of the concerned agency regarding calamity?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("d7")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="D.8. Do you know the person or government agency to contact in case of calamity?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("d8")}
          className="formSelectModalAddHouseholdMember"
        />
        <Select
          label="D.9. Do you have a preparedness kit?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("d9")}
          className="formSelectModalAddHouseholdMember"
        />
        <label className="separatelabelForm">
          D.10. Which of the following do you have in your preparedness kit?
        </label>
        {d10Item.map((keyName, i) => {
          if (i < 7)
            return (
              <>
                <Checkbox
                  //   disabled={questionD8}
                  {...register(`d10_${i + 1}`)}
                  label={keyName}
                  value="1"
                />
                <Checkbox
                  //   disabled={questionD8}
                  {...register(`d10_${i + 8}`)}
                  label={d10Item[i + 7]}
                  value="1"
                />
              </>
            );
        })}
      </form>
    </CustomModal>
  );
};

export default AddSurvey;
