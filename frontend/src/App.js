import React from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./Component/Home";
import Product from "./Component/Product/index";
import Cart from "./Component/Cart";
import Sigin from "./Component/Signin";
import { useSelector } from "react-redux";
import Register from "./Component/Register";
import ProductsScreen from "./Component/Product/ProductsScreen";
import Shipping from "./Component/Shipping";
import Payment from "./Component/Shipping/payment";
import PlaceOrder from "./Component/Shipping/placeorder";
import OrderScreen from "./Component/Shipping/order";
import Orders from "./Component/Order";
import Profile from "./Component/Profile";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <Router>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}> &#9776;</button>
            <Link to="/">Amazona</Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li>
              <Link to="/category/Pant">Pants</Link>
            </li>

            <li>
              <Link to="/category/Shirt">Shirts</Link>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <Route path="/products" component={ProductsScreen} />
            <Route path="/product/:id" component={Product} />
            
            <Route path="/shipping" component={Shipping} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/payment" component={Payment} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/orders/" component={Orders} />
            <Route path="/signin" component={Sigin} />
            <Route path="/register" component={Register} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/profile" component={Profile} />
            <Route path="/category/:id" component={Home} />
            <Route path="/" exact={true} component={Home} />
          </div>
        </main>
        <footer className="footer">All right reserved</footer>
      </div>
    </Router>
  );
}

export default App;
