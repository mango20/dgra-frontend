import React from "react";
import {
  faEye,
  faPencil,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Evacuation from "../../../Data/SampleData/Evacuation.json";
import CustomTable from "../../../Components/UI/Table/Table";
import { educationTC } from "../../../Utils/TableColumns";
import SearchFilter from "../../../Utils/SearchFilter";

const EducationList = ({ searchTerm }) => {
  const tableColumns = educationTC;

  const getActionsForRow = (row) => {
    const actions = [];

    actions.push({
      label: "Edit",
      icon: faPencil,
      handler: () => {
        // Implement your edit logic here
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

  const dataFiltered = SearchFilter(Evacuation, searchTerm);

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
