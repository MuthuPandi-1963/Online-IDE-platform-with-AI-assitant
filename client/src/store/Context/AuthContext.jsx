import { createContext, useReducer } from "react";

export const AuthContext = createContext()

const initialState = {
    name :'',
    isActive : false
}

function AuthContextReducer(state,action){
    switch (action.type) {
        case "register":
            return { name: "register", isActive: true };
        case "login":
            return { name: "login", isActive: true };
        case "verifyEmail":
            return { name: "verifyEmail", isActive: true };
        case "otp":
            return { name: "otp", isActive: true };
            case "verifyOTP":
                return { name: "verifyOTP", isActive: true };
        case "resetPassword":
            return { name: "resetPassword", isActive: true };
        case "close":
            return { name: "", isActive: false };
        default:
            return state;
    }
}


export default function AuthContextProvider({children}) {

    const [authState,authDispatch]= useReducer(AuthContextReducer,initialState)
    return(
        <AuthContext.Provider value={{authState,authDispatch}} >
            {children}
        </AuthContext.Provider>
    )
}

