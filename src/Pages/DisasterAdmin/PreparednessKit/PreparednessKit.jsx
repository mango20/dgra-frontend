import React, { useState, useEffect } from "react";
import PageContainer from "../../Layout/Container/PageContainer";
import ContentContainer from "../../Layout/Container/ContentContainer";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "react-bootstrap";
import "../../Asset/Scss/Pages/DisasterAdmin/_preparednessKit.scss";
const PreparednessKit = () => {
  const [editorState, setEditorState] = useState(() => {
    // Load editor content from localStorage on initial render
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  // Function to handle the "Update" button click
  const handleUpdateClick = () => {
    const contentState = editorState.getCurrentContent();
    const contentAsJSON = convertToRaw(contentState);
    const contentAsString = JSON.stringify(contentAsJSON);

    // Store the content in localStorage
    localStorage.setItem("editorContent", contentAsString);
    console.log("Updated Text:", contentAsJSON);
  };

  useEffect(() => {
    // Update the editor state when localStorage changes (e.g., from another tab)
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

  return (
    <PageContainer>
      <ContentContainer title={"Preparedness Kit"}>
        <h2>Simple Word Editor</h2>
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
