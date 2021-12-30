import { useState } from 'react'

const useAdminDynamicForm = (validValue) => {

    let [enterValue, setEnterValue] = useState('');
    let [onTouch, setOnTouch] = useState(false);

    let enterValueIsValid = validValue(enterValue);

    let forErrorMsg = !enterValueIsValid && onTouch;

    let changeHandler = (event) => {
        setEnterValue(event.target.value);
    }

    let blurHandler = () => {
        setOnTouch(true);
    }


    let restValue = () => {
        setEnterValue("");
        setOnTouch(false)
    }
    return {
        value: enterValue,
        valueIsValid: enterValueIsValid,
        errorMsg: forErrorMsg,
        changeHandler,
        blurHandler,
        rest: restValue
    }
}

export default useAdminDynamicForm
