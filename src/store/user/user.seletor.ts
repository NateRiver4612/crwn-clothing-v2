import { createSelector } from "reselect";
import { RootState } from "../store";
import { USER_STATE_TYPE } from "./user.reducer";

const user = (state:RootState):USER_STATE_TYPE => state.user;

export const selectCurrentUser = createSelector(
  [user],
  (user) => user.currentUser
);
