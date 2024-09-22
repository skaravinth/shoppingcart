import React, { useState } from 'react';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuantityButton from '../Button/Button';

const ItemSelection = ({ onAddToCart }) => {
  const items = [
    {
      id: 1,
      name: 'Chicken BBQ Pizza',
      image: 'https://www.savorynothings.com/wp-content/uploads/2022/05/bbq-chicken-recipe-image-3.jpg',
      description: 'Chicken BBQ pizza with Mexican flavored toppings',
      variants: [
        { size: 'Large', price: 800 },
        { size: 'Medium', price: 500 },
        { size: 'Small', price: 300 },
      ],
    },
    {
      id: 2,
      name: 'Spicy Mexican Pizza',
      image: 'https://www.savorynothings.com/wp-content/uploads/2022/05/bbq-chicken-recipe-image-3.jpg',
      description: 'Spicy Mexican Pizza with extra cheese and jalapenos',
      variants: [
        { size: 'Large', price: 900 },
        { size: 'Medium', price: 600 },
        { size: 'Small', price: 400 },
      ],
    },
  ];

  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [selectedVariant, setSelectedVariant] = useState('Large');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('variants');

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSelectedVariant('Large');
    setQuantity(1);
  };

  const itemPrice =
    selectedItem.variants.find((variant) => variant.size === selectedVariant)?.price || 0;
  const totalPrice = itemPrice * quantity;

  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
  };

  const handleQuantityChange = (increase) => {
    if (increase) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevents page reload
    onAddToCart(selectedItem, quantity, selectedVariant);
  };

  return (
    <div style={styles.container}>
      <h3 style={{ color: 'black' }}>Variants & Add-ons</h3>
      <div style={{ ...styles.header, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img src={selectedItem.image} alt="Item" style={styles.image} />
        <div>
          <p style={styles.itemDescription}>{selectedItem.description}</p>
        </div>
      </div>

      <div style={styles.tabs}>
        <button
          style={activeTab === 'variants' ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab('variants')}
        >
          Variants (2)
        </button>
        <button
          style={activeTab === 'addons' ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab('addons')}
        >
          Add-ons
        </button>
      </div>

      <div style={styles.section}>
        <p style={styles.sectionTitle}>Quantity</p>
        {selectedItem.variants.map((variant) => (
          <div key={variant.size} style={styles.variantOption}>
            <label style={styles.label}>
              <input
                type="radio"
                value={variant.size}
                checked={selectedVariant === variant.size}
                onChange={handleVariantChange}
                style={styles.radioButton}
              />
              Pizza ({variant.size})
            </label>
            <span>SAR {variant.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <hr
        style={{
          border: 'none',
          borderBottom: '1px solid #dcdcdc',
          width: '100%',
          marginTop: '220px',
        }}
      />

      <div style={styles.section}>
        <div style={styles.total}>
          <p style={{ fontWeight: 'bold' }}>Item total</p>
          <p style={{ fontWeight: 'bold' }}>SAR {totalPrice.toFixed(2)}</p>
        </div>
        <div style={styles.quantityControls}>
          <QuantityButton quantity={quantity} handleQuantityChange={handleQuantityChange} />
          <button type="button" onClick={handleAddToCart} style={styles.addToOrderButton}>
            Add to order
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '500px',
    backgroundColor: '#f9fafb',
    borderRadius: '10px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    marginBottom: '15px',
    color: 'black',
  },
  image: {
    width: '70px',
    height: '70px',
    borderRadius: '10px',
    marginRight: '15px',
  },
  itemDescription: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: 'black',
  },
  tabs: {
    display: 'flex',
    cursor: 'pointer',
    marginLeft: '40px',
  },
  activeTab: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px 0 0 5px',
    width: '200px',
  },
  inactiveTab: {
    backgroundColor: 'white',
    border: '1px solid black',
    color: 'black',
    padding: '10px',
    borderRadius: '0 5px 5px 0',
    width: '200px',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'black',
  },
  variantOption: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    color: 'black',
  },
  label: {
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    color: 'black',
  },
  radioButton: {
    marginRight: '10px',
    color: 'blue',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '500px',
  },
  addToOrderButton: {
    width: '400px',
    height: '50px',
    padding: '10px',
    backgroundColor: '#3383ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: '30px',
  },
};

export default ItemSelection;
