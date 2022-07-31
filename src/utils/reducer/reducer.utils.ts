import { AnyAction } from "redux";

// Define return-type for withMacher function
// every matchable action creator function will have extension which are type and match method    
type Matchable<AC extends ()=> AnyAction> = AC & {
  type: ReturnType<AC>['type'],
  //create match method to receive action
  match(action: AnyAction): action is ReturnType<AC>;   
}  

export function withMatcher<AC extends ()=> AnyAction & {type:string}>(actionCreator: AC): Matchable<AC>

export function withMatcher<AC extends (...agrs: any)=> AnyAction & {type: string}>(actionCreator:AC): Matchable<AC>

export function withMatcher(actionCreator: Function){
    const type = actionCreator().type

    // Using function assignment to extend the ability of actionCreator 
    // in this case, using match() to reach the type of the actionCreator
    // and check if it's match with type of the action get dispatched to the reducer  
    return Object.assign(actionCreator,{
        type,
        match(action: AnyAction){
            return action.type === type  
        }
    })
}

//Define return-type for actions that receive payload 
export type ActionWithPayload<T,P> = {
    type: T,
    payload: P
}  

//Define return-type for actions that not receive payload 
export type Action<T> = {
    type: T
}


// * function overloading 
// createAction is overloaded accordingly for each ACTION_TYPE

export function createAction<T extends String,P >(type: T, payload:P): ActionWithPayload<T,P>

export function createAction<T extends String>(type: T, payload: void): Action<T> 

export function createAction<T extends String, P>(type: T, payload: P){
    return {type, payload}
}
