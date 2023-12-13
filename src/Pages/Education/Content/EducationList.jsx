import React, { useEffect, useState } from "react";
import {
  faEye,
  faPencil,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Education from "../../../Data/SampleData/Education.json";
import CustomTable from "../../../Components/UI/Table/Table";
import { educationTC } from "../../../Utils/TableColumns";
import SearchFilter from "../../../Utils/SearchFilter";
import { getReq } from "../../../Service/API";

const EducationList = ({
  searchTerm,
  onEdit,
  onItemAddedOrUpdated,
  alertMsg,
}) => {
  const tableColumns = educationTC;
  const [education, setEducation] = useState([]);
  const getActionsForRow = (row) => {
    const actions = [];

    actions.push({
      label: "Edit",
      icon: faPencil,
      handler: () => {
        onEdit(row);
      },
    });

    actions.push({
      label: "Delete",
      icon: faTrash,
      handler: () => {
        console.log("Deleted");
      },
    });

    return actions;
  };

  useEffect(() => {
    getBudget();
  }, [onItemAddedOrUpdated]);

  const getBudget = async () => {
    try {
      const response = await getReq("/api/financial/education");
      console.log("education : ", response);
      setEducation(response.education);
    } catch (error) {
      console.log("Error Get User", error);
    }
  };

  const dataFiltered = SearchFilter(education, searchTerm);

  return (
    <div>
      <CustomTable
        tableRowClass="centerRow"
        data={dataFiltered}
        columns={tableColumns}
        getActions={getActionsForRow}
        itemsPerPage={5}
      />
    </div>
  );
};

export default EducationList;
