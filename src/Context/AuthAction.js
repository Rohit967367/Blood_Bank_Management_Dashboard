export const logStart = () => ({
    type: "LOGIN_START",
})

export const LogSuccess = (payload) => ({
    type: "LOGIN_SUCCESS",
    payload
})
export const LogFailure = () => ({
    type: "LOGIN_FAILURE"
})
export const logOut = () => ({
    type: "LOG_OUT"
})




