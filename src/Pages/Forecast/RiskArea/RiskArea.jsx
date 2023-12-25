import React, { useState } from "react";
import Select from "../../../Components/Form/Select";
import report from "../../../Data/SampleData/report.json";
import PageContainer from "../../../Layout/Container/PageContainer";
import CustomContainer from "../../../Layout/Container/CustomContainer";
import Card from "../../../Components/UI/Card/Card";
import { a2Item } from "../../../Data/JsData/surveyItems";
import { PieChart, Pie } from "recharts";

const RiskArea = () => {
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [pieChartData, setPieChartData] = useState([
    {
      name: "Population At Risk",
      value: 30,
    },
    {
      name: "Household At Risk",
      value: 40,
    },
    {
      name: "Purok 2 At Risk",
      value: 20,
    },
  ]);

  const labels = ["Population At Risk", "Household At Risk", "Purok 2 At Risk"];

  const handleDisasterSelect = (selectedOption) => {
    setSelectedDisaster(selectedOption);

    const newData = fetchDataBasedOnDisaster(selectedOption);

    setPieChartData(newData);
  };

  const fetchDataBasedOnDisaster = (selectedDisaster) => {
    return [
      {
        name: labels[0],
        value: Math.floor(Math.random() * 50) + 1,
      },
      {
        name: labels[1],
        value: Math.floor(Math.random() * 50) + 1,
      },
      {
        name: labels[2],
        value: Math.floor(Math.random() * 50) + 1,
      },
    ];
  };

  return (
    <PageContainer>
      <CustomContainer title={"Risk Area"} className="reports">
        <Card
          data={report}
          label={labels}
          hasPeso={false}
          borderColors={["purple", "lightgreen", "lightblue"]}
        />
        <div className="reportContent">
          <Select
            label="Types of Disaster"
            data={a2Item}
            className="selectReport"
            defaultOptionLabel="Select Type of Disaster"
            onChange={(value) => handleDisasterSelect(value)}
          />
          {selectedDisaster && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PieChart width={300} height={350}>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#82ca9d"
                  label
                />
              </PieChart>
            </div>
          )}
        </div>
      </CustomContainer>
    </PageContainer>
  );
};

export default RiskArea;
