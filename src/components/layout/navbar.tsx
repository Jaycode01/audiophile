"use client";

import { useState } from "react";
import Link from "next/link";
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
              <Link href="/" className="a">
                Home
              </Link>
            </li>
            <li>
              <Link href="/headphones" className="a">
                Headphones
              </Link>
            </li>
            <li>
              <Link href="/speakers" className="a">
                Speakers
              </Link>
            </li>
            <li>
              <Link href="/earphones" className="a">
                Earphones
              </Link>
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
