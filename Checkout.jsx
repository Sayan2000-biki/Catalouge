import React from "react";
import axios from "axios";
import "./App.css";


class Checkout extends React.Component{

    state = {
        price:''
    }

    componentDidMount = () =>{
        this.getPrice();
    }

    getPrice = () =>{

        axios.get('/api/checkout')
        .then((res) =>{
            const data = res.data;
            this.setState({price:data});
            console.log(data);
        })
        .catch((err) =>{
            console.log(err);
        })
    }




    render(){

        return(
            <div>
                <h3>welcome to checkout page</h3>
                <h4>Total price is {this.state.price}</h4>

            </div>
        )
    }
}

export default Checkout;