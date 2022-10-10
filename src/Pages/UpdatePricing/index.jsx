import { useCallback, useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import Layout from "Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "Components/Reusable";
import {
  getProjectByUserId,
  getSingleSubscription,
  getAllSubscription,
} from "redux/actions";
import { PricingCount, SingleBox } from "Components/PricingComponents";
import { checkduplicity } from "Utils";
import { Redirect } from "react-router-dom";

/**
 *@function UpdatePricing.jsx
 *@author Azim
 *
 **/

const UpdatePricing = () => {
  const [active, setactive] = useState();
  const [item, setItem] = useState();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.orgprofile);
  const { users, plans, getSinglePayData } = useSelector(
    (state) => state.payment
  );
  useEffect(() => {
    if (user?.id) {
      dispatch(getSingleSubscription(user?.subscriptionPlanId));
      dispatch(getProjectByUserId(user?.id));
    }
  }, [user?.id, dispatch, user?.subscriptionPlanId]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllSubscription(user?.id));
    }
  }, [user?.id, dispatch]);
  const getExistingUser = useCallback(() => {
    const existingUser =
      getSinglePayData?.noOfUser - checkduplicity(users).length + 1;
    return existingUser;
  }, [getSinglePayData?.noOfUser, users]);
  // handle Change Element
  const handleChange = (data) => {
    setactive(data);
    const activeItem = plans.find((value) => value.name === data);
    setItem(activeItem);
  };


  if (user.roleType === "USER") {
    return <Redirect to="/" />
  }

  return (
    <Layout pageName={"Add Seats"}>
      <h3
        style={{
          padding: "0px 0px 0px 10px",
          marginTop: "10px",
          marginLeft: "8px",
        }}
      >
        {getSinglePayData?.noOfUser && "Update your seat bundle."}
      </h3>
      <Grid
        container
        style={{
          padding: "0px 10px 10px 10px",
          marginTop: "10px",
          marginLeft: "8px",
        }}
      >
        <Grid item xs={12} md={6}>
          {loading ? (
            <Loader />
          ) : (
            <Box>
              {plans.map((item, index) => (
                <SingleBox
                  key={index}
                  item={item}
                  active={active}
                  deactivateItem={getSinglePayData}
                  click={handleChange}
                />
              ))}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <PricingCount
            user={user}
            update
            existingSeat={getExistingUser}
            item={item}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UpdatePricing;
