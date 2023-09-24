import React, { useState } from "react";
import ContentContainer from "../../Layout/Container/ContentContainer";
import AddSearch from "../../Components/UI/AddSearch/AddSearch";
import BudgetList from "./Content/BudgetList";
import AddBudget from "./Content/AddBudget";
import PageContainer from "../../Layout/Container/PageContainer";

const Budget = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addBudget, setBudget] = useState(false);

  const handleAdd = () => {
    setBudget(true);
    console.log("Add button clicked");
  };

  const closeModal = () => {
    setBudget(false);
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
      <ContentContainer title={"Budget"}>
        <AddSearch
          addLabel="Budget"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        <BudgetList searchTerm={searchTerm} />
      </ContentContainer>
      <AddBudget addBudget={addBudget} closeModal={closeModal} />
    </PageContainer>
  );
};

export default Budget;
