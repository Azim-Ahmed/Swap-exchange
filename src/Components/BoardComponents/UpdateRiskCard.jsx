// import {
//   Box,
//   Button,
//   Grid,
//   IconButton,
//   Link,
//   TextField,
//   Typography,
//   TextareaAutosize,
//   Tooltip,
//   Avatar,
//   FormControl,
//   InputLabel,
//   OutlinedInput,
//   InputAdornment,
// } from "@material-ui/core";
// import {
//   ErrorMessages,
//   SVGRender,
//   Modal,
//   UserAvatar,
//   RIconButton,
//   DraftEditor,
//   QuillText,
// } from "Components/Reusable";
// import {
//   Attachments,
//   ShowNotes,
//   DropzoneSection,
//   PopoverForSeverity,
//   PopoverForLikelihood,
// } from "Components/BoardComponents";
// import { useState } from "react";
// import { format } from "date-fns";
// import { riskAndIssuesData } from "assets/Data/RiskAndIssue";
// import {
//   Check as CheckIcon,
//   Warning,
//   Clear as ClearIcon,
//   Add as AddIcon,
//   DeleteOutline as DeleteOutlineIcon,
// } from "@material-ui/icons";
// import { globalStyle } from "assets/Styles/GlobalStyle";
// import { images } from "assets";
// import { Controller } from "react-hook-form";
// /**
//  *@function UpdateRiskCard.jsx
//  *@author Azim
//  *
//  **/

// const UpdateRiskCard = ({
//   modalOpen,
//   handleUpdateCardClose,
//   handleUpdateSubmit,
//   onUpdateSubmit,
//   classes,
//   handleUpdateAssesmentSeverity,
//   currentLikeliHood,
//   handleUpdateAssesmentLikelyHood,
//   updateSizeOfProblem,
//   cardData,
//   assesments,
//   handleUpdateTypeOfCard,
//   openToChangeTheTitle,
//   setOpenToChangeTheTitle,
//   updateTitle,
//   control,
//   errors,
//   updateDescription,
//   updateDescriptionState,
//   setUpdateDescription,
//   setUpdateDescriptionState,
//   handleAddUpdateEvidenceLink,
//   updateEvidenceLinks,
//   handleUpdateEvidenceLink,
//   handleRemoveCreatedUpdateEvidence,
//   updateEvidences,
// }) => {
//   const [anchorForAssignee, setAnchorForAssignee] = useState(null);
//   const [anchorSeverityChange, setAnchorSeverityChange] = useState(null);
//   const [anchorLikelihoodChange, setAnchorLikelihoodChange] = useState(null);
//   const openSeverity = Boolean(anchorSeverityChange);
//   const openLikeLihood = Boolean(anchorLikelihoodChange);
//   return (
//     <Modal open={modalOpen} board handleClose={handleUpdateCardClose}>
//       <Box minWidth="700px" maxWidth="700px" mt="21px">
//         <form
//           noValidate
//           autoComplete="off"
//           onSubmit={handleUpdateSubmit(onUpdateSubmit)}
//         >
//           <PopoverForSeverity
//             openSeverity={openSeverity}
//             anchorSeverityChange={anchorSeverityChange}
//             setAnchorSeverityChange={setAnchorSeverityChange}
//             className={classes.assesmentPopOverStyle}
//             handleUpdateAssesmentSeverity={handleUpdateAssesmentSeverity}
//           />
//           <PopoverForLikelihood
//             openLikeLihood={openLikeLihood}
//             anchorLikelihoodChange={anchorLikelihoodChange}
//             setAnchorLikelihoodChange={setAnchorLikelihoodChange}
//             className={classes.assesmentPopOverStyle}
//             currentLikeliHood={currentLikeliHood}
//             handleUpdateAssesmentLikelyHood={handleUpdateAssesmentLikelyHood}
//           />
//           {/* {PopoverForNewAssignee()} */}
//           <Box className={classes.flexBasisBetweenForHeaderCard}>
//             <Box className={classes.flexBasisBetween}>
//               <Tooltip
//                 placement="top"
//                 title={`${
//                   updateSizeOfProblem === 0
//                     ? "risk created date"
//                     : "issue created date"
//                 }`}
//                 arrow
//               >
//                 <p>
//                   {cardData?.createDate &&
//                     format(new Date(cardData?.createDate), "dd-MM-yyyy")}
//                 </p>
//               </Tooltip>
//             </Box>
//             <Box className={classes.flexBetweenCenter}>
//               <Tooltip
//                 placement="top"
//                 title={`${
//                   riskAndIssuesData.getColors(assesments)?.color
//                     ? riskAndIssuesData.getColors(assesments)?.title
//                     : "severity or likelihood"
//                 }`}
//                 arrow
//               >
//                 <Box
//                   width={`25px`}
//                   height={`25px`}
//                   borderRadius="50%"
//                   style={{
//                     background: riskAndIssuesData.getColors(assesments)?.color,
//                   }}
//                 ></Box>
//               </Tooltip>
//               <Tooltip
//                 placement="top"
//                 title={`${updateSizeOfProblem === 0 ? "risk" : "issue"}`}
//                 arrow
//               >
//                 <IconButton onClick={handleUpdateTypeOfCard}>
//                   {updateSizeOfProblem === 0 && (
//                     <Warning
//                       style={{
//                         color: " #FFDD15",
//                         stroke: "black",
//                         height: "16px",
//                         ...globalStyle.renderStyle,
//                       }}
//                       color="warning"
//                     />
//                   )}
//                   {updateSizeOfProblem === 1 && (
//                     <SVGRender
//                       style={{ ...globalStyle.renderStyle }}
//                       img={images.risk_}
//                       alt={"small Icon"}
//                     />
//                   )}
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           </Box>
//           {cardData?.title && (
//             <Box style={{ textAlign: "left" }}>
//               {!openToChangeTheTitle ? (
//                 <Tooltip
//                   arrow
//                   title="click to change the title"
//                   placement="top"
//                 >
//                   <Typography
//                     align="left"
//                     className={classes.updateTitle}
//                     onClick={() => setOpenToChangeTheTitle(true)}
//                   >
//                     {updateTitle ? updateTitle : cardData?.title}
//                   </Typography>
//                 </Tooltip>
//               ) : (
//                 <Box className={classes.flexStartCenter}>
//                   <Controller
//                     name="title"
//                     control={control}
//                     rules={{
//                       required: {
//                         value: true,
//                         message: "This is required",
//                       },
//                     }}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         size="medium"
//                         fullWidth
//                         label="Title *"
//                         variant="outlined"
//                         type="text"
//                       />
//                     )}
//                   />
//                   <ErrorMessages errors={errors} name="title" />
//                   <Box
//                     marginLeft="10px"
//                     className={classes.shortIconForAcceptance}
//                   >
//                     <Button
//                       variant="contained"
//                       onClick={() => setOpenToChangeTheTitle(false)}
//                     >
//                       <CheckIcon />
//                     </Button>
//                   </Box>
//                 </Box>
//               )}
//             </Box>
//           )}
//           <Box maxWidth="770px" textAlign="left" marginTop="30px">
//             <Typography className={classes.textForBoldEveryUpdateCardSection}>
//               Description
//             </Typography>
//             {updateDescription || !cardData?.description ? (
//               <Box
//                 display={"flex"}
//                 justifyContent={"space-between"}
//                 marginTop={"1rem"}
//                 marginBottom={"3rem"}
//                 mt="20px"
//               >
//                 <QuillText
//                   value={updateDescriptionState}
//                   onChange={setUpdateDescriptionState}
//                 />
//               </Box>
//             ) : (
//               // <Controller
//               //   name="description"
//               //   control={control}
//               //   render={({ field }) => (
//               //     <TextareaAutosize
//               //       {...field}
//               //       minRows={3}
//               //       className={classes.textareaStyle}
//               //       placeholder="Description"
//               //       style={{ width: "100%", borderColor: "#c6c0c0" }}
//               //     />
//               //   )}
//               // />
//               <Tooltip
//                 arrow
//                 title="click to change description"
//                 placement="top"
//               >
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: cardData?.description,
//                   }}
//                   onClick={() => {
//                     setUpdateDescription(true);
//                     setUpdateDescriptionState(cardData?.description);
//                   }}
//                 >
//                   {/* {cardData?.description} */}
//                 </div>
//               </Tooltip>
//             )}
//           </Box>
//           <Box maxWidth="770px" textAlign="left" marginTop="30px">
//             <Typography className={classes.textForBoldEveryUpdateCardSection}>
//               Evidence (links)
//             </Typography>
//             <FormControl
//               style={{ marginTop: "8px", maxWidth: "770px" }}
//               disabled
//               fullWidth
//               variant="outlined"
//             >
//               <InputLabel htmlFor="outlined-adornment-password">
//                 Evidence (Links)
//               </InputLabel>
//               <OutlinedInput
//                 id="outlined-adornment-password"
//                 type={"text"}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <Tooltip
//                       placement="top"
//                       arrow
//                       title="click to add new evidence link"
//                     >
//                       <IconButton
//                         style={{
//                           marginLeft: "-34px",
//                           padding: 0,
//                         }}
//                         aria-label="toggle password visibility"
//                         onClick={handleAddUpdateEvidenceLink}
//                         edge="end"
//                       >
//                         <AddIcon className={classes.addIconBig} />
//                       </IconButton>
//                     </Tooltip>
//                   </InputAdornment>
//                 }
//               />
//             </FormControl>
//             {updateEvidenceLinks.map((item, index) => (
//               <FormControl
//                 style={{ marginTop: "16px", maxWidth: "770px" }}
//                 key={index}
//                 fullWidth
//                 variant="outlined"
//               >
//                 <InputLabel htmlFor="outlined-adornment-password">
//                   Evidence (Links)
//                 </InputLabel>

//                 <OutlinedInput
//                   onChange={(e) => handleUpdateEvidenceLink(e, item)}
//                   id="outlined-adornment-password"
//                   type={"text"}
//                   defaultValue={item.link}
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={() => handleRemoveCreatedUpdateEvidence(item)}
//                         edge="end"
//                       >
//                         <ClearIcon />
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                   labelWidth={113}
//                 />
//               </FormControl>
//             ))}
//             {updateEvidences.length > 0 &&
//               updateEvidences.map((item, index) => (
//                 <Box
//                   display={`flex`}
//                   justifyContent="space-between"
//                   alignItems={`center`}
//                   mb="8px"
//                 >
//                   <p key={index}>
//                     <Link target="_blank" rel="noreferrer" href={item?.link}>
//                       {item?.link}
//                     </Link>
//                   </p>
//                   <RIconButton
//                     onClick={() => {
//                       setUpdateEvidences(
//                         updateEvidences.filter((items) => items.id !== item.id)
//                       );
//                     }}
//                     title="delete this evidence link"
//                   >
//                     <DeleteOutlineIcon style={{ color: "#FF0000" }} />
//                   </RIconButton>
//                 </Box>
//               ))}
//           </Box>
//           <Box mt="30px" className={classes.flexBetweenCenter}>
//             <Box>
//               <Typography className={classes.textForBoldEveryUpdateCardSection}>
//                 Evidence{" "}
//                 {attachments.length === 0 ? (
//                   ""
//                 ) : (
//                   <span>{`(${attachments.length})`}</span>
//                 )}
//               </Typography>
//             </Box>
//             <Box className={classes.updateDropzone}>
//               <DropzoneSection
//                 showFileNames={true}
//                 showPreviewsInDropzone={false}
//                 setUpdateFilesToSave={setUpdateFilesToSave}
//                 updateFilesToSave={updateFilesToSave}
//               />
//             </Box>
//           </Box>
//           {(attachments.length > 0 || updateFilesToSave.length > 0) && (
//             <Attachments
//               updateFilesToSave={updateFilesToSave}
//               setUpdateFilesToSave={setUpdateFilesToSave}
//               projectId={user?.projectId}
//               cardId={cardData?.id}
//               organizationId={user?.projectId}
//               AttachmentList={attachments}
//             />
//           )}
//           <Box
//             maxWidth="770px"
//             display={`flex`}
//             justifyContent="center"
//             alignItems={`center`}
//             mt="30px"
//           >
//             <Typography className={classes.textForBoldEveryUpdateCardSection}>
//               Assessment
//             </Typography>
//           </Box>
//           <Box display={`flex`} justifyContent="right" gridGap={`80px`}>
//             <p>Severity</p>
//             <p>Likelihood</p>
//           </Box>
//           {assesments &&
//             assesments.map((item, index) => (
//               <Grid
//                 key={index}
//                 container
//                 style={{ maxWidth: "770px" }}
//                 spacing={2}
//               >
//                 <Grid item sm={8}>
//                   <Controller
//                     name={item.name}
//                     control={control}
//                     defaultValue={item.value}
//                     render={({ field }) => (
//                       <TextareaAutosize
//                         {...field}
//                         minRows={2}
//                         className={classes.textareaStyleForAssesment}
//                         placeholder={item.placeholder}
//                         style={{ width: "100%", borderColor: "#c6c0c0" }}
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid item sm={2}>
//                   <Button
//                     onClick={(event) => handleSeverityChange(event, item)}
//                     style={{
//                       textDecoration: "underline",
//                       color: item?.color,
//                     }}
//                   >
//                     {item?.severity}
//                   </Button>
//                 </Grid>
//                 <Grid item sm={2}>
//                   <Button
//                     onClick={(event) => handleLikelihoodChange(event, item)}
//                     style={{
//                       textDecoration: "underline",
//                       color: item?.Asscolor,
//                     }}
//                   >
//                     {item?.likelihood}
//                   </Button>
//                 </Grid>{" "}
//               </Grid>
//             ))}

//           <Box
//             maxWidth="770px"
//             display={`flex`}
//             justifyContent="center"
//             alignItems={`center`}
//             mt="30px"
//           >
//             <Typography className={classes.textForBoldEveryUpdateCardSection}>
//               Treatment
//             </Typography>
//           </Box>
//           <Box display={`flex`} justifyContent="right" gridGap={`80px`}>
//             <Tooltip placement="top" arrow title="click to add new task">
//               <Button
//                 onClick={handleAddNewTaskForTheRiskAndIssue}
//                 style={{ color: "#1F69D7", textDecoration: "underline" }}
//               >
//                 Add more
//               </Button>
//             </Tooltip>
//           </Box>
//           <Box maxWidth={`770px`}>
//             {addCardsToIceBoxInTheBoard &&
//               addCardsToIceBoxInTheBoard.map((items, index) => (
//                 <Box
//                   key={index}
//                   mt="8px"
//                   display={`flex`}
//                   justifyContent="space-between"
//                   alignItems={`center`}
//                 >
//                   <TextareaAutosize
//                     onChange={(e) => handleAddTaskforIcebox(e, items)}
//                     minRows={3}
//                     className={classes.textareaStyleForAssesment}
//                     placeholder="Task"
//                     style={{
//                       width: "400px",
//                       marginLeft: "6px",
//                       marginRight: "40px",
//                     }}
//                     defaultValue={items?.title}
//                   />
//                   <Box style={{ marginLeft: "-20px" }} className="dateStyle">
//                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                       <DatePicker
//                         title={`Click to change date`}
//                         disableToolbar
//                         className={classes.muiDatePicker}
//                         format="dd-MM-yyyy"
//                         placeholder={`Due date`}
//                         value={items.dueDate}
//                         // onChange={(date) =>
//                         //   handleAddDueDateForIceBoxCard(date, items)
//                         // }
//                         onChange={(date) => {
//                           setUpdateSelectedDate(date);
//                           handleAddDueDateForIceBoxCard(date, items);
//                         }}
//                       />
//                     </MuiPickersUtilsProvider>
//                   </Box>
//                   <Box ml="10px">
//                     <IconButton
//                       onClick={(event) =>
//                         handleChoresTreatmentForBoardAndParticularCard(
//                           event,
//                           items
//                         )
//                       }
//                     >
//                       {items?.userId ? (
//                         <UserAvatar
//                           className={classes.updateCardAvatar}
//                           getAvatar={getAvatar}
//                           getName={getName ?? "no"}
//                           userId={items?.userId}
//                         />
//                       ) : (
//                         <Avatar className={classes.updateCardAvatar} />
//                       )}
//                     </IconButton>
//                   </Box>
//                   <Box ml="10px">
//                     <RIconButton
//                       placement="top"
//                       title="click to delete the task"
//                       color="#777777"
//                       onClick={() => {
//                         setAddCardsToIceBoxInTheBoard(
//                           addCardsToIceBoxInTheBoard.filter(
//                             (item) => item.id !== items.id
//                           )
//                         );
//                       }}
//                     >
//                       <ClearIcon />
//                     </RIconButton>
//                     {/* <IconButton
//                       onClick={() => {
//                         setAddCardsToIceBoxInTheBoard(
//                           addCardsToIceBoxInTheBoard.filter(
//                             (item) => item.id !== items.id
//                           )
//                         );
//                       }}
//                     >
//                       <ClearIcon />
//                     </IconButton> */}
//                   </Box>
//                 </Box>
//               ))}
//             {treatments.length > 0 &&
//               treatments.map((items, index) => (
//                 <Box
//                   key={index}
//                   mt="8px"
//                   display={`flex`}
//                   justifyContent="space-between"
//                   alignItems={`center`}
//                 >
//                   <TextareaAutosize
//                     disabled
//                     onChange={(e) => handleAddTaskforIcebox(e, items)}
//                     minRows={3}
//                     className={classes.textareaStyleForAssesment}
//                     placeholder="Task"
//                     style={{ width: "100%", marginRight: "20px" }}
//                     defaultValue={items?.choresLabel}
//                   />

//                   {items?.dueDate && (
//                     <Tooltip
//                       title="this card created date"
//                       arrow
//                       placement="top"
//                     >
//                       <Box width={150}>
//                         {format(new Date(items?.dueDate), "dd-MM-yyyy")}{" "}
//                       </Box>
//                     </Tooltip>
//                   )}

//                   <Box ml="10px">
//                     {items?.userId ? (
//                       <UserAvatar
//                         className={classes.updateCardAvatar}
//                         getAvatar={getAvatar}
//                         getName={getName ?? "no"}
//                         userId={items?.userId}
//                       />
//                     ) : (
//                       <Tooltip title={"Not Assigned"} arrow>
//                         <Avatar className={classes.updateCardAvatar} />
//                       </Tooltip>
//                     )}
//                   </Box>
//                   <Tooltip
//                     title={
//                       items?.columnName ? items?.columnName : "current lane"
//                     }
//                     arrow
//                     placement="top"
//                   >
//                     <Box className={classes.ColumnName} ml="10px">
//                       {items?.laneName ? items?.laneName : "ICE BOX"}
//                     </Box>
//                   </Tooltip>
//                 </Box>
//               ))}
//           </Box>
//           <Box>
//             <Box mb="15px" mt="30px">
//               <Typography className={classes.textForBoldEveryUpdateCardSection}>
//                 Notes
//               </Typography>
//             </Box>

//             <Box display="flex" justifyContent="flex-start" mb="10px">
//               <Box>
//                 <UserAvatar
//                   getAvatar={getAvatar}
//                   style={{ marginRight: "8px" }}
//                   getName={getName}
//                   userId={user?.id}
//                 />
//               </Box>
//               {openToComment ? (
//                 <Box>
//                   <Grid
//                     style={{
//                       maxWidth: "672px",
//                       borderRadius: "8px",
//                     }}
//                   >
//                     <DraftEditor
//                       editorState={editorState}
//                       onEditorStateChange={onEditorStateChange}
//                       suggestions={suggestions}
//                     />
//                   </Grid>
//                   <Box style={{ textAlign: "left" }}>
//                     <Button
//                       color="primary"
//                       variant="contained"
//                       size="small"
//                       onClick={saveComment}
//                     >
//                       Save
//                     </Button>

//                     <Button
//                       size="small"
//                       style={{ textAlign: "left", marginLeft: "10px" }}
//                       variant="contained"
//                       onClick={removeComment}
//                     >
//                       Cancel
//                     </Button>
//                   </Box>
//                 </Box>
//               ) : (
//                 <TextField
//                   onClick={() => setOpenToComment(true)}
//                   style={{
//                     maxWidth: "770px",
//                     cursor: "pointer",
//                   }}
//                   fullWidth
//                   variant="outlined"
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                   label="Add a comment..."
//                 />
//               )}
//             </Box>
//           </Box>
//           {savedDescription && (
//             <ShowNotes
//               savedDescription={savedDescription}
//               SetSavedDescription={SetSavedDescription}
//               getName={getName}
//               setUpdatenotes={setUpdatenotes}
//               setUpdateToNotes={setUpdateToNotes}
//               getAvatar={getAvatar}
//             />
//           )}
//           {updatenotes && renderUpdateNotes()}
//           <Box
//             display="flex"
//             justifyContent="right"
//             marginTop="30px"
//             paddingBottom="20px"
//           >
//             <Button
//               className={classes.submitAndCloseButton}
//               style={{
//                 marginRight: "10px",
//                 background: "#F5F5F5",
//               }}
//               onClick={handleUpdateCardClose}
//               variant="outlined"
//               type="button"
//               color="secondary"
//             >
//               Close
//             </Button>
//             <Button
//               className={classes.submitAndCloseButton}
//               color="primary"
//               variant="contained"
//               type="submit"
//             >
//               Submit
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default UpdateRiskCard;
