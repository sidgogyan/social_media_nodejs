
import { createContext,useReducer } from "react";
import AuthReducer from "./AuthReducers";

const INITIAL_STATE={

    user:localStorage.getItem("user"),
    // user:{"_id":"611d459fbda4671594f5f9ac",
    // "profilePicture":"https://www.bollywoodhungama.com/wp-content/uploads/2020/04/El-Profesor-aka-%C3%81lvaro-Morte-shares-an-emotional-video-from-the-last-day-of-Money-Heist-shooting.jpg",
    // "coverPicture":"",
    // "followers":[],
    // "following":["611bb74dae97a173282e1f36"],
    // "isAdmin":false,
    // "username":"professer",
    // "email":"m1@gmail.com",
    // "password":"$2b$10$UkmAmeo4MVaxkO/kQNSEfOjwUkqJnNMmS51zymHSExUb6/fA0IDDS",
    // "createdAt":{"$date":{"$numberLong":"1629308319245"}},
    // "updatedAt":{"$date":{"$numberLong":"1629381790733"}},
    // "__v":{"$numberInt":"0"}},
  isFecthing:false,
   error:false
 };

export const AuthContext=createContext(INITIAL_STATE);


export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE)

    return(
        <AuthContext.Provider  value={{user:state.user,isFecthing:state.isFecthing,error:state.error,dispatch}}>
      
      {children}
        </AuthContext.Provider>
    )
}