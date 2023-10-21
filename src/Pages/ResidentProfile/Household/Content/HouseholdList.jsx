import React from "react";
import {
  faEye,
  faPencil,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Households from "../../../../Data/SampleData/Households.json";
import { householdTC } from "../../../../Utils/TableColumns";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";

const HouseholdList = ({ searchTerm }) => {
  const tableColumns = householdTC;

  const getActionsForRow = (row) => {
    const actions = [];

    actions.push({
      label: "Add Household",
      icon: faPlus,
      handler: () => {
        // Implement your edit logic here
      },
    });

    actions.push({
      label: "Add Survey",
      icon: faPlus,
      handler: () => {
        // Implement your edit logic here
      },
    });

    actions.push({
      label: "View Household",
      icon: faEye,
      handler: () => {
        // Implement your edit logic here
      },
    });

    actions.push({
      label: "View Household Member",
      icon: faEye,
      handler: () => {
        // Implement your edit logic here
      },
    });

    actions.push({
      label: "Edit Household",
      icon: faPencil,
      handler: () => {
        // Implement your edit logic here
      },
    });

    actions.push({
      label: "Delete Household",
      icon: faTrash,
      handler: () => {
        console.log("Deleted");
      },
    });

    return actions;
  };

  const dataFiltered = SearchFilter(Households, searchTerm);

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

export default HouseholdList;
