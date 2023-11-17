import React, { useEffect, useState } from "react";
import {
  faEye,
  faPencil,
  faPlus,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Expenses from "../../../../Data/SampleData/Expenses.json";
import { expensesTC } from "../../../../Utils/TableColumns";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";
import { deleteReq, getReq, putReq } from "../../../../Service/API";

const ExpensesList = ({
  searchTerm,
  onEdit,
  onItemAddedOrUpdated,
  alertMsg,
  getId,
}) => {
  const tableColumns = expensesTC;
  const [expenses, setExpenses] = useState([]);
  console.log(getId, "get");
  const restoreExpense = async (id) => {
    try {
      const response = await putReq(`/api/financial/expense?_id=${id}`, {
        _id: id,
      });

      console.log(id);
      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.log("Error Restoring User", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await deleteReq(`/api/financial/expense?_id=${id}`);

      console.log(id);
      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.log("Error Deleting User", error);
    }
  };

  const getActionsForRow = (row) => {
    const actions = [];
    if (row.status === "Deleted") {
      actions.push({
        label: "Restore",
        icon: faRotate, // Add your specific icon here
        handler: () => restoreExpense(row._id),
      });
    } else {
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
        handler: () => deleteExpense(row._id),
      });
    }

    return actions;
  };

  useEffect(() => {
    getExpenses();
  }, [onItemAddedOrUpdated]);

  const getExpenses = async () => {
    try {
      const response = await getReq(`/api/financial/expense?_id=${getId}`);
      console.log("System User : ", response);

      setExpenses(response.expenses);
    } catch (error) {
      console.log("Error Get User", error);
    }
  };

  const dataFiltered = SearchFilter(expenses, searchTerm);

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
