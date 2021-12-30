import React, { useRef, useState } from 'react'

const Dummy = (props) => {

    let re = useRef();

    let [user, setUser] = useState('');
    let userChange=(event)=> {
        setUser(event.target.value)
    }
    let formsubmit=(event)=>{
        event.preventDefault();
        console.log(user);
        props.userForm(user);
        setUser('');
        // props.userForm(re.current)
        console.log(re.current.value);
    }

    return (
        <div>
            <form onSubmit={formsubmit}>
                <label htmlFor="user">user</label>
                <input type="text" name="user" id="user" value={user} refe={re} onChange={userChange} />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default Dummy
