import React, { useEffect, useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import CustomAlert from "../../../Components/UI/Alert/Alert";
import BudgetList from "./Content/SuppliesList";
import AddBudget from "./Content/AddSupply";

const Supply = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addSupply, setBudget] = useState(false);
  const [editSupplyModal, setEditBudgetModal] = useState(false);
  const [selectedSupply, setSelectedBudget] = useState(null);
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
      <ContentContainer title={"Supplies"}>
        <AddSearch
          addLabel="Add Supply"
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
        addSupply={addSupply}
        closeModal={closeModal}
        editSupplyModal={editSupplyModal}
        selectedSupply={selectedSupply}
        alertMsg={(label) => setAlertLabel(label)}
        onItemAddedOrUpdated={() => {}}
      />
    </PageContainer>
  );
};

export default Supply;
