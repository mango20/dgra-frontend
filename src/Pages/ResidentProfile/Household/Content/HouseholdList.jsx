import React, { useState } from "react";
import {
  faEye,
  faPencil,
  faPlus,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Households from "../../../../Data/SampleData/Households.json";
import { householdTC } from "../../../../Utils/TableColumns";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";
import AddHouseholdMember from "./Action/AddHouseholdMember";

const HouseholdList = ({ searchTerm, onEdit }) => {
  const [isAddHouseholdMemberModalOpen, setAddHouseholdMemberModalOpen] =
    useState(false);

  const closeModal = () => {
    setAddHouseholdMemberModalOpen(false);
  };

  const tableColumns = householdTC;

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
        label: "Add Household Member",
        icon: faPlus,
        handler: () => {
          setAddHouseholdMemberModalOpen(true);
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
          onEdit(row);
        },
      });

      actions.push({
        label: "Delete Household",
        icon: faTrash,
        handler: () => {
          console.log("Deleted");
        },
      });
    }

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
      <AddHouseholdMember
        addHouseholdMember={isAddHouseholdMemberModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default HouseholdList;
