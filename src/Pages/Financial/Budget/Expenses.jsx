import React, { useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import CustomButton from "../../../Components/Form/Button";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import ExpensesList from "./Content/ExpensesList";
import AddExpenses from "./Content/AddExpenses";
import CustomAlert from "../../../Components/UI/Alert/Alert";

const Expenses = () => {
  const location = useLocation();
  const name = location.state ? location.state.name : "";
  const getId = location.state ? location.state.id : "";
  const [searchTerm, setSearchTerm] = useState("");
  const [addExpenses, setExpenses] = useState(false);
  const [editExpensesModal, setEditExpensesModal] = useState(false);
  const [selectedExpenses, setSelectedExpenses] = useState(null);
  const [alertLabel, setAlertLabel] = useState("");

  const handleAdd = () => {
    setExpenses(true);
    setSelectedExpenses(null); // Clear any previously selected event for editing
  };

  const handleEdit = (event) => {
    setSelectedExpenses(event);
    setEditExpensesModal(true);
    setExpenses(true);
  };

  const closeModal = () => {
    setExpenses(false);
    setEditExpensesModal(false);
    setSelectedExpenses(null);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    console.log("Search term:", searchTerm);
  };

  const handleViewAll = () => {
    setSearchTerm("");
    console.log("View all button clicked");
  };

  useEffect(() => {
    if (alertLabel) {
      const timer = setTimeout(() => {
        setAlertLabel("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alertLabel]);

  return (
    <PageContainer>
      <ContentContainer
        title={`Expenses of ${name}`}
        add={<CustomButton label="Print List" className="fitButton" />}
      >
        <AddSearch
          addLabel="Add Expenses"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        {alertLabel && <CustomAlert label={alertLabel} />}
        <ExpensesList
          searchTerm={searchTerm}
          onEdit={handleEdit}
          editExpensesModal={editExpensesModal}
          selectedExpenses={selectedExpenses}
          alertMsg={(label) => setAlertLabel(label)}
          onItemAddedOrUpdated={() => {}}
          getId={getId}
        />
      </ContentContainer>
      <AddExpenses
        addExpenses={addExpenses}
        closeModal={closeModal}
        editExpensesModal={editExpensesModal}
        selectedExpenses={selectedExpenses}
        alertMsg={(label) => setAlertLabel(label)}
        onItemAddedOrUpdated={() => {}}
      />
    </PageContainer>
  );
};

export default Expenses;
