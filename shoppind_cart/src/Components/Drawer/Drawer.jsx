import React from 'react';
import './Drawer.css';
import { FaShoppingCart, FaTachometerAlt, FaUsers, FaBoxes, FaBell, FaClipboardList ,FaTags} from 'react-icons/fa'; 
import logoImage from '../../assets/Screenshot 2024-09-21 090548.png'

const Drawer = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logoImage} alt="Company Logo" className="logo" />
      </div>

      <div className="sidebar-item">
        <FaTachometerAlt className="icon" />
        <span>Dashboard</span>
      </div>
      
      <div className="sidebar-item ">
        <FaShoppingCart className="icon" />
        <span>Sales</span>
      </div>

      <div className="sidebar-item">
        <FaClipboardList className="icon" />
        <span>Orders</span>
      </div>

      <div className="sidebar-item">
        <FaUsers className="icon" />
        <span>Customer</span>
      </div>
      <div className="sidebar-item">
        <FaTags className="icon" />
        <span>Items</span>
      </div>
      <div className="sidebar-item">
        <FaBoxes className="icon" />
       
        <span>Inventory</span>
      </div>

      <div className="sidebar-item">
        <FaBell className="icon" />
        <span>Alerts</span>
      </div>

      <div className="sidebarbottom">
        <img src="https://logos-world.net/wp-content/uploads/2020/09/Nestle-Logo.png" alt="Profile" className="profile-pic" />
        
      </div>
    </div>
  );
};

export default Drawer;

