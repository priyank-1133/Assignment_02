import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "react-use-cart";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const { addItem, items, updateItemQuantity, removeItem, emptyCart } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = localStorage.getItem('userId'); 
        const res = await axios.get(`http://localhost:5000/api/carts/user/${userId}`);
        setCart(res.data);
        res.data.products.forEach(p => {
          addItem({ id: p.product._id, name: p.product.description, price: p.product.pricing, quantity: p.quantity });
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, [addItem]);

  if (!cart) return <h1 className="text-center">Cart is Empty</h1>;

  return (
    <section className="py-4 container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h5>
            Cart ({items.length}) total Items: ({items.reduce((acc, item) => acc + item.quantity, 0)})
          </h5>
          <br />
          <table className="table table-light table-hover m-0">
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button className="btn btn-light ms-2" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                      –
                    </button>
                    <button className="btn btn-light ms-2" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                    <button className="btn btn-dark ms-2" onClick={() => removeItem(item.id)}>
                      Remove Item
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-auto ms-auto">
          <h3>Total Price: Rs. {items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
        </div>
        <div className="col-auto ms-auto">
          <button className="btn btn-danger m-2" onClick={() => emptyCart()}>
            Clear Cart
          </button>
          <button className="btn btn-primary m-2">Pay Now</button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
