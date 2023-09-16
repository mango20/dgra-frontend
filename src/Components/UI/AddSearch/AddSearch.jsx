import React, { useState } from "react";
import "../../../Asset/Scss/Components/UI/AddSearch/_addSearch.scss";
const AddSearch = ({ onAdd, addLabel, onSearch, onViewAll }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddClick = () => {
    onAdd();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleViewAllClick = () => {
    onViewAll();
  };

  return (
    <div className="addSearch">
      <div>
        {addLabel && (
          <button onClick={handleAddClick} className="addBtn">
            {addLabel}
          </button>
        )}
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick} className="searchBtn">
          Search
        </button>
        <button onClick={handleViewAllClick}>View All</button>
      </div>
    </div>
  );
};

export default AddSearch;
