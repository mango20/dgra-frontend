import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "react-bootstrap";
import "../../../Asset/Scss/Pages/DisasterAdmin/_preparednessKit.scss";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import { getReq, patchReq } from "../../../Service/API";
import CustomAlert from "../../../Components/UI/Alert/Alert";

const PreparednessKit = () => {
  const [alertLabel, setAlertLabel] = useState("");

  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  const handleUpdateClick = async () => {
    const contentState = editorState.getCurrentContent();
    const contentAsJSON = convertToRaw(contentState);
    const contentAsString = JSON.stringify(contentAsJSON);

    localStorage.setItem("editorContent", contentAsString);
    console.log("Content as ", contentAsJSON);
    try {
      // Call the patchReq function to update data
      const response = await patchReq("/api/disasterAdmin/preparednesskit", {
        information: contentAsJSON,
      });
      setAlertLabel("Preparedness Kit Updated Successfully");
      console.log("Update Response:", response);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReq("/api/disasterAdmin/safetytips");

        if (response && response.information) {
          try {
            const contentState = convertFromRaw(response.information);
            setEditorState(EditorState.createWithContent(contentState));
          } catch (conversionError) {
            console.error("Error converting data:", conversionError);
            // Handle the error (e.g., set default content)
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const handleStorageChange = (e) => {
      if (e.key === "editorContent") {
        const savedContent = e.newValue;
        if (savedContent) {
          const contentState = convertFromRaw(JSON.parse(savedContent));
          setEditorState(EditorState.createWithContent(contentState));
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (alertLabel) {
      const timer = setTimeout(() => {
        setAlertLabel("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alertLabel]);

  return (
    <PageContainer>
      <ContentContainer title={"Preparedness Kit"}>
        {alertLabel && <CustomAlert label={alertLabel} />}
        <h2 className="getAKitTitle">Get a Kit</h2>
        <Editor
          editorState={editorState}
          onEditorStateChange={(newEditorState) =>
            setEditorState(newEditorState)
          }
        />
        <br />
        <div className="rightBtnContainer">
          <Button variant="success" onClick={handleUpdateClick}>
            Update
          </Button>
        </div>
      </ContentContainer>
    </PageContainer>
  );
};

export default PreparednessKit;
