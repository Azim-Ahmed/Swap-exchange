import { Box, Typography } from "@material-ui/core";
import { MPopover } from "..";

export const NotificationPopOver = ({
    id,
    classes,
    notificationShow,
    fakeNotifications,
    setNotificationShow,
    anchorElNotification,
    setAnchorElNotification,
}) => {
    return (
        <MPopover
            id={id}
            open={notificationShow}
            anchorEl={anchorElNotification}
            onClose={() => {
                setAnchorElNotification(null);
                setNotificationShow(false);
            }}
            className={classes.notificationstyle}
        >
            <Box padding={0}>
                {fakeNotifications &&
                    fakeNotifications.map((item, index) => (
                        <div key={index}>
                            <Typography
                                variant="subtitle1"
                                style={
                                    item.unread !== false
                                        ? { fontWeight: "bold", padding: "0 1rem 0 1rem" }
                                        : { fontWeight: "normal", padding: "0 1rem 0 1rem" }
                                }
                            >
                                {item.text}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="gray"
                                style={{ padding: "0 1rem 0 1rem" }}
                            >
                                {item.time}
                            </Typography>
                            <hr />
                        </div>
                    ))}
            </Box>
        </MPopover>
    );
};