import React, { useState } from "react";
import {
  faEye,
  faPencil,
  faPlus,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Householdmember from "../../../../Data/SampleData/Householdmember.json";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";
import { householdMemberTC } from "../../../../Utils/TableColumns";

const HouseholdMemberList = ({ searchTerm }) => {
  const [isAddHouseholdMemberModalOpen, setAddHouseholdMemberModalOpen] =
    useState(false);

  const closeModal = () => {
    setAddHouseholdMemberModalOpen(false);
  };

  const tableColumns = householdMemberTC;

  const getActionsForRow = (row) => {
    const actions = [];

    if (row.status === "Deleted") {
      actions.push({
        label: "Restore",
        icon: faRotate, // Add your specific icon here
        handler: () => {
          // Your restore logic goes here
        },
      });
    } else {
      actions.push({
        label: "Edit Household",
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
    }

    return actions;
  };

  const dataFiltered = SearchFilter(Householdmember, searchTerm);

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

export default HouseholdMemberList;
