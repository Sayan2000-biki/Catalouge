import React from "react";
import {Link} from "react-router-dom";
// import {products} from "./Cataloge";
import "./App.css";

function Nav(){

    return(
        <nav className = "nav">
            <h3>Partties</h3>
     <ul className = "nav-links">
            
           <Link to = "./home">
                <li>Home</li>
           </Link>

            <Link to = "./cataloge">
             <li>Cataloge</li>
            </Link>

            <Link to = "./cart">
                <li>Cart</li>
            </Link>
            
            
            
     </ul>
        </nav>
    )
}

export default Nav;