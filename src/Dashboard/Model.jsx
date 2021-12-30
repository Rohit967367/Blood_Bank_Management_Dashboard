import React, { Fragment } from 'react'
// import { ReactDOM } from 'react-dom'
import ReactDom from 'react-dom'
import './Model.css'

const Protal = (props) => {
    return <div className="protal" onClick={props.onClose}>
        {props.children}
    </div>
}

const OverLay = (props) => {
    return (
        <div className="contect">
            <div className="overlay">
                {props.children}
            </div>
        </div>
    )
}

const OverLayModel = document.getElementById("overlayModel");

const Model = (props) => {
    return (
        <Fragment>
            {ReactDom.createPortal(<Protal onClose={props.onClose} />, OverLayModel)}
            {ReactDom.createPortal(<OverLay>{props.children}</OverLay>, OverLayModel)}
        </Fragment>
    )
}

export default Model


