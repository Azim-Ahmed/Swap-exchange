import React, { Fragment } from "react";
import {
  Star as StarIcon,
  Adb as AdbIcon,
  AssignmentTurnedInOutlined as AssignmentTurnedInOutlinedIcon,
} from "@material-ui/icons";
import { UserAvatar, SVGRender } from "Components/Reusable";
import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { images } from "assets";
function BlockersTable({
  particularCard,
  blockers,
  persona,
  getAvatar,
  getName,
  renderStyle,
}) {
  const renderBlockersTable = () => {
    const filterByReference = (arr1, arr2) => {
      let res = [];
      res = arr1.filter((el) => {
        return arr2.find((element) => {
          return JSON.parse(element).value === el.id;
        });
      });
      return res;
    };

    const newFinalTableData = filterByReference(particularCard, blockers);
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {blockers.map((row, index) => (
              <Fragment key={index}>
                {JSON.parse(row)?.type === "created" && (
                  <TableRow>
                    <TableCell component="td" scope="row">
                      {JSON.parse(row).label}
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
            {newFinalTableData.map((item, index) => (
              <Fragment key={index}>
                <TableRow>
                  <TableCell
                    title={
                      item.title && item.label
                        ? `As ${persona} I want to do the ${item?.title} process So that I can ${item?.label}`
                        : item.bugsLabel
                        ? item.bugsLabel
                        : item?.choresLabel
                    }
                    style={{
                      maxWidth: "150px",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                    component="td"
                    scope="row"
                  >
                    {item.title && item.label
                      ? `As ${persona} I want to do the ${item?.title} process So that I can ${item?.label}`
                      : item.bugsLabel
                      ? item.bugsLabel
                      : item?.choresLabel}
                  </TableCell>
                  <TableCell title={"Blocker Id"} component="td" scope="row">
                    {item?.size === "0" && (
                      <SVGRender
                        style={renderStyle}
                        img={images.tShirt}
                        alt={"small Icon"}
                      />
                    )}
                    {item?.size === "1" && (
                      <SVGRender
                        style={renderStyle}
                        img={images.smallIconForSize}
                        alt={"small Icon"}
                      />
                    )}
                    {item?.size === "2" && (
                      <SVGRender
                        style={renderStyle}
                        img={images.mediumIconForSize}
                        alt={"medium Icon"}
                      />
                    )}
                    {item?.size === "3" && (
                      <SVGRender
                        style={renderStyle}
                        img={images.largeIconForSize}
                        alt={"large Icon"}
                      />
                    )}
                  </TableCell>
                  <TableCell title={"Blocker Id"} component="td" scope="row">
                    {item?.type === "feature" && (
                      <StarIcon style={{ color: " #F0DD2E" }} />
                    )}
                    {item?.type === "bug" && (
                      <AdbIcon style={{ color: " red" }} />
                    )}
                    {item?.type === "chore" && (
                      <AssignmentTurnedInOutlinedIcon />
                    )}
                  </TableCell>

                  <TableCell component="td" scope="row">
                    <UserAvatar
                      className={classes.updateCardAvatar}
                      getAvatar={getAvatar}
                      getName={getName}
                      userId={item?.userId}
                    />
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  const classes = useStyles();
  return <Box>{renderBlockersTable()}</Box>;
}
export default React.memo(BlockersTable);

const useStyles = makeStyles(() => ({
  updateCardAvatar: {
    height: "24px",
    width: "24px",
    fontSize: "13px",
  },
}));
