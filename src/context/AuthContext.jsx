import { useReducer } from "react"
import AuthReducer from "./AuthReducer"
import { useEffect } from "react"
import { createContext } from "react"
const INITIAL_STATE = {
    // currentUser:JSON.parse(localStorage.getItem('user')) || null,
    currentUser:JSON.parse(localStorage.getItem("user")) || null
}
export const AuthContext = createContext(INITIAL_STATE)
export const AuthContextProvider = ({children}) => {
  const [state,dispatch] = useReducer(AuthReducer, INITIAL_STATE )
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.currentUser))
  },[state.currentUser])
  return (
    <div>
        <AuthContext.Provider value={{currentUser:state.currentUser, dispatch}}>
            {children}
        </AuthContext.Provider>
    </div>
  )
}
// export default AuthContextProvider