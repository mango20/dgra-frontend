import React, { useState } from "react";
import { Table, DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../Asset/Scss/Components/UI/Table/_table.scss";
import Pagination from "../Pagination/Pagination";
import CustomButton from "../../Form/Button";

const CustomTable = ({
  data,
  columns,
  getActions,
  itemsPerPage,
  tableRowClass,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Table className="customTable" striped bordered responsive>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, rowIndex) => (
            <tr key={rowIndex} className={`customTableRow ${tableRowClass}`}>
              {columns.map((column, columnIndex) => (
                <td key={column.key}>
                  {column.key === "actions" ? (
                    <DropdownButton
                      id={`dropdown-actions-${rowIndex}`}
                      title="Actions"
                      className="actionDrop centerActions"
                      variant="none"
                    >
                      {getActions(row).map((action, actionIndex) => (
                        <Dropdown.Item
                          key={actionIndex}
                          onClick={action.handler}
                        >
                          <FontAwesomeIcon icon={action.icon} /> {action.label}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  ) : column.key === "household" ? (
                    <div>
                      <p>{row[column.key].familyName}</p>
                      <p>Address: {row[column.key].Address}</p>
                      <p>Contact: {row[column.key].Contact}</p>
                    </div>
                  ) : column.key === "editDelete" ? (
                    <div className="centerActions">
                      <CustomButton label="Edit" className="fitButton" />
                      <CustomButton label="Delete" className="red" />
                    </div>
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="paginationContainer">
        {itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(data.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default CustomTable;
