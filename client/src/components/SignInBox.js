import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 3rem;
    background-color: green;
    padding-bottom: 1.5rem;
    align-items: flex-end;
    background-color: #e2d4ba;
    min-height: 10vh;
    input {
        margin-left: 1rem;
        /* margin-bottom: 1rem; */
        padding: .75rem;
    }
`

const StyledButton = styled.button`
    background-color: #f1e3e4;
    border: none;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-left: 1rem;
    border-radius: 10px;
`

export default function SignInBox() {

    const [assumedUser, setAssumedUser] = useState({user_username: "", user_password: ""})


    const handleChange = (e) => {
        e.preventDefault()
        setAssumedUser({
            ...assumedUser,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmitForm = (e) => {
        e.preventDefault()
        console.log('sending this to login endpoint:')
        console.log(assumedUser)

        axios.post('http://localhost:4000/api/auth/login', {assumedUser})
        .then(res => {
            console.log(res)
            // later, set this up to put to welcome ou quoi que ce soit
        })
        .catch(err => {
            console.log(err.message)
        })


    }



    return (
        <StyledDiv>
            <form onSubmit={handleSubmitForm} autoComplete="off">
                <label>
                    <input
                    type="text"
                    placeholder="username"
                    name="user_username"
                    onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                    type="password"
                    placeholder="password"
                    name="user_password"
                    onChange={handleChange}
                    />
                </label>
                <StyledButton>Log In</StyledButton>
            </form>
        </StyledDiv>
    )
}
