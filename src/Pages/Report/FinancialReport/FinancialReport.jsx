import React, { useEffect, useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import CustomTable from "../../../Components/UI/Table/Table";
import { financialReportTC } from "../../../Utils/TableColumns";
import { getReq } from "../../../Service/API";
import { Table } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../../Asset/Scss/Pages/Report/_financialReport.scss";
const FinancialReport = () => {
  const tableColumns = financialReportTC;
  const [budget, setBudget] = useState([]);

  useEffect(() => {
    getBudget();
  }, []);

  const getBudget = async () => {
    try {
      const response = await getReq("/api/financial/budget");
      console.log(response);
      setBudget(response.budgets);

      console.log("Budget in FinancialReport: ", budget);
    } catch (error) {
      console.log("Error Get User", error);
    }
  };
  const filteredBudget = budget.filter((row) => row.status !== "Deleted");

  const modifiedData = filteredBudget.map((row) => ({
    ...row,
    accountWithYear: `${row.accountName} - ${row.fiscalYear}`,
  }));
  return (
    <PageContainer>
      <div className="financialReport">
        <div className="financialListCont">
          <Table className="customTable" striped bordered responsive>
            <thead>
              <tr>
                {tableColumns.map((column) => {
                  return <th key={column.key}>{column.header}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {budget
                .filter((row) => row.status !== "Deleted") // Filter out rows with status "Deleted"
                .map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{row.accountName}</td>
                    <td>{row.fiscalYear}</td>
                    <td>{row.fundingAmount}</td>
                    <td>{row.expenses}</td>
                    <td>{row.balance}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>

        <div className="barchart">
          <ResponsiveContainer width={800} height={500}>
            <BarChart
              width={700}
              height={500}
              data={modifiedData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="accountWithYear" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="fundingAmount" fill="#8884d8" name="Balance" />
              <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
              <Bar dataKey="balance" fill="#ffc658" name="Budget" />
            </BarChart>{" "}
          </ResponsiveContainer>
        </div>
      </div>
    </PageContainer>
  );
};

export default FinancialReport;
