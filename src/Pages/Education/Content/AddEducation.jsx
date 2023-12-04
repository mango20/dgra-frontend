import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../Components/Form/Input";
import Checkbox from "../../../Components/Form/Checkbox";
import Message from "../../../Components/UI/Message/Message";
import { Table } from "react-bootstrap";
import { patchReq, postReq } from "../../../Service/API";

const AddEducation = ({
  addEvacuation,
  closeModal,
  editEducationModal,
  selectedEducation,
  alertMsg,
  onItemAddedOrUpdated,
}) => {
  const schema = z.object({
    name: z.string().nonempty("Type is required"),
    barangay: z.string().nonempty("Name is required"),
    purok: z.string().nonempty("Location is required"),
    schoolYear: z.string(), // Depending on your validation rules
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const [rowData, setRowData] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const updatedCategories = selectedCategories.includes(value)
      ? selectedCategories.filter((category) => category !== value)
      : [...selectedCategories, value];

    setSelectedCategories(updatedCategories);
  };

  const category = [
    { label: "Elementary", value: "Elementary" },
    { label: "Junior High School", value: "Junior High School" },
    { label: "Senior High School", value: "Senior High School" },
  ];

  const columns = [
    { key: "", header: "" },
    { key: "Maximum Capacity", header: "Maximum Capacity" },
    { key: "Number of Enrolled", header: "Number of Enrolled" },
    { key: "Available Slots", header: "Available Slots" },
  ];

  const elementarySchoolGrades = [
    { grade: "Grade 1" },
    { grade: "Grade 2" },
    { grade: "Grade 3" },
    { grade: "Grade 4" },
    { grade: "Grade 5" },
    { grade: "Grade 6" },
  ];

  const juniorHighSchoolGrades = [
    { grade: "Grade 7" },
    { grade: "Grade 8" },
    { grade: "Grade 9" },
    { grade: "Grade 10" },
  ];

  console.log(errors);
  const seniorHighSchoolGrades = [{ grade: "Grade 11" }, { grade: "Grade 12" }];

  const [gradesData, setGradesData] = useState([]);

  const handleInputChange = (e, category, gradeIndex, field) => {
    const { value } = e.target;
    const updatedGradesData = [...gradesData];
    const adjustedIndex = getAdjustedIndex(category, gradeIndex);

    if (!updatedGradesData[adjustedIndex]) {
      updatedGradesData[adjustedIndex] = {};
    }

    updatedGradesData[adjustedIndex][field] = parseInt(value) || 0;
    setGradesData(updatedGradesData);
  };

  const calculateAvailableSlots = (category, gradeIndex) => {
    const adjustedIndex = getAdjustedIndex(category, gradeIndex);
    const gradeData = gradesData[adjustedIndex] || {};

    const { MaximumCapacity = 0, NumberOfEnrolled = 0 } = gradeData;

    return MaximumCapacity - NumberOfEnrolled;
  };
  const setMissingToZero = (value) => (value ? parseInt(value) : "0");
  const getAdjustedIndex = (category, gradeIndex) => {
    if (category === "Elementary") return gradeIndex;
    else if (category === "Junior High School") return gradeIndex + 6;
    else if (category === "Senior High School") return gradeIndex + 10;
    return gradeIndex;
  };

  const onSubmit = async (data) => {
    const endpoint = selectedEducation
      ? "/api/financial/education"
      : "/api/financial/education";

    // Helper function to set missing values to 0

    // Create the payload with the specified structure
    const payload = {
      name: data.name || "",
      barangay: data.barangay || "",
      purok: data.purok || "",
      schoolYear: data.schoolYear || "",
      category: data.category || "",
      // Grade levels 1-12
      ...generateGradePayload(data),
    };
    console.log(payload);
    try {
      const response = selectedEducation
        ? await patchReq(endpoint, payload)
        : await postReq(endpoint, payload);

      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.error("Error Adding Users", error);
    }
  };

  const generateGradePayload = (data) => {
    let gradePayload = {};

    for (let i = 1; i <= 12; i++) {
      const keyPrefix = `g${i}`;
      gradePayload[`${keyPrefix}MaximumCapacity`] = setMissingToZero(
        data[`${keyPrefix}MaximumCapacity`]
      );
      gradePayload[`${keyPrefix}NumberOfEnrolled`] = setMissingToZero(
        data[`${keyPrefix}NumberOfEnrolled`]
      );
      gradePayload[`${keyPrefix}AvailableSlots`] = setMissingToZero(
        data[`${keyPrefix}AvailableSlots`]
      );
    }

    return gradePayload;
  };
  // Function to generate payload fields based on the selected category and grades
  const getGradePayload = (data, category) => {
    let gradePayload = {};

    if (category === "Elementary") {
      for (let i = 1; i <= 6; i++) {
        const keyPrefix = `g${i}`;
        gradePayload[`${keyPrefix}MaximumCapacity`] =
          data[`${keyPrefix}MaximumCapacity`];
        gradePayload[`${keyPrefix}NumberOfEnrolled`] =
          data[`${keyPrefix}NumberOfEnrolled`];
        gradePayload[`${keyPrefix}AvailableSlots`] =
          data[`${keyPrefix}AvailableSlots`];
      }
    } else if (category === "Junior High School") {
      for (let i = 7; i <= 10; i++) {
        const keyPrefix = `g${i}`;
        gradePayload[`${keyPrefix}MaximumCapacity`] =
          data[`${keyPrefix}MaximumCapacity`];
        gradePayload[`${keyPrefix}NumberOfEnrolled`] =
          data[`${keyPrefix}NumberOfEnrolled`];
        gradePayload[`${keyPrefix}AvailableSlots`] =
          data[`${keyPrefix}AvailableSlots`];
      }
    } else if (category === "Senior High School") {
      for (let i = 11; i <= 12; i++) {
        const keyPrefix = `g${i}`;
        gradePayload[`${keyPrefix}MaximumCapacity`] =
          data[`${keyPrefix}MaximumCapacity`];
        gradePayload[`${keyPrefix}NumberOfEnrolled`] =
          data[`${keyPrefix}NumberOfEnrolled`];
        gradePayload[`${keyPrefix}AvailableSlots`] =
          data[`${keyPrefix}AvailableSlots`];
      }
    }

    return gradePayload;
  };

  return (
    <CustomModal
      show={addEvacuation || editEducationModal}
      handleClose={closeModal}
      title={selectedEducation ? "Edit Education " : "Add Education"}
      handleAction={handleSubmit(onSubmit)}
      size="lg"
    >
      <form>
        <CustomInput
          label="Name"
          className="formInputModal"
          errors={errors}
          {...register("name")}
        />
        <CustomInput
          label="Barangay"
          className="formInputModal"
          errors={errors}
          {...register("barangay")}
        />
        <CustomInput
          label="Purok"
          className="formInputModal"
          errors={errors}
          {...register("purok")}
        />
        <CustomInput
          label="School Year"
          className="formInputModal"
          errors={errors}
          {...register("schoolYear")}
        />

        <div className="checkboxGroups">
          <label>Category</label>{" "}
          <div className="checkboxGroupsInner">
            {category.map((option) => {
              if (option.value === "Elementary") {
                columns[0] = { key: "Elementary", header: "Elementary" };
              } else if (option.value === "Junior High School") {
                columns[0] = {
                  key: "Junior High School",
                  header: "Junior High School",
                };
              } else if (option.value === "Senior High School") {
                columns[0] = {
                  key: "Senior High School",
                  header: "Senior High School",
                };
              }
              return (
                <div key={option.value}>
                  <Checkbox
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    onChange={handleCategoryChange}
                    checked={selectedCategories.includes(option.value)}
                  />
                  {selectedCategories.includes(option.value) && (
                    <Table striped bordered responsive className="customTable">
                      <thead>
                        <tr>
                          {columns.map((column) => (
                            <th key={column.key}>{column.header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {option.value === "Elementary" &&
                          elementarySchoolGrades.map((gradeInfo, index) => (
                            <tr key={index}>
                              <td>{gradeInfo.grade}</td>
                              <td>
                                <input
                                  {...register(`g${index + 1}MaximumCapacity`)}
                                  type="text"
                                  placeholder="Maximum Capacity"
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      "Elementary",
                                      index,
                                      "MaximumCapacity"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  {...register(`g${index + 1}NumberOfEnrolled`)}
                                  type="text"
                                  placeholder="Number of Enrolled"
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      "Elementary",
                                      index,
                                      "NumberOfEnrolled"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  {...register(`g${index + 1}AvailableSlots`)}
                                  type="text"
                                  placeholder="Available Slots"
                                  value={calculateAvailableSlots(
                                    "Elementary",
                                    index
                                  )}
                                  disabled
                                />
                              </td>
                            </tr>
                          ))}
                        {option.value === "Junior High School" &&
                          juniorHighSchoolGrades.map((gradeInfo, index) => (
                            <tr key={index}>
                              <td>{gradeInfo.grade}</td>
                              <td>
                                <input
                                  type="text"
                                  placeholder="Maximum Capacity"
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      "Junior High School",
                                      index,
                                      "MaximumCapacity"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder="Number of Enrolled"
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      "Junior High School",
                                      index,
                                      "NumberOfEnrolled"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder="Available Slots"
                                  value={calculateAvailableSlots(
                                    "Junior High School",
                                    index
                                  )}
                                  disabled
                                />
                              </td>
                            </tr>
                          ))}

                        {option.value === "Senior High School" &&
                          seniorHighSchoolGrades.map((gradeInfo, index) => (
                            <tr key={index}>
                              <td>{gradeInfo.grade}</td>
                              <td>
                                <input
                                  type="text"
                                  placeholder="Maximum Capacity"
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      "Senior High School",
                                      index,
                                      "MaximumCapacity"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder="Number of Enrolled"
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      "Senior High School",
                                      index,
                                      "NumberOfEnrolled"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder="Available Slots"
                                  value={calculateAvailableSlots(
                                    "Senior High School",
                                    index
                                  )}
                                  disabled
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </CustomModal>
  );
};

export default AddEducation;
