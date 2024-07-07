import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import Cart from "./components/Cart";
import Account from "./components/Account";
import Login from "./components/Login";
import Header from "./components/Header";
import { CartProvider } from "react-use-cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
