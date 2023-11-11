import React, { useState } from "react";

import { useLocation, useParams } from "react-router-dom";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import CustomButton from "../../../Components/Form/Button";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import ExpensesList from "./Content/ExpensesList";
import AddExpenses from "./Content/AddExpenses";

const Expenses = () => {
  const location = useLocation();
  const name = location.state ? location.state.name : "";
  const [searchTerm, setSearchTerm] = useState("");
  const [addExpenses, setExpenses] = useState(false);

  const handleAdd = () => {
    setExpenses(true);
    console.log("Add button clicked");
  };

  const closeModal = () => {
    setExpenses(false);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    console.log("Search term:", searchTerm);
  };

  const handleViewAll = () => {
    setSearchTerm("");
    console.log("View all button clicked");
  };

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
        <ExpensesList searchTerm={searchTerm} />
      </ContentContainer>
      <AddExpenses addExpenses={addExpenses} closeModal={closeModal} />
    </PageContainer>
  );
};

export default Expenses;
