import React, { useEffect, useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import AddBudget from "./Content/AddBudget";
import BudgetList from "./Content/BudgetList";
import CustomAlert from "../../../Components/UI/Alert/Alert";

const Budget = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addBudget, setBudget] = useState(false);
  const [editBudgetModal, setEditBudgetModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [alertLabel, setAlertLabel] = useState("");

  const handleAdd = () => {
    setBudget(true);
    setSelectedBudget(null);
    console.log("Add button clicked");
  };

  const handleEdit = (event) => {
    setSelectedBudget(event);
    setEditBudgetModal(true);
    setBudget(true);
  };

  const closeModal = () => {
    setBudget(false);
    setEditBudgetModal(false);
    setSelectedBudget(null);
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
      <ContentContainer title={"Budget"}>
        <AddSearch
          addLabel="Budget"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        {alertLabel && <CustomAlert label={alertLabel} />}
        <BudgetList
          searchTerm={searchTerm}
          onEdit={handleEdit}
          alertMsg={(label) => setAlertLabel(label)}
          onItemAddedOrUpdated={() => {}}
        />
      </ContentContainer>
      <AddBudget
        addBudget={addBudget}
        closeModal={closeModal}
        editBudgetModal={editBudgetModal}
        selectedBudget={selectedBudget}
        alertMsg={(label) => setAlertLabel(label)}
        onItemAddedOrUpdated={() => {}}
      />
    </PageContainer>
  );
};

export default Budget;
