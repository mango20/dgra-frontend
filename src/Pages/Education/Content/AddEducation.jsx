import React, { useEffect, useState } from "react";
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
    schoolYear: z.string(),
    // category: z.array(z.string()),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    getValues,
  } = useForm({ resolver: zodResolver(schema) });

  const [rowData, setRowData] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (value) => {
    const updatedCategories = selectedCategories.includes(value)
      ? selectedCategories.filter((category) => category !== value)
      : [...selectedCategories, value];

    setSelectedCategories(updatedCategories);
  };

  console.log(selectedCategories);
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

    // Ensure the values are parsed as integers
    const maxCapacity = parseInt(MaximumCapacity);
    const enrolled = parseInt(NumberOfEnrolled);

    // Calculate the available slots
    const availableSlots = maxCapacity - enrolled;

    // Return the calculated available slots
    return availableSlots >= 0 ? availableSlots : 0;
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

    // const payload = {
    //   name: data.name || "",
    //   barangay: data.barangay || "",
    //   purok: data.purok || "",
    //   schoolYear: data.schoolYear || "",
    //   category: selectedCategories,
    //   ...generateGradePayload(data),
    // };

    const payload = selectedEducation
      ? {
          _id: selectedEducation._id,
          name: data.name || "",
          barangay: data.barangay || "",
          purok: data.purok || "",
          schoolYear: data.schoolYear || "",
          category: selectedCategories,
          ...generateGradePayload(data),
        }
      : {
          name: data.name || "",
          barangay: data.barangay || "",
          purok: data.purok || "",
          schoolYear: data.schoolYear || "",
          category: selectedCategories,
          ...generateGradePayload(data),
        };
    console.log(data);
    console.log(payload);
    try {
      const response = selectedEducation
        ? await patchReq(endpoint, payload)
        : await postReq(endpoint, payload);

      alertMsg(response.message);
      onItemAddedOrUpdated();
      reset();
      closeModal();
    } catch (error) {
      console.error("Error Adding Users", error);
    }
  };
  // ... (other code remains unchanged)

  const generateGradePayload = () => {
    let gradePayload = {};

    // Loop through all grades (Elementary, Junior High, Senior High)
    for (let i = 1; i <= 12; i++) {
      const keyPrefix = `g${i}`;
      const gradeData = gradesData[i - 1] || {};

      gradePayload[`${keyPrefix}MaximumCapacity`] = setMissingToZero(
        gradeData.MaximumCapacity
      ).toString();
      gradePayload[`${keyPrefix}NumberOfEnrolled`] = setMissingToZero(
        gradeData.NumberOfEnrolled
      ).toString();

      const availableSlots = calculateAvailableSlots(
        getGradeCategory(i),
        i - 1
      );
      gradePayload[`${keyPrefix}AvailableSlots`] = availableSlots.toString();
    }

    // Junior High School grades
    const juniorHighGrades = ["g7", "g8", "g9", "g10"];
    juniorHighGrades.forEach((gradeKey, index) => {
      const gradeData = gradesData[index + 6] || {}; // 6 is the offset for Junior High

      gradePayload[`${gradeKey}MaximumCapacity`] = setMissingToZero(
        gradeData.MaximumCapacity
      ).toString();
      gradePayload[`${gradeKey}NumberOfEnrolled`] = setMissingToZero(
        gradeData.NumberOfEnrolled
      ).toString();

      const availableSlots = calculateAvailableSlots(
        "Junior High School",
        index
      );
      gradePayload[`${gradeKey}AvailableSlots`] = availableSlots.toString();
    });

    // Senior High School grades
    const seniorHighGrades = ["g11", "g12"];
    seniorHighGrades.forEach((gradeKey, index) => {
      const gradeData = gradesData[index + 10] || {}; // 10 is the offset for Senior High
      gradePayload[`${gradeKey}MaximumCapacity`] = setMissingToZero(
        gradeData.MaximumCapacity
      ).toString();
      gradePayload[`${gradeKey}NumberOfEnrolled`] = setMissingToZero(
        gradeData.NumberOfEnrolled
      ).toString();

      const availableSlots = calculateAvailableSlots(
        "Senior High School",
        index
      );
      gradePayload[`${gradeKey}AvailableSlots`] = availableSlots.toString();
    });

    return gradePayload;
  };

  const getGradeCategory = (gradeIndex) => {
    if (gradeIndex <= 6) return "Elementary";
    else if (gradeIndex <= 10) return "Junior High School";
    else return "Senior High School";
  };

  useEffect(() => {
    if (selectedEducation || editEducationModal) {
      setValue("name", selectedEducation.name || "");
      setValue("barangay", selectedEducation.barangay || "");
      setValue("purok", selectedEducation.purok || "");
      setValue("schoolYear", selectedEducation.schoolYear || "");

      // Handling the 'category' field, assuming it's an array
      if (selectedEducation.category && selectedEducation.category.length > 0) {
        setSelectedCategories(selectedEducation.category);
      }
      for (let i = 1; i <= 6; i++) {
        const keyPrefix = `g${i}`;
        setValue(
          `${keyPrefix}MaximumCapacity`,
          selectedEducation[`${keyPrefix}MaximumCapacity`]
        );
        setValue(
          `${keyPrefix}NumberOfEnrolled`,
          selectedEducation[`${keyPrefix}NumberOfEnrolled`]
        );
        setValue(
          `${keyPrefix}AvailableSlots`,
          selectedEducation[`${keyPrefix}AvailableSlots`]
        );
      }

      for (let i = 7; i <= 10; i++) {
        const keyPrefix = `g${i}`;
        setValue(
          `${keyPrefix}juniorHighSchoolMaxCapacityMaximumCapacity`,
          selectedEducation[`${keyPrefix}MaximumCapacity`] || ""
        );
        setValue(
          `${keyPrefix}juniorHighSchoolMaxCapacityNumberOfEnrolled`,
          selectedEducation[`${keyPrefix}NumberOfEnrolled`] || ""
        );
        setValue(
          `${keyPrefix}juniorHighSchoolMaxCapacityAvailableSlots`,
          selectedEducation[`${keyPrefix}AvailableSlots`] || ""
        );
      }

      for (let i = 11; i <= 12; i++) {
        const keyPrefix = `g${i}`;
        setValue(
          `${keyPrefix}seniorHighSchoolMaxCapacityMaximumCapacity`,
          selectedEducation[`${keyPrefix}MaximumCapacity`] || ""
        );
        setValue(
          `${keyPrefix}seniorHighSchoolMaxCapacityNumberOfEnrolled`,
          selectedEducation[`${keyPrefix}NumberOfEnrolled`] || ""
        );
        setValue(
          `${keyPrefix}seniorHighSchoolMaxCapacityAvailableSlots`,
          selectedEducation[`${keyPrefix}AvailableSlots`] || ""
        );
      }
    } else {
      // Set default empty values for fields if there's no selectedEducation
      setValue("name", "");
      setValue("barangay", "");
      setValue("purok", "");
      setValue("schoolYear", "");
      setSelectedCategories([]);
      for (let i = 1; i <= 12; i++) {
        const keyPrefix = `g${i}`;
        setValue(`${keyPrefix}MaximumCapacity`, "");
        setValue(`${keyPrefix}NumberOfEnrolled`, "");
        setValue(`${keyPrefix}AvailableSlots`, "");
      }
    }
  }, [selectedEducation, editEducationModal]);
  getValues("category");
  console.log(selectedEducation);

  return (
    <CustomModal
      show={addEvacuation || editEducationModal}
      handleClose={closeModal}
      title={selectedEducation ? "Edit Education " : "Add Education"}
      handleAction={handleSubmit(onSubmit)}
      size="lg"
    >
      <form>
        <div style={{ overflowX: "auto" }}>
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
                    {/* <Checkbox
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      onChange={handleCategoryChange}
                      {...register("category")}
                      checked={selectedCategories.includes(option.value)}
                    /> */}
                    <Checkbox
                      {...register("category")}
                      type="checkbox"
                      label={option.label}
                      id={option.value}
                      value={option.value}
                      checked={selectedCategories.includes(option.value)}
                      onChange={() => handleCategoryChange(option.value)}
                    />

                    {selectedCategories.includes(option.value) && (
                      <Table
                        striped
                        bordered
                        responsive
                        className="customTable"
                      >
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
                                    {...register(
                                      `g${index + 1}MaximumCapacity`
                                    )}
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
                                    {...register(
                                      `g${index + 1}NumberOfEnrolled`
                                    )}
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
                                    {...register(
                                      `g${
                                        index + 7
                                      }juniorHighSchoolMaxCapacityMaximumCapacity`
                                    )}
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
                                    {...register(
                                      `g${
                                        index + 7
                                      }juniorHighSchoolMaxCapacityNumberOfEnrolled`
                                    )}
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
                                    {...register(
                                      `g${
                                        index + 7
                                      }juniorHighSchoolMaxCapacityAvailableSlots`
                                    )}
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
                                    {...register(
                                      `g${
                                        index + 11
                                      }seniorHighSchoolMaxCapacityMaximumCapacity`
                                    )}
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
                                    {...register(
                                      `g${
                                        index + 11
                                      }seniorHighSchoolMaxCapacityNumberOfEnrolled`
                                    )}
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
                                    {...register(
                                      `g${
                                        index + 11
                                      }seniorHighSchoolMaxCapacityAvailableSlots`
                                    )}
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
        </div>
      </form>
    </CustomModal>
  );
};

export default AddEducation;
