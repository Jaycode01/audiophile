"use client";

import { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [menu, setmenu] = useState(true);

  return (
    <section className="header_wrapper">
      <header>
        <div className="logo_and_menu">
          <button type="button" className="menu" onClick={() => setmenu(!menu)}>
            <img src="/assets/menu.svg" alt="hamburger menu" />
          </button>
          <img src="/assets/audiophile.svg" alt="logo" />
        </div>
        {menu && (
          <nav>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Headphones</a>
            </li>
            <li>
              <a href="#">Speakers</a>
            </li>
            <li>
              <a href="#">Earphones</a>
            </li>
          </nav>
        )}

        <button type="button" className="cta">
          <img src="/assets/cart.svg" alt="cart" />
        </button>
      </header>
    </section>
  );
};

export default Navbar;
