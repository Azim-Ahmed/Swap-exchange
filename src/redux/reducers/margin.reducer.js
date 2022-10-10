

import { crytoMarginPage } from "../actions/constant";

const initState = {
    message: "",
    loading: false,
    success: false,
    crytoNames: [],
    stockPairs: [],
    singlePairData: [],
    candleData: [],
    currentStock: {}
};

const marginReducer = (state = initState, action) => {
    switch (action.type) {
        case crytoMarginPage.GET_ALL_CRYPTO_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            };
        case crytoMarginPage.GET_ALL_CRYPTO_SUCCESS:
            return {
                ...state,
                loading: false,
                crytoNames: action.payload,
                success: true
            };
        case crytoMarginPage.GET_ALL_STOCKPAIR_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            };
        case crytoMarginPage.GET_ALL_STOCKPAIR_SUCCESS:
            return {
                ...state,
                loading: false,
                stockPairs: action.payload,
                success: true
            };
        case crytoMarginPage.GET_SINGLE_PAIR_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            };
        case crytoMarginPage.GET_SINGLE_PAIR_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                singlePairData: action.payload.orderData,
                candleData: action.payload.candleData,
                currentStock: action.payload.currentStock,
                success: true
            };
        case crytoMarginPage.ACTIVATION__SUCCESS:
            return {
                ...state,
                activation: true
            };
        case crytoMarginPage.REMOVE_SUCCESS_FROM_SIGNUP:
            return {
                ...state,
                success: false
            };
        case crytoMarginPage.ACTIVATION_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case crytoMarginPage.ACTIVATION_USER__SUCCESS:
            return {
                ...state,
                loading: false,
                userActivation: true
            };
        case crytoMarginPage.USER_REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                success: false
            };
        default:
            return state;
    }
};
export default marginReducer;
