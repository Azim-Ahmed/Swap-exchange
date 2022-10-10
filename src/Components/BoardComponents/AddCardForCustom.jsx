import { useState } from "react";
import { Box, Button, IconButton, TextField } from "@material-ui/core";
import { images } from "assets";
import {
  SVGRender,
  Modal,
  HookFormTextField,
  UserAvatar,
  MuiDatePicker,
  QuillText,
} from "Components/Reusable";
import {
  Check as CheckIcon,
  Clear as ClearIcon,
  Add as AddIcon,
  Adb as AdbIcon,
  Star as StarIcon,
  AssignmentTurnedInOutlined as AssignmentTurnedInOutlinedIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@material-ui/icons";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { nanoid } from "nanoid";
import { DropzoneSection } from ".";
import { useCallback } from "react";
import { boarsdData } from "assets/Data/BoardsData";
/**
 *@function AddCardForCustom.jsx
 *@author Azim
 *
 **/

const AddCardForCustom = ({
  modalOpenForAddCard,
  handleCreateSubmit,
  onCreateSubmit,
  classes,
  persona,
  handleChangeTypeOfSize,
  sizeOfProblem,
  controlForCreate,
  createError,
  handleCreateModalClose,
  handleCardType,
  setFilesToSave,
  logEnable,
  renderStyle,
  cardType,
  // openTextFieldToAcceptance,
  // singleAcceptanceCriteria,
  // setSingleAcceptanceCriteria,
  // openAcceptanceCriteria,
  // singleToUpdateAcceptanceCriteria,
  // setUpdateSingleAcceptanceCriteria,
  // handleCreateUpdateAcceptanceCriteria,
  // setOpenAcceptanceCriteria,
  // setSingleToUpdateAcceptanceCriteria,
  // createAceptanceCriteria,
  getSingleAcceptanceCriteria,
  // setcreateAceptanceCriteria,
  toUsers,
  setAssignee,
  getAvatar,
  getName,
  toEpics,
  setEpicId,
  selectedDate,
  setSelectedDate,
  setToEmails,
  toBlockers,
  user,
}) => {
  const filter = createFilterOptions();
  const [description, setDescription] = useState("");
  const [openTextFieldToAcceptance, setOpenTextFieldToAcceptance] =
    useState(true);
  const [openAcceptanceCriteria, setOpenAcceptanceCriteria] = useState(false);
  const [
    singleToUpdateAcceptanceCriteria,
    setSingleToUpdateAcceptanceCriteria,
  ] = useState({});
  const [createAceptanceCriteria, setcreateAceptanceCriteria] = useState([]);
  const [updateSingleAcceptanceCriteria, setUpdateSingleAcceptanceCriteria] =
    useState("");
  const [singleAcceptanceCriteria, setSingleAcceptanceCriteria] = useState(
    boarsdData.initialState
  );
  const handleCreateAcceptanceCriteria = useCallback(() => {
    if (
      singleAcceptanceCriteria !== null &&
      singleAcceptanceCriteria !== "" &&
      singleAcceptanceCriteria !== boarsdData.initialState
    ) {
      const writingDescription = {
        description: singleAcceptanceCriteria,
        id: nanoid(9),
        projectId: user?.projectId,
      };
      setcreateAceptanceCriteria((t) => [...t, writingDescription]);
      setOpenTextFieldToAcceptance(false);
      setSingleAcceptanceCriteria(boarsdData.initialState);
    }
  }, [singleAcceptanceCriteria]);
  const handleUpdateSingleAcceptanceCriteria = (singleAccept) => {
    setSingleToUpdateAcceptanceCriteria(singleAccept);
    setUpdateSingleAcceptanceCriteria(singleAccept.description);
    setOpenAcceptanceCriteria(true);
  };
  //create----update
  const handleCreateUpdateAcceptanceCriteria = () => {
    if (
      updateSingleAcceptanceCriteria !== null &&
      updateSingleAcceptanceCriteria !== ""
    ) {
      const itemIndex = createAceptanceCriteria.findIndex(
        (item) => item.id === singleToUpdateAcceptanceCriteria.id
      );
      if (itemIndex !== -1) {
        createAceptanceCriteria[itemIndex].description =
          updateSingleAcceptanceCriteria;
      }
      setOpenAcceptanceCriteria(false);
      setOpenTextFieldToAcceptance(false);
      setSingleAcceptanceCriteria("");
      setUpdateSingleAcceptanceCriteria("");
      setSingleToUpdateAcceptanceCriteria({});
    } else {
      setOpenAcceptanceCriteria(false);
      setOpenTextFieldToAcceptance(false);
      setSingleAcceptanceCriteria("");
      setUpdateSingleAcceptanceCriteria("");
      setSingleToUpdateAcceptanceCriteria({});
    }
  };

  const handleSubmit = (modaldata) => {
    const cardId = `node_process_${nanoid(15)}`;
    const newCreateShallowArray = [...createAceptanceCriteria];
    const updateCreateAceptanceCriteria = newCreateShallowArray.map((item) => {
      const newItem = { ...item };
      newItem.cardId = cardId;
      if (newItem.id.length === 9) {
        delete newItem.id;
        return newItem;
      }
      return newItem;
    });
    const data = {
      ...modaldata,
      description,
      cardId,
      updateCreateAceptanceCriteria,
    };
    onCreateSubmit(data);
  };

  return (
    <Modal
      open={modalOpenForAddCard}
      board
      handleClose={handleCreateModalClose}
    >
      <div style={{ padding: "10px" }}>
        {" "}
        <div
          style={{
            minWidth: "700px",
            maxHeight: "650px",
          }}
        >
          <form
            onSubmit={handleCreateSubmit(handleSubmit)}
            className={classes.rootOfForm}
          >
            <div className={classes.flexBetweenCenter}>
              <h1>Add Card</h1>
              <div className={classes.flexBetweenCenter}>
                {!logEnable ? (
                  <div>
                    <IconButton onClick={handleChangeTypeOfSize}>
                      {sizeOfProblem === 0 && (
                        <SVGRender
                          style={renderStyle}
                          img={images.tShirt}
                          alt={"noSize Icon"}
                        />
                      )}
                      {sizeOfProblem === 1 && (
                        <SVGRender
                          style={renderStyle}
                          img={images.smallIconForSize}
                          alt={"small Icon"}
                        />
                      )}
                      {sizeOfProblem === 2 && (
                        <SVGRender
                          style={renderStyle}
                          img={images.mediumIconForSize}
                          alt={"medium Icon"}
                        />
                      )}
                      {sizeOfProblem === 3 && (
                        <SVGRender
                          style={renderStyle}
                          img={images.largeIconForSize}
                          alt={"large Icon"}
                        />
                      )}
                    </IconButton>
                  </div>
                ) : null}
                <div>
                  <IconButton onClick={handleCardType}>
                    {cardType === 0 && (
                      <StarIcon style={{ color: " #F0DD2E" }} />
                    )}
                    {cardType === 1 && <AdbIcon style={{ color: " red" }} />}
                    {cardType === 2 && <AssignmentTurnedInOutlinedIcon />}
                  </IconButton>
                </div>
              </div>
            </div>
            {cardType === 0 && (
              <div>
                <div style={{ color: "#999999", display: "flex" }}>
                  <p style={{ marginTop: "10px", marginRight: "6px" }}>
                    {" "}
                    {`As ${persona.name} I want to do the `}
                  </p>

                  {
                    <div style={{ display: "inline" }}>
                      <HookFormTextField
                        name="title"
                        control={controlForCreate}
                        label="Feature name *"
                        errors={createError}
                        size="small"
                        style={{ width: "100%" }}
                      />
                    </div>
                  }
                  <p
                    style={{ margin: "10px 6px" }}
                  >{` process so that I can `}</p>
                  {
                    <div style={{ display: "inline" }}>
                      <HookFormTextField
                        name="label"
                        control={controlForCreate}
                        label="Feature why *"
                        errors={createError}
                        size="small"
                        style={{ width: "100%" }}
                      />
                    </div>
                  }
                </div>

                <div className={classes.flexBetweenCenter}>
                  <p
                    style={{
                      fontWeight: "700",
                      fontSize: "14px",
                      color: "#444444",
                    }}
                  >
                    Acceptance Criteria
                  </p>
                  {!openTextFieldToAcceptance && (
                    <IconButton
                      onClick={() => setOpenTextFieldToAcceptance(true)}
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </div>
                <div>
                  {openTextFieldToAcceptance && (
                    <div style={{ display: "inline" }}>
                      <QuillText
                        value={singleAcceptanceCriteria}
                        onChange={setSingleAcceptanceCriteria}
                      />
                      {/* acceptance criteria buttons */}
                      <div className={classes.shortIconForAcceptance}>
                        <Button
                          variant="contained"
                          onClick={handleCreateAcceptanceCriteria}
                        >
                          <CheckIcon />
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => {
                            setSingleAcceptanceCriteria(
                              boarsdData.initialState
                            );
                            setOpenTextFieldToAcceptance(false);
                          }}
                        >
                          <ClearIcon />
                        </Button>
                      </div>
                    </div>
                  )}
                  {/* Created Update Acceptancce Criteria */}
                  {openAcceptanceCriteria && (
                    <div style={{ display: "inline" }}>
                      <QuillText
                        value={updateSingleAcceptanceCriteria}
                        onChange={setUpdateSingleAcceptanceCriteria}
                      />

                      {/* acceptance criteria buttons */}
                      <div className={classes.shortIconForAcceptance}>
                        <Button
                          variant="contained"
                          onClick={handleCreateUpdateAcceptanceCriteria}
                        >
                          <CheckIcon />
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => {
                            setOpenAcceptanceCriteria(false);
                            setSingleToUpdateAcceptanceCriteria({});
                          }}
                        >
                          <ClearIcon />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {createAceptanceCriteria &&
                    createAceptanceCriteria.map((item, index) => (
                      <div
                        style={{
                          display:
                            singleToUpdateAcceptanceCriteria.id === item.id
                              ? "none"
                              : "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          maxWidth: "700px",
                          margin: "5px 0px",
                        }}
                        title={`Click to Update`}
                        key={index}
                      >
                        <div
                          className={classes.acceptanceCriteriaStyle}
                          dangerouslySetInnerHTML={{
                            __html: getSingleAcceptanceCriteria(
                              item?.description
                            ),
                          }}
                          onClick={() =>
                            handleUpdateSingleAcceptanceCriteria(item)
                          }
                        ></div>
                        <IconButton
                          onClick={() => {
                            setcreateAceptanceCriteria(
                              createAceptanceCriteria.filter(
                                (items) => items.id !== item.id
                              )
                            );
                          }}
                        >
                          <DeleteOutlineIcon style={{ color: "#FF0000" }} />
                        </IconButton>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {(cardType === 1 || cardType === 2) && (
              <div>
                <Box display="inline">
                  <HookFormTextField
                    name={cardType === 1 ? "bugsLabel" : "choresLabel"}
                    control={controlForCreate}
                    label={cardType === 1 ? "Bug's Label *" : "Chore's Label *"}
                    errors={createError}
                  />
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    marginTop={"1rem"}
                    marginBottom={"3.5rem"}
                  >
                    <QuillText value={description} onChange={setDescription} />
                  </Box>
                </Box>
              </div>
            )}

            <Autocomplete
              options={toUsers}
              id="blur-on-select"
              blurOnSelect
              getOptionSelected={(option, value) => {
                return option.value === value.value;
              }}
              getOptionLabel={(option) => option.label}
              style={{ width: "100%", marginTop: "16px" }}
              onChange={(e, f) => setAssignee(f.value)}
              renderOption={(option, { selected }) => (
                <div className={classes.flexBetweenCenter}>
                  <UserAvatar
                    className={classes.typesIconStyle}
                    getAvatar={getAvatar}
                    getName={getName}
                    userId={option.value}
                  />
                  <p
                    style={{
                      color: "black",
                      display: "block",
                      marginLeft: "10px",
                    }}
                  >
                    {option.label}
                  </p>
                </div>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Assignee"
                  variant="outlined"
                />
              )}
            />
            <Autocomplete
              options={toEpics}
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, value) => {
                return option.value === value.value;
              }}
              style={{ width: "100%", marginTop: "16px" }}
              id="blur-on-select"
              blurOnSelect
              onChange={(e, f) => setEpicId(f.value)}
              renderOption={(option, { selected }) => (
                <Box
                  style={{
                    width: "100%",
                    background: option.color ? option.color : "#67c6c0",
                  }}
                >
                  <p
                    style={{
                      color: "black",
                      marginLeft: "10px",
                    }}
                  >
                    {option.label}
                  </p>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Epic link"
                  variant="outlined"
                />
              )}
            />
            <Box className="dateStyle">
              <MuiDatePicker
                keyboard
                className={classes.muiDateWrapper}
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </Box>
            <Box className={classes.linkToDesignStyle}>
              <HookFormTextField
                name="linkToDesign"
                rules={{
                  pattern: {
                    value:
                      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,
                    message: "wrong link",
                  },
                }}
                control={controlForCreate}
                label="Link to design"
                errors={createError}
              />
            </Box>

            <Box className={classes.toBlockersStyle}>
              <Autocomplete
                multiple
                limitTags={5}
                getOptionSelected={(option, value) => {
                  const optionTitle =
                    typeof option === "string" ? option : option.value;
                  const valueTitle =
                    typeof value === "string" ? value : value.value;
                  return optionTitle === valueTitle;
                }}
                onChange={(event, newValue) => {
                  if (Array.isArray(newValue)) {
                    const updatedArrayValue = newValue.filter((e) =>
                      typeof e === "string" ? e.trim() : e
                    );
                    const newArrayValue = [...updatedArrayValue];
                    const updatedArray = newArrayValue.map((item) => {
                      if (typeof item === "string") {
                        const newItem = {};
                        newItem.label = item;
                        newItem.value = nanoid(12);
                        newItem.type = "created";
                        return newItem;
                      }
                      return item;
                    });
                    setToEmails(updatedArray);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      label: `Add "${params.inputValue}"`,
                      value: nanoid(12),
                      type: "created",
                    });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={toBlockers}
                filterSelectedOptions
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.label;
                }}
                renderOption={(option) => option.label}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Blockers" variant="outlined" />
                )}
              />
            </Box>
            <Box>
              <DropzoneSection
                showFileNames={true}
                showPreviewsInDropzone={true}
                setUpdateFilesToSave={setFilesToSave}
                dropzoneText
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "right",
                marginTop: "10px",
                paddingBottom: "20px",
              }}
            >
              <Button
                style={{
                  marginRight: "6px",
                }}
                onClick={handleCreateModalClose}
                variant="outlined"
                type="button"
              >
                Close
              </Button>
              <Button color="primary" variant="outlined" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddCardForCustom;
