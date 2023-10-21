import React from "react";
import {
  faEye,
  faPencil,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Budget from "../../../Data/SampleData/Budget.json";
import CustomTable from "../../../Components/UI/Table/Table";
import { budgetTC } from "../../../Utils/TableColumns";
import SearchFilter from "../../../Utils/SearchFilter";
import { useNavigate } from "react-router-dom";

const BudgetList = ({ searchTerm }) => {
  const navigate = useNavigate();
  const tableColumns = budgetTC;

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
      label: "Add Expenses",
      icon: faEye,
      handler: () => {
        const id = row.id;
        const name = row.name;
        navigate(`/expenses/${id}`, { state: { name } });
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

  const dataFiltered = SearchFilter(Budget, searchTerm);

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

export default BudgetList;
