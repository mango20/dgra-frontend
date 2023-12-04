import React, { useEffect, useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import CustomAlert from "../../../Components/UI/Alert/Alert";
import AddSupply from "./Content/AddSupply";
import SuppliesList from "./Content/SuppliesList";

const Supply = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addSupply, setSupplies] = useState(false);
  const [editSupplyModal, setEditSupplies] = useState(false);
  const [selectedSupply, setSelectSupplies] = useState(null);
  const [alertLabel, setAlertLabel] = useState("");

  const handleAdd = () => {
    setSupplies(true);
    setSelectSupplies(null);
    console.log("Add button clicked");
  };

  const handleEdit = (event) => {
    setSelectSupplies(event);
    setEditSupplies(true);
    setSupplies(true);
  };

  const closeModal = () => {
    setSupplies(false);
    setEditSupplies(false);
    setSelectSupplies(null);
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
        <SuppliesList
          searchTerm={searchTerm}
          onEdit={handleEdit}
          alertMsg={(label) => setAlertLabel(label)}
          onItemAddedOrUpdated={() => {}}
        />
      </ContentContainer>
      <AddSupply
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
