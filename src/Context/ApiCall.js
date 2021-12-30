
import axios from "axios";
import { logStart, LogFailure, LogSuccess } from "./AuthAction";

export const LoginFunct = async (user, dispatch) => {
    dispatch(logStart());
    try {
        const res = await axios.post("http://localhost:8800/api/auth/login", user);
        const { firstName, confirmPassword, createdAt, lastName, phoneNumber, updatedAt, _id, __v, email, ...info } = res.data
        res.data.isAdmin && dispatch(LogSuccess(info));
        if (res.data.isAdmin === false) {
            window.alert(`Dear, You are not admin so don't try to login`);
        }
        console.log(res.data.isAdmin, res.data.accessToken)
    } catch (error) {
        dispatch(LogFailure());
        window.alert(`Dear Admin, Please Enter Your Correct Email & Password`)
    }
}