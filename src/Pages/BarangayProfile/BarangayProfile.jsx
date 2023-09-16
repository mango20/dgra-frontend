import React, { useState } from "react";
import ContentContainer from "../../Layout/Container/ContentContainer";
import Form from "./Content/Form";
import CustomButton from "../../Components/Form/Button";
import CustomModal from "../../Components/UI/Modal/CustomModal";

const BarangayProfile = () => {
  return (
    <div>
      <ContentContainer title={"About Barangay"}>
        <Form />
      </ContentContainer>
    </div>
  );
};

export default BarangayProfile;
