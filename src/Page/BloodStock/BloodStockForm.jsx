import axios from 'axios';
import React from 'react'
import useAdminDynamicForm from '../../Dashboard/AdminDynamicForm'
import Model from '../../Dashboard/Model'
import './BloodStockForm.css'

export const BloodStockForm = ({ onClose }) => {

    const {
        value: bloodName,
        valueIsValid: BloodNameIsValid,
        errorMsg: BloodNameIsNotValid,
        changeHandler: BloodNameChangeHander,
        blurHandler: BloodNameBlurHander,
        rest: BloodNameRest
    } = useAdminDynamicForm(value => value.trim() !== '');

    const {
        value: rh,
        valueIsValid: rhIsValid,
        errorMsg: rhIsNotValid,
        changeHandler: rhChangeHander,
        blurHandler: rhBlurHander,
        rest: rhRest
    } = useAdminDynamicForm(value => value.trim() !== '');

    const {
        value: componentName,
        valueIsValid: componentNameIsValid,
        errorMsg: componentNameIsNotValid,
        changeHandler: componentNameChangeHander,
        blurHandler: componenetNameBlurHander,
        rest: componentNameRest
    } = useAdminDynamicForm(value => value.trim() !== '');

    const {
        value: unit,
        valueIsValid: unitIsValid,
        errorMsg: unitIsNotValid,
        changeHandler: unitChangeHander,
        blurHandler: unitBlurHander,
        rest: unitRest
    } = useAdminDynamicForm(value => value.trim() !== '');

    const {
        value: price,
        valueIsValid: priceIsValid,
        errorMsg: priceIsNotValid,
        changeHandler: priceChangeHander,
        blurHandler: priceBlurHander,
        rest: priceRest
    } = useAdminDynamicForm(value => value.trim() !== '');

    let formIsValid = false;
    if (BloodNameIsValid && rhIsValid && componentNameIsValid && unitIsValid && priceIsValid) {
        formIsValid = true
    }

    let unitInNum = parseFloat(unit)

    const data = { bloodName, rh, componentName, price, unit: unitInNum }

    const onSubmitForm = async (event) => {
        event.preventDefault();

        if (formIsValid) {
            try {
                await axios.post("http://localhost:8800/api/bloodStock", data, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("isAdmin")).accessToken
                    },
                })
                console.log(data);
                window.alert(`Submited`);

            } catch (error) {
                window.alert(error)
            }

            BloodNameRest();
            rhRest();
            componentNameRest();
            unitRest();
            priceRest();

        } else {
            window.alert("please fill proper details")
        }
    }
    return (
        <div>
            <Model onClose={onClose}>
                <form className="bloodStock" onSubmit={onSubmitForm}>
                    <div className="StockName">
                        <label htmlFor="bloodName">Blood Name</label>
                        <input type="text" value={bloodName} onChange={BloodNameChangeHander} onBlur={BloodNameBlurHander} />
                        {BloodNameIsNotValid && <p>Please Give Blood Name</p>}
                    </div>
                    <div className="StockName">
                        <label htmlFor="rh">RH Type</label>
                        <select type="text" value={rh} onChange={rhChangeHander} onBlur={rhBlurHander}
                        >
                            <option value="null">Select</option>
                            <option value="positive">Positive</option>
                            <option value="negative">Negative</option>
                        </select>
                        {rhIsNotValid && <p>Please Give rh Name</p>}
                    </div>
                    <div className="StockName">
                        <label htmlFor="componenetName">Component Blood</label>
                        <input type="text" value={componentName} onChange={componentNameChangeHander} onBlur={componenetNameBlurHander} />
                        {componentNameIsNotValid && <p>Please Give Component Name</p>}
                    </div>
                    <div className="StockName">
                        <label htmlFor="unit">Unit</label>
                        <input type="text" value={unit} onChange={unitChangeHander} onBlur={unitBlurHander} />
                        {unitIsNotValid && <p>Please Give unit</p>}
                    </div>
                    <div className="StockName">
                        <label htmlFor="price">Price</label>
                        <input type="text" value={price} onChange={priceChangeHander} onBlur={priceBlurHander} />
                        {priceIsNotValid && <p>Please Give unit</p>}
                    </div>
                    <div className="BlooodStockButton">
                        <button onClick={onClose}>Black</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </Model>
        </div>
    )
}
