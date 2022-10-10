import { DropzoneArea } from "material-ui-dropzone";
import { RIconButton } from "..";

import { Add as AddIcon, CloudUploadOutlined } from "@material-ui/icons";
import { Box } from "@material-ui/core";
/**
 *@function DropzoneSection.jsx
 *@author Azim
 *
 **/

const DropzoneSection = ({
  setUpdateFilesToSave,
  updateFilesToSave,
  dropzoneText,
  showPreviewsInDropzone,
  showFileNames,
  showPreviews,
}) => {
  return (
    <DropzoneArea
      showPreviewsInDropzone={
        showPreviewsInDropzone ? showPreviewsInDropzone : false
      }
      showFileNames={showFileNames ? showFileNames : false}
      showPreviews={false}
      maxFileSize={100000000}
      onChange={(files) => {
        setUpdateFilesToSave(files);
      }}
      acceptedFiles={[
        "image/*,application/pdf,.doc,.docx,.ppt,.xls,.xlsx,.zip,.csv,.tsv,.txt,.ppt,.pptx,.pages,.odt,.rtf",
        "video/*,.mp4,.mkv,.avi,.webm",
      ]}
      files={updateFilesToSave}
      onDelete={(file) => console.log(file)}
      filesLimit={20}
      dropzoneText={
        dropzoneText ? (
          <Box fontSize={16}>
            <p
              style={{
                fontWeight: "500",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>{<CloudUploadOutlined />}</span>
              <span>
                &nbsp; Attach screenshots of Evidence <br /> Drop files to
                attach, or <span style={{ color: "blue" }}>browse</span>
              </span>
            </p>
          </Box>
        ) : (
          <RIconButton title="click to add file" color="#777777">
            <AddIcon />
          </RIconButton>
        )
      }
    />
  );
};

export default DropzoneSection;
