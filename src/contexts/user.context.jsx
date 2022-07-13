// import { createContext, useState, useEffect, useReducer } from "react";
// import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
// import { createAction } from "../utils/reducer/reducer.utils";

// export const UserContext = createContext({
//     setCurrentUser: () => null,
//     currentUser: null
// })

// const USER_ACTION_TYPES = {
//     SET_CURRENT_USER: 'SET_CURRENT_USER',
// };

// const INITIAL_STATE = {
//     currentUser: null
// }

// const UserReducer = (state, action) => {
//     const { type, payload } = action

//     switch (type) {
//         case USER_ACTION_TYPES.SET_CURRENT_USER:
//             return {
//                 ...state,
//                 currentUser: payload
//             }
//         default:
//             throw new Error(`Unhandled type ${type} in userReducer`);
//     }

// }


// export const UserProvider = ({ children }) => {
//     const [{ currentUser }, dispatch] = useReducer(UserReducer, INITIAL_STATE);

//     const setCurrentUser = (user) =>
//         dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

//     useEffect(() => {
//         const unsubscribe = onAuthStateChangedListener((user) => {
//             if (user) {
//                 createUserDocumentFromAuth(user)
//             }
//             setCurrentUser(user)
//         })

//         return unsubscribe;
//     }, [])

//     const value = {
//         currentUser,
//     };

//     return <UserContext.Provider value={value}>{children}</UserContext.Provider>
// }