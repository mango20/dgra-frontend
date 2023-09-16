import React from "react";
import CustomTable from "../../../Components/UI/Table/Table";
import Advisory from "../../../Data/SampleData/Advisory.json";
import {
  faPlus,
  faEye,
  faPencil,
  faTrash,
  faPlane,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"; // Import the FontAwesome icons you're using
import { advisoryTC } from "../../../Utils/TableColumns";
import SearchFilter from "../../../Utils/SearchFilter";

const AdvisoryList = ({ searchTerm }) => {
  const tableColumns = advisoryTC;

  const getActionsForRow = (row) => {
    const actions = [];

    actions.push({
      label: "Send",
      icon: faPaperPlane,
      handler: () => {
        // Implement your edit logic here
      },
    });

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

  const dataFiltered = SearchFilter(Advisory, searchTerm);

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

export default AdvisoryList;
