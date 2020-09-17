import React from 'react';
import { Redirect } from 'react-router-dom';

function Checker(props){
    const Cmp = props.cmp;
    var auth = JSON.parse(localStorage.getItem('token'));
    return <div>{auth ? <Cmp /> : <Redirect to="/login"></Redirect>}</div>
} 

export default Checker;