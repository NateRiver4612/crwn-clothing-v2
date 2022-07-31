import { USER_ACTION_TYPES, UserData_type } from "./user.types";
import { createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import {User} from 'firebase/auth'

//Define return-types for action-creator functions 

export type googleSignInStart_type = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>

export type emailSignInStart_type = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START,{email: string, password: string}>

export type signInSuccess_type = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData_type>

export type signInFailed_type = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>

export type checkUserSession_type = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>

export type signOutStart_type = Action<USER_ACTION_TYPES.SIGN_OUT_START>

export type signOutSuccess_type = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>

export type signOutFailed_type = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>

export type signUpStart_type = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, 
{
    email:string,
    password:string,
    displayName:string,
}>

export type signUpSuccess_type = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, User>

export type signUpFailed_type = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>






export const googleSignInStart = withMatcher(():googleSignInStart_type =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START));

export const emailSignInStart = withMatcher((email: string, password: string):emailSignInStart_type =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password }));

export const signInSuccess = withMatcher((user: UserData_type & {id: string}): signInSuccess_type =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user));

export const signInFailed = withMatcher((error:Error): signInFailed_type =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error));

export const checkUserSession = withMatcher(():checkUserSession_type =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));

export const signOutStart = withMatcher(():signOutStart_type =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START));

export const signOutSuccess = withMatcher(():signOutSuccess_type =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS));

export const signOutFailed = withMatcher((error: Error):signOutFailed_type =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error));

export const signUpStart = withMatcher((email:string, password:string, displayName:string):signUpStart_type =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  }));

export const signUpSuccess = withMatcher((user: User):signUpSuccess_type =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, user));

export const signUpFailed = withMatcher((error: Error):signUpFailed_type =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error));
