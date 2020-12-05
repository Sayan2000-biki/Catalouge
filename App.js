import React from "react";
import Cataloge from "./Cataloge";
import Nav from "./Nav";
import Home from "./Home";
import Cart from "./Cart";
import Checkout from "./Checkout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App(){
  return(
    // <div>
    //     <Nav />
    //   <Catalog />
    // </div>

     <Router>
  <div className = "App">
  
    <Nav />
    <Switch>
    <Route path="/home" exact component={Home}/>
    <Route path="/cataloge" component={Cataloge}/>
    <Route path="/cart" component={Cart}/>
    <Route path="/checkout" component={Checkout}/>
    </Switch>
   

  </div>
</Router>
    

  )
  
}

export default App;