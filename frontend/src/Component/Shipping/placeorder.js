import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../../action/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from '../../action/orderAction';
import { Link } from "react-router-dom";
import CheckoutStep from "./checkout";

function PlaceOrder(props) {

  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;
  if (!shipping) {
    props.history.push("/shipping");
  } else if (!payment) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems
    .reduce((sum, value) => sum + value.price * value.qty, 0)
    .toFixed(2);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = (+0.15 * +itemsPrice).toFixed(2);
  const totalPrice = (+itemsPrice + +shippingPrice + +taxPrice).toFixed(2);
  

  const dispatch = useDispatch();
  const PlaceOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  };
  useEffect(()=>{
    if (success) {
      props.history.push("/order/" + order._id);
    }
  },[success])


  return (
    <div>
      <CheckoutStep step1 step2 step3 step4></CheckoutStep>

      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              {cart.shipping.address},{cart.shipping.city},
              {cart.shipping.postalCode},{cart.shipping.country},
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {cart.payment.paymentMethod}</div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <li>
                    <div className="cart-image">
                      <img
                        src={require(`../../assets/images/${item.image}`)}
                        alt="product"
                      />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>{item.name}</Link>
                      </div>
                      <div>Qty: {item.qty}</div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary text-center full-width"
                onClick={PlaceOrderHandler}
              >
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Item</div>
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Total</div>
              <div>${totalPrice}</div>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
