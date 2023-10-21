import React from "react";
import { Tab, Tabs } from "react-bootstrap";

const CustomTab = ({ defaultActiveKey, id, tabs }) => {
  return (
    <>
      <Tabs defaultActiveKey={defaultActiveKey} id={id} className="mb-3">
        {tabs.map((tab) => (
          <Tab
            key={tab.eventKey}
            eventKey={tab.eventKey}
            title={tab.title}
            disabled={tab.disabled}
          >
            {tab.content}
          </Tab>
        ))}
      </Tabs>
    </>
  );
};

export default CustomTab;
