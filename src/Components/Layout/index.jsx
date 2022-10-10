import React, { useState, useEffect } from "react";
import {
  Button,
  makeStyles,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Box,
  Grid,
  TextField,
  IconButton,
  Popover,
  Divider,
  ListItemIcon,
  Avatar,
  Toolbar,
  AppBar,
  Tooltip,
  Checkbox,
  FormControl,
  Select,
  InputBase,
  withStyles,
} from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import {
  AddCircle,
  NotificationsNone,
  AccountCircleSharp,
  ExitToAppSharp,
  SupervisorAccount,
  DeleteOutlined,
  CheckBoxOutlineBlank,
  CheckBox,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  NavigateNext as NavigateNextIcon,
  Add,
} from "@material-ui/icons";
import clsx from "clsx";
import { Link, useHistory, useLocation } from "react-router-dom";
import { images } from "assets";
import Avatars from "assets/Avatars";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import {
  getUsersLaneListForKanban,
  getAllLaneListForKanban,
  handleChangeUserProjectId,
  getproblemStatement,
  searchUsersLaneListForKanban,
} from "redux/actions";

import {
  addNewValueStream,
  getPersona,
  getProjectByUserId,
  signout,
  getOrganizationProfile,
  deleteUserFromTheProject,
  getSingleSubscription,
} from "redux/actions";
import UserSignup from "../UserSignUp";
import { WordCount, WordCountLength } from "Utils";
import { useForm, Controller } from "react-hook-form";
import colors from "assets/Colors";
import CircleBox from "../FlowComponents/CircleBox";
import {
  ErrorMessages,
  Modal,
  CustomSnacbar,
  Loader,
  RIconButton,
  MPopover,
} from "Components/Reusable";
import Bipolar from "Components/CheckComponents/Bipolar";
import { debounce } from "lodash";
import { NotificationPopOver, UserModal } from "Components/LayoutComponents";

const drawerWidth = 245;
const Layout = ({
  children,
  onDiagram,
  generateKanban,
  board,
  pageName,
  generateCSV,
  type,
  custom,
  search,
  searchId,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  //redux data from Server
  const auth = useSelector((state) => state.auth);

  const { organizationProfile } = useSelector((state) => state.orgprofile);
  const { valueStream, persona } = useSelector((state) => state.diagram);
  const project = useSelector((state) => state.projects);

  // console.log({ focusNode });
  const { roleType, organizationId, projectId, userId, name } = auth.user;
  const { getSinglePayData } = useSelector((state) => state.payment);

  const [openD, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const [openValueStremModal, setOpenValueStremModal] = useState(false);
  const [openAddUserModal, setOpenUserModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [openForUser, setOpenForUser] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState({});
  const [profileItem, setProfileItem] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEled, setAnchorEled] = React.useState(null);

  // for multi select user for filter kanban boards
  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBox fontSize="small" />;
  const [selectedUsers, setSelectedUser] = useState([]);
  const filter = createFilterOptions();

  // for notification popover
  const [notificationShow, setNotificationShow] = useState(false);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  // setProjectPopper(!projectpopper)
  const [selfproject, setSelfProject] = useState({});
  const { singleProject } = useSelector((state) => state.projects);

  // multiproject switch
  const [projectpopper, setProjectPopper] = useState();
  const [projectanchorEl, setProjectanchorEl] = useState();

  // for filter
  const [selectedAll, setSelectedAll] = useState();
  const [searchval, setSearchVal] = useState("")
  const [filtertype, setFiltertype] = useState("user")

  const handleDrawerOpen = () => {
    setOpen(!openD);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePopOver = (event) => {
    setAnchorEled(event.currentTarget);
  };
  const handleDeleteUser = (event) => {
    setOpenAlert(true);
    setAlertToDelete(event);
  };
  // console.log({ getSinglePayData });
  const handleDeleteFromBackend = (id) => {
    dispatch(deleteUserFromTheProject(projectId, id));
    setOpenAlert(false);
  };
  const open = Boolean(anchorEl);
  const opened = Boolean(anchorEled);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    const proj = project?.project?.find(
      (value) => value.projectId === auth?.user?.projectId
    );
    setSelfProject(proj);
  }, [project, auth]);

  // get problem statement
  useEffect(() => {
    dispatch(getproblemStatement(auth?.user?.projectId));
  }, []);

  const setParamsOfSelected = (data) => {
    sessionStorage.setItem("selectedusers", JSON.stringify(data));
  };

  // fake notifications
  const fakeNotifications = [
    {
      text: "Marcus finn has accepted your friend request of ownership swapping",
      time: "Few minutes ago",
      unread: true,
    },
    {
      text: "You have been added for square bear project by ananna",
      time: "1 Day Ago",
      unread: false,
    },
    {
      text: "You have been added for square bear project by ananna",
      time: "1 Day Ago",
      unread: false,
    },
    {
      text: "You have been added for square bear project by ananna",
      time: "1 Day Ago",
      unread: false,
    },
    {
      text: "You have been added for square bear project by ananna",
      time: "1 Day Ago",
      unread: false,
    },
    {
      text: "Marcus finn has accepted your friend request of ownership swapping, please check your email review",
      time: "3 Days ago",
      unread: false,
    },
  ];




  // for filter by user
  useEffect(() => {
    const users = selectedUsers.map((item) => item.id);
    if (type === "board") {
      if (users.length > 0) {
        dispatch(
          getUsersLaneListForKanban(
            auth?.user?.projectId,
            custom ? searchId : auth?.user?.kanbanId,
            users
          )
        );
      } else {
        dispatch(
          getAllLaneListForKanban(
            auth?.user?.projectId,
            custom ? searchId : auth?.user?.kanbanId
          )
        );
      }
    }
  }, [selectedUsers, auth, dispatch]);



  const handleChange = (event) => {
    setFiltertype(event.target.value);

  };



  const handleSetCardLabel = (data) => {
    if (data !== "") {
      dispatch(searchUsersLaneListForKanban(auth?.user?.projectId, auth?.user?.kanbanId, data))
    } else {
      dispatch(
        getAllLaneListForKanban(
          auth?.user?.projectId,
          custom ? searchId : auth?.user?.kanbanId
        )
      );
    }
    setSearchVal(data)
  }

  const debounceSection = debounce(handleSetCardLabel, 1000)


  // for filtering cards according to user ids
  const CheckboxesTags = () => {
    const BootstrapInput = withStyles((theme) => ({
      input: {
        borderRadius: 4,
        // position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        marginLeft: "-75px",
        padding: '10px 0px 10px 10px',
        width: "100px",
        // transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
          borderRadius: 4,
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
      },
    }))(InputBase);
    return (
      <>
        <FormControl className={classes.margin}>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={filtertype}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"card"}>Card</MenuItem>
          </Select>
        </FormControl>
        {/* for user filter */}
        {filtertype === "user" ?
          <>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              limitTags={1}
              options={[
                { id: "1234567", name: "Select All" },
                ...organizationProfile,
              ]}
              disableCloseOnSelect
              defaultValue={selectedUsers}
              getOptionLabel={(option) => {
                return option.name;
              }}
              getOptionSelected={(option, value) => {
                return option.id === value.id;
              }}
              onChange={(event, newValue) => {
                const findSelect = newValue?.find(
                  (value) => value.name === "Select All"
                );
                if (findSelect?.name === "Select All" && !selectedAll) {
                  const alldata = organizationProfile.map((item) => {
                    return {
                      id: item.id,
                      name: item.name,
                    };
                  });
                  const newall = [{ id: "1234567", name: "Select All" }, ...alldata];
                  setSelectedAll(true);
                  setSelectedUser(newall);
                  setParamsOfSelected(newall);
                } else if (selectedAll) {
                  setSelectedAll(false);
                  setSelectedUser([]);
                } else if (Array.isArray(newValue)) {
                  const updatedArrayValue = newValue.filter((e) =>
                    typeof e === "string" ? e.trim() : e
                  );
                  const newArrayValue = [...updatedArrayValue];
                  const updatedArray = newArrayValue.map((item) => {
                    return {
                      id: item.id,
                      name: item.name,
                    };
                  });
                  setSelectedUser(updatedArray);
                  setParamsOfSelected(updatedArray);
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
              // value={selectedUsers}
              renderOption={(option, { selected }) => (
                <>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </>
              )}
              // style={{ height: "1rem" }}
              style={{ width: "375px" }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    size={"small"}
                    variant="outlined"
                    label="Filter User"
                  />
                </>
              )}
            />
          </>
          : <>
            <TextField id="outlined-basic" label="Filter By Card" size="small" defaultValue={searchval} variant="outlined" style={{ width: "375px" }} onKeyDown={(event) => { event.key === "Enter" && debounceSection(event.target.value) }} />
          </>}

      </>
    );
  };

  const renderUserSignUpModel = () => {
    return (
      <Modal
        open={openAddUserModal}
        handleClose={() => setOpenUserModal(false)}
        userSIgnUp
      >
        <UserSignup handleClose={() => setOpenUserModal(false)} />
      </Modal>
    );
  };
  useEffect(() => {
    if (projectId) {
      dispatch(getOrganizationProfile(projectId));
      // dispatch(getPersonas(projectId))
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    dispatch(getPersona(projectId));
  }, [dispatch, projectId]);
  const menuItems = [
    // {
    //   text: "Home",
    //   icon: <Home color="secondary" />,
    //   path: "/",
    // },
  ];

  const handleSignOut = () => {
    handleClose();
    dispatch(signout());
    history.push("/login");
  };

  const getAvatar = (value) => {
    let newData;
    Object.keys(Avatars).find((key, index) => {
      if (key === value) {
        newData = `${Avatars[value]}`;
        return newData;
      }
      return newData;
    });
    return newData;
  };

  const getAvatars = () => {
    let newData;
    Object.keys(Avatars).find((key, index) => {
      if (key === auth?.user?.avatar) {
        newData = `${Avatars[auth?.user?.avatar]}`;
        return newData;
      }
      return newData;
    });
    return newData;
  };

  useEffect(() => {
    if (auth?.user?.id) {
      dispatch(getProjectByUserId(auth?.user?.id));
      dispatch(getSingleSubscription(auth?.user?.subscriptionPlanId));
    }
  }, [auth.user.id, dispatch, auth?.user?.subscriptionPlanId]);

  const {
    formState: { errors: errorsState },
    register,
    handleSubmit,
    reset,
    control: realControl,
  } = useForm({
    mode: "all",
  });
  const onSubmit = (data) => {
    const findColour = colors.filter(
      (val) => !valueStream.map((item) => item?.color).includes(val)
    );
    const color = findColour[Math.floor(Math.random() * findColour.length)];
    const updatedColor = color ? color : "#93d275";
    const newvalueStream = {
      valueStreamName: data.valueStreamName,
      valueStreamWhy: data.valueStreamWhy,
      persona: data.persona,
      organizationId,
      projectId,
      userId,
      color: updatedColor,
    };
    dispatch(addNewValueStream(newvalueStream, projectId));
    setOpenValueStremModal(false);
    reset();
  };
  const renderAddValueStreamModal = () => {
    return (
      <Modal
        open={openValueStremModal}
        handleClose={() => {
          setOpenValueStremModal(false);
          reset();
        }}
      >
        <h1 style={{ textAlign: "left", marginLeft: "32px" }}>
          Add new value stream
        </h1>
        <form
          style={{ padding: "20px" }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            style={{ margin: "10px" }}
            variant="outlined"
            fullWidth
            label="Value stream name*"
            placeholder="Value stream name*"
            {...register("valueStreamName", {
              required: {
                value: true,
                message: "This is field required",
              },
              min: 5,
              max: 3,
              // pattern: {
              //   value: /^\s*([a-zA-Z]+\s*){3}$/,
              //   message: "Three Words Format Only",
              // },
            })}
          />
          <ErrorMessages errors={errorsState} name="valueStreamName" />
          <br />
          <TextField
            style={{ margin: "10px" }}
            variant="outlined"
            fullWidth
            label="Value stream why*"
            placeholder="Value stream why*"
            {...register("valueStreamWhy", {
              required: {
                value: true,
                message: "This is field required",
              },
              maxLength: 30,
              // pattern: {
              //   value: /^\s*([a-zA-Z]+\s*){3}$/,
              //   message: "Three Words Format Only",
              // },
            })}
          />
          <ErrorMessages errors={errorsState} name="valueStreamWhy" />
          <br />
          <Controller
            name="persona"
            control={realControl}
            defaultValue={persona?.name}
            rules={{
              required: {
                value: true,
                message: "This is required",
              },
              maxLength: {
                value: 30,
                message: "oops! characters limitation 30.",
              },
            }}
            render={({ field }) => (
              <TextField
                style={{ margin: "10px" }}
                {...field}
                fullWidth
                label="Persona*"
                variant="outlined"
                type="text"
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          />
          <ErrorMessages errors={errorsState} name="persona" />
          <br />
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
          >
            Add Stream
          </Button>
        </form>
      </Modal>
    );
  };


  const handleChangeAndGoIntoHome = (item) => {
    // dispatch(getProjectById(item?.projectId));
    dispatch(handleChangeUserProjectId(item, project?.singleProject?.kanbanId));
    history.push("/");
  };

  const handleOpenModalForValueStream = () => {
    //#TODO
    persona?.name && persona?.projectId && setOpenValueStremModal(true);
  };
  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openD,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: openD,
            })}
          >
            <NavigateNextIcon />
          </IconButton>
          {/* TODO */}
          <Bipolar
            pageName={pageName}
            projectName={selfproject?.name}
            custom={custom}
            location={search}
            onDiagram={onDiagram}
            generateKanban={generateKanban}
          />
          {openValueStremModal && renderAddValueStreamModal()}
          <div className={classes.navBarScroll}>
            {valueStream && onDiagram && (
              <Grid container>
                {valueStream.length > 0
                  ? valueStream.map((item, index) => (
                    <Grid
                      style={{ marginRight: "20px", marginTop: "5px" }}
                      key={index}
                      item
                      md={1}
                    >
                      <Box
                        className={classes.particularBox}
                        onClick={() =>
                          history.push(`/finalDiagram?streamId=${item.id}`)
                        }
                      >
                        <CircleBox
                          layout
                          background={item?.color}
                          item={item}
                        />
                      </Box>
                    </Grid>
                  ))
                  : null}
                <Box className={classes.AddboxCircle}>
                  <Button
                    onClick={handleOpenModalForValueStream}
                    className={classes.buttonStyle}
                    disableRipple
                    endIcon={<AddCircle className={classes.buttonInnerStyle} />}
                  />
                </Box>
              </Grid>
            )}
          </div>
          <Typography className={classes.date}></Typography>
          {type === "board" ? <CheckboxesTags /> : null}
          <RIconButton
            placement="bottom"
            title={`Notifications`}
            style={{ marginRight: "10px" }}
          // onClick={event => {
          //   setNotificationShow(!notificationShow)
          //   setAnchorElNotification(event.currentTarget)
          // }}
          >
            <NotificationsNone />
          </RIconButton>
          {<NotificationPopOver 
            id={id}
            classes={classes}
            notificationShow={notificationShow}
            fakeNotifications={fakeNotifications}
            setNotificationShow={setNotificationShow}
            anchorElNotification={anchorElNotification}
            setAnchorElNotification={setAnchorElNotification}
          />}
          <RIconButton
            placement="bottom"
            title={`Users`}
            style={{ marginRight: "10px" }}
            onClick={handlePopOver}
          >
            <SupervisorAccount />
          </RIconButton>
          <Popover
            id={id}
            open={opened}
            anchorEl={anchorEled}
            onClose={() => setAnchorEled(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div>
              {openAlert && (
                <CustomSnacbar
                  opened={openAlert}
                  alertToDelete={alertToDelete}
                  handleDeleteFromBackend={handleDeleteFromBackend}
                  setOpenAlert={setOpenAlert}
                  type="user"
                />
              )}
              {organizationProfile ? (
                organizationProfile.map((item, index) => (
                  <MenuItem key={index} className={classes.menuItemStyle}>
                    <Box
                      onClick={() => {
                        setOpenForUser(true);
                        setProfileItem(item);
                      }}
                      className={classes.menuStyleBlock}
                    >
                      <Avatar src={getAvatar(item?.avatar)} alt={item.name}>
                        {item.name &&
                          (WordCountLength(item.name) > 1
                            ? `${WordCount(item.name)[0].charAt(0)}${WordCount(
                              item.name
                            )[1].charAt(0)}`
                            : `${WordCount(item.name)[0].charAt(0)}`)}
                      </Avatar>
                      <Typography style={{ marginLeft: "20px" }}>
                        {item?.name}
                      </Typography>
                    </Box>
                    {item?.roleType === "USER" &&
                      auth?.user?.roleType === "ADMIN" ? (
                      <RIconButton
                        title={`Delete user`}
                        onClick={() => handleDeleteUser(item)}
                        style={{ padding: "3px" }}
                      >
                        <DeleteOutlined />
                      </RIconButton>
                    ) : (
                      ""
                    )}
                  </MenuItem>
                ))
              ) : (
                <Loader />
              )}
            </div>
          </Popover>
          <Tooltip title={auth.user?.name} arrow>
            <Typography
              style={{
                color: "black",
                marginRight: "10px",
                whiteSpace: "nowrap",
                maxWidth: "150px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {auth.user?.name}
            </Typography>
          </Tooltip>

          <IconButton onClick={handleClick} style={{ marginRight: "20px" }}>
            <Avatar src={`${auth?.user?.avatar && getAvatars()}`}>
              {name &&
                (WordCountLength(name) > 1
                  ? `${WordCount(name)[0].charAt(0)}${WordCount(name)[1].charAt(
                    0
                  )}`
                  : `${WordCount(name)[0].charAt(0)}`)}
            </Avatar>
          </IconButton>
          <div>
            <Popover
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={() => history.push(`/profile`)}>
                <AccountCircleSharp
                  style={{ color: "gray", marginRight: "10px" }}
                />{" "}
                Profile
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                <ExitToAppSharp
                  style={{ color: "gray", marginRight: "10px" }}
                />{" "}
                Log out
              </MenuItem>
            </Popover>
          </div>
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openD,
          [classes.drawerClose]: !openD,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openD,
            [classes.drawerClose]: !openD,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerOpen}>
            {!openD ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Box mt={1} display="flex" justifyContent="center">
          <Link to="/">
            <Tooltip title={"Home"} placement="right" arrow>
              <img
                onClick={() => onDiagram && generateKanban()}
                src={images.smallLogo}
                style={{
                  height: "32px",
                  width: "32px",
                }}
                alt=""
              />
            </Tooltip>
          </Link>
        </Box>
        <Link
          style={{ color: "gray" }}
          to={getSinglePayData?.noOfUser ? "/addUsers" : "/pricing"}
        >
          <Box
            // onClick={handleNewUser}
            mt={3}
            display="flex"
            justifyContent="center"
          >
            {roleType === "ADMIN" && (
              <Tooltip title={"ADD USER"} placement="right" arrow>
                <ListItem button key={"admin"}>
                  <ListItemIcon>
                    <img
                      src={images.addUser}
                      style={{
                        height: "32px",
                        width: "32px",
                      }}
                      alt=""
                    />
                  </ListItemIcon>
                  <ListItemText primary={"ADD USER"} />
                </ListItem>
              </Tooltip>
            )}
          </Box>
        </Link>
        {/* links/list section */}
        <List>
          {board && (
            <Tooltip title={"Download User Stories"} placement="right" arrow>
              <ListItem button key={"users"} onClick={() => generateCSV()}>
                <ListItemIcon>
                  <img
                    src={images.download}
                    style={{
                      height: "32px",
                      width: "32px",
                    }}
                    alt=""
                  />
                </ListItemIcon>
                <ListItemText primary={"Download User Stories"} />
              </ListItem>
            </Tooltip>
          )}

          {onDiagram && (
            <Tooltip title={"Generate kanban"} placement="right" arrow>
              <ListItem
                button
                key={"kanban"}
                onClick={() => {
                  generateKanban();
                  history.push("/board");
                }}
              >
                <ListItemIcon>
                  <img
                    src={images.kanban}
                    style={{
                      height: "32px",
                      width: "32px",
                    }}
                    alt=""
                  />
                </ListItemIcon>
                <ListItemText primary={"Generate kanban"} />
              </ListItem>
            </Tooltip>
          )}

          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path
                  ? classes.active
                  : classes.notActive
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        {/* #TODO #DONE Persona*/}
        {/* {showTextField && renderUpdatePersonaModal()} */}
        {openForUser && <UserModal
          openForUser={openForUser}
          setOpenForUser={setOpenForUser}
          reset={reset}
          classes={classes}
          getAvatar={getAvatar}
          profileItem={profileItem}
          WordCountLength={WordCountLength}
          WordCount={WordCount}
          singleProject={singleProject}
          selfproject={selfproject}
        />}

        <Divider />
        <Box mt="auto">
          <br />

          <ListItem
            button
            key={"help"}
            style={{ marginLeft: "5px" }}
            onClick={(event) => {
              setProjectPopper(!projectpopper);
              setProjectanchorEl(event.currentTarget);
            }}
          >
            <ListItemIcon>
              <div className={classes.projectIcon}>
                <span className={classes.innderword}>
                  {selfproject &&
                    selfproject.name &&
                    selfproject.name !== "undefined"
                    ? selfproject?.name.slice(0, 1).toUpperCase()
                    : null}
                </span>
              </div>
            </ListItemIcon>
            <ListItemText primary={"Project List"} />
          </ListItem>
        </Box>
        <MPopover
          id={id}
          open={projectpopper}
          anchorEl={projectanchorEl}
          className={classes.custompopper}
          onClose={() => {
            setProjectPopper(false);
            setProjectanchorEl(null);
          }}
        >
          <Box
            className={classes.chooseStyle}
            display={"flex"}
            justifyContent={"space-between"}
            onClick={() => history.push("/project")}
          >
            <div>Projects List</div>
            <Button style={{ margin: 0, padding: 0, marginRight: "-2.2rem" }}>
              <Add style={{ margin: 0, padding: 0 }} />
            </Button>
          </Box>
          {project &&
            project?.project &&
            project?.project.map((item, index) => {
              return (
                <Box
                  className={
                    selfproject?.id === item?.id
                      ? classes.chooseStyleActive
                      : classes.chooseStyle
                  }
                  onClick={() =>
                    selfproject?.id === item?.id
                      ? null
                      : handleChangeAndGoIntoHome(item)
                  }
                  key={index}
                >
                  <span style={{ textTransform: "capitalize" }}>{item && item.name}</span>
                </Box>
              );
            })}
        </MPopover>
        <Box mb="120px">
          <br />
          <Tooltip title={"Help"} placement="right" arrow>
            <ListItem button key={"help"} style={{ marginLeft: "5px" }}>
              <ListItemIcon onClick={() => window.open("https://discord.gg/6NB4anmnEZ")}>
                <img
                  src={images.help}
                  style={{
                    height: "32px",
                    width: "32px",
                  }}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary={"Help"} />
            </ListItem>
          </Tooltip>
        </Box>
      </Drawer>

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {openAddUserModal && roleType === "ADMIN" && renderUserSignUpModel()}
        {children}
      </div>
    </div>
  );
};
export default Layout;

//layout section Material UI
const useStyles = makeStyles((theme) => {
  return {
    chooseStyle: {
      padding: "20px",
      paddingTop: "5px",
      paddingBottom: "5px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#d3ced2",
      },
    },
    chooseStyleActive: {
      padding: "20px",
      paddingTop: "5px",
      paddingBottom: "5px",
      cursor: "pointer",
      color: "white",
      backgroundColor: "#7478e8",
    },
    custompopper: {
      marginLeft: "55px",
    },
    projectIcon: {
      borderRadius: "25px",
      backgroundColor: "#7478e8",
      padding: "15px",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
    innderword: {
      fontWeight: "bolder",
      color: "white",
    },
    notificationstyle: {
      "& .MuiPopover-paper": {
        width: "400px",
        height: "400px",
        marginTop: "35px",
        marginLeft: "-185px",
      },
    },
    particularBox: {
      cursor: "pointer",
      display: "inline-block",
    },
    boxCircle: {
      borderRadius: "50%",
      background: "#005ae5",
      height: "58px",
      width: "58px",
      display: "flex",
      padding: ".5rem",
      justifyContent: "center",
      alignItems: "center",
    },
    AddboxCircle: {
      borderRadius: "50%",
      background: "transparent",
      height: "58px",
      width: "58px",
      display: "flex",
      padding: ".5rem",
      justifyContent: "center",
      alignItems: "center",
      "& .MuiButton-root:hover": {
        background: "none",
      },
      "& .MuiButton-endIcon": {
        margin: 0,
      },
    },
    buttonInnerStyle: {
      height: "60px",
      width: "80px",
      color: "#7478E8",
    },
    buttonStyle: {
      fontSize: "15px",
    },
    page: {
      width: "100%",
      padding: theme.spacing(1),
      overflowX: "hidden",
      background: "white",
    },
    root: {
      display: "flex",
    },
    drawer: {
      position: "relative",
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerPaper: {
      width: drawerWidth,
      background: "#ffffff",
      boxShadow: "0px 0px 6px gray",
      "& .MuiList-root": {
        textAlign: "center",
        justifyContent: "center",
        "& .MuiButton-containedPrimary": {
          padding: "8px 50px",
          marginBottom: "20px",
        },
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      background: "#ffffff",
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 28,
      zIndex: "10000000000",
    },
    hide: {
      display: "none",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      zIndex: "1203",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      // toolbar: theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    personaStyle: {
      "& .MuiTypography-body1": {
        maxWidth: "200px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
      },
    },
    account_and_name_wrapper: {
      display: "flex",
      marginTop: "40px",
    },
    purple: {
      width: theme.spacing(14),
      height: theme.spacing(14),
      color: "black",
      background: "lightgray",
    },
    menuItemStyle: {
      display: "flex",
      justifyContent: "space-between",

      alignItems: "center",
      minWidth: "300px",
      "& .MuiIconButton-label": {
        display: "none",
        color: "#9747FF",
      },
      "&:hover .MuiIconButton-label": {
        display: "block",
      },
    },
    menuStyleBlock: {
      display: "flex",
      alignItems: "center",
    },
    deleteIconHideStyle: {
      marginLeft: "10px",
    },
    active: {
      background: "#eee",
      color: theme.palette.common.black,
      fontWeight: 600,
    },

    notActive: {
      color: theme.palette.common.black,
      background: "gray",
    },
    navBarScroll: {
      maxWidth: "700px",
      width: "100%",
      marginLeft: "80px",
      overflowY: "hidden",
      "&>div": {
        flexWrap: "nowrap",
      },
    },
    title: {
      padding: theme.spacing(2),
    },
    date: {
      flexGrow: 1,
    },
    // toolbar: theme.mixins.toolbar,

    //dropdown select
    margin: {
      margin: `0px ${theme.spacing(2)}px`,
    },
  };
});
