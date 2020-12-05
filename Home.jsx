import axios from "axios";
import React from "react";
import "./App.css";

class Home extends React.Component{

  state = {
    products:[]
  };


  componentDidMount = () =>{
    this.getProducts();
  }

getProducts = () =>{

  axios.get("/api/home")

  .then((response) => {
    
    const data = response.data;
    this.setState({products:data});
    console.log(data);

  })
  .catch((err) => {
    console.log(err);
  })
}


addItems(product){
  console.log("clicked");
  // const payload = product;
  const payload = {
    name : product.name,
    img : product.img,
    price : product.price,
    rating : product.rating
  }

  console.log(payload);

  axios({
    url:"/api/save",
    method:"post",
    data : payload
  })
}

displayProducts = (products) => {

  return products.map((products, idx) => (

    
      
      <div className="box">

        <h3>{products.name}</h3>
        <h4>{products.price}</h4>
        <h4>{products.ratting}</h4>
        <img src={products.img} alt="unavailable"></img>
        <button onClick={this.addItems.bind(this,products)}>Add to cataloge</button>

    </div>
  ));
}

    render(){
  
      return(
          
       <div>
           <h3>Homepage</h3>
           <div className="container">
             {this.displayProducts(this.state.products)}
           </div>
       </div>
      
      )
    }
  }

  export default Home;