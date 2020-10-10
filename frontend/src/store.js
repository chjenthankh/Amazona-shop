import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productSaveReducer,
} from "./reducer/product";
import thunk from "redux-thunk";
import { cartReducer } from "./reducer/cart";
import Cookie from "js-cookie";
import { userRegisterReducer, userSiginReducer, userUpdateReducer } from "./reducer/user";
import { myOrderListReducer, orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from "./reducer/order";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = {
  cart: { cartItems },
  userSignin: { userInfo },
  shipping: {},
  payment: {},
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSiginReducer,
  UserRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
 
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
