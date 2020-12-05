import React from "react";
import axios from "axios";
import "./App.css";

class Cart extends React.Component{

  state = {
    products : []
  }
  componentDidMount = () =>{
    this.getProducts();
  }

  getProducts = () =>{

    axios.get("/api/cart")
    .then((res) => {
      const data = res.data;
      this.setState({products:data});
      console.log(res);
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  removeItems(products) {

    console.log("clicked");
  }

  displayProducts = (products) =>{

    return products.map((products, idx) => (
      <div className="box">

        <h3>{products.name}</h3>
        <h4>{products.price}</h4>
        <h4>{products.ratting}</h4>
        <img src={products.img} alt="unavailable"></img>
        <button onClick={this.removeItems.bind(this,products)}>Remove</button>

      </div>

    ));

  }

    render(){
  
      return(
          
       <div>
           <h3>Welcome to Cart</h3>
           <div className="container">
             {this.displayProducts(this.state.products)}
           </div>
           <div>
             <h3>Location validator</h3>
             <form>
               <input type="text" name="pin" placeholder="enter pincode"></input>
             </form>
           </div>
       </div>
      
      )
    }
  }

  export default Cart;