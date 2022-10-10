import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
/**
 *@function DraftEditor.jsx
 *@author Azim
 *
 **/

const DraftEditor = ({ editorState, onEditorStateChange, suggestions }) => {
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        options: [
          "inline",
          "blockType",
          "fontSize",
          "fontFamily",
          "list",
          "textAlign",
          "link",
          "image",
          "history",
        ],
      }}
      mention={{
        separator: " ",
        trigger: "@",
        suggestions: suggestions,
      }}
    />
  );
};

export default DraftEditor;
