import React ,{Component} from 'react';
import { Redirect } from 'react-router-dom';

class Auth extends Component
{
    constructor(){
        super();
        this.state = {
            isRegister : true
        }
    }
    login(){
        fetch('http://localhost:5000/login',{
            method: 'POST',
            headers: {
                'Accpet':'application/json',
                'Content-Type':'application/json'
            },
            body : JSON.stringify(this.state)
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp);
                localStorage.setItem('token',JSON.stringify(resp));
            })
        })
    }
    register(){
        fetch('http://localhost:5000/register',{
            method: 'POST',
            headers: {
                'Accpet':'application/json',
                'Content-Type':'application/json'
            },
            body : JSON.stringify(this.state)
        }).then((result) => {
            result.json().then((resp) => {
                alert(resp);
            })
        })
    }
    render(){
        var auth = localStorage.getItem('token');
        return(
            <div>
                {
                    auth ? <Redirect to="/home"></Redirect> : null
                }
                {
                    this.state.isRegister ?
                    <div>
                        <p>Login</p>
                    <input type="text" placeholder ="Email"onChange={(e) => this.setState({email:e.target.value})}/><br/><br/>
                    <input type="text" placeholder="Password" onChange={(e) => this.setState({password:e.target.value})}/><br/><br/>
                    <button onClick={() => this.login()}>Login</button>
                    <button onClick={() => this.setState({isRegister: false})}>Go to Register</button>
                    </div>
                    :
                    <div>
                        <p>Register</p>
                    <input type="text" placeholder="Email" onChange={(e) => this.setState({email:e.target.value})}/><br/><br/>
                        <input type="text" placeholder="Password" onChange={(e) => this.setState({password:e.target.value})}/><br/><br/>
                        <button onClick={() => this.setState({isRegister: true})}>Go to Login</button>
                        <button onClick={() => this.register()}>Register</button>
                    </div>
                }
            </div>
        )
    }
} 

export default Auth;