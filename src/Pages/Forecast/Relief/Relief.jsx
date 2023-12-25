import React, { useState } from "react";
import landClassification from "../../../Data/landClassification.json";
import report2 from "../../../Data/SampleData/report2.json";
import PageContainer from "../../../Layout/Container/PageContainer";
import CustomContainer from "../../../Layout/Container/CustomContainer";
import Card from "../../../Components/UI/Card/Card";
import Select from "../../../Components/Form/Select";
import { b2Item, d10Item } from "../../../Data/JsData/surveyItems";
import { Pie, PieChart } from "recharts";
const Relief = () => {
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
    "Household with Preparednes Kit",
    "Household without Preparednes Kit",
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
      <CustomContainer title={"Relief"} className="reports">
        <Card
          data={report2}
          label={labels}
          hasPeso={false}
          borderColors={["purple", "lightgreen"]}
        />
        <div className="reportContent">
          <Select
            label="Type of Relief"
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

export default Relief;
