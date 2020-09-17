import React ,{Component} from 'react';
import { Redirect } from 'react-router-dom';

class Listing extends Component
{
    constructor(){
        super();
        this.state = {
            data: null
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/list',{
            method: 'GET',
            headers: {
                'Accpet':'application/json',
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token')),
            }
        }).then((result) => {
            result.json().then((resp) => {
                this.setState({data:resp});
            })
        })
    }
    
    render(){
        return(
            <div>
                Listing Component
                {
                    this.state.data ?
                    this.state.data.map((item) => 
                        <div>
                            <h1>{item.color}</h1>
                            <h1>{item.value}</h1>
                        </div>
                    )
                    : null
                }
            </div>        
        )
    }
} 

export default Listing;