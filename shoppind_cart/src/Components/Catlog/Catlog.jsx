import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faClose, faInfoCircle, faPrint } from '@fortawesome/free-solid-svg-icons';
import './Catlog.css'; 

const CatalogPage = ({ onItemClick, selecteditem }) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(['All', 'Favourites']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [variants, setVariants] = useState({}); 
  const baseurl = 'http://localhost:5000/';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/cart/category');
        const data = await response.json();
        setCategories(['All', 'Favourites', ...data]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/cart/food_available');
        const data = await response.json();
        setItems(data);

        // Fetch variants for each food item
        const variantPromises = data.map(item => fetchVariants(item.id));
        await Promise.all(variantPromises); 
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []);

  const fetchVariants = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/user/cart/food_varients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
    
      setVariants(prevVariants => ({
        ...prevVariants,
        [id]: data 
      }));
    } catch (error) {
      console.error('Error fetching food variants:', error);
    }
  };

  // Filter items based on active category
  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.product_category_master.name === activeCategory);

  return (
    <div className="catalog-container" style={{ width: '480px' }}>
      <div className="catalog-header">
        Catalog
        <div className="header-icons" style={{ color: 'black' }}>
          <FontAwesomeIcon icon={faEllipsisVertical} style={{ height: '20px' }} />
          <FontAwesomeIcon icon={faClose} style={{ height: '20px', marginLeft: '20px' }} />
        </div>
      </div>

      <div className="category-filters">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="catalog-grid">
        {filteredItems.slice(0, 9).map((item) => (
          <div key={item.id} className="catalog-item" onClick={() => {
            console.log('Adding to cart:', item); 
            selecteditem(item);
          }}>
            <div className="item-image">
              <img src={`${baseurl}${item.img_url}` || 'https://via.placeholder.com/150'} alt={item.name} />
              <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
            </div>
            <div className="item-details" style={{ color: 'black', fontSize: '13px', textAlign: 'start', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '3px' }}>
              <span style={{ marginLeft: '4px', marginBottom: '2px', fontWeight: 'bold', fontSize: '14px' }}>{item.name}</span>
              {variants[item.id] && variants[item.id].length > 0 && (
                <p className="item-detailsp" style={{ marginLeft: '4px', marginTop: '0' }}>
                  {variants[item.id].length} variants
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <button className="footer-button" style={{ width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007bff', border: '1px solid #007bff' }}>
          <FontAwesomeIcon icon={faPrint} style={{ marginRight: '10px', color: '#007bff' }} />
          Print Bill
        </button>
        <button className="footer-button primary" style={{ width: '300px' }}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CatalogPage;
