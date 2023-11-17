import React, { useEffect, useState } from "react";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import AddUser from "./Content/AddUser";
import UserList from "./Content/UserList";
import PageContainer from "../../../Layout/Container/PageContainer";
import CustomAlert from "../../../Components/UI/Alert/Alert";

const SystemUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addUser, setUser] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [alertLabel, setAlertLabel] = useState("");

  const handleAdd = () => {
    setUser(true);
    setSelectedUser(null);
    console.log("Add button clicked");
  };

  const handleEdit = (event) => {
    setSelectedUser(event);
    setEditUserModal(true);
    setUser(true);
  };

  const closeModal = () => {
    setUser(false);
    setEditUserModal(false);
    setSelectedUser(null);
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
      <ContentContainer title={"System User"}>
        <AddSearch
          addLabel="Add User"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        {alertLabel && <CustomAlert label={alertLabel} />}
        <UserList
          searchTerm={searchTerm}
          onEdit={handleEdit}
          alertMsg={(label) => setAlertLabel(label)}
          onItemAddedOrUpdated={() => {}}
        />
      </ContentContainer>
      <AddUser
        addUser={addUser}
        closeModal={closeModal}
        editUserModal={editUserModal}
        selectedUser={selectedUser}
        alertMsg={(label) => setAlertLabel(label)}
        onItemAddedOrUpdated={() => {}}
      />
    </PageContainer>
  );
};

export default SystemUser;
