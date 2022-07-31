import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signOutUser,
  signInAuthUserWithEmailAndPassword,
  createUserAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { USER_ACTION_TYPES } from "./user.types";
import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
  signUpFailed,
  signUpSuccess,
} from "./user.action";

import { User } from "firebase/auth";

import {  AdditionalData_type } from "./user.types";
import { emailSignInStart_type, signUpStart_type,signUpSuccess_type } from "./user.action";

//replacement  for observer function everytime user signUp, signIn, signOut
export function* setSnapShotUserDocumentFromAuth(userAuth:User, additionalData?:AdditionalData_type) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalData
    );

    if(userSnapshot){
        yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
  
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(setSnapShotUserDocumentFromAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    if (user) {
      yield* call(setSnapShotUserDocumentFromAuth, user);
    }
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({ payload: { email, password }}:emailSignInStart_type) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield* call(setSnapShotUserDocumentFromAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({ payload: { email, password, displayName } }:signUpStart_type) {
  try {
    const { user } = yield call(
      createUserAuthWithEmailAndPassword,
      email,
      password
    );
    user.displayName = displayName;
    yield* put(signUpSuccess(user));
  } catch (error) {
    yield* put(signUpFailed(error  as Error));
  }
}

export function* signInAfterSignUp({ payload: user }:signUpSuccess_type) {
  console.log(user);
  try {
    yield* call(setSnapShotUserDocumentFromAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}
export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
