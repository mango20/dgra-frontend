import React from "react";
import {
  faEye,
  faPencil,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Expenses from "../../../Data/SampleData/Expenses.json";
import CustomTable from "../../../Components/UI/Table/Table";
import { expensesTC } from "../../../Utils/TableColumns";
import SearchFilter from "../../../Utils/SearchFilter";

const ExpensesList = ({ searchTerm }) => {
  const tableColumns = expensesTC;

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

  const dataFiltered = SearchFilter(Expenses, searchTerm);

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

export default ExpensesList;
