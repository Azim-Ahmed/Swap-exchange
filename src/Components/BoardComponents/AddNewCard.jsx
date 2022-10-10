import {
  Box,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import {
  Warning as WarningIcon,
  Clear as ClearIcon,
  Add as AddIcon,
} from "@material-ui/icons";
import { images } from "assets";
import { SVGRender, HookFormTextField, QuillText } from "Components/Reusable";
import { useState } from "react";
import { DropzoneSection } from ".";
/**
 *@function AddNewCard.jsx
 *@author Azim
 *
 **/
const AddNewCard = ({
  handleCreateSubmit,
  onCreateSubmit,
  classes,
  handleChangeTypeOfSize,
  sizeOfProblem,
  controlForCreate,
  createError,
  handleAddEvidenceLink,
  handleCreateModalClose,
  evidenceLinks,
  handleAddSelectedEvidenceLink,
  setFilesToSave,
  handleRemoveCreatedEvidence,
}) => {
  const renderStyle = { height: "24px", width: "24px" };
  const [description, setDescription] = useState("");
  const handleSubmit = (createdData) => {
    const data = {
      ...createdData,
      description,
    };
    onCreateSubmit(data);
  };
  return (
    <Box minWidth="700px" maxWidth="700px" maxHeight="650px">
      <form
        onSubmit={handleCreateSubmit(handleSubmit)}
        className={classes.rootOfForm}
      >
        <Box mb="20px" className={classes.flexBetweenCenter}>
          <h1>Add Card</h1>
          <Box className={classes.flexBetweenCenter}>
            <Box>
              <Tooltip
                placement="top"
                title={`${sizeOfProblem === 0 ? "risk" : "issue"}`}
                arrow
              >
                <IconButton onClick={handleChangeTypeOfSize}>
                  {sizeOfProblem === 0 && (
                    <WarningIcon
                      style={{ color: " #FFDD15", stroke: "black" }}
                      color="warning"
                    />
                  )}
                  {sizeOfProblem === 1 && (
                    <SVGRender
                      style={{ ...renderStyle }}
                      img={images.risk_}
                      alt={"small Icon"}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box display="inline">
            <HookFormTextField
              name="title"
              control={controlForCreate}
              label="Title *"
              errors={createError}
            />
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          marginTop={"1rem"}
          marginBottom={"3rem"}
          mt="20px"
        >
          <QuillText value={description} onChange={setDescription} />
        </Box>

        <FormControl
          style={{ marginTop: "8px", maxWidth: "770px" }}
          disabled
          fullWidth
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Evidence (Links)
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={"text"}
            endAdornment={
              <InputAdornment position="end">
                <Tooltip
                  placement="top"
                  arrow
                  title="click to add new evidence link"
                >
                  <IconButton
                    style={{
                      marginLeft: "-34px",
                      padding: 0,
                    }}
                    aria-label="toggle password visibility"
                    onClick={handleAddEvidenceLink}
                    edge="end"
                  >
                    <AddIcon className={classes.addIconBig} />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
          />
        </FormControl>
        {evidenceLinks.map((item, index) => (
          <FormControl
            style={{ marginTop: "16px", maxWidth: "700px" }}
            key={index}
            fullWidth
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Evidence (Links)
            </InputLabel>
            <OutlinedInput
              onChange={(e) => handleAddSelectedEvidenceLink(e, item)}
              id="outlined-adornment-password"
              type={"text"}
              defaultValue={item.link}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleRemoveCreatedEvidence(item)}
                    edge="end"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={113}
            />
          </FormControl>
        ))}

        <Box>
          <DropzoneSection
            showFileNames={true}
            showPreviewsInDropzone={true}
            setUpdateFilesToSave={setFilesToSave}
            dropzoneText
          />
        </Box>
        <Box
          display="flex"
          justifyContent="right"
          marginTop="30px"
          paddingBottom="20px"
        >
          <Button
            className={classes.submitAndCloseButton}
            style={{
              marginRight: "10px",
              background: "#F5F5F5",
            }}
            onClick={handleCreateModalClose}
            variant="outlined"
            type="button"
            color="secondary"
          >
            Close
          </Button>
          <Button
            className={classes.submitAndCloseButton}
            color="primary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddNewCard;
