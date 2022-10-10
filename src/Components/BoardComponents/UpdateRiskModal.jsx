import {
  Box,
  IconButton,
  TextareaAutosize,
  Button,
  Tooltip,
  Grid,
  TextField,
  Avatar,
  Typography,
  Link,
} from "@material-ui/core";
import {
  Warning as WarningIcon,
  Clear as ClearIcon,
  Check as CheckIcon,
} from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { images } from "assets";
import {
  SVGRender,
  UserAvatar,
  RIconButton,
  ErrorMessages,
} from "Components/Reusable";
import { format } from "date-fns";
import { Editor } from "draft-js";
import { Controller } from "react-hook-form";
import { Attachments, DropzoneSection, ShowNotes } from ".";
/**
 *@function UpdateRiskModal.jsx
 *@author Azim
 *
 **/
const UpdateRiskModal = ({
  handleUpdateSubmit,
  onUpdateSubmit,
  classes,
  PopoverForSeverity,
  PopoverForLikelihood,
  PopoverForNewAssignee,
  handleChangeTypeOfSize,
  sizeOfProblem,
  riskAndIssuesData,
  setOpenToComment,
  handleAddTaskforIcebox,
  cardData,
  handleAddEvidenceLink,
  handleUpdateCardClose,
  evidenceLinks,
  handleAddSelectedEvidenceLink,
  setFilesToSave,
  assesments,
  saveComment,
  removeComment,
  updateSizeOfProblem,
  handleUpdateTypeOfCard,
  openToChangeTheTitle,
  setOpenToChangeTheTitle,
  updateTitle,
  errors,
  control,
  updatenotes,
  renderUpdateNotes,
  savedDescription,
  editorState,
  SetSavedDescription,
  suggestions,
  onEditorStateChange,
  getName,
  setUpdatenotes,
  setUpdateToNotes,
  getAvatar,
  openToComment,
  setAddCardsToIceBoxInTheBoard,
  addCardsToIceBoxInTheBoard,
  user,
  handleChoresTreatmentForBoardAndParticularCard,
  handleAddDueDateForIceBoxCard,
  updateSelectedDate,
  handleAddNewTaskForTheRiskAndIssue,
  handleLikelihoodChange,
  handleSeverityChange,
  updateDescription,
  setUpdateDescription,
  onEditLinkToDesign,
  attachments,
  setUpdateFilesToSave,
  updateFilesToSave,
}) => {
  const renderStyle = { height: "24px", width: "24px" };

  return (
    <Box minWidth="700px" mt="21px">
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleUpdateSubmit(onUpdateSubmit)}
      >
        {PopoverForSeverity()}
        {PopoverForLikelihood()}
        {PopoverForNewAssignee()}
        <Box className={classes.flexBasisBetweenForHeaderCard}>
          <Box className={classes.flexBasisBetween}>
            <Tooltip
              placement="top"
              title={`${cardData?.type} created date`}
              arrow
            >
              <p>
                {cardData?.createDate &&
                  format(new Date(cardData?.createDate), "dd-MM-yyyy")}
              </p>
            </Tooltip>
          </Box>
          <Box className={classes.flexBetweenCenter}>
            <Tooltip
              placement="top"
              title={`${
                riskAndIssuesData.getColors(assesments)?.color
                  ? riskAndIssuesData.getColors(assesments)?.title
                  : "severity or likelihood"
              }`}
              arrow
            >
              <Box
                width={`25px`}
                height={`25px`}
                borderRadius="50%"
                style={{
                  background: riskAndIssuesData.getColors(assesments)?.color,
                }}
              ></Box>
            </Tooltip>
            <Tooltip
              placement="top"
              title={`${updateSizeOfProblem === 0 ? "risk" : "issue"}`}
              arrow
            >
              <IconButton onClick={handleUpdateTypeOfCard}>
                {updateSizeOfProblem === 0 && (
                  <WarningIcon
                    style={{
                      color: " #FFDD15",
                      stroke: "black",
                      height: "16px",
                      ...renderStyle,
                    }}
                    color="warning"
                  />
                )}
                {updateSizeOfProblem === 1 && (
                  <SVGRender
                    style={{ ...renderStyle }}
                    img={images.risk_}
                    alt={"small Icon"}
                  />
                )}
              </IconButton>
            </Tooltip>

            {cardData?.laneName && (
              <Button
                style={{ height: "24px", marginLeft: "12px" }}
                color="primary"
                variant="contained"
              >
                {cardData?.laneName}
              </Button>
            )}
          </Box>
        </Box>
        {cardData?.title && (
          <Box style={{ textAlign: "left" }}>
            {!openToChangeTheTitle ? (
              <Tooltip arrow title="click to change" placement="top">
                <Typography
                  align="left"
                  className={classes.updateTitle}
                  onClick={() => setOpenToChangeTheTitle(true)}
                >
                  {updateTitle ? updateTitle : cardData?.title}
                </Typography>
              </Tooltip>
            ) : (
              <Box className={classes.flexStartCenter}>
                <Controller
                  name="title"
                  control={control}
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
                      label="Title *"
                      variant="outlined"
                      type="text"
                    />
                  )}
                />
                <ErrorMessages errors={errors} name="title" />
                <Box
                  style={{ marginLeft: "10px" }}
                  className={classes.shortIconForAcceptance}
                >
                  <Button
                    variant="contained"
                    onClick={() => setOpenToChangeTheTitle(false)}
                  >
                    <CheckIcon />
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}
        <Box style={{ maxWidth: "770px", textAlign: "left" }}>
          <p style={{ fontWeight: "700" }}>Description</p>
          {updateDescription || !cardData?.description ? (
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextareaAutosize
                  {...field}
                  minRows={3}
                  className={classes.textareaStyle}
                  placeholder="Description"
                  style={{ width: "100%" }}
                />
              )}
            />
          ) : (
            <Tooltip arrow title="click to change description" placement="top">
              <p onClick={() => setUpdateDescription(true)}>
                {cardData?.description}
              </p>
            </Tooltip>
          )}
        </Box>
        <Box style={{ maxWidth: "770px", textAlign: "left" }}>
          <p
            style={{
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
            }}
          >
            Evidence (links)
            <RIconButton
              title="click to edit the evidence"
              onClick={() => console.log("axim")}
              color="#777777"
            />
          </p>
          {cardData?.evidenceLinks.map((item, index) => (
            <p key={item.id}>
              <a style={{ color: "#1F69D7" }} href={item.link}>{`Evidence-${
                index + 1
              }`}</a>
            </p>
          ))}
        </Box>

        {onEditLinkToDesign ? (
          <Box style={{ display: "inline" }}>
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
          </Box>
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

        {/* <Box className={classes.flexBetweenCenter}>
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
      </Box> */}
        <Box className={classes.flexBetweenCenter}>
          <Box>
            <Typography
              style={{
                color: "black",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              Evidence
              {attachments.length === 0 ? (
                ""
              ) : (
                <span>{`(${attachments.length})`}</span>
              )}
            </Typography>
          </Box>
          <Box className={classes.updateDropzone}>
            <DropzoneSection
              showFileNames={true}
              showPreviewsInDropzone={false}
              setUpdateFilesToSave={setUpdateFilesToSave}
              updateFilesToSave={updateFilesToSave}
            />
            {/* <DropzoneArea
            showPreviewsInDropzone={false}
            showPreviews={false}
            maxFileSize={105000000}
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
              <RIconButton title="click to add file" color="#777777">
                <AddIcon />
              </RIconButton>
            }
          /> */}
          </Box>
        </Box>
        {console.log({ attachments })}
        {attachments.length > 0 && (
          <Attachments
            updateFilesToSave={updateFilesToSave}
            setUpdateFilesToSave={setUpdateFilesToSave}
            projectId={user?.projectId}
            cardId={cardData?.id}
            organizationId={user?.projectId}
            AttachmentList={attachments ? attachments : []}
            // AttachmentList={
            //   cardData?.attachmentList ? cardData?.attachmentList : []
            // }
          />
        )}
        {/* <Attachments
        updateFilesToSave={updateFilesToSave}
        setUpdateFilesToSave={setUpdateFilesToSave}
        projectId={user?.projectId}
        cardId={cardData?.id}
        organizationId={user?.projectId}
        AttachmentList={attachments ? attachments : []}
        // AttachmentList={
        //   cardData?.attachmentList ? cardData?.attachmentList : []
        // }
      /> */}
        <Box style={{ maxWidth: "770px", textAlign: "center" }}>
          <p
            style={{
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Assessment
          </p>
        </Box>
        <Box display={`flex`} justifyContent="right" gridGap={`80px`}>
          <p>Severity</p>
          <p>Likelihood</p>
        </Box>
        {assesments &&
          assesments.map((item, index) => (
            <Grid
              key={index}
              container
              style={{ maxWidth: "770px" }}
              spacing={2}
            >
              <Grid item sm={8}>
                <Controller
                  name={item.name}
                  control={control}
                  defaultValue={item.value}
                  render={({ field }) => (
                    <TextareaAutosize
                      {...field}
                      minRows={2}
                      className={classes.textareaStyleForAssesment}
                      placeholder={item.placeholder}
                      style={{ width: "100%" }}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={2}>
                <Button
                  onClick={(event) => handleSeverityChange(event, item)}
                  style={{
                    textDecoration: "underline",
                    color: item?.severity?.color,
                  }}
                >
                  {item?.severity}
                </Button>
              </Grid>
              <Grid item sm={2}>
                <Button
                  onClick={(event) => handleLikelihoodChange(event, item)}
                  style={{
                    textDecoration: "underline",
                    color: item?.likelihood?.color,
                  }}
                >
                  {item?.likelihood}
                </Button>
              </Grid>{" "}
            </Grid>
          ))}
        {/* <Box>
        <Skeleton variant="rect" width={710} height={118} />
      </Box> */}
        <Box style={{ maxWidth: "770px", textAlign: "center" }}>
          <p
            style={{
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Treatment
          </p>
        </Box>
        <Box display={`flex`} justifyContent="right" gridGap={`80px`}>
          <Button
            onClick={handleAddNewTaskForTheRiskAndIssue}
            style={{ color: "#1F69D7" }}
          >
            Add more
          </Button>
        </Box>
        <Box maxWidth={`770px`}>
          {addCardsToIceBoxInTheBoard &&
            addCardsToIceBoxInTheBoard.map((items, index) => (
              <Box
                key={index}
                mt="8px"
                display={`flex`}
                justifyContent="space-between"
                alignItems={`center`}
              >
                <TextareaAutosize
                  onChange={(e) => handleAddTaskforIcebox(e, items)}
                  minRows={3}
                  className={classes.textareaStyleForAssesment}
                  placeholder="Task"
                  style={{ width: "100%" }}
                  defaultValue={items?.title}
                />
                <Box className="dateStyle">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      title={`Click to change date`}
                      disableToolbar
                      className={classes.muiDatePicker}
                      format="dd-MM-yyyy"
                      placeholder={`Due date`}
                      value={updateSelectedDate}
                      onChange={(date) =>
                        handleAddDueDateForIceBoxCard(date, items)
                      }
                      // onChange={(date) => {
                      //   setUpdateSelectedDate(date);
                      //   handleAddDueDateForIceBoxCard(date, items);
                      // }}
                    />
                  </MuiPickersUtilsProvider>
                </Box>
                <Box ml="10px">
                  <IconButton
                    onClick={(event) =>
                      handleChoresTreatmentForBoardAndParticularCard(
                        event,
                        items
                      )
                    }
                  >
                    {items?.userId ? (
                      <UserAvatar
                        className={classes.updateCardAvatar}
                        getAvatar={getAvatar}
                        getName={getName ?? "no"}
                        userId={items?.userId}
                      />
                    ) : (
                      <Avatar className={classes.updateCardAvatar} />
                    )}
                  </IconButton>
                </Box>
                <Box ml="10px">
                  <RIconButton
                    placement="top"
                    title="click to delete the task"
                    color="#777777"
                    onClick={() => {
                      setAddCardsToIceBoxInTheBoard(
                        addCardsToIceBoxInTheBoard.filter(
                          (item) => item.id !== items.id
                        )
                      );
                    }}
                  >
                    <ClearIcon />
                  </RIconButton>
                  {/* <IconButton
                  onClick={() => {
                    setAddCardsToIceBoxInTheBoard(
                      addCardsToIceBoxInTheBoard.filter(
                        (item) => item.id !== items.id
                      )
                    );
                  }}
                >
                  <ClearIcon />
                </IconButton> */}
                </Box>
              </Box>
            ))}
        </Box>
        <Box>
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
            <Box>
              <UserAvatar
                getAvatar={getAvatar}
                style={{ marginRight: "8px" }}
                getName={getName}
                userId={user?.id}
              />
            </Box>
            {openToComment ? (
              <Box>
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
                </Grid>
                <Box style={{ textAlign: "left" }}>
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
                </Box>
              </Box>
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
        </Box>
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
        <Box
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
        </Box>
      </form>
    </Box>
  );
};

export default UpdateRiskModal;
