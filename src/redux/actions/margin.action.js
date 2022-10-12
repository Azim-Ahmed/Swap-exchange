
import axios from "../../api/axios";
import { errorAlert, handleErrorMessage, successAlert } from 'Utils';
import { userConstants, crytoMarginPage } from "./constant";

export const getAllCrypto = () => {
    return async (dispatch) => {
        dispatch({ type: crytoMarginPage.GET_ALL_CRYPTO_REQUEST });
        try {
            const res = await axios.get("/crypto");
            if (res.data.status === "ok") {
                dispatch({
                    type: crytoMarginPage.GET_ALL_CRYPTO_SUCCESS,
                    payload: res?.data?.data?.stock_item
                });
            }
            // if (user.roleType === "ADMIN") {
            //     dispatch({
            //         type: userConstants.USER_REGISTER_SUCCESS,
            //         payload: res.data.message
            //     });

            // }

        } catch (error) {
            dispatch({
                type: userConstants.USER_REGISTER_FAILURE,
            });
            errorAlert(handleErrorMessage(error));
        }
    };
};
export const getAllStockPair = () => {
    return async (dispatch) => {
        dispatch({ type: crytoMarginPage.GET_ALL_STOCKPAIR_REQUEST });
        try {
            const res = await axios.get("/stock_pair");
            console.log(res.data.data, "Azim")
            if (res.data.status === "ok") {
                dispatch({
                    type: crytoMarginPage.GET_ALL_STOCKPAIR_SUCCESS,
                    payload: res?.data?.data?.stock_pair
                });
            }
            // if (user.roleType === "ADMIN") {
            //     dispatch({
            //         type: userConstants.USER_REGISTER_SUCCESS,
            //         payload: res.data.message
            //     });

            // }

        } catch (error) {
            dispatch({
                type: userConstants.USER_REGISTER_FAILURE,
            });
            errorAlert(handleErrorMessage(error));
        }
    };
};
export const getConditionedData = (fullStockRow) => {
    return async (dispatch) => {
        dispatch({ type: crytoMarginPage.GET_SINGLE_PAIR_DATA_REQUEST });
        try {
            const res = await axios.get(`/order_data/${fullStockRow?.id}`);
            const newRes = await axios.get(`/candle/${fullStockRow?.id}`);
            if (res.data.status === "ok") {
                dispatch({
                    type: crytoMarginPage.GET_SINGLE_PAIR_DATA_SUCCESS,
                    payload: {
                        orderData: res?.data?.data?.orderData,
                        candleData: newRes.data.data?.candleData,
                        currentStock: fullStockRow

                    }

                });
            }

        } catch (error) {
            dispatch({
                type: userConstants.USER_REGISTER_FAILURE,
            });
            errorAlert(handleErrorMessage(error));
        }
    };
};
export const getOrderHistory = (id) => {
    return async (dispatch) => {
        dispatch({ type: crytoMarginPage.GET_ORDER_HISTORY_REQUEST });
        try {
            const res = await axios.get(`/orderHistory/${id}`);
            console.log("azim", res.data.data)
            if (res.data.status === "ok") {
                dispatch({
                    type: crytoMarginPage.GET_ORDER_HISTORY_SUCCESS,
                    payload: res?.data?.data?.OrderHistoryData,

                });
            }

        } catch (error) {
            dispatch({
                type: userConstants.USER_REGISTER_FAILURE,
            });
            errorAlert(handleErrorMessage(error));
        }
    };
};
export const buyOrSellAsset = (data) => {
    return async (dispatch) => {
        dispatch({ type: crytoMarginPage.POST_BUY_SELL_ASSETS_REQUEST });
        try {
            const res = await axios.post(`/orderCreate`, data);
            if (res.data.status === "ok") {
                dispatch({
                    type: crytoMarginPage.POST_BUY_SELL_ASSETS_SUCCESS,
                    payload: res?.data?.data?.orderData,
                });
                if (data.type === 1) {
                    successAlert("Successfully bought")
                } else {
                    successAlert("Successfully sold")
                }
            }

        } catch (error) {
            dispatch({
                type: userConstants.USER_REGISTER_FAILURE,
            });
            errorAlert(handleErrorMessage(error));
        }
    };
};
export const activationUser = (secretKey) => {
    //check this part
    return async (dispatch) => {
        dispatch({ type: userConstants.ACTIVATION_REQUEST });
        try {
            const res = await axios.patch(`/v1/projects/{projectId}/users/activeUser/${secretKey}`);
            console.log("from activation users", { res })
            if (res.status === 200) {
                dispatch({
                    type: userConstants.ACTIVATION__SUCCESS,
                });

            }

        } catch (error) {
            dispatch({
                type: userConstants.ACTIVATION_FAILURE,
            });
            errorAlert(handleErrorMessage(error));
        }
    };
};

export const resendActivationUser = (email, url) => {
    //check this part
    return async (dispatch) => {
        try {
            const res = await axios.patch(`/v1/projects/{projectId}/users/resend/email/${email}?redirectUrl=${url}`);
            if (res.status === 200) {
                dispatch({
                    type: userConstants.RESEND_ACTIVATION,
                });

            }

        } catch (error) {
            errorAlert(handleErrorMessage(error));
        }
    };
};
export const handleRemoveSuccessFromSignup = (email, url) => {
    //check this part
    return async (dispatch) => {
        try {
            dispatch({
                type: userConstants.REMOVE_SUCCESS_FROM_SIGNUP,
            });

        } catch (error) {
            errorAlert(handleErrorMessage(error));
        }
    };
};



export const activationUserByAdmin = (secretKey, password) => {
    //check this part
    return async (dispatch) => {
        dispatch({ type: userConstants.ACTIVATION_USER_REQUEST });
        try {
            const res = await axios.patch(`/v1/projects/{projectId}/users/reset-password/${secretKey}?password=${password}`);
            console.log("from activation from users", { res })
            if (res.status === 200) {
                dispatch({
                    type: userConstants.ACTIVATION_USER__SUCCESS,
                });
            }

        } catch (error) {
            dispatch({
                type: userConstants.ACTIVATION_USER_FAILURE,
            });
            errorAlert(handleErrorMessage(error));
        }
    };
};


