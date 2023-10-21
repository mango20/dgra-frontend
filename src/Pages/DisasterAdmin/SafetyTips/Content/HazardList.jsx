import React from "react";
import {
  faPaperPlane,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
import CustomTable from "../../../Components/UI/Table/Table"; // Make sure to import your CustomTable component
import Hazard from "../../../Data/SampleData/Hazard.json";
import SearchFilter from "../../../Utils/SearchFilter";
import { hazardTC } from "../../../Utils/TableColumns";

const HazardList = ({ searchTerm }) => {
  const tableColumns = hazardTC;

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

  const dataFiltered = SearchFilter(Hazard, searchTerm);

  return (
    <div>
      <CustomTable
        data={dataFiltered}
        columns={tableColumns}
        getActions={getActionsForRow}
        itemsPerPage={5}
      />
    </div>
  );
};

export default HazardList;
