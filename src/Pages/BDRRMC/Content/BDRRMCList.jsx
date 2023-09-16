import React from "react";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
import CustomTable from "../../../Components/UI/Table/Table"; // Make sure to import your CustomTable component
import BDRRMC from "../../../Data/SampleData/BDRRMC.json";
import { BDRRMCTC } from "../../../Utils/TableColumns";
import SearchFilter from "../../../Utils/SearchFilter";

const BDRRMCList = ({ searchTerm }) => {
  const tableColumns = BDRRMCTC;

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

  const dataFiltered = SearchFilter(BDRRMC, searchTerm);

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

export default BDRRMCList;
