import React from "react";
import { useCart } from "react-use-cart";
import axios from 'axios';

const ItemCard = (props) => {
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userId'); 
    const product = {
      product: props.item._id,
      quantity: 1
    };

    try {
      await axios.post('http://localhost:5000/api/carts', {
        user: userId,
        products: [product]
      });
      addItem(props.item);
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  return (
    <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
      <div className="card p-0 overflow-hidden h-100 shadow">
        <img src={props.img} className="card-img-top img-fluid" alt="" />
        <div className="card-body text-center">
          <h5 className="card-title">{props.title}</h5>
          <h4 className="card-text">₹ {props.price}</h4>
          <p className="card-text">{props.desc}</p>

          <button
            className="btn btn-success"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

