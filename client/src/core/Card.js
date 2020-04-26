import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    {/* <button className="badge-pill badge-warning mt-2 mb-2 p-2">
                        View Product
                    </button> */}
                </Link>
            )
        );
    };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCart = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button
                    onClick={addToCart}
                    className="badge-pill badge-warning mx-2 p-1 my-2 "                 
                >
<i class="fas fa-cart-plus"> Add to Cart</i>                  
                </button>
            )
        );
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => removeItem(product._id)}
                    className="badge-pill badge-danger mt-2 mb-2 p-2 px-3"
                >
                    Remove Product
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-dark badge-pill p-2">In Stock</span>
        ) : (
            <span className="badge badge-dark badge-pill">Out of Stock</span>
        );
    };

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Adjust Quantity
                            </span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            value={count}
                            onChange={handleChange(product._id)}
                        />
                    </div>
                </div>
            )
        );
    };

    return (
        <div className="card">
            
            <div className="card-body">
                {shouldRedirect(redirect)}

                <div>          
    <Link to={`/product/${product._id}`} className="mr-2">                    
                    <ShowImage item={product} url="product" />  
                </Link>
                </div> 

                    <Link to={`/product/${product._id}`} className="mr-2">                    
                    <div className="card-header name">{product.name}</div>   
                </Link>  
                          
                <p className="lead">
                    {product.description.substring(0, 100)}
                </p>
            
            <p className="row ml-3">

                <p  style={{ fontSize: "1rem"}} className="row">$               

                 <div style={{ fontSize: "2rem"}}>{product.price}</div>
                
                </p>
                </p>
                <p className="black-9">
                    Category: {product.category && product.category.name}
                </p>
                <p className="black-8">
                    Added on {moment(product.createdAt).fromNow()}
                </p>

                {showStock(product.quantity)}
                <br />

                {showViewButton(showViewProductButton)}

                {showAddToCart(showAddToCartButton)}

                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    );
};

export default Card;

