import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { Box } from "@material-ui/core";

const CustomSnacbar = ({
  opened,
  setOpenAlert,
  alertToDelete,
  handleDeleteFromBackend,
  delid,
  type,
  DeleteText,
  generalText,
  undone,
}) => {
  const handleClose = () => {
    setOpenAlert(false);
  };
  // dsjdh@hdj.com
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={opened}
        onClose={handleClose}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            background: "#ffffff",
            width: "421px",
            height: "177px",
            boxShadow: "0px 4px 60px rgba(0, 0, 0, 0.25)",
            borderRadius: "5px",
          }}
        >
          <div>
            <p style={{ color: "black", fontWeight: "600", fontSize: "15px" }}>
              {type !== "adminUser"
                ? `Are you sure you want to delete this ${type}?`
                : DeleteText}
              {generalText && generalText}
            </p>
            <p style={{ color: "gray" }}>
              {undone && "This action cannot be undone."}
              {!DeleteText && "This action cannot be undone."}
            </p>
            {type ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
                marginTop="10px"
              >
                <Button
                  style={{
                    marginLeft: "40px",
                  }}
                  onClick={handleClose}
                  variant="contained"
                  fullWidth
                  size="medium"
                >
                  No
                </Button>
                {type === "adminUser" ? (
                  <Button
                    onClick={() => {
                      delid ? handleDeleteFromBackend(delid) : handleDeleteFromBackend();
                      handleClose();
                    }}
                    style={{
                      marginLeft: "10px",
                    }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="medium"
                  >
                    Yes
                  </Button>
                ) : (
                  <Button
                    onClick={() => delid ? handleDeleteFromBackend(delid) : handleDeleteFromBackend(alertToDelete?.id)}
                    style={{
                      marginLeft: "10px",
                    }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="medium"
                  >
                    Delete
                  </Button>
                )}
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
                marginTop="10px"
              >
                <Button
                  onClick={handleClose}
                  color="primary"
                  variant="contained"
                  fullWidth
                  size="medium"
                >
                  Got it!
                </Button>
              </Box>
            )}
          </div>
        </Box>
      </Snackbar>
    </div>
  );
};
export default CustomSnacbar;
