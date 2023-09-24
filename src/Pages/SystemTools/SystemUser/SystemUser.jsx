import React, { useState } from "react";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import AddUser from "./Content/AddUser";
import UserList from "./Content/UserList";
import PageContainer from "../../../Layout/Container/PageContainer";

const SystemUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addUser, setUser] = useState(false);

  const handleAdd = () => {
    setUser(true);
    console.log("Add button clicked");
  };

  const closeModal = () => {
    setUser(false);
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
      <ContentContainer title={"System User"}>
        <AddSearch
          addLabel="Add User"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        <UserList searchTerm={searchTerm} />
      </ContentContainer>
      <AddUser addUser={addUser} closeModal={closeModal} />
    </PageContainer>
  );
};

export default SystemUser;
