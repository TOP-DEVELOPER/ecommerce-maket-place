import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
const logofooter = require('../images/logo1.JPG');

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#F08804" };
    } else {
        return { color: "#ffffff" };
    }
};

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs p-2">    
        <li className="nav-item">
        <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
        <img className="logo" src={logofooter} width="10" height="8" alt='LOGO' />
        </Link>
        </li>

            <li className="nav-item">

                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    Shop
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                ><i className="fas fa-shopping-cart"></i>                <sup>
                <small className="">{itemTotal()}</small>
            </sup>
                     ...Cart{" "}

                </Link>
            </li>


            {/* <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart">
          
                   
                     <div class="fa-1x">
  
  <span class="fa-layers fa" >
  <i class="fas fa-dolly-flatbed "></i>

    <span class="fa-layers-counter  "  data-fa-transform="shrink-8">                
    <span className="amount">{itemTotal()}</span>
</span>
  </span>
</div>
                </Link>
            </li> */}
            
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        Admin
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Admin
                    </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Signout
                    </span>
                    
                </li>                    
            )}

   
        </ul>

        
    </div>
);

export default withRouter(Menu);

//
