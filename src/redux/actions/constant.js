export const authConstants = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",
  CLEAR__ERROR: "CLEAR__ERROR",
  LOGGEDIN_USER_REQUEST: "LOGGEDIN_USER_REQUEST",
  LOGGEDIN_USER_SUCCESS: "LOGGEDIN_USER_SUCCESS",
  RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE: "RESET_PASSWORD_FAILURE",
  REMOVE_SUCCESS_FROM_FORGET_PASS: "REMOVE_SUCCESS_FROM_FORGET_PASS",
  GET_USER_INFO_LOGGED_REQUEST: "GET_USER_INFO_LOGGED_REQUEST",
  GET_USER_INFO_LOGGED_SUCCESS: "GET_USER_INFO_LOGGED_SUCCESS",
  GET_USER_INFO_LOGGED_FAILED: "GET_USER_INFO_LOGGED_FAILED"
};
export const crytoMarginPage = {
  GET_ALL_CRYPTO_REQUEST: "GET_ALL_CRYPTO_REQUEST",
  GET_ALL_CRYPTO_SUCCESS: "GET_ALL_CRYPTO_SUCCESS",
  GET_ALL_STOCKPAIR_REQUEST: "GET_ALL_STOCKPAIR_REQUEST",
  GET_ALL_STOCKPAIR_SUCCESS: "GET_ALL_STOCKPAIR_SUCCESS",
  GET_SINGLE_PAIR_DATA_REQUEST: "GET_SINGLE_PAIR_DATA_REQUEST",
  GET_SINGLE_PAIR_DATA_SUCCESS: "GET_SINGLE_PAIR_DATA_SUCCESS",
  POST_BUY_SELL_ASSETS_REQUEST: "POST_BUY_SELL_ASSETS_REQUEST",
  POST_BUY_SELL_ASSETS_SUCCESS: "POST_BUY_SELL_ASSETS_SUCCESS",

}

export const userConstants = {
  USER_REGISTER_REQUEST: "USER_REGISTER_REQUEST",
  USER_REGISTER_SUCCESS: "USER_REGISTER_SUCCESS",
  USER_REGISTER_FAILURE: "USER_REGISTER_FAILURE",
  ACTIVATION_REQUEST: "ACTIVATION_REQUEST",
  ACTIVATION__SUCCESS: "ACTIVATION__SUCCESS",
  ACTIVATION_FAILURE: "ACTIVATION_FAILURE",
  ACTIVATION_USER_REQUEST: "ACTIVATION_USER_REQUEST",
  ACTIVATION_USER__SUCCESS: "ACTIVATION_USER__SUCCESS",
  ACTIVATION_USER_FAILURE: "ACTIVATION_USER_FAILURE",
  RESEND_ACTIVATION: "RESEND_ACTIVATION",
  REMOVE_SUCCESS_FROM_SIGNUP: "REMOVE_SUCCESS_FROM_SIGNUP",
};


export const paymentConstants = {
  USER_ADD: "USER_ADD",
  USER_UPDATE: "USER_UPDATE",
  USER_DELETE: "USER_DELETE",
  USER_EMPTY: "USER_EMPTY",
  DISABLE_FALSE: "DISABLE_FALSE",
  SAVE_SUBSCRIPTIONS_REQUEST: "SAVE_SUBSCRIPTIONS_REQUEST",
  SAVE_SUBSCRIPTIONS_SUCCESS: "SAVE_SUBSCRIPTIONS_SUCCESS",
  SAVE_SUBSCRIPTIONS_STRIPE_SUCCESS: "SAVE_SUBSCRIPTIONS_STRIPE_SUCCESS",
  STRIPE_SUCCESS_MODAL_CLOSE: "STRIPE_SUCCESS_MODAL_CLOSE",
  SAVE_SUBSCRIPTIONS_STRIPE_FAILURE: "SAVE_SUBSCRIPTIONS_STRIPE_FAILURE",
  SAVE_SUBSCRIPTIONS_STRIPE_REQUEST: "SAVE_SUBSCRIPTIONS_STRIPE_REQUEST",
  SAVE_SUBSCRIPTIONS_FAILURE: "SAVE_SUBSCRIPTIONS_FAILURE",
  GET_ALL_SUBSCRIPTIONS: "GET_ALL_SUBSCRIPTIONS",
  GET_SINGLE_SUBSCRIPTION: "GET_SINGLE_SUBSCRIPTION",
};

export const ProfileConstants = {
  PROFILE_REQUEST: "PROFILE_REQUEST",
  PROFILE_AVATAR_REQUEST: "PROFILE_AVATAR_REQUEST",
  PROFILE_AVATAR_SUCCESS: "PROFILE_AVATAR_SUCCESS",
  PROFILE_SUCCESS: "PROFILE_SUCCESS",
  GET_PROFILE_REQUEST: "GET_PROFILE_REQUEST",
  DELETE_USER_REQUEST: "DELETE_USER_REQUEST",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE: "DELETE_USER_FAILURE",
  GET_PROFILE_SUCCESS: "GET_PROFILE_SUCCESS",
  GET_PROFILE_FAILURE: "GET_PROFILE_FAILURE",
  ORGANIZATION_PROFILE_SUCCESS: "ORGANIZATION_PROFILE_SUCCESS",
  ORGANIZATION_PROFILE_REQUEST: "ORGANIZATION_PROFILE_REQUEST",
  ORGANIZATION_PROFILE_FAILURE: "ORGANIZATION_PROFILE_FAILURE",
  USER_PASSWORD_SUCCESS: "USER_PASSWORD_SUCCESS",
  USER_PASSWORD_REQUEST: "USER_PASSWORD_REQUEST",
  USER_PASSWORD_FAILURE: "USER_PASSWORD_FAILURE",
  PROFILE_NAME: "PROFILE_NAME",
};
export const ProjectConstants = {
  PROJECT_CREATE_REQUEST: "PROJECT_CREATE_REQUEST",
  PROJECT_CREATE_SUCCESS: "PROJECT_CREATE_SUCCESS",
  PROJECT_CREATE_FAILURE: "PROJECT_CREATE_FAILURE",
  PROJECT_UPDATE: "PROJECT_UPDATE",
  PROJECT_GET: "PROJECT_GET",
  ALL_PROJECTS_GET: "ALL_PROJECTS_GET",
  CLONE_PROJECT_REQUEST: "CLONE_PROJECT_REQUEST",
  CLONE_PROJECT_SUCCESS: "CLONE_PROJECT_SUCCESS",
  CLONE_RPOJECT_FAILED: "CLONE_RPOJECT_FAILED",
  ASSIGNE_PROJECT_USERS_REQUEST: "ASSIGNE_PROJECT_USERS_REQUEST",
  ASSIGNE_PROJECT_USERS_SUCCESS: "ASSIGNE_PROJECT_USERS_SUCCESS",
  ASSIGNE_PROJECT_USERS_FAILURE: "ASSIGNE_PROJECT_USERS_FAILURE",
  //assigned admin
  PROJECT_OWNERSHIP_REQUEST: "PROJECT_OWNERSHIP_REQUEST",
  PROJECT_OWNERSHIP_SUCCESS: "PROJECT_OWNERSHIP_SUCCESS",
  PROJECT_OWNERSHIP_FAILURE: "PROJECT_OWNERSHIP_FAILURE",
  GET_PROJECT_USER_BY_PROJECTID_REQUEST: "GET_PROJECT_USER_BY_PROJECTID_REQUEST",
  GET_PROJECT_USER_BY_PROJECTID_SUCCESS: "GET_PROJECT_USER_BY_PROJECTID_SUCCESS",
  GET_PROJECT_USER_BY_PROJECTID_FAILURE: "GET_PROJECT_USER_BY_PROJECTID_FAILURE",
  GET_PROJECT_USER_BY_ADMINID_REQUEST: "GET_PROJECT_USER_BY_ADMINID_REQUEST",
  GET_PROJECT_USER_BY_ADMINID_SUCCESS: "GET_PROJECT_USER_BY_ADMINID_SUCCESS",
  GET_PROJECT_USER_BY_ADMINID_FAILURE: "GET_PROJECT_USER_BY_ADMINID_FAILURE",
  DELETE_PROJECT_REQUEST: "DELETE_PROJECT_REQUEST",
  DELETE_PROJECT_SUCCESS: "DELETE_PROJECT_SUCCESS",
  DELETE_PROJECT_FAILED: "DELETE_PROJECT_FAILED"
};

export const diagramConstant = {
  ADDEDGE: "ADDEDGE",
  DELETE_CSV: "DELETE_CSV",
  ADD_VALUE_STREAM: "ADD_VALUE_STREAM",
  DELETE_VALUE_STREAM: "DELETE_VALUE_STREAM",
  UPDATE_VALUE_STREAM: "UPDATE_VALUE_STREAM",
  GET_VALUE_STREAM: "GET_VALUE_STREAM",
  ADD_NEW_PERSONA: "ADD_NEW_PERSONA",
  GET_PERSONA_DATA: "GET_PERSONA_DATA",
  UPDATE_PERSONA_DATA: "UPDATE_PERSONA_DATA",
  ADD_NEW_ELEMENT: "ADD_NEW_ELEMENT",
  LOADDATA: "LOADDATA",
  LOAD_TABLE_DATA_FROM_BACKEND: 'LOAD_TABLE_DATA_FROM_BACKEND',
  ADD_NEW_FORM_NODE_DATA: 'ADD_NEW_FORM_NODE_DATA',
  CLOSE_FORM_NODE_DATA: 'CLOSE_FORM_NODE_DATA',
  UPDATE_NEW_FORM_NODE_DATA: 'UPDATE_NEW_FORM_NODE_DATA',
  DELETE_NEW_FORM_NODE_DATA: 'DELETE_NEW_FORM_NODE_DATA',
  FOR_CSV_WITH_VALUE_STREAM: 'FOR_CSV_WITH_VALUE_STREAM',
};
export const kanbanConstant = {
  GENERATE_KANBAN: "GENERATE_KANBAN",
  GET_ALL_LANE_SUCCESS: "GET_ALL_LANE_SUCCESS",
  GET_ALL_KANBAN_SUCCESS: "GET_ALL_KANBAN_SUCCESS",
  GET_SINGLE_KANBAN_SUCCESS: "GET_SINGLE_KANBAN_SUCCESS",
  DELETE_SINGLE_KANBAN_SUCCESS: "DELETE_SINGLE_KANBAN_SUCCESS",
  UPDATE_SINGLE_KANBAN_SUCCESS: "UPDATE_SINGLE_KANBAN_SUCCESS",
  UPDATE_LANE_DRAG: "UPDATE_LANE_DRAG",
  ADD_NEW_KANBAN_EMPTY: "ADD_NEW_KANBAN_EMPTY",
  UPDATE_KANBAN_CARD: "UPDATE_KANBAN_CARD",
  ADD_KANBAN_LANE: "ADD_KANBAN_LANE",
  UPDATE_KANBAN_LANE: "UPDATE_KANBAN_LANE",
  DELETE_KANBAN_LANE: "DELETE_KANBAN_LANE",
  DOCUMENT_DELETE_REQUEST: "DOCUMENT_DELETE_REQUEST",
  DOCUMENT_DELETE_SUCCESS: "DOCUMENT_DELETE_SUCCESS",
  ADD_ESTIMATE_TIME: "ADD_ESTIMATE_TIME",
  GET_USERS_LANE_SUCCESS: "GET_USERS_LANE_SUCCESS",
  IMAGE_PREVIEW: "IMAGE_PREVIEW"
};
export const riskAndIssueConstant = {
  GET_ALL_RISK_AND_LANE_SUCCESS: "GET_ALL_RISK_AND_LANE_SUCCESS",
  GET_SINGLE_ATTACHMENTS_DATA_BY_CARD: "GET_SINGLE_ATTACHMENTS_DATA_BY_CARD",
  GET_SINGLE_TREATMENTS_CARD: "GET_SINGLE_TREATMENTS_CARD",
  REMOVE_SINGLE_TREATMENTS_CARD: "REMOVE_SINGLE_TREATMENTS_CARD",
  REMOVE_SINGLE_ATTACHMENTS_DATA_BY_CARD: "REMOVE_SINGLE_ATTACHMENTS_DATA_BY_CARD",
  GET_ALL__RISK_AND_ISSUE_CARD_SUCCESS: "GET_ALL__RISK_AND_ISSUE_CARD_SUCCESS",
  GET_ALL_RISK_KANBAN_SUCCESS: "GET_ALL_RISK_KANBAN_SUCCESS",
  GET_SINGLE_KANBAN_SUCCESS: "GET_SINGLE_KANBAN_SUCCESS",
  GET_SINGLE_CARD_SUCCESS: "GET_SINGLE_CARD_SUCCESS",
  UPDATE_SINGLE_KANBAN_SUCCESS: "UPDATE_SINGLE_KANBAN_SUCCESS",
  UPDATE_LANE_DRAG: "UPDATE_LANE_DRAG",
  ADD_NEW_KANBAN_EMPTY: "ADD_NEW_KANBAN_EMPTY",
  UPDATE_KANBAN_CARD: "UPDATE_KANBAN_CARD",
  ADD_KANBAN_LANE: "ADD_KANBAN_LANE",
  UPDATE_KANBAN_LANE: "UPDATE_KANBAN_LANE",
  DELETE_KANBAN_LANE: "DELETE_KANBAN_LANE",
  DOCUMENT_DELETE_REQUEST: "DOCUMENT_DELETE_REQUEST",
  DOCUMENT_DELETE_SUCCESS: "DOCUMENT_DELETE_SUCCESS",
  ADD_ESTIMATE_TIME: "ADD_ESTIMATE_TIME",
  GET_USERS_LANE_SUCCESS: "GET_USERS_LANE_SUCCESS"
};
export const journeyMapConstant = {
  GET_ALL_RISK_AND_LANE_SUCCESS: "GET_ALL_RISK_AND_LANE_SUCCESS",
  GET_SINGLE_ATTACHMENTS_DATA_BY_CARD: "GET_SINGLE_ATTACHMENTS_DATA_BY_CARD",
  GET_SINGLE_TREATMENTS_CARD: "GET_SINGLE_TREATMENTS_CARD",
  REMOVE_SINGLE_TREATMENTS_CARD: "REMOVE_SINGLE_TREATMENTS_CARD",
  REMOVE_SINGLE_ATTACHMENTS_DATA_BY_CARD: "REMOVE_SINGLE_ATTACHMENTS_DATA_BY_CARD",
  GET_ALL__RISK_AND_ISSUE_CARD_SUCCESS: "GET_ALL__RISK_AND_ISSUE_CARD_SUCCESS",
  GET_ALL_RISK_KANBAN_SUCCESS: "GET_ALL_RISK_KANBAN_SUCCESS",
  GET_SINGLE_KANBAN_SUCCESS: "GET_SINGLE_KANBAN_SUCCESS",
  GET_SINGLE_CARD_SUCCESS: "GET_SINGLE_CARD_SUCCESS",
  UPDATE_SINGLE_KANBAN_SUCCESS: "UPDATE_SINGLE_KANBAN_SUCCESS",
  UPDATE_LANE_DRAG: "UPDATE_LANE_DRAG",
  ADD_NEW_KANBAN_EMPTY: "ADD_NEW_KANBAN_EMPTY",
  UPDATE_KANBAN_CARD: "UPDATE_KANBAN_CARD",
  ADD_KANBAN_LANE: "ADD_KANBAN_LANE",
  UPDATE_KANBAN_LANE: "UPDATE_KANBAN_LANE",
  DELETE_KANBAN_LANE: "DELETE_KANBAN_LANE",
  DOCUMENT_DELETE_REQUEST: "DOCUMENT_DELETE_REQUEST",
  DOCUMENT_DELETE_SUCCESS: "DOCUMENT_DELETE_SUCCESS",
  ADD_ESTIMATE_TIME: "ADD_ESTIMATE_TIME",
  GET_USERS_LANE_SUCCESS: "GET_USERS_LANE_SUCCESS"
};

export const websocketConstant = {
  REF_CONNECT: 'REF_CONNECT',
  SENDMESSAGE: 'SENDMESSAGE',
  ONCONNECT: 'ONCONNECT',
  DISCONNECT: 'DISCONNECT',
}

export const logHour = {
  FETCH_LOG_HOURS_REQUEST: "FETCH_LOG_HOURS_REQUEST",
  FETCH_LOG_HOURS_SUCCESS: "FETCH_LOG_HOURS_SUCCESS",
  FETCH_LOG_HOURS_FAILED: "FETCH_LOG_HOURS_FAILED",
  ADD_LOG_HOUR: "ADD_LOG_HOUR",
  FETCH_LOG_HOUR_REQUEST: "FETCH_LOG_HOUR_REQUEST",
  FETCH_LOG_HOUR_SUCCESS: "FETCH_LOG_HOUR_SUCCESS",
  FETCH_LOG_HOUR_FAILED: "FETCH_LOG_HOUR_FAILED",
  UPDATE_LOG_HOUR_SUCCESS: "UPDATE_LOG_HOUR_SUCCESS",
  UPDATE_LOG_HOUR_FAILED: "UPDATE_LOG_HOUR_FAILED",
  DELETE_LOG_HOUR_SUCCESS: "DELETE_LOG_HOUR_SUCCESS",
  DELETE_LOG_HOUR_FAILED: "DELETE_LOG_HOUR_FAILED",
  FIND_LOG_HOUR_BYCARD_REQUEST: "FIND_LOG_HOUR_BYCARD_REQUEST",
  FIND_LOG_HOUR_BYCARD_SUCCESS: "FIND_LOG_HOUR_BYCARD_SUCCESS",
  FIND_LOG_HOUR_BYCARD_FAILED: "FIND_LOG_HOUR_BYCARD_FAILED",
}

export const logEnable = {
  FETCH_ENABLE_LOGHOUR_REQUEST: "FETCH_ENABLE_LOGHOUR_REQUEST",
  FETCH_ENABLE_LOGHOUR_SUCCESS: "FETCH_ENABLE_LOGHOUR_SUCCESS",
  FETCH_ENABLE_LOGHOUR_FAILED: "FETCH_ENABLE_LOGHOUR_FAILED",
  UPDATE_LOGHOUR_ENABLE_SUCCESS: "UPDATE_LOGHOUR_ENABLE_SUCCESS",
  UPDATE_LOGHOUR_ENABLE_FAILED: "UPDATE_LOGHOUR_ENABLE_FAILED",
}

export const problemStatement = {
  CREATE_PROBLEM_STATEMENT_REQUEST: "CREATE_PROBLEM_STATEMENT_REQUEST",
  CREATE_PROBLEM_STATEMENT_SUCCESS: "CREATE_PROBLEM_STATEMENT_SUCCESS",
  CREATE_PROBLEM_STATEMENT_FAILED: "CREATE_PROBLEM_STATEMENT_FAILED",
  GET_PROBLEM_STATEMENT_REQUEST: "GET_PROBLEM_STATEMENT_REQUEST",
  GET_PROBLEM_STATEMENT_SUCCESS: "GET_PROBLEM_STATEMENT_SUCCESS",
  GET_PROBLEM_STATEMENT_FAILED: "GET_PROBLEM_STATEMENT_FAILED",
  UPDATE_PROBLEM_STATEMENT_REQUEST: "UPDATE_PROBLEM_STATEMENT_REQUEST",
  UPDATE_PROBLEM_STATEMENT_SUCCESS: "UPDATE_PROBLEM_STATEMENT_SUCCESS",
  UPDATE_PROBLEM_STATEMENT_FAILED: "UPDATE_PROBLEM_STATEMENT_FAILED"
}

export const personas = {
  CREATE_PERSONAS_REQUEST: "CREATE_PERSONAS_REQUEST",
  CREATE_PERSONAS_SUCCESS: "CREATE_PERSONAS_SUCCESS",
  CREATE_PESONAS_FAILED: "CREATE_PESONAS_FAILED",
  GET_PERSONAS_REQUEST: "GET_PERSONAS_REQUEST",
  GET_PERSONAS_SUCCESS: "GET_PERSONAS_SUCCESS",
  GET_PERSONAS_FAILED: "GET_PERSONAS_FAILED",
  GET_SINGLEP_PERSONAS_REQUEST: "GET_SINGLEP_PERSONAS_REQUEST",
  GET_SINGLEP_PERSONAS_SUCCESS: "GET_SINGLEP_PERSONAS_SUCCESS",
  GET_SINGLEP_PERSONAS_FAILED: "GET_SINGLEP_PERSONAS_FAILED",
  UPDATE_PERSONAS_REQUEST: "UPDATE_PERSONAS_REQUEST",
  UPDATE_PERSONAS_SUCCESS: "UPDATE_PERSONAS_SUCCESS",
  UPDATE_PERSONAS_FAILED: "UPDATE_PERSONAS_FAILED",
  CREATE_PERSONAS_ITEM_LIST_REQUEST: "CREATE_PERSONAS_ITEM_LIST_REQUEST",
  CREATE_PERSONAS_ITEM_LIST_SUCCESS: "CREATE_PERSONAS_ITEM_LIST_SUCCESS",
  CREATE_PERSONAS_ITEM_LIST_FAILED: "CREATE_PERSONAS_ITEM_LIST_FAILED",
  GET_PERSONAS_ITEM_LIST_REQUEST: "GET_PERSONAS_ITEM_LIST_REQUEST",
  GET_PERSONAS_ITEM_LIST_SUCCESS: "GET_PERSONAS_ITEM_LIST_SUCCESS",
  GET_PERSONAS_ITEM_LIST_FAILED: "GET_PERSONAS_ITEM_LIST_FAILED",
  UPDATE_PERSONAS_ITEM_LIST_REQUEST: "UPDATE_PERSONAS_ITEM_LIST_REQUEST",
  UPDATE_PERSONAS_ITEM_LIST_SUCCESS: "UPDATE_PERSONAS_ITEM_LIST_SUCCESS",
  UPDATE_PERSONAS_ITEM_LIST_FAILED: "UPDATE_PERSONAS_ITEM_LIST_FAILED",
  DELETE_SINGLE_PERSONA_REQUEST: "DELETE_SINGLE_PERSONA_REQUEST",
  DELETE_SINGLE_PERSONA_SUCCESS: "DELETE_SINGLE_PERSONA_SUCCESS",
  DELETE_SINGLE_PERSONA_FAILED: "DELETE_SINGLE_PERSONA_FAILED"
}