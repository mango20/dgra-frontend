import React, { useState } from "react";
import landClassification from "../../../Data/landClassification.json";
import report from "../../../Data/SampleData/report.json";
import PageContainer from "../../../Layout/Container/PageContainer";
import CustomContainer from "../../../Layout/Container/CustomContainer";
import Card from "../../../Components/UI/Card/Card";
import Select from "../../../Components/Form/Select";
import { Pie, PieChart } from "recharts";
import { d10Item } from "../../../Data/JsData/surveyItems";
const DisasterFund = () => {
  const [selectedRelief, setSelectedRelief] = useState(null);
  const [pieChartData, setPieChartData] = useState([
    {
      name: "Water",
      value: 30,
    },
    {
      name: "Matches",
      value: 40,
    },
    {
      name: "Purok 2 At Risk",
      value: 20,
    },
  ]);

  const labels = [
    "Disaster Fund",
    "Forecast Fund",
    "Forecast Fund to Risk Area",
  ];
  const handleReliefSelect = (selectedOption) => {
    setSelectedRelief(selectedOption);

    // Fetch data based on the selected disaster type
    const newData = fetchDataBasedOnDisaster(selectedOption);

    // Update the Pie Chart data
    setPieChartData(newData);
  };

  const fetchDataBasedOnDisaster = (selectedRelief) => {
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
      <CustomContainer title={"Disaster Fund"} className="reports">
        <Card
          data={report}
          label={labels}
          hasPeso={true}
          borderColors={["purple", "lightgreen", "lightblue"]}
        />
        <div className="reportContent">
          <Select
            label="Types of Relief"
            data={d10Item}
            className="selectReport"
            defaultOptionLabel="Select Type of Relief"
            onChange={(value) => handleReliefSelect(value)}
          />
          {selectedRelief && (
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

export default DisasterFund;
