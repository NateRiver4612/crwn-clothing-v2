import { createSelector } from "reselect";

const userReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
  [userReducer],
  (user) => user.currentUser
);

// export const selectCurrentUser = (state) => state.user.currentUser;
