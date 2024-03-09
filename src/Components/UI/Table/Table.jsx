import React, { useEffect, useState } from "react";
import { Table, DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../Asset/Scss/Components/UI/Table/_table.scss";
import Pagination from "../Pagination/Pagination";
import CustomButton from "../../Form/Button";
import { formatDate } from "../../../Utils/FormatDate";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";

const CustomTable = ({
  data,
  columns,
  getActions,
  itemsPerPage,
  tableRowClass,
}) => {
  console.log("Data:", data);
  console.log("Columns:", columns);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedData = data.slice().reverse();
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return (
      <>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </>
    );
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      <Table className="customTable" striped bordered responsive>
        <thead>
          <tr>
            {columns.map((column) => {
              return <th key={column.key}>{column.header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, rowIndex) => {
            const isDeleted = row.status === "Deleted";
            return (
              <tr
                key={rowIndex}
                className={`customTableRow ${tableRowClass} ${
                  isDeleted ? "redRow" : ""
                }`}
              >
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
                            <FontAwesomeIcon icon={action.icon} />{" "}
                            {action.label}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    ) : column.key === "before" ||
                      column.key === "during" ||
                      column.key === "after" ? (
                      <>{row.whatToDo?.[column.key]}</>
                    ) : column.key === "team" ? (
                      <>
                        <p>{row[column.key].name}</p>

                        {/* Render other team properties as needed */}
                      </>
                    ) : column.key === "from" || column.key === "to" ? (
                      <>{formatDate(row.period?.[column.key])}</>
                    ) : column.key === "from" || column.key === "to" ? (
                      <>{formatDate(row.period?.[column.key])}</>
                    ) : column.key === "fullname" ? (
                      <>
                        <p>
                          {row.lastname || row.lastName},{" "}
                          {row.firstname || row.firstName}{" "}
                          {row.middlename || row.lastName}
                        </p>
                      </>
                    ) : column.key === "household" ? (
                      <div>
                        <p>{row.nameOfRespondent}</p>
                        <p>Address: {row.barangay}</p>
                        <p>Contact: {row.contactNo}</p>
                      </div>
                    ) : column.key === "noFamilies" ? (
                      <>
                        <p>
                          {row.householdCharacteristics.length > 0 &&
                            row.householdCharacteristics[0].noFamilies}
                        </p>
                      </>
                    ) : column.key === "updatedAt" ? (
                      <>
                        <p>{moment(row.updatedAt).format("MM-DD-YYYY")}</p>
                      </>
                    ) : (
                      // : column.key === "editDelete" ? (
                      //   <div className="centerActions">
                      //     <CustomButton label="Edit" className="fitButton" />
                      //     <CustomButton label="Delete" className="red" />
                      //   </div>
                      // )
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
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
