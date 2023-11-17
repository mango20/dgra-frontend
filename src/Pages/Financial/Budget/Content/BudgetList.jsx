import React, { useEffect, useState } from "react";
import {
  faEye,
  faPencil,
  faPlus,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Budget from "../../../../Data/SampleData/Budget.json";
import { useNavigate } from "react-router-dom";
import { budgetTC } from "../../../../Utils/TableColumns";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";
import { deleteReq, getReq, patchReq, putReq } from "../../../../Service/API";

const BudgetList = ({ searchTerm, onEdit, onItemAddedOrUpdated, alertMsg }) => {
  const navigate = useNavigate();
  const tableColumns = budgetTC;
  const [budget, setBudget] = useState([]);
  const restoreBudget = async (id) => {
    try {
      const response = await putReq("/api/financial/budget", {
        _id: id,
      });

      console.log(response);
      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.log("Error Restoring User", error);
    }
  };

  const deleteBudget = async (id) => {
    try {
      const response = await deleteReq(`/api/financial/budget?_id=${id}`);

      console.log(response);
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
        handler: () => restoreBudget(row._id),
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
        label: "Add Expenses",
        icon: faEye,
        handler: () => {
          const id = row._id;
          const name = row.accountName;

          navigate(`/expenses/${id}`, {
            state: { id: row._id, name },
          });
        },
      });

      actions.push({
        label: "Delete",
        icon: faTrash,
        handler: () => deleteBudget(row._id),
      });
    }

    return actions;
  };

  useEffect(() => {
    getBudget();
  }, [onItemAddedOrUpdated]);

  const getBudget = async () => {
    try {
      const response = await getReq("/api/financial/budget");
      console.log("Budget : ", response);
      setBudget(response.budgets);
    } catch (error) {
      console.log("Error Get User", error);
    }
  };

  const dataFiltered = SearchFilter(budget, searchTerm);

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
