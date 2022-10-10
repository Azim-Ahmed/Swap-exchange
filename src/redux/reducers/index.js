import { combineReducers } from "redux";
import { authConstants } from "../actions/constant";
import authReducer from "./auth.reducers";
import userReducer from "./user.reducer";
import marginReducer from "./margin.reducer";
import socketReducer from "./websocket.reducer";



const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  socket: socketReducer,
  margin: marginReducer
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === authConstants.LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};
// const rootReducer = combineReducers({
//   auth: authReducer,
//   user: userReducer,
//   diagram: diagramReducer,
//   socket: websocketConstant,
//   orgprofile: Orgprofile,
//   projects: projectReducer,
// });
export default rootReducer;
