import React, { useState } from 'react';
import QuantityButton from '../Button/Button'; // Assuming this is your custom component

const ItemSelection = ({ onAddToCart }) => {
  const items = [
    {
      id: 1,
      name: 'Chicken BBQ Pizza',
      image: 'https://www.savorynothings.com/wp-content/uploads/2022/05/bbq-chicken-recipe-image-3.jpg',
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
    e.preventDefault();
    onAddToCart(selectedItem, quantity, selectedVariant);
    setQuantity(1);
  };

  return (
    <div style={{ width: '480px', padding: '20px', borderRadius: '10px', fontFamily: 'Arial, sans-serif' }}>
      <h3 style={{ color: 'black' }}>Variants & Add-ons</h3>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '15px' }}>
        <img
          src={selectedItem.image}
          alt="Item"
          style={{ width: '70px', height: '70px', borderRadius: '10px', marginRight: '15px' }}
        />
        <div>
          <p style={{ fontSize: '18px', marginBottom: '22px', marginLeft: '10px', color: 'black' }}>
            {selectedItem.name}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', cursor: 'pointer', marginTop: '30px' }}>
        <button
          style={{
            backgroundColor: activeTab === 'variants' ? '#3383ff' : 'white',
            color: activeTab === 'variants' ? 'white' : 'black',
            padding: '10px',
            border: activeTab === 'variants' ? 'none' : '1px solid black',
            borderRadius: '5px 0 0 5px',
            width: '250px',
            outline: 'none',
          }}
          onClick={() => setActiveTab('variants')}
        >
          Variants (2)
        </button>
        <button
          style={{
            backgroundColor: activeTab === 'addons' ? '#3383ff' : 'white',
            color: activeTab === 'addons' ? 'white' : 'black',
            padding: '10px',
            border: activeTab === 'addons' ? 'none' : '1px solid black',
            borderRadius: '0 5px 5px 0',
            width: '250px',
            outline: 'none',
          }}
          onClick={() => setActiveTab('addons')}
        >
          Add-ons
        </button>
      </div>

      {activeTab === 'variants' && (
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: 'black' }}>Quantity</p>

          {selectedItem.variants.map((variant) => (
            <div key={variant.size}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'black' }}>
                  <input
                    type="radio"
                    value={variant.size}
                    checked={selectedVariant === variant.size}
                    onChange={handleVariantChange}
                    style={{ display: 'none' }}
                  />
                  <span
                    style={{
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: `2px solid ${selectedVariant === variant.size ? '#3383ff' : '#ccc'}`,
                      position: 'relative',
                      marginRight: '10px',
                      cursor: 'pointer',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    {selectedVariant === variant.size && (
                      <span
                        style={{
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#3383ff',
                          transform: 'translate(-50%, -50%)',
                        }}
                      ></span>
                    )}
                  </span>
                  Pizza ({variant.size})
                </label>

                <span style={{ marginRight: '30px', color: selectedVariant === variant.size ? '#3383ff' : 'black' }}>
                  SAR {variant.price.toFixed(2)}
                </span>
              </div>
              <hr style={{ border: '1px solid #dcdcdc', marginTop: '10px', marginBottom: '10px' }} />
            </div>
          ))}
        </div>
      )}

      <div style={{ position: 'fixed', bottom: '0', marginBottom: '20px', width: '500px' }}>
        <hr style={{ border: 'none', borderBottom: '1px solid #dcdcdc', width: '100%' }} />

        <div style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
          <p style={{ fontSize: '16px' }}>Item total</p>
          <p style={{ fontWeight: 'bold', fontSize: '22px',marginLeft:'300px'}}>SAR {totalPrice.toFixed(2)}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <QuantityButton quantity={quantity} handleQuantityChange={handleQuantityChange} />
          <button
            type="button"
            onClick={handleAddToCart}
            style={{
              width: '330px',
              marginLeft: '20px',
              height: '50px',
              padding: '10px',
              backgroundColor: '#3383ff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Add to order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemSelection;
