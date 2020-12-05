import axios from "axios";
import React from "react";
import {Link} from "react-router-dom";

import "./App.css";

class Cataloge extends React.Component{

  state = {

    products:[]
  };

  componentDidMount = () =>{
    this.getProducts();
  
  }

  getProducts = () => {

    axios.get("/api/cataloge")

    .then((response) => {
      const data = response.data;
      this.setState({products:data});
   
    })
    .catch((err) => {
      console.log(err);
    })

   

  };

  removeItems(product){
    console.log("clicked");
    const payload = product;
    console.log(payload);
    const items = [...this.state.products];
    const updatedItems = items.filter((item) => item !== product);
    // this.setState.products();
    this.setState({products:updatedItems});

    
      // this.setState(items.filter((item) => item !== product));

      
    axios({
      url:'/api/remove',
      method:'post',
      data: payload
    })
    .then(() => {
      console.log("data has been sent");

    })
    .catch(() => {
      console.log("Internal server error!!");
    })
  }



  displayProducts = (products) =>{

    return products.map((products,idx) => (
      <div className="">

        <div className="box">

        <h3>{products.name}</h3>
        <h4>{products.price}</h4>
        <h4>{products.ratting}</h4>
        <img src={products.img} alt="unavailable"></img>
        <button onClick={this.removeItems.bind(this,products)}>Remove</button>

        </div>
       
      </div>

    ));
  }

 addToCart(product) {

  console.log("clicked in cart");
  // console.log(product);
  const payload = product;

  // const payload = {
  //   name : product.name,
  //   img : product.img,
  //   price : product.price,
  //   rating : product.rating
  // }
  
  console.log(payload)
  
  axios({
    url:"/api/bulksavecart",
    method:"post",
    data: payload

  })
 }



    render(){
     
      return(
          
       <div>
           <h3>Partties Cataloge</h3>
           <div className="container">
           {this.displayProducts(this.state.products)}
          </div>

           <button onClick={this.addToCart.bind(this,this.state.products)}>Add to cart</button>
           <Link to = "checkout">
           <button onClick={this.addToCart.bind(this,this.state.products)}>Checkout</button>
           </Link>
       </div>
      
      )
    }
  }

  export default Cataloge;