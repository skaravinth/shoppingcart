import React, { useState, useEffect } from 'react';
import QuantityButton from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

const ItemSelection = ({ onAddToCart, item }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('variants');
  const [variants, setVariants] = useState([]);


  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/cart/food_varients`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: item.id }),
        });

        const data = await response.json();
        setVariants(data);
        setSelectedVariant(data[0]?.name);
      } catch (error) {
        console.error('Error fetching variants:', error);
      }
    };

    fetchVariants();
  }, [item.id]);

  const itemName = item.name;
  const itemImage = `http://localhost:5000/${item.img_url}`;
  const selectedPrice = variants.find((variant) => variant.name === selectedVariant)?.price || 0;
  const totalPrice = selectedPrice * quantity;

  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
  };

  const handleQuantityChange = (increase) => {
    setQuantity((prevQuantity) => (increase ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
  
    console.log("Item:", item.name);
    console.log("Quantity:", quantity);
    console.log("Selected Variant:", selectedVariant);
    console.log("Selected Price:", selectedPrice);
  
    if (!selectedVariant) {
      alert("Please select a variant.");
      return;
    }
  
    if (isNaN(selectedPrice) || selectedPrice <= 0) {
      alert("Invalid price for the selected variant.");
      return;
    }
  
    if (!item.name || quantity <= 0) {
      alert("Invalid item or quantity.");
      return;
    }
  
    onAddToCart(item.name, quantity, selectedVariant, selectedPrice * quantity);
  
    setQuantity(1);
    setSelectedVariant(variants[0]?.name || null);
    
  };
  
  
  return (
    <div style={{ width: '480px', padding: '20px', borderRadius: '10px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ color: 'black', margin: 0 }}>Variants & Add-ons</h3>
        <div style={{ border: '1px solid black', padding: '5px', borderRadius: '100%', cursor: 'pointer', width: '20px', display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faBackward} style={{ color: 'black' }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '15px',marginTop:'30px' }}>
        <img
          src={itemImage}
          alt="Item"
          style={{ width: '90px', height: '90px', borderRadius: '10px', marginRight: '15px' }}
        />
        <div>
          <p style={{ fontSize: '18px', marginBottom: '22px', marginLeft: '10px', color: 'black' }}>
            {itemName}
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
          Variants ({variants.length})
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

          {variants.map((variant) => (
            <div key={variant.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px',borderBottom:'0.6px solid #dcdcdc',paddingBottom:'12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'black' }}>
                  <input
                    type="radio"
                    value={variant.name}
                    checked={selectedVariant === variant.name}
                    onChange={handleVariantChange}
                    style={{ display: 'none' }}
                  />
                  <span
                    style={{
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: `2px solid ${selectedVariant === variant.name ? '#3383ff' : '#ccc'}`,
                      position: 'relative',
                      marginRight: '10px',
                      cursor: 'pointer',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    {selectedVariant === variant.name && (
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
                  {item.name} ({variant.name})
                </label>

                <span style={{ marginRight: '30px', color: selectedVariant === variant.name ? '#3383ff' : 'black',fontWeight:'bolder'}}>
                  SAR {variant.price.toFixed(2)}
                </span>
              </div>
              {/* <hr style={{ border: '1px solid #dcdcdc', marginTop: '10px', marginBottom: '10px' }} /> */}
            </div>
          ))}
        </div>
      )}

      <div style={{ position: 'fixed', bottom: '0', marginBottom: '20px', width: '500px' }}>
        {/* <hr style={{ border: 'none', borderBottom: '1px solid #dcdcdc', width: '100%' }} /> */}

        <div style={{ display: 'flex', alignItems: 'center', color: 'black',borderTop:'0.6px' }}>
          <p style={{ fontSize: '16px' }}>Item total</p>
          <p style={{ fontWeight: 'bold', fontSize: '22px', marginLeft: '300px' }}>SAR {totalPrice.toFixed(2)}</p>
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
              fontSize: '16px',
            }}
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemSelection;