import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import useAdminDynamicForm from '../../Dashboard/AdminDynamicForm'
import Model from '../../Dashboard/Model'
import './DonorForm.css'

const DonorForm = (props) => {


    let UserName = useRef();
    let FirstName = useRef();
    // let LastName = useRef();
    let {
        value: firstName,
        valueIsValid: firstNameIsValid,
        errorMsg: firstNameIsNotValid,
        rest: firstNameRest,
        changeHandler: firstNameChangeHandler,
        blurHandler: firstNameBlurHandler,
    } = useAdminDynamicForm(value => value.trim() !== '')

    let {
        value: lastName,
        valueIsValid: lastNameIsValid,
        errorMsg: lastNameIsNotValid,
        rest: lastNameRest,
        changeHandler: lastNameChangeHandler,
        blurHandler: lastNameBlurHandler,
    } = useAdminDynamicForm(value => value.trim() !== '')

    // let {
    //     value: userName,
    //     valueIsValid: userNameIsValid,
    //     errorMsg: userNameIsNotValid,
    //     rest: userNameRest,
    //     changeHandler: userNameChangeHandler,
    //     blurHandler: userNameBlurHandler,
    // } = useAdminDynamicForm(value => value.trim() !== '')

    let {
        value: bloodGroup,
        valueIsValid: bloodGroupIsValid,
        errorMsg: bloodGroupIsNotValid,
        rest: bloodGroupRest,
        changeHandler: bloodGroupChangeHandler,
        blurHandler: bloodGroupBlurHandler,
    } = useAdminDynamicForm(value => value.trim() !== '')

    let {
        value: date,
        valueIsValid: dateIsValid,
        errorMsg: dateIsNotValid,
        rest: dateRest,
        changeHandler: dateChangeHandler,
        blurHandler: dateBlurHandler,
    } = useAdminDynamicForm(value => value.trim() !== '')

    // let {
    //     value: email,
    //     valueIsValid: emailIsValid,
    //     errorMsg: emailIsNotValid,
    //     rest: emailRest,
    //     changeHandler: emailChangeHandler,
    //     blurHandler: emailBlurHandler,
    // } = useAdminDynamicForm(value => value.includes('@'))

    let {
        value: phone,
        valueIsValid: phoneIsValid,
        errorMsg: phoneIsNotValid,
        rest: phoneRest,
        changeHandler: phoneChangeHandler,
        blurHandler: phoneBlurHandler,
    } = useAdminDynamicForm(value => value.trim().length === 10)

    let {
        value: cardNumber,
        valueIsValid: cardNumberIsValid,
        errorMsg: cardNumberIsNotValid,
        rest: cardNumberRest,
        changeHandler: cardNumberChangeHandler,
        blurHandler: cardNumberBlurHandler,
    } = useAdminDynamicForm(value => value.trim().length === 12)

    let {
        value: unit,
        valueIsValid: unitIsValid,
        errorMsg: unitIsNotValid,
        rest: unitRest,
        changeHandler: unitChanger,
        blurHandler: unitBlur,
    } = useAdminDynamicForm(value => value.trim() !== '')

    let {
        value: address,
        valueIsValid: addressIsValid,
        errorMsg: addressIsNotValid,
        rest: addressRest,
        changeHandler: addressChanger,
        blurHandler: addressBlur,
    } = useAdminDynamicForm(value => value.trim() !== '')

    let {
        value: pinCode,
        valueIsValid: pinCodeIsValid,
        errorMsg: pinCodeIsNotValid,
        rest: pinCodeRest,
        changeHandler: pinCodeChanger,
        blurHandler: pinCodeBlur,
    } = useAdminDynamicForm(value => value.trim() !== '')


    let {
        value: gender,
        valueIsValid: genderIsValid,
        errorMsg: genderIsNotValid,
        rest: genderRest,
        changeHandler: genderChangeHandler,
        blurHandler: genderBlurHandler,
    } = useAdminDynamicForm(value => value.trim().length !== '')

    // let dateCalulate = (date - new Date())


    let formIsValid = false;
    if (firstNameIsValid && lastNameIsValid &&
        // userNameIsValid && 
        // emailIsValid && 
        bloodGroupIsValid &&
        dateIsValid && addressIsValid && pinCodeIsValid &&
        phoneIsValid && unitIsValid &&
        cardNumberIsValid && genderIsValid) {
        formIsValid = true;
    }

    let data = { firstName, lastName, componentName: bloodGroup, unit, DOB: date, phoneNumber: phone, adhaarNumber: cardNumber, address, pinCode, gender };

    const [cName, setCName] = useState([]);
    useEffect(() => {
        const GetUnit = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/bloodStock/BloodName?componentName=${bloodGroup}`)
                setCName(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        GetUnit()
    }, [bloodGroup])
    
    const [bloodList, setBloodList] = useState([]);
    useEffect(() => {
        const GetUnit = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/bloodStock/BloodName`)
                setBloodList(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        GetUnit()
        // console.log(bloodList);
    }, [])

    let donorFormSubmit = async (event) => {
        event.preventDefault();

        if (formIsValid) {



            console.log(firstName, lastName, bloodGroup, date, unit, phone, cardNumber, gender);
            // passData(FirstName.current.value);
            // userNameRest();

            try {

                await axios.post("http://localhost:8800/api/fordonor", data, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("isAdmin")).accessToken
                    },
                })
                window.alert(`Submited`);

            } catch (error) {
                window.alert(error)
            }

            lastNameRest();
            firstNameRest();
            bloodGroupRest();
            dateRest();
            // emailRest();
            phoneRest();
            cardNumberRest();
            genderRest();
            unitRest();
            addressRest();
            pinCodeRest();

        }
        else {
            window.alert("please fill proper details")
        }

        // const BloodID = cName[0]._id
        const BloodID = cName[0]._id;
        const Total = parseFloat(unit) + cName[0].unit
        try {
            await axios.put(`http://localhost:8800/api/bloodStock/update/${BloodID}`, { unit: Total })

        } catch (error) {
            console.log(error);
        }



    }
    // const classForm = !formIsValid ? ' invalid' : 'donorFormContainer';

    return (
        <Model onClose={props.onClose}>
            <form className="donorForm" onSubmit={donorFormSubmit}>
                <div className="donorFormContainer">
                    <div className="donorFormLeft">
                        <div className="donorFormInput">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                ref={UserName}
                                placeholder='First Name'
                                value={firstName}
                                onChange={firstNameChangeHandler}
                                onBlur={firstNameBlurHandler}
                                required />
                            {firstNameIsNotValid && <p>Please Enter Your First Name</p>}
                        </div>
                        <div className="donorFormInput">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                ref={FirstName}
                                placeholder='Last Name'
                                value={lastName}
                                onChange={lastNameChangeHandler}
                                onBlur={lastNameBlurHandler}
                                required />
                            {lastNameIsNotValid && <p>Please Enter Your Last Name</p>}
                        </div>
                        {/* <div className="donorFormInput">
                            <label htmlFor="userName">User Name</label>
                            <input
                                type="text"
                                placeholder='user Name'
                                ref={LastName}
                                value={userName}
                                onChange={userNameChangeHandler}
                                onBlur={userNameBlurHandler}
                                required />
                            {userNameIsNotValid && <p>Please Enter Your User Name</p>}
                        </div> */}

                        <div className="donorFormInput">
                            <label htmlFor="dateOfBirth">Gender</label>
                            <select name="gender" id="gender"
                                value={gender}
                                onChange={genderChangeHandler}
                                onBlur={genderBlurHandler}
                            >
                                <option value="null">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {genderIsNotValid && <p>Please Enter Your Blood Group</p>}
                        </div>

                        <div className="donorFormInput">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input type="date"
                                placeholder='DOB'
                                value={date}
                                onChange={dateChangeHandler}
                                onBlur={dateBlurHandler}
                                required />
                            {dateIsNotValid && <p>Please Enter Your Date Of Birth</p>}
                        </div>

                        <div className="donorFormInput">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                placeholder='Phone Number'
                                value={phone}
                                onChange={phoneChangeHandler}
                                onBlur={phoneBlurHandler}
                                required />
                            {phoneIsNotValid && <p>Please Enter Your Phone Number</p>}
                        </div>

                        {/* <div className="donorFormInput">
                            <label htmlFor="email">Email Id</label>
                            <input
                                type="email"
                                placeholder='Email Id'
                                value={email}
                                onChange={emailChangeHandler}
                                onBlur={emailBlurHandler}
                            />
                            {emailIsNotValid && <p>Please Enter Your Email ID</p>}
                        </div> */}



                    </div>
                    <div className="donorFormRight">
                        {/* <div className="donorFormInput">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                placeholder='Phone Number'
                                value={phone}
                                onChange={phoneChangeHandler}
                                onBlur={phoneBlurHandler}
                                required />
                            {phoneIsNotValid && <p>Please Enter Your Phone Number</p>}
                        </div> */}

                        <div className="donorFormInput">
                            <label htmlFor="cardNumber">Adhaar Card Number</label>
                            <input
                                type="text"
                                placeholder='Adhaar Card Number'
                                value={cardNumber}
                                onChange={cardNumberChangeHandler}
                                onBlur={cardNumberBlurHandler}
                                required />
                            {cardNumberIsNotValid && <p>Please Enter Your 12 Digit Adhaar Card Number</p>}
                        </div>


                        <div className="donorFormInput">
                            <label htmlFor="bloodgrp">Blood Component</label>
                            <select name="bloodGroup" id="bloodGroup"
                                value={bloodGroup}
                                onChange={bloodGroupChangeHandler}
                                onBlur={bloodGroupBlurHandler}
                                placeholder='Your Blood Group Name'
                            >
                                <option value="null">Select</option>
                                {bloodList.map((list, index)=> (
                                <option value={list.componentName} key={index}>{list.componentName}</option>
                                ))}
                                {/* <option value="Whole Blood (WB) A-">Whole Blood (WB) A-</option>
                                <option value="Whole Blood (WB) B+">Whole Blood (WB) B+</option>
                                <option value="Whole Blood (WB) B-">Whole Blood (WB) B-</option>
                                <option value="Whole Blood (WB) AB+">Whole Blood (WB) AB+</option>
                                <option value="Whole Blood (WB) AB-">Whole Blood (WB) AB-</option>
                                <option value="Whole Blood (WB) O-">Whole Blood (WB) O+</option>
                                <option value="Whole BLood ( O- )">Whole BLood ( O- )</option>
                                <option value="Packed Red Cell (PRBC) A+">Packed Red Cell (PRBC) A+</option>
                                <option value="Packed Red Cell (PRBC) A-">Packed Red Cell (PRBC) A-</option>
                                <option value="Packed Red Cell (PRBC) B+">Packed Red Cell (PRBC) B+</option>
                                <option value="Packed Red Cell (PRBC) B+">Packed Red Cell (PRBC) B+</option>
                                <option value="Packed Red Cell (PRBC) AB+">Packed Red Cell (PRBC) AB+</option>
                                <option value="Packed Red Cell (PRBC) AB-">Packed Red Cell (PRBC) AB-</option>
                                <option value="Packed Red Cell (PRBC) O+">Packed Red Cell (PRBC) O+</option>
                                <option value="Packed Red Cell (PRBC) O-">Packed Red Cell (PRBC) O-</option>
                                <option value="Fresh Frozen Plasma (FFP)">Fresh Frozen Plasma (FFP)</option>
                                <option value="Platelet Concentrate (PC)">Platelet Concentrate (PC)</option>
                                <option value="Singel Donor Platelet (SDP)">Singel Donor Platelet (SDP)</option>
                                <option value="Cryoprecipitate">Cryoprecipitate</option> */}

                            </select>
                            {bloodGroupIsNotValid && <p>Please Enter Your Blood Group</p>}
                        </div>
                        <div className="donorFormInput">
                            <label htmlFor="unit">Unit</label>
                            <select name="unit" id="unit" value={unit} onChange={unitChanger} onBlur={unitBlur}>
                                <option value="null">selct</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            {unitIsNotValid && <p>Please Enter Unit</p>}
                        </div>
                        <div className="donorFormInput">
                            <label htmlFor="address">Address</label>
                            <textarea
                                name="address" id="address" cols="30" rows="2" placeholder='Address...'
                                value={address} onChange={addressChanger} onBlur={addressBlur}
                            ></textarea>
                            {addressIsNotValid && <p>Please Enter Address</p>}
                        </div>
                        <div className="donorFormInput">
                            <label htmlFor="pin">Pin</label>
                            <input type="text" placeholder="Pin Code" value={pinCode} onChange={pinCodeChanger} onBlur={pinCodeBlur} />
                            {pinCodeIsNotValid && <p>Please Enter pinCode</p>}
                        </div>

                    </div>
                </div>
                <div className="donorFormContainer">
                    <button onClick={props.onClose}>Cancel</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </Model >
    )
}

export default DonorForm
