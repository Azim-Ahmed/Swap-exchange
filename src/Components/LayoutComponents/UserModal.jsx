import { Avatar, Box, Grid, Typography } from "@material-ui/core";
import { Modal } from "..";

export const UserModal = ({
    openForUser,
    setOpenForUser,
    reset,
    classes,
    getAvatar,
    profileItem,
    WordCountLength,
    WordCount,
    singleProject,
    selfproject,
}) => {
    return (
        <Modal
            open={openForUser}
            handleClose={() => {
                setOpenForUser(false);
                reset();
            }}
        >
            <Grid item xs={12} md={12}>
                <div>
                    <div className={classes.account_and_name_wrapper}>
                        <div style={{ marginLeft: "7px" }}>
                            <Avatar
                                size={"large"}
                                title="change your avatar"
                                src={getAvatar(profileItem?.avatar)}
                                className={classes.purple}
                            >
                                {profileItem?.name &&
                                    (WordCountLength(profileItem?.name) > 1
                                        ? `${WordCount(profileItem?.name)[0].charAt(
                                            0
                                        )}${WordCount(profileItem?.name)[1].charAt(0)}`
                                        : `${WordCount(profileItem?.name)[0].charAt(0)}`)}
                            </Avatar>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "20px",
                                marginTop: "28px",
                            }}
                        >
                            <Typography align="left">{profileItem?.roleType}</Typography>

                            <Typography
                                style={{ fontWeight: "700", fontSize: "17px" }}
                                variant="h5"
                            >
                                {profileItem?.name}
                            </Typography>
                        </div>
                    </div>
                    {/* Role Email*/}
                    <Box
                        display="flex"
                        marginTop="20px"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                margin: "17px",
                            }}
                        >
                            <Typography align="left">Email </Typography>
                            <Typography
                                component="p"
                                style={{ fontWeight: "700", fontSize: "17px" }}
                                variant="h6"
                            >
                                {profileItem.username}
                            </Typography>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                margin: "10px 10px 10px 10px",
                            }}
                        >
                            <Typography align="left">Project name </Typography>
                            <Typography
                                component="p"
                                style={{ fontWeight: "700", fontSize: "17px" }}
                                variant="h6"
                            >
                                {singleProject?.name
                                    ? singleProject?.name
                                    : selfproject?.name}
                            </Typography>
                        </div>
                    </Box>
                </div>
            </Grid>
        </Modal>
    );
};