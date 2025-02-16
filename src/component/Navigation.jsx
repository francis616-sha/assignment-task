import React, { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const Navigation = () => {
  return (
    <nav>

      {/* Normal View (Desktop & Tablet) */}
      <div className="d-none d-md-flex">
        <Button variant="link" style={{ color: "#666666" }}>Store</Button>  {/* Light Black */}
        <Button variant="link" style={{ color: "#666666" }}>Account</Button>
        <Button variant="link" style={{ color: "#666666" }}>Wish List</Button>
        <Button variant="link" style={{ fontWeight: "bold", color: "#000000" }}>Basket 🛒</Button>  {/* Bold Black */}
      </div>


      {/* Mobile View (Dropdown) */}
      <div className="d-flex d-md-none">
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="nav-dropdown">
            <FaBars size={24} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Store</Dropdown.Item>
            <Dropdown.Item href="#">Account</Dropdown.Item>
            <Dropdown.Item href="#">Wish List</Dropdown.Item>
            <Dropdown.Item href="#"><strong>Basket 🛒</strong></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navigation;
