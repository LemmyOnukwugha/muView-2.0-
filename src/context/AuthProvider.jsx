import React, { useReducer } from "react"

export const AuthContext = React.createContext()

const initialState = {
  user: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        user: action.payload,
      }
    case "SIGN_OUT":
      return {
        user: null,
      }
    default:
      return state
  }
}
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    authReducer,
    {
      user: null,
    },
    () => {
      const token = localStorage.getItem("token")
      return token
        ? { user: token }
        : {
            user: null,
          }
    }
  )

  const handleSignIn = (user) => {
    dispatch({ type: "SIGN_IN", payload: user })
  }
  const handleSignOut = () => {
    localStorage.removeItem("token")
    dispatch({ type: "SIGN_OUT" })
  }
  return (
    <AuthContext.Provider value={{ auth: state, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
