import { useReducer, createContext, useEffect } from "react"
import AuthReducer from "./AuthReducer"

const initialState = {
    user: JSON.parse(localStorage.getItem("isAdmin")) || null,
    isFetching: false,
    error: false,
}

export const AuthContext = createContext(initialState)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    useEffect(() => {
        localStorage.setItem("isAdmin", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;