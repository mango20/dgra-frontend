import React, { useEffect, useState } from "react";
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
import { Button, Col, Row, Table } from "react-bootstrap";
import {
  a2Item,
  b2Item,
  b3Item,
  c4Item,
  d10Item,
  sourceOfAssistanceItem,
} from "../../../../../Data/JsData/surveyItems";
import Checkbox from "../../../../../Components/Form/Checkbox";
import { validationSchemas } from "../../../../../Utils/SurveySchema";
import SurveyModal from "../../../../../Components/UI/Modal/SurveyModal";
import { getReq, postReq } from "../../../../../Service/API";
const AddSurvey = ({
  isAddSurveyOpen,
  closeModal,
  editHouseholdModal,
  selectedEvent,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const initialStep1Data = {
    year: "",
    a1: "",

    a2_1: false,
    a2_2: false,
    a2_3: false,
    a2_4: false,
    a2_5: false,
    a2_6: false,
    a2_7: false,
    a2_8: false,
    a2_9: false,
    a2_10: false,
    a2_11: false,
    a2_12: false,
    a2_13: false,

    a3_1: "",
    a3_2: "",
    a3_3: "",
    a3_4: "",
    a3_5: "",
    a3_6: "",
    a3_7: "",
    a3_8: "",
    a3_9: "",
    a3_10: "",
    a3_11: "",
    a3_12: "",

    a3_13: "",
    a4_1: "",
    a4_2: "",
    a4_3: "",
    a4_4: "",
    a4_5: "",
    a4_6: "",
    a4_7: "",
    a4_8: "",
    a4_9: "",
    a4_10: "",
    a4_11: "",
    a4_12: "",
    a4_13: "",

    a5_1_1: false,
    a5_1_2: false,
    a5_1_3: false,
    a5_1_4: false,
    a5_1_5: false,
    a5_2_1: false,
    a5_2_2: false,
    a5_2_3: false,
    a5_2_4: false,
    a5_2_5: false,
    a5_3_1: false,
    a5_3_2: false,
    a5_3_3: false,
    a5_3_4: false,
    a5_3_5: false,
    a5_4_1: false,
    a5_4_2: false,
    a5_4_3: false,
    a5_4_4: false,
    a5_4_5: false,
    a5_5_1: false,
    a5_5_2: false,
    a5_5_3: false,
    a5_5_4: false,
    a5_5_5: false,
    a5_6_1: false,
    a5_6_2: false,
    a5_6_3: false,
    a5_6_4: false,
    a5_6_5: false,
    a5_7_1: false,
    a5_7_2: false,
    a5_7_3: false,
    a5_7_4: false,
    a5_7_5: false,
    a5_8_1: false,
    a5_8_2: false,
    a5_8_3: false,
    a5_8_4: false,
    a5_8_5: false,
    a5_9_1: false,
    a5_9_2: false,
    a5_9_3: false,
    a5_9_4: false,
    a5_9_5: false,
    a5_10_1: false,
    a5_10_2: false,
    a5_10_3: false,
    a5_10_4: false,
    a5_10_5: false,
    a5_11_1: false,
    a5_11_2: false,
    a5_11_3: false,
    a5_11_4: false,
    a5_11_5: false,
    a5_12_1: false,
    a5_12_2: false,
    a5_12_3: false,
    a5_12_4: false,
    a5_12_5: false,
    a5_13_1: false,
    a5_13_2: false,
    a5_13_3: false,
    a5_13_4: false,
    a5_13_5: false,
  };

  const [formData, setFormData] = useState({
    step1: { ...initialStep1Data },
    step2: {
      b1: "",
      b2: "",
      b3: "",
      b4: "",
    },
    step3: {
      c1: "",
      c2: "",
      c3: "",
      c4: "",
      c5: "",
      c6: "",
    },
    step4: {
      d1: "",
      d2: "",
      d3: "",
      d4: "",
      d5: "",
      d1: "",
      d2: "",
      d3: "",
      d4: "",
      d5: "",
    },
  });

  const methods = useForm({
    resolver: zodResolver(validationSchemas[`step${currentStep}`]),
    defaultValues: formData[`step${currentStep}`],
  });

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = methods;

  console.log(errors);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log(data);
    setFormData((prevData) => ({
      ...prevData,
      [`step${currentStep}`]: data,
    }));

    const nextStep = currentStep + 1;

    if (nextStep <= totalSteps) {
      setCurrentStep(nextStep);
    } else {
      console.log("Form submitted:", formData);

      const response = await postReq("/api/disastersurvey", formData);
      console.log(response);

      // setCurrentStep(1); // Reset
    }
  };

  console.log(formData);
  function generateFiscalYears() {
    const date = new Date();
    let currentYear = date.getFullYear();

    let fiscalYears = [];

    while (currentYear >= 2016) {
      fiscalYears.push(currentYear.toString());
      currentYear--;
    }

    return fiscalYears;
  }

  const fiscalYears = generateFiscalYears();

  useEffect(() => {
    const getSurvey = async () => {
      const response = await getReq("/api/disastersurvey");

      console.log(response);
    };

    getSurvey();
  }, []);
  return (
    <SurveyModal
      size="lg"
      show={isAddSurveyOpen}
      handleClose={closeModal}
      title="Add Surveys"
      hasAdd={currentStep === totalSteps && true}
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        {currentStep === 1 && (
          <>
            {" "}
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
                  <th>
                    Number of calamities have occurred for the past 12 months
                  </th>
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
                          />{" "}
                        </td>
                        <td>
                          {sourceOfAssistanceItem.map((item, i) => {
                            return (
                              <>
                                <Checkbox
                                  type="checkbox"
                                  label={item}
                                  defaultChecked={watch(
                                    `a5_${index + 1}_${i + 1}`
                                  )}
                                  {...register(`a5_${index + 1}_${i + 1}`)}
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
          </>
        )}

        {currentStep === 2 && (
          <>
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
                B.2. Where did you receive information, attended meeting or
                training about how to make your household and home safer from
                disaster?
              </label>
              {b2Item.map((keyName, i) => {
                if (i < 7)
                  return (
                    <>
                      <Checkbox
                        type="checkbox"
                        {...register(`b2_${(i + 1).toString()}`)}
                        label={keyName}
                      />
                      <Checkbox
                        type="checkbox"
                        {...register(`b2_${(i + 8).toString()}`)}
                        label={b2Item[i + 7]}
                      />{" "}
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
                      type="checkbox"
                      {...register(`b3_${(i + 1).toString()}`)}
                      label={keyName}
                    />

                    {i < 7 ? (
                      <>
                        <Checkbox
                          type="checkbox"
                          id={keyName}
                          {...register(`b3_${(i + 9).toString()}`)}
                          label={b3Item[i + 8]}
                        />{" "}
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
          </>
        )}

        {currentStep === 3 && (
          <>
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
                      type="checkbox"
                      {...register(`c4_${(i + 1).toString()}`)}
                      label={keyName}
                    />

                    <Checkbox
                      type="checkbox"
                      {...register(`c4_${(i + 4).toString()}`)}
                      label={c4Item[i + 3]}
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
          </>
        )}

        {currentStep === 4 && (
          <>
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
                    <Checkbox {...register(`d10_${i + 1}`)} label={keyName} />
                    <Checkbox
                      {...register(`d10_${i + 8}`)}
                      label={d10Item[i + 7]}
                    />
                  </>
                );
            })}
          </>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px",
          }}
        >
          {currentStep > 1 && (
            <Button
              onClick={() => setCurrentStep(currentStep - 1)}
              style={{ padding: "10px 20px" }}
            >
              Previous
            </Button>
          )}
          {currentStep < totalSteps && (
            <Button
              onClick={handleSubmit(onSubmit)}
              style={{ padding: "10px 20px" }}
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </SurveyModal>
  );
};

export default AddSurvey;
