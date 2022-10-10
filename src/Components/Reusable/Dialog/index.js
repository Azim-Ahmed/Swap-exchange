// import React, { Fragment } from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import { Close as CloseIcon } from '@material-ui/icons';
// import { Typography, IconButton, DialogContent as MuiDialogContent, DialogTitle as MuiDialogTitle, Dialog, Button } from '@material-ui/core';
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from 'react-redux';
// import { updatePassword, updateProfileName, updateProject } from 'redux/actions';
// import {
//     HookFormTextField,
// } from "Components/Reusable";;

// const styles = (theme) => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(2),
//     },
//     closeButton: {
//         position: 'absolute',
//         right: theme.spacing(1),
//         top: theme.spacing(1),
//         color: theme.palette.grey[500],
//     },
// });

// const DialogTitle = withStyles(styles)((props) => {
//     const { children, classes, onClose, ...other } = props;
//     return (
//         <MuiDialogTitle disableTypography className={classes.root} {...other}>
//             <Typography variant="h6">{children}</Typography>
//             {onClose ? (
//                 <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//                     <CloseIcon />
//                 </IconButton>
//             ) : null}
//         </MuiDialogTitle>
//     );
// });

// const DialogContent = withStyles((theme) => ({
//     root: {
//         padding: theme.spacing(2),
//     },
// }))(MuiDialogContent);

// function ReUseDialog({
//     title,
//     description,
//     children,
//     type,
//     open,
//     handleClose,
//     form,
//     fieldName,
//     label,
//     defaultValue,
//     project,
//     name,
//     password,
//     profileId }) {
//     const dispatch = useDispatch()
//     const { user } = useSelector((state) => state.auth);
//     const {
//         formState: { errors },
//         handleSubmit,
//         reset,
//         control,
//         setError,
//     } = useForm({
//         mode: password ? "" : "all"
//     });
//     const onSubmit = (data) => {
//         if (password) {
//             if (data.newPassword === data.conPassword) {
//                 const { oldPassword, newPassword } = data;
//                 const updatePasswordData = { oldPassword, newPassword }
//                 updatePasswordData.userName = user?.username;
//                 dispatch(updatePassword(user?.projectId, updatePasswordData, profileId))
//                 handleClose()
//                 reset()
//             } else {
//                 setError("conPassword", {
//                     type: "validate",
//                     message: "Password doesn't matched",
//                 });
//                 setError("newPassword", {
//                     type: "validate",
//                     message: "Password doesn't matched",
//                 });
//             }
//         }
//         if (project) {
//             const updateProjectData = { ...data }
//             updateProjectData.id = user?.projectId
//             updateProjectData.userId = user?.id;
//             dispatch(updateProject(updateProjectData))
//             handleClose()
//             reset()
//         }
//         if (name) {
//             dispatch(updateProfileName(data, user.id, user?.projectId, profileId))
//             handleClose()
//             reset()
//         }

//         // dispatch(getProjectByUserId(user?.id))
//     }
//     return (
//         <div>
//             <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
//                 <DialogTitle id="customized-dialog-title" onClose={handleClose}>
//                     {title}
//                 </DialogTitle>
//                 <DialogContent dividers>
//                     {description && <Typography gutterBottom>
//                         {description}
//                     </Typography>}
//                     {
//                         form &&
//                         <form
//                             style={{ padding: "20px" }}
//                             autoComplete="off"
//                             onSubmit={handleSubmit(onSubmit)}
//                         >
//                             <HookFormTextField
//                                 name={fieldName}
//                                 control={control}
//                                 defaultValue={defaultValue}
//                                 label={`${label ? label : "Input"}*`}
//                                 errors={errors}
//                                 style={{ minWidth: "400px" }}
//                                 type={type}
//                                 rules={{
//                                     required: {
//                                         value: true,
//                                         message: "This is field required"
//                                     },

//                                     pattern: {
//                                         value: project && /^\s*([a-zA-Z]+\s*){3}$/,
//                                         message: project && "Three Words Format Only",
//                                     },

//                                     maxLength: {
//                                         value: 30,
//                                         message: `${fieldName} cannot be more that 30 characters`
//                                     }
//                                 }}
//                             />
//                             {
//                                 password &&
//                                 <Fragment>
//                                     <HookFormTextField

//                                         name={`newPassword`}
//                                         control={control}
//                                         defaultValue={defaultValue}
//                                         label={`New Password`}
//                                         errors={errors}
//                                         style={{ minWidth: "400px", marginTop: "10px" }}
//                                         type={type}
//                                         rules={{
//                                             required: {
//                                                 value: true,
//                                                 message: "This is field required"
//                                             },
//                                         }}
//                                     />
//                                     <HookFormTextField
//                                         name={`conPassword`}
//                                         control={control}
//                                         defaultValue={defaultValue}
//                                         label={`Confirm new Password`}
//                                         errors={errors}
//                                         style={{ minWidth: "400px", marginTop: "10px" }}
//                                         type={type}
//                                         rules={{
//                                             required: {
//                                                 value: true,
//                                                 message: "This is field required"
//                                             },
//                                         }}
//                                     />
//                                 </Fragment>
//                             }
//                             <Button
//                                 style={{ marginTop: "20px" }}
//                                 variant="outlined"
//                                 color="primary"
//                                 type="submit"
//                             >
//                                 Save
//                             </Button>
//                         </form>
//                     }
//                     {children}
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }
// export default ReUseDialog;