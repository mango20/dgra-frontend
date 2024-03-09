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
import PageContainer from "../../../../../Layout/Container/PageContainer";
import ContentContainer from "../../../../../Layout/Container/ContentContainer";
import { useLocation } from "react-router-dom";
const AddSurvey = ({
  isAddSurveyOpen,
  closeModal,
  editHouseholdModal,
  selectedEvent,
}) => {
  const location = useLocation();
  const houseHoldData = location.state;
  const [currentStep, setCurrentStep] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [showB2, setShowB2] = useState(false);
  const [showC1, setShowC1] = useState(null);
  const [showD, setShowD] = useState(false);
  const totalSteps = 4;

  const [formData, setFormData] = useState({});

  const methods = useForm({
    resolver: zodResolver(validationSchemas[`step${currentStep}`]),
    defaultValues: formData[`step${currentStep}`],
  });

  const {
    register,
    watch,
    resetField,
    reset,
    getValues,
    formState: { errors },
    handleSubmit,
    setValue,
  } = methods;

  console.log(errors);
  console.log(currentStep);
  const onSubmit = async (data, event) => {
    event.preventDefault();

    const convertCheckboxValuesToString = (formData) => {
      const newData = {};
      for (const key in formData) {
        if (typeof formData[key] === "boolean") {
          newData[key] = formData[key] ? "0" : "1";
        } else {
          newData[key] = formData[key] || "";
        }
      }
      return newData;
    };

    const mappedData = convertCheckboxValuesToString(data);

    setFormData((prevData) => ({
      ...prevData,
      [`step${currentStep}`]: mappedData,
    }));

    const nextStep = currentStep + 1;

    if (nextStep <= totalSteps) {
      console.log("formdata ", {
        ...formData,
        [`step${currentStep}`]: mappedData,
      });
      setCurrentStep(nextStep);
    } else {
      console.log("Form submitted:", {
        ...formData,
        [`step${currentStep}`]: mappedData,
      });
      const step4Data = formData.step4;
      console.log("Step 4:", step4Data);

      console.log("Step 1:", formData.step1);
      console.log("Step 2:", formData.step2);
      console.log("Step 3:", formData.step3);
      console.log("Step 4:", formData.step4);
      console.log(currentStep);
      const year = formData.step1.year;
      const id = houseHoldData.householdNo;
      console.log("ID:", id);
      console.log(year);
      if (currentStep === 4) {
        console.log("first func");

        const response1 = await postReq("/api/getdisastersurveyAS", {
          ...formData.step1,
          id: id,
        });

        const response2 = await postReq("/api/getdisastersurveyBS", {
          ...formData.step2,
          id: id,
          year: year,
        });

        const response3 = await postReq("/api/getdisastersurveyCS", {
          ...formData.step3,
          id: id,
          year: year,
        });

        const response4 = await postReq("/api/getdisastersurveyDS", {
          ...formData.step4,
          id: id,
          year: year,
        });

        console.log(response1);
        console.log(response2);
        console.log(response3);
        console.log(response4);
        // console.log(response);

        // Reset the form
        setCurrentStep(1);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const year = formData.step1?.year;
      const id = houseHoldData.householdNo;
      console.log("ID:", id);
      console.log(year);

      const selectedB2Labels = [];
      if (formData.step2 && typeof formData.step2 === "object") {
        for (let i = 1; i <= 14; i++) {
          if (formData.step2[`b2_${i}`] === "0") {
            selectedB2Labels.push(b2Item[i - 1]);
          }
        }
      }

      const selectedB3Labels = [];
      if (formData.step2 && typeof formData.step2 === "object") {
        for (let i = 1; i <= 15; i++) {
          if (formData.step2[`b3_${i}`] === "0") {
            selectedB3Labels.push(b2Item[i - 1]);
          }
        }
      }

      const selectedC4Labels = [];
      if (formData.step3 && typeof formData.step3 === "object") {
        for (let i = 1; i <= 6; i++) {
          if (formData.step3[`c4_${i}`] === "0") {
            selectedC4Labels.push(c4Item[i - 1]);
          }
        }
      }

      const selectedD10Labels = [];
      if (formData.step4 && typeof formData.step4 === "object") {
        for (let i = 1; i <= 14; i++) {
          if (formData.step4[`d10_${i}`] === "0") {
            selectedD10Labels.push(d10Item[i - 1]);
          }
        }
      }

      console.log("Selected B2 Labels:", selectedB2Labels);

      if (currentStep === 4) {
        console.log("sec");
        console.log("Payload:", { formData, id: id });
        const addDisasterSurveyPayload = {
          setA: {
            0: {
              questiona1: formData.step1.a1,
            },
          },
          setB: {
            0: {
              questionb1: formData.step2.b1,
              questionb2: selectedB2Labels,
              questionb3: selectedB3Labels,
              questionb4: formData.step2.b4,
            },
          },
          setC: {
            0: {
              questionc1: formData.step3.c1,
              questionc2: formData.step3.c2,
              questionc3: formData.step3.c3,
              questionc4: selectedC4Labels,
              questionc5: formData.step3.c5,
              questionc6: formData.step3.c6,
            },
          },
          setD: {
            0: {
              questiond1: formData.step4.d1,
              questiond2: formData.step4.d2,
              questiond3: formData.step4.d3,
              questiond4: formData.step4.d4,
              questiond5: formData.step4.d5,
              questiond6: formData.step4.d6,
              questiond7: formData.step4.d7,
              questiond8: formData.step4.d8,
              questiond9: formData.step4.d9,
              questiond10: selectedD10Labels,
            },
          },
          year: year,
          householdNo: id,
        };

        console.log("adsp", addDisasterSurveyPayload);
        try {
          const response = await postReq(
            "api/disastersurvey",
            addDisasterSurveyPayload
          );
          alert("Submited");
        } catch (error) {
          console.error("Error in API requests:", error);
        }
      }
    };

    fetchData();
  }, [formData]);

  // console.log(formData);
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

  const cValidation = () => {
    setValue("c2", "");
    setValue("c3", "");
    setValue("c4_1", "");
    setValue("c4_2", "");
    setValue("c4_3", "");
    setValue("c4_4", "");
    setValue("c4_5", "");
    setValue("c4_6", "");
    setValue("c5", "");
    setValue("c6", "");
  };

  useEffect(() => {
    cValidation();
  }, [showC1]);

  const dValidation = () => {
    setValue("d10_1", "");
    setValue("d10_2", "");
    setValue("d10_3", "");
    setValue("d10_4", "");
    setValue("d10_5", "");
    setValue("d10_6", "");
    setValue("d10_7", "");
    setValue("d10_8", "");
    setValue("d10_9", "");
    setValue("d10_10", "");
    setValue("d10_11", "");
    setValue("d10_12", "");
    setValue("d10_13", "");
    setValue("d10_14", "");
  };

  useEffect(() => {
    dValidation();
  }, [showD]);

  return (
    <PageContainer>
      <ContentContainer
        title={`Add Survey to household number ${houseHoldData.householdNo}`}
      >
        <form id="surveyForm">
          {currentStep === 1 && (
            <>
              {" "}
              <Select
                label="Year"
                errors={errors}
                defaultOptionLabel="Please choose"
                data={fiscalYears}
                {...register("year")}
                className="formSelectModalAddSurvey"
              />
              <Select
                label="A.1. Has the household experienced
          destructive calamity for the past 12
          months?"
                errors={errors}
                defaultOptionLabel="Choose Option"
                data={YesNo}
                {...register("a1")}
                className="formSelectModalAddSurveyOther"
                onChange={(e) => {
                  e.target.value === "Yes"
                    ? setShowTable(true)
                    : setShowTable(false);
                }}
              />
              {showTable && (
                <Table striped bordered responsive id="surveyTable">
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>
                        A.2 Destructive calamity/ies experienced in the
                        household
                      </th>
                      <th>
                        A.3 Number of calamities have occurred for the past 12
                        months
                      </th>
                      <th>A.4 id the household receive any assistance?</th>
                      <th>A.5 Source of assistance</th>
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
                                className="selectSurvey"
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
              )}
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="mt-0">
                <Select
                  label="B.1. Have you seen or heard information
            encouraging people in your community to
            be prepared for disaster situations in
            the past 12 months?"
                  errors={errors}
                  defaultOptionLabel="Choose Option"
                  data={YesNo}
                  {...register("b1")}
                  className="formSelectModalAddSurveyOther"
                  onChange={(e) => {
                    e.target.value === "Yes"
                      ? setShowB2(true)
                      : setShowB2(false);
                  }}
                />
                {showB2 && (
                  <>
                    <label className="separatelabelForm">
                      B.2. Where did you receive information, attended meeting
                      or training about how to make your household and home
                      safer from disaster?
                    </label>
                    <div className="checkboxAddSurvey">
                      {b2Item.map((keyName, i) => {
                        if (i < 7)
                          return (
                            <div>
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
                            </div>
                          );
                      })}
                    </div>
                  </>
                )}
              </div>
              <label className="separatelabelForm">
                B.3. What is your preferred way to receive information or
                training about how to make your household and home safer from
                disaster?{" "}
              </label>{" "}
              <div className="checkboxAddSurvey">
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
                })}{" "}
              </div>
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
                className="formSelectModalAddSurveyOther"
                onChange={(e) => {
                  if (e.target.value === "Yes") {
                    setShowC1(true);
                  } else {
                    setShowC1(false);
                  }
                }}
              />
              {!showC1 && showC1 !== null && (
                <>
                  <Select
                    label="C.2. In the past 3 years, have you experience to evacuate because of calamity?"
                    errors={errors}
                    defaultOptionLabel="Choose Option"
                    data={YesNo}
                    {...register("c2")}
                    className="formSelectModalAddSurveyOther"
                  />

                  <Select
                    label="C.3. Are you aware of a place where to evacuate?"
                    errors={errors}
                    defaultOptionLabel="Choose Option"
                    data={YesNo}
                    {...register("c3")}
                    className="formSelectModalAddSurveyOther"
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
                </>
              )}
              {showC1 && showC1 !== null && (
                <>
                  <Select
                    label="C.5. Are you willing to adopt an evacuee?"
                    errors={errors}
                    defaultOptionLabel="Choose Option"
                    data={YesNo}
                    {...register("c5")}
                    className="formSelectModalAddHouseholdMember"
                  />
                  <CustomInput
                    type="text"
                    label="C.6. How many evacuees can you accommodate?"
                    {...register("c6")}
                    className="formInputModalHouseholdCharacteristics"
                  />
                </>
              )}
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
                onChange={(e) => {
                  if (e.target.value === "Yes") {
                    setShowD(true);
                  } else {
                    setShowD(false);
                  }
                }}
              />
              {showD && (
                <>
                  <label className="separatelabelForm">
                    D.10. Which of the following do you have in your
                    preparedness kit?
                  </label>
                  <div className="checkboxAddSurvey">
                    {d10Item.map((keyName, i) => {
                      if (i < 7)
                        return (
                          <>
                            <Checkbox
                              {...register(`d10_${i + 1}`)}
                              label={keyName}
                            />
                            <Checkbox
                              {...register(`d10_${i + 8}`)}
                              label={d10Item[i + 7]}
                            />
                          </>
                        );
                    })}
                  </div>
                </>
              )}
            </>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "30px",
              gap: "20px",
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
            {currentStep === totalSteps && (
              <Button
                variant="success"
                onClick={handleSubmit(onSubmit)}
                style={{ padding: "10px 20px" }}
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </ContentContainer>
    </PageContainer>
  );
};

export default AddSurvey;
