import {
  Avatar,
  Box,
  Grid,
  Link,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { Button, IconButton, TextField } from "@material-ui/core";
import { images } from "assets";
import {
  SVGRender,
  UserAvatar,
  MuiDatePicker,
  QuillText,
  MPopover,
  ErrorMessages,
} from "Components/Reusable";
import {
  Check as CheckIcon,
  Clear as ClearIcon,
  Add as AddIcon,
  Adb as AdbIcon,
  Star as StarIcon,
  AssignmentTurnedInOutlined as AssignmentTurnedInOutlinedIcon,
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  AccessTime,
  CloudUploadOutlined,
} from "@material-ui/icons";
import { Controller } from "react-hook-form";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { nanoid } from "nanoid";
import {
  Attachments,
  BlockersTable,
  // DropzoneSection,
  Editor,
  ShowNotes,
} from ".";
import { globalStyle } from "assets/Styles/GlobalStyle";
import { DropzoneArea } from "material-ui-dropzone";
import store from "../../redux/store";
import ReleaseCandidate from "./ReleaseCandidate";

/**
 *@function UpdateBoardCard.jsx
 *@author Azim
 *
 **/

const UpdateBoardCard = ({
  handleUpdateSubmit,
  onUpdateSubmit,
  toEpics,
  classes,
  getEpicName,
  updateEpicId,
  setUpdateEpicId,
  getEpicColor,
  editorState,
  onEditorStateChange,
  toUsers,
  setUpdateAssignee,
  updateAssignee,
  getAvatar,
  getName,
  singleAcceptanceCriteria,
  updateSelectedDate,
  setUpdateSelectedDate,
  logEnable,
  cardData,
  handleUpdateTypeOfSize,
  updateSizeOfProblem,
  particularCard,
  persona,
  user,
  handleTimeSheet,
  PopOverForTimeSheet,
  setOpenToChangeTheUserStories,
  sum,
  openToChangeTheUserStories,
  updateTitle,
  updateLabel,
  control,
  errors,
  setOpenForUpdate,
  openForUpdate,
  setSingleAcceptanceCriteria,
  handleCheckAcceptanceCriteria,
  openAcceptanceForUpdate,
  updateSingleAcceptanceCriteria,
  setUpdateSingleAcceptanceCriteria,
  handleUpdateSingleAcceptanceForCard,
  setOpenAcceptanceForUpdate,
  setSingleAcceptanceToUpdateCard,
  aceptanceCriteria,
  singleAcceptanceToUpdateCard,
  handleUpdateCardClose,
  updatenotes,
  renderUpdateNotes,
  updateChoresLabel,
  opendescription,
  setOpenDescription,
  setOpenToChangeTheChoresLabel,
  openToChangeTheChoresLabel,
  savedDescription,
  SetSavedDescription,
  setUpdatenotes,
  setUpdateToNotes,
  setOpenToComment,
  removeComment,
  saveComment,
  setUpdateFilesToSave,
  setOpenAddAttachment,
  openAddAttachment,
  updateFilesToSave,
  suggestions,
  toBlockers,
  setOpenBlockersSection,
  openBlockersSection,
  updateBlockers,
  boarsdData,
  setUpdateBlockers,
  setDescription,
  description,
  openToComment,
  onEditLinkToDesign,
  setOnEditLinkToDesign,
  setOpenToChangeTheBugsLabel,
  updateBugsLabel,
  openToChangeTheBugsLabel,
  setAceptanceCriteria,
  deleteSingleAcceptanceCriteria,
  handleUpdateSingleForUpdateCard,
  getSingleAcceptanceCriteria,
  updateReleaseName,
  setOpenReleaseNameUpdate,
  openChangeToReleaseName,
  setOpenChangeToGoal,
  openChangeToGoal,
  updateReleaseGoal,

}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorForAssignee, setAnchorForAssignee] = useState(null);
  const [anchorElEstimate, setAnchorElEstimate] = useState(null);
  const [anchorElTimeSheet, setAnchorElTimeSheet] = useState(null);
  const [estimateShow, setEstimateShow] = useState(false);

  const [openGoalUpdate, setOpenGoalUpdate] = useState(false)

  const [estimateHour, setEstimateHour] = useState(0);

  const id = open ? "simple-popover" : undefined;
  const openAssignee = Boolean(anchorForAssignee);
  const openAssigneeid = openAssignee ? "simple-popover" : undefined;
  const estimateShowid = estimateShow ? "simple-popover" : undefined;
  const filter = createFilterOptions();
  const PopoverForNewEpicName = () => {
    return (
      <MPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        className={classes.popoverStyle}
      >
        <Autocomplete
          options={toEpics}
          getOptionLabel={(option) => option.label}
          getOptionSelected={(option, value) => {
            return option.value === value.value;
          }}
          style={{ width: "100%", padding: "20px" }}
          id="blur-on-select"
          blurOnSelect
          onChange={(e, f) => {
            setUpdateEpicId(f.value);
            setAnchorEl(null);
          }}
          defaultValue={
            toEpics.find((item) => item?.value === updateEpicId)
              ? toEpics.find((item) => item?.value === updateEpicId)
              : ""
          }
          renderOption={(option, { selected }) => (
            <div
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
            </div>
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
      </MPopover>
    );
  };
  const PopoverForNewAssignee = () => {
    return (
      <div>
        <MPopover
          id={openAssigneeid}
          open={openAssignee}
          anchorEl={anchorForAssignee}
          onClose={() => setAnchorForAssignee(null)}
          className={classes.popoverStyle}
        >
          <Autocomplete
            options={toUsers}
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option, value) => {
              return option.value === value.value;
            }}
            style={{ width: "100%", padding: "20px" }}
            id="blur-on-select"
            blurOnSelect
            onChange={(e, f) => {
              setUpdateAssignee(f?.value);
              setAnchorForAssignee(null);
            }}
            defaultValue={
              toUsers.find((item) => item?.value === updateAssignee)
                ? toUsers.find((item) => item?.value === updateAssignee)
                : ""
            }
            renderOption={(option, { selected }) => (
              <div className={classes.flexBetweenCenter}>
                <UserAvatar
                  className={classes.typesIconStyle}
                  getAvatar={getAvatar}
                  getName={getName}
                  userId={option?.value}
                />

                <p
                  style={{
                    color: "black",
                    display: "block",
                    marginLeft: "10px",
                  }}
                >
                  {option?.label}
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
        </MPopover>
      </div>
    );
  };
  // pop over for estimate
  const PopOverForEstimate = () => {
    return (
      <MPopover
        id={estimateShowid}
        open={estimateShow}
        anchorEl={anchorElEstimate}
        onClose={() => {
          setAnchorElEstimate(null);
          setEstimateShow(false);
        }}
        className={classes.estimateStyle}
      >
        <Box padding={2}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="0h"
            value={estimateHour}
            onChange={(event) => setEstimateHour(event.target.value)}
          />
        </Box>
      </MPopover>
    );
  };
  return (
    <Box minWidth="700px" mt="21px">
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleUpdateSubmit(onUpdateSubmit)}
      >
        {PopoverForNewEpicName()}
        {PopoverForNewAssignee()}
        <div className={classes.flexBasisBetweenForHeaderCard}>
          <div className={classes.flexBasisBetween}>
            {cardData?.type !== "release" ?
              <Tooltip
                title={
                  getEpicName(updateEpicId)
                    ? getEpicName(updateEpicId)
                    : "Epic Link"
                }
                arrow
              >
                <Button
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                  className={classes.updateCardEpicLink}
                  style={{
                    background: updateEpicId
                      ? getEpicColor(updateEpicId) || "#DEDEDE"
                      : "#DEDEDE",
                  }}
                >
                  {updateEpicId ? getEpicName(updateEpicId) : "Epic link"}
                </Button>
              </Tooltip> : null}

            <div className="dateStyle">
              <MuiDatePicker
                className={classes.muiDatePicker}
                value={updateSelectedDate}
                onChange={(date) => setUpdateSelectedDate(date)}
              />
            </div>
            {logEnable ? (
              <div>
                <Box
                  sx={{ backgroundColor: "#dedede", cursor: "pointer" }}
                  paddingLeft={1.2}
                  paddingRight={1.2}
                  paddingTop={0.3}
                  paddingBottom={0.3}
                  borderRadius={"5px"}
                  fontSize="15px"
                  fontWeight={cardData?.estimateHour > 0 ? "bold" : "500"}
                  onClick={(event) => {
                    setEstimateShow(!estimateShow);
                    setAnchorElEstimate(event.currentTarget);
                  }}
                >
                  {cardData?.estimateHour > 0
                    ? `Estimate: ${cardData?.estimateHour}h`
                    : `Estimate`}
                </Box>
                {PopOverForEstimate()}
              </div>
            ) : null}
          </div>
          {/* #TODO */}
          {cardData?.type !== "release" ?
            <div className={classes.flexBetweenCenter}>
              <IconButton
                onClick={(event) => setAnchorForAssignee(event.currentTarget)}
              >
                {updateAssignee ? (
                  <UserAvatar
                    className={classes.updateCardAvatar}
                    getAvatar={getAvatar}
                    getName={getName ?? "no"}
                    userId={updateAssignee}
                  />
                ) : (
                  <Avatar className={classes.updateCardAvatar} />
                )}
              </IconButton>
              {!logEnable ? (
                <IconButton onClick={handleUpdateTypeOfSize}>
                  {updateSizeOfProblem === 0 && (
                    <SVGRender
                      style={globalStyle.renderStyle}
                      img={images.tShirt}
                      alt={"small Icon"}
                    />
                  )}
                  {updateSizeOfProblem === 1 && (
                    <SVGRender
                      style={globalStyle.renderStyle}
                      img={images.smallIconForSize}
                      alt={"small Icon"}
                    />
                  )}
                  {updateSizeOfProblem === 2 && (
                    <SVGRender
                      style={globalStyle.renderStyle}
                      img={images.mediumIconForSize}
                      alt={"medium Icon"}
                    />
                  )}
                  {updateSizeOfProblem === 3 && (
                    <SVGRender
                      style={globalStyle.renderStyle}
                      img={images.largeIconForSize}
                      alt={"large Icon"}
                    />
                  )}
                </IconButton>
              ) : (
                <>
                  {/* for access time */}
                  <IconButton
                    onClick={(event) => {
                      handleTimeSheet();
                      setAnchorElTimeSheet(event.currentTarget);
                    }}
                  >
                    <AccessTime />
                  </IconButton>
                  {PopOverForTimeSheet()}
                </>
              )}
              {cardData?.type === "bug" && <AdbIcon style={{ color: "red" }} />}
              {cardData?.type === "feature" && (
                <StarIcon style={{ color: " #F0DD2E" }} />
              )}
              {cardData?.type === "chore" && <AssignmentTurnedInOutlinedIcon />}
              {cardData?.laneName && (
                <Button
                  style={{ height: "24px", marginLeft: "12px" }}
                  color="primary"
                  variant="contained"
                >
                  {cardData?.laneName}
                </Button>
              )}
            </div> : null}
        </div>
        {/* User Stories #TODO */}
        {cardData?.estimateHour > 0 ? (
          <Typography
            align="left"
            title="click to change"
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              lineHeight: " 27px",
              color: " #000000",
              maxWidth: "700px",
              marginBottom: "1rem",
            }}
            onClick={() => setOpenToChangeTheUserStories(true)}
          >
            Reported Time
            <Box display={"flex"}>
              <UserAvatar
                getAvatar={getAvatar}
                className={classes.updateCardAvatar}
                getName={getName}
                userId={user?.id}
              />
              <Typography
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  marginLeft: "10px",
                }}
              >
                <div>{getName(user?.id)}</div>
                <div>
                  {sum} of {cardData?.estimateHour}h
                </div>
              </Typography>
            </Box>
          </Typography>
        ) : null}
        {cardData?.label && cardData?.title && (
          <>
            <div>
              {!openToChangeTheUserStories ? (
                <Typography
                  align="left"
                  title="click to change"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    lineHeight: " 27px",
                    color: " #000000",
                    maxWidth: "700px",
                  }}
                  onClick={() => setOpenToChangeTheUserStories(true)}
                >
                  <span>{`As ${persona?.name}`}</span>
                  <br />
                  <span>{` I want to do the ${updateTitle ? updateTitle : cardData?.title
                    } process `}</span>
                  <br />
                  <span>{` so that I can ${updateLabel ? updateLabel : cardData?.label
                    }`}</span>
                  <br />
                </Typography>
              ) : (
                <div
                  className={classes.flexBetweenCenter}
                  style={{
                    textAlign: "left",
                    margin: "43px 4px",
                  }}
                >
                  {`As ${persona?.name} I want to do the `}
                  <div style={{ display: "inline" }}>
                    <Controller
                      name="title"
                      control={control}
                      defaultValue={cardData?.title}
                      rules={{
                        required: {
                          value: true,
                          message: "This is required",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size="small"
                          style={{ maxWidth: "146px" }}
                          variant="outlined"
                          type="text"
                        />
                      )}
                    />

                    <ErrorMessages errors={errors} name="title" />
                  </div>
                  {` process so that I can `}
                  <div style={{ display: "inline" }}>
                    <Controller
                      name="label"
                      control={control}
                      defaultValue={cardData?.label}
                      rules={{
                        required: {
                          value: true,
                          message: "This is required",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size="small"
                          style={{ maxWidth: "146px" }}
                          // label="processWhy*"
                          variant="outlined"
                          type="text"
                        />
                      )}
                    />
                    <ErrorMessages errors={errors} name="label" />
                  </div>
                  <div className={classes.shortIconForAcceptance}>
                    <Button
                      variant="contained"
                      onClick={() => setOpenToChangeTheUserStories(false)}
                    >
                      <CheckIcon />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {/* Acceptance Criteria */}
            <div className={classes.flexBetweenCenter}>
              <div>
                <Typography
                  style={{
                    color: "black",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Acceptance Criteria
                </Typography>
              </div>
              <IconButton onClick={() => setOpenForUpdate(true)}>
                <AddIcon />
              </IconButton>
            </div>
            <div>
              {openForUpdate && (
                <div style={{ display: "inline" }}>
                  {/* TODO */}
                  <QuillText
                    value={singleAcceptanceCriteria}
                    onChange={setSingleAcceptanceCriteria}
                  />

                  <ErrorMessages
                    style={{
                      display: "inline-block",
                    }}
                    errors={errors}
                    name="title"
                  />
                  {/* acceptance criteria buttons */}
                  <div className={classes.shortIconForAcceptance}>
                    <Button
                      variant="contained"
                      onClick={handleCheckAcceptanceCriteria}
                    >
                      <CheckIcon />
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setSingleAcceptanceCriteria(boarsdData.initialState);
                        setOpenForUpdate(false);
                      }}
                    >
                      <ClearIcon />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {openAcceptanceForUpdate && (
              <div style={{ display: "inline" }}>
                <QuillText
                  value={updateSingleAcceptanceCriteria}
                  onChange={setUpdateSingleAcceptanceCriteria}
                // defaultValue={`*Given*: Context\n*When*: Trigger\n*Then*: Action`}
                />

                <ErrorMessages
                  style={{
                    display: "inline-block",
                  }}
                  errors={errors}
                  name="title"
                />
                {/* acceptance criteria buttons */}
                <div className={classes.shortIconForAcceptance}>
                  <Button
                    variant="contained"
                    onClick={handleUpdateSingleAcceptanceForCard}
                  >
                    <CheckIcon />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setOpenAcceptanceForUpdate(false);
                      setSingleAcceptanceToUpdateCard({});
                    }}
                  >
                    <ClearIcon />
                  </Button>
                </div>
              </div>
            )}
            <div>
              {aceptanceCriteria &&
                aceptanceCriteria.map((item, index) => (
                  <div
                    style={{
                      display:
                        singleAcceptanceToUpdateCard.id === item.id
                          ? "none"
                          : "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      maxWidth: "700px",
                      margin: "5px 0px",
                    }}
                    key={index}
                  >
                    <Tooltip placement="top" title={`Click to Update`} arrow>
                      <div
                        className={classes.acceptanceCriteriaStyle}
                        dangerouslySetInnerHTML={{
                          __html: getSingleAcceptanceCriteria(
                            item?.description
                          ),
                        }}
                        onClick={() => handleUpdateSingleForUpdateCard(item)}
                      ></div>
                    </Tooltip>
                    <IconButton
                      onClick={() => {
                        if (item.id.length !== 9) {
                          store.dispatch(
                            deleteSingleAcceptanceCriteria(
                              user.projectId,
                              item.id
                            )
                          );
                        }
                        setAceptanceCriteria(
                          aceptanceCriteria.filter(
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
          </>
        )}
        {/* bugsLabel */}

        {cardData?.bugsLabel && (
          <div>
            {!openToChangeTheBugsLabel ? (
              <Typography
                align="left"
                title="click to change"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  lineHeight: " 27px",
                  color: " #000000",
                  maxWidth: "700px",
                }}
                onClick={() => setOpenToChangeTheBugsLabel(true)}
              >
                {updateBugsLabel ? updateBugsLabel : cardData?.bugsLabel}
              </Typography>
            ) : (
              <div className={classes.flexStartCenter}>
                <Controller
                  name="bugsLabel"
                  control={control}
                  defaultValue={cardData?.bugsLabel}
                  rules={{
                    required: {
                      value: true,
                      message: "This is required",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="medium"
                      fullWidth
                      label="Bugs Label*"
                      variant="outlined"
                      type="text"
                    />
                  )}
                />
                <ErrorMessages errors={errors} name="bugsLabel" />
                <div
                  style={{ marginLeft: "10px" }}
                  className={classes.shortIconForAcceptance}
                >
                  <Button
                    variant="contained"
                    onClick={() => setOpenToChangeTheBugsLabel(false)}
                  >
                    <CheckIcon />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* chores label */}
        {cardData?.choresLabel && (
          <div>
            {!openToChangeTheChoresLabel ? (
              <Typography
                align="left"
                title="click to change"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  lineHeight: " 27px",
                  color: " #000000",
                  maxWidth: "700px",
                }}
                onClick={() => setOpenToChangeTheChoresLabel(true)}
              >
                {updateChoresLabel ? updateChoresLabel : cardData?.choresLabel}
              </Typography>
            ) : (
              <div className={classes.flexStartCenter}>
                <Controller
                  name="choresLabel"
                  control={control}
                  defaultValue={cardData?.choresLabel}
                  rules={{
                    required: {
                      value: true,
                      message: "This is required",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="medium"
                      fullWidth
                      label="Chores Label*"
                      variant="outlined"
                      type="text"
                    />
                  )}
                />
                <ErrorMessages errors={errors} name="choresLabel" />
                <div
                  style={{ marginLeft: "10px" }}
                  className={classes.shortIconForAcceptance}
                >
                  <Button
                    variant="contained"
                    onClick={() => setOpenToChangeTheChoresLabel(false)}
                  >
                    <CheckIcon />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}


        {/* for description */}
        {cardData?.type === "chore" || cardData?.type === "bug" ? (
          <div>
            <Box display={"flex"} justifyContent="space-between">
              <Typography
                align="left"
                title="click to change"
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  lineHeight: " 27px",
                  color: " #000000",
                  maxWidth: "700px",
                }}
                onClick={() => {
                  setOpenDescription(true);
                }}
              >
                Description
              </Typography>
              {opendescription ? (
                <div style={{ cursor: "pointer" }}>
                  <ClearIcon onClick={() => setOpenDescription(false)} />
                </div>
              ) : null}
            </Box>

            <Box className={classes.flexStartCenter}>
              {!opendescription ? (
                <div
                  style={{ textAlign: "left" }}
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                  onClick={() => setOpenDescription(true)}
                ></div>
              ) : null}
              {opendescription ? (
                <>
                  <QuillText value={description} onChange={setDescription} />
                  ;
                  <ErrorMessages errors={errors} name="description" />
                </>
              ) : null}
            </Box>
          </div>
        ) : null}

        {/*TODO Link to Design */}
        {cardData?.type !== "release" ?
          <div className={classes.flexBetweenCenter}>
            <Typography
              style={{
                color: "black",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              Link to Design
            </Typography>
            {cardData?.linkToDesign ? (
              <IconButton onClick={() => setOnEditLinkToDesign(true)}>
                <EditIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => setOnEditLinkToDesign(true)}>
                <AddIcon />
              </IconButton>
            )}
          </div> : null}

        {onEditLinkToDesign ? (
          <div style={{ display: "inline" }}>
            <Controller
              name="linkToDesign"
              control={control}
              rules={{
                pattern: {
                  value:
                    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,
                  message: "wrong link",
                },
              }}
              defaultValue={cardData?.linkToDesign}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="medium"
                  fullWidth
                  variant="outlined"
                  label="Link to design*"
                  type="text"
                />
              )}
            />

            <ErrorMessages
              style={{
                display: "inline-block",
              }}
              errors={errors}
              name="linkToDesign"
            />
          </div>
        ) : (
          <Typography
            title="click to change the url"
            style={{
              color: "blue",
              fontWeight: "300",
              fontSize: "14px",
              textDecoration: "underline",
              wordBreak: "break-all",
              maxWidth: "770px",
              textAlign: "left",
            }}
          >
            <Link
              target="_blank"
              rel="noreferrer"
              href={cardData?.linkToDesign}
            >
              {cardData?.linkToDesign}
            </Link>
          </Typography>
        )}
        {/* Blockers */}
        {cardData?.type !== "release" ?
          <div className={classes.flexBetweenCenter}>
            <div>
              <Typography
                style={{
                  color: "black",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Blockers
              </Typography>
            </div>

            <IconButton onClick={() => setOpenBlockersSection(true)}>
              <AddIcon />
            </IconButton>
          </div> : null}

        <div className={classes.toBlockersUpdateStyle}>
          {openBlockersSection && (
            <Autocomplete
              multiple
              limitTags={5}
              defaultValue={updateBlockers.filter(
                (o1) =>
                  !boarsdData.appendedBlockers.some(
                    (o2) => o1.value === o2.value
                  )
              )}
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
                  setUpdateBlockers(updatedArray);
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
          )}
        </div>
        <div style={{ marginBottom: "4px" }}>
          {cardData?.blockers.length > 0 && (
            <BlockersTable
              style={globalStyle.renderStyle}
              getName={getName}
              getAvatar={getAvatar}
              particularCard={particularCard}
              persona={persona?.name}
              blockers={cardData?.blockers}
            />
          )}
        </div>
        {/* Attachments */}
        {cardData?.type !== "release" ?
          <div className={classes.flexBetweenCenter}>

            <div>
              <Typography
                style={{
                  color: "black",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Attachments
              </Typography>
            </div>
            <div className={classes.updateDropzone}>
              <IconButton
                onClick={() => setOpenAddAttachment(!openAddAttachment)}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div> : null}
        <Box>
          <Attachments
            updateFilesToSave={updateFilesToSave}
            setUpdateFilesToSave={setUpdateFilesToSave}
            projectId={user?.projectId}
            cardId={cardData?.id}
            organizationId={user?.projectId}
            AttachmentList={
              cardData?.attachmentList ? cardData?.attachmentList : []
            }
          />
        </Box>

        <Box marginBottom={"2rem"} marginTop={"1rem"}>
          {openAddAttachment && (
            <DropzoneArea
              showFileNames={false}
              showPreviewsInDropzone={true}
              maxFileSize={105000000}
              onChange={(files) => {
                setUpdateFilesToSave(files);
              }}
              acceptedFiles={[
                "image/*,application/pdf,.doc,.docx,.ppt,.xls,.xlsx,.zip,.csv,.tsv,.txt,.ppt,.pptx,.pages,.odt,.rtf",
                "video/*,.mp4,.mkv,.avi,.webm",
              ]}
              filesLimit={20}
              dropzoneText={
                <Box fontSize={16} style={{ height: "2rem" }}>
                  <p
                    className={classes.flexCenterCenter}
                    style={{
                      fontWeight: "500",
                      background: "white",
                    }}
                  >
                    <span>{<CloudUploadOutlined />}</span>
                    &nbsp; Drop files to attach, or &nbsp;
                    <span style={{ color: "blue" }}>browse</span>
                  </p>
                </Box>
              }
            />
          )}
        </Box>


        {/* here we will add our release card */}
        {cardData?.type === "release" ?
          <div style={{ marginBottom: "1rem" }}>
            {/* for release label */}
            <div>
              {!openChangeToReleaseName ? (
                <Typography
                  align="left"
                  title="click to change"
                  style={{
                    fontSize: "18px",
                    lineHeight: " 27px",
                    color: " #000000",
                    maxWidth: "700px",
                    marginTop: "-2rem"
                  }}
                  onClick={() => setOpenReleaseNameUpdate(true)}
                >
                  {updateReleaseName ? updateReleaseName : cardData?.releaseName}
                </Typography>
              ) : (
                <div className={classes.flexStartCenter}>
                  <Controller
                    name="releaseName"
                    control={control}
                    defaultValue={cardData?.releaseName}
                    rules={{
                      required: {
                        value: true,
                        message: "This is required",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="medium"
                        fullWidth
                        label="Release Name*"
                        variant="outlined"
                        type="text"
                      />
                    )}
                  />
                  <ErrorMessages errors={errors} name="bugsLabel" />
                  <div
                    style={{ marginLeft: "10px" }}
                    className={classes.shortIconForAcceptance}
                  >
                    <Button
                      variant="contained"
                      onClick={() => setOpenReleaseNameUpdate(false)}
                    >
                      <CheckIcon />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div>
              {!openChangeToGoal ? (
                <Typography
                  align="left"
                  title="click to change"
                  style={{
                    fontSize: "18px",
                    lineHeight: " 27px",
                    color: " #000000",
                    maxWidth: "700px",
                    marginBottom: "2rem"
                  }}
                  onClick={() => setOpenChangeToGoal(true)}
                >
                  <span style={{ marginRight: '1rem' }}>Goal:</span>
                  {updateReleaseGoal ? updateReleaseGoal : cardData?.goal}
                </Typography>
              ) : (
                <div className={classes.flexStartCenter}>
                  <Controller
                    name="goal"
                    control={control}
                    defaultValue={cardData?.goal}
                    rules={{
                      required: {
                        value: true,
                        message: "This is required",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="medium"
                        fullWidth
                        label="Release Goal"
                        variant="outlined"
                        type="text"
                      />
                    )}
                  />
                  <ErrorMessages errors={errors} name="bugsLabel" />
                  <div
                    style={{ marginLeft: "10px" }}
                    className={classes.shortIconForAcceptance}
                  >
                    <Button
                      variant="contained"
                      onClick={() => setOpenChangeToGoal(false)}
                    >
                      <CheckIcon />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {/* for release candidate */}
            <Box marginTop={"2rem"}>
              <Typography
                align="left"
                title="click to change"
                style={{
                  fontSize: "18px",
                  lineHeight: " 27px",
                  color: " #000000",
                  maxWidth: "700px",
                }}
                onClick={() => setOpenChangeToGoal(true)}
              >
                Release Candidate
              </Typography>
              <ReleaseCandidate cardId={cardData?.id} classes={classes}/>
            </Box>
          </div> : null}

        <div>
          <Typography
            style={{
              color: "black",
              fontWeight: "500",
              fontSize: "14px",
              textAlign: "left",
              marginBottom: "8px",
            }}
          >
            Notes
          </Typography>

          <Box display="flex" justifyContent="flex-start" mb="10px">
            <div>
              <UserAvatar
                getAvatar={getAvatar}
                style={{ marginRight: "8px" }}
                getName={getName}
                userId={user?.id}
              />
            </div>
            {openToComment ? (
              <div>
                <Grid
                  style={{
                    maxWidth: "672px",
                    borderRadius: "8px",
                  }}
                >
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
                        // "colorPicker",
                        "link",
                        // "embedded",
                        // "emoji",
                        "image",
                        // "remove",
                        "history",
                      ],
                    }}
                    mention={{
                      separator: " ",
                      trigger: "@",
                      suggestions: suggestions,
                    }}
                  />
                </Grid>
                <div style={{ textAlign: "left" }}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={saveComment}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    style={{ textAlign: "left", marginLeft: "10px" }}
                    variant="contained"
                    onClick={removeComment}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <TextField
                onClick={() => setOpenToComment(true)}
                style={{
                  maxWidth: "770px",
                  cursor: "pointer",
                }}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                label="Add a comment..."
              />
            )}
          </Box>
        </div>
        {savedDescription && (
          <ShowNotes
            savedDescription={savedDescription}
            SetSavedDescription={SetSavedDescription}
            getName={getName}
            setUpdatenotes={setUpdatenotes}
            setUpdateToNotes={setUpdateToNotes}
            getAvatar={getAvatar}
          />
        )}

        {updatenotes && renderUpdateNotes()}
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            aligntItems: "center",
            marginTop: "20px",
          }}
        >
          <Button
            style={{
              marginRight: "6px",
            }}
            onClick={handleUpdateCardClose}
            variant="contained"
            color="primary"
            type="button"
          >
            Close
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default UpdateBoardCard;
